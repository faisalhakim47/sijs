"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updater_js_1 = require("../updater.js");
const component_js_1 = require("./component.js");
const directive_js_1 = require("./directive.js");
const littag_js_1 = require("../../littag.js");
const dom_js_1 = require("../../../tools/dom.js");
class ContentUpdater extends updater_js_1.Updater {
    constructor(node) {
        super();
        this.initNode = node;
        this.previousNode = node.previousSibling;
        this.nextNode = node.nextSibling;
        this.oldValue = null;
    }
    clearContent() {
        if (!this.previousNode || !this.nextNode)
            return;
        let contentNode;
        while ((contentNode = this.previousNode.nextSibling) !== this.nextNode)
            dom_js_1.removeNode(contentNode);
    }
    init(values) {
        if (this.initNode && !this.initNode.previousSibling) {
            dom_js_1.insertNodeBefore(this.initNode, document.createComment(''));
            this.previousNode = this.initNode.previousSibling;
        }
        if (this.initNode && !this.initNode.previousSibling) {
            dom_js_1.appendNode(this.initNode, document.createComment(''));
            this.nextNode = this.initNode.nextSibling;
        }
        this.initNode = null;
        const currentNode = this.previousNode.nextSibling;
        const content = values[0];
        if (content instanceof littag_js_1.LitTag)
            content.mount(currentNode);
        else if (content instanceof directive_js_1.Directive)
            this.oldValue = content.init(this);
        else if (content instanceof component_js_1.Component)
            component_js_1.initComponent(content, currentNode);
        else {
            const textNode = document.createTextNode(content);
            dom_js_1.replaceNode(currentNode, textNode);
            this.oldValue = textNode.nodeValue;
        }
    }
    update(values) {
        let currentNode = this.previousNode.nextSibling;
        let content = values[0];
        if (content instanceof littag_js_1.LitTag)
            content.mount(currentNode);
        else if (content instanceof directive_js_1.Directive)
            this.oldValue = content.update(this);
        else if (content instanceof component_js_1.Component)
            component_js_1.updateComponent(content, currentNode);
        else if ((content + '') !== this.oldValue)
            this.oldValue = currentNode.nodeValue = content;
    }
}
exports.ContentUpdater = ContentUpdater;
