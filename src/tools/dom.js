"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_js_1 = require("../core/updater/content/component.js");
function walkDomTree(root, walkerFn, { whatToShow = 4294967295 /* NodeFilter.SHOW_ALL */, acceptNode = (node) => 1 /* NodeFilter.FILTER_ACCEPT */ } = {}) {
    const walker = document.createTreeWalker(root, whatToShow, { acceptNode }, false);
    let nodeIndex = -1;
    let isContinue = true;
    const stop = () => isContinue = false;
    while (walker.nextNode() && isContinue) {
        nodeIndex++;
        walkerFn(walker.currentNode, nodeIndex, stop);
    }
}
exports.walkDomTree = walkDomTree;
function appendNode(parentNode, node) {
    return parentNode.appendChild(node);
}
exports.appendNode = appendNode;
function insertNodeBefore(refNode, node) {
    return refNode.parentNode.insertBefore(node, refNode);
}
exports.insertNodeBefore = insertNodeBefore;
function removeNode(node) {
    component_js_1.beforeDestroyComponent(node);
    return node.parentNode.removeChild(node);
}
exports.removeNode = removeNode;
function replaceNode(oldNode, newNode) {
    component_js_1.beforeDestroyComponent(oldNode);
    return oldNode.parentNode.replaceChild(newNode, oldNode);
}
exports.replaceNode = replaceNode;
