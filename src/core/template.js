"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_js_1 = require("../constant.js");
const dom_js_1 = require("../tools/dom.js");
const list_js_1 = require("../tools/list.js");
const content_js_1 = require("./updater/content/content.js");
const element_js_1 = require("./updater/element/element.js");
const attribute_js_1 = require("./updater/attribute.js");
const event_js_1 = require("./updater/event.js");
exports.templateCache = new list_js_1.List();
/**
 * Template cache controller
 * it detect whether template is cached
 * then return it
 */
function requestTemplate(staticParts) {
    const cachedTemplate = exports.templateCache.get(staticParts);
    if (cachedTemplate)
        return cachedTemplate;
    else {
        const newTemplate = new Template(staticParts);
        exports.templateCache.set(staticParts, newTemplate);
        return newTemplate;
    }
}
exports.requestTemplate = requestTemplate;
const restrictedParentTags = {
    li(html) {
        const ul = document.createElement('ul');
        ul.innerHTML = html;
        return ul.children[0];
    },
    tr(html) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        table.appendChild(thead);
        thead.innerHTML = html;
        return thead.children[0];
    },
    th(html) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        table.appendChild(thead);
        thead.appendChild(tr);
        tr.innerHTML = html;
        return tr.children[0];
    },
    td(html) {
        return restrictedParentTags.th(html);
    },
};
const HTMLTagRx = /<([^\s>]+)/;
function parseTemplateString(staticParts) {
    if ('HTMLTemplateElement' in window) {
        const template = document.createElement('template');
        template.innerHTML = staticParts.join(constant_js_1.MARKER);
        return template.content.children[0];
    }
    else {
        const tag = staticParts[0].match(HTMLTagRx)[1];
        if (typeof restrictedParentTags[tag] === 'function') {
            return restrictedParentTags[tag](staticParts.join(constant_js_1.MARKER));
        }
        else {
            const div = document.createElement('div');
            div.innerHTML = staticParts.join(constant_js_1.MARKER);
            return div.children[0];
        }
    }
}
/**
 * Template class is core of the library
 * it efficiently creates template literal to usable DOM
 */
