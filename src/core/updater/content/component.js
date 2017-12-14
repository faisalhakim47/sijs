"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constant_js_1 = require("../../../constant.js");
const html_js_1 = require("../../../html.js");
const template_js_1 = require("../../template.js");
const dom_js_1 = require("../../../tools/dom.js");
// TODO: PARENT-CHILD COMMUNICATION
/** @type {Component} */
let renderingComponent = null;
class Component {
    static get rendering() {
        return renderingComponent;
    }
    // --- PROPERTY ---
    get html() {
        return html_js_1.html;
    }
    $mount(container) {
        initComponent(this, container);
        return this;
    }
    $update() {
        this.$instance.update(this.render().dymanicParts);
    }
    // --- VIEW ---
    render() {
        return this.html `<div></div>`;
    }
    // --- HOOKS ---
    updated() { }
    beforeDestroy() { }
}
exports.Component = Component;
function initComponent(component, currentNode) {
    renderingComponent = component;
    const instance = component.render().compile();
    renderingComponent = null;
    connectInstanceComponent(instance, component);
    dom_js_1.replaceNode(currentNode, instance.element);
}
exports.initComponent = initComponent;
function updateComponent(newComponent, currentNode) {
    /** @type {TemplateInstance} */
    const instance = currentNode[constant_js_1.INSTANCE];
    if (!instance || !instance.$component || !(newComponent instanceof instance.$component.constructor)) {
        return initComponent(newComponent, currentNode);
    }
    connectInstanceComponent(instance, newComponent);
    newComponent.$update();
}
exports.updateComponent = updateComponent;
/**
 * used for beforeDestroy event.
 * it is also useful in the future for transition hook
 */
function beforeDestroyComponent(node) {
    const instance = node[constant_js_1.INSTANCE];
    if (instance instanceof template_js_1.TemplateInstance) {
        const component = instance.$component;
        if (component instanceof Component) {
            component.beforeDestroy();
        }
    }
}
exports.beforeDestroyComponent = beforeDestroyComponent;
/**
 * @param {TemplateInstance} instance
 * @param {Component} newComponent
 */
function connectInstanceComponent(instance, newComponent) {
    const oldComponent = instance.$component;
    if (oldComponent === newComponent)
        return;
    instance.$component = newComponent;
    newComponent.$instance = instance;
}