class Template {
    constructor(staticParts) {
        this.staticParts = staticParts;
        const templateParts = [];
        const template = document.createDocumentFragment();
        template.appendChild(parseTemplateString(staticParts));
        /**
         * About the doAfterWalkTree,
         * when you want to modify the DOM Tree
         * you have to do it after the walkDomTree
         * or else walkDomTree will stop.
         */
        const doAfterWalkTree = [];
        /**
         * normalize the TextNode
         * because as default, after we join all staticParts with MARKER,
         * the TextNode can contains more than one MARKER
         * so we change the MARKER part with
         * comment that hold the MARKER
         */
        dom_js_1.walkDomTree(template, (node) => {
            const fragment = document.createDocumentFragment();
            const staticParts = node.nodeValue.split(constant_js_1.MARKER);
            const lastStaticIndex = staticParts.length - 1;
            for (let index = 0; index < lastStaticIndex; index++) {
                fragment.appendChild(document.createTextNode(staticParts[index]));
                fragment.appendChild(document.createComment(constant_js_1.MARKER));
            }
            fragment.appendChild(document.createTextNode(staticParts[lastStaticIndex]));
            doAfterWalkTree.push(() => dom_js_1.replaceNode(node, fragment));
        }, {
            whatToShow: 4 /* NodeFilter.SHOW_TEXT */,
            acceptNode(node) {
                return node.nodeValue.indexOf(constant_js_1.MARKER) !== -1
                    ? 1 /* NodeFilter.FILTER_ACCEPT */
                    : 3; /* NodeFilter.FILTER_SKIP */
            }
        });
        const length = doAfterWalkTree.length;
        for (let index = 0; index < length; index++)
            doAfterWalkTree[index]();
        /**
         * detecting MARKER and save its position.
         * So at the cloning proccess it already know
         * which part to look at.
         */
        dom_js_1.walkDomTree(template, (node, nodeIndex) => {
            if (node.nodeType === 8 /* Node.COMMENT_NODE */)
                return templateParts.push({
                    nodeIndex,
                    isContent: true,
                });
            const length = node.attributes.length;
            for (let index = 0; index < length; index++) {
                const attribute = node.attributes.item(index);
                if (attribute.name === constant_js_1.MARKER)
                    templateParts.push({
                        nodeIndex,
                        isElement: true,
                    });
                else if (attribute.name.slice(0, 2) === 'on')
                    templateParts.push({
                        nodeIndex,
                        isEvent: true,
                        eventName: attribute.name.slice(2),
                    });
                else if (attribute.nodeValue.indexOf(constant_js_1.MARKER) !== -1)
                    templateParts.push({
                        nodeIndex,
                        isAttribute: true,
                        attributeName: attribute.name,
                        staticParts: attribute.nodeValue.split(constant_js_1.MARKER),
                    });
            }
        }, {
            whatToShow: 1 /* NodeFilter.SHOW_ELEMENT */ | 128 /* NodeFilter.SHOW_COMMENT */,
            acceptNode(node) {
                if (node.nodeType === 8 /* Node.COMMENT_NODE */)
                    return node.nodeValue === constant_js_1.MARKER
                        ? 1 /* NodeFilter.FILTER_ACCEPT */
                        : 3; /* NodeFilter.FILTER_SKIP */
                else
                    return node.hasAttributes()
                        ? 1 /* NodeFilter.FILTER_ACCEPT */
                        : 3; /* NodeFilter.FILTER_SKIP */
            }
        });
        this.template = template;
        this.templateParts = templateParts;
    }
    clone() {
        const partUpdaters = [];
        const element = this.template.cloneNode(true);
        dom_js_1.walkDomTree(element, (node, nodeIndex, stop) => {
            const length = this.templateParts.length;
            for (let index = 0; index < length; index++) {
                const expression = this.templateParts[index];
                if (expression.nodeIndex !== nodeIndex)
                    continue;
                if (expression.isContent)
                    partUpdaters.push(new content_js_1.ContentUpdater(node));
                else if (expression.isAttribute)
                    partUpdaters.push(new attribute_js_1.AttributeUpdater(node.attributes.getNamedItem(expression.attributeName), expression.staticParts));
                else if (expression.isElement)
                    partUpdaters.push(new element_js_1.ElementUpdater(node));
                else if (expression.isEvent)
                    partUpdaters.push(new event_js_1.EventUpdater(node, expression.eventName));
            }
        }, {
            whatToShow: 1 /* NodeFilter.SHOW_ELEMENT */ | 128 /* NodeFilter.SHOW_COMMENT */,
            acceptNode(node) {
                if (node.nodeType === 8 /* Node.COMMENT_NODE */)
                    return node.nodeValue === constant_js_1.MARKER
                        ? 1 /* NodeFilter.FILTER_ACCEPT */
                        : 3; /* NodeFilter.FILTER_SKIP */
                else
                    return node.hasAttributes()
                        ? 1 /* NodeFilter.FILTER_ACCEPT */
                        : 3; /* NodeFilter.FILTER_SKIP */
            }
        });
        return new TemplateInstance(this.staticParts, element.children[0], partUpdaters);
    }
}
exports.Template = Template;
/**
 * Template Instance is the core result of sijs
 * it tightly couples Updaters and Nodes
 */
class TemplateInstance {
    constructor(staticParts, element, partUpdaters) {
        this.staticParts = staticParts;
        this.element = element;
        this.partUpdaters = partUpdaters;
        this.element[constant_js_1.INSTANCE] = this;
    }
    init(expressions) {
        let startIndex = 0;
        let index = 0;
        let updater;
        while (updater = this.partUpdaters[index++]) {
            updater.init(expressions.slice(startIndex, startIndex += updater.numberOfPart));
        }
    }
    update(expressions) {
        let partIndex = 0;
        let updaterIndex = 0;
        let updater;
        while (updater = this.partUpdaters[updaterIndex++])
            updater.update(expressions.slice(partIndex, partIndex += updater.numberOfPart));
    }
}
exports.TemplateInstance = TemplateInstance;
