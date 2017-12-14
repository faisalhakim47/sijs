"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updater_js_1 = require("./updater.js");
const array_js_1 = require("../../tools/array.js");
class AttributeUpdater extends updater_js_1.Updater {
    constructor(attribute, staticParts) {
        super();
        this.attribute = attribute;
        this.staticParts = staticParts;
        this.node = null;
        this.oldValue = [];
        this.node = attribute.parentElement;
        this.numberOfPart = staticParts.length - 1;
    }
    generateValue(values) {
        let value = '';
        const staticParts = this.staticParts;
        const lastStaticIndex = staticParts.length - 1;
        for (let index = 0; index < lastStaticIndex; index++) {
            value += staticParts[index] + values[index];
        }
        value += staticParts[lastStaticIndex];
        return value;
    }
    init(values) {
        if (values.length === 1 && typeof values[0] === 'boolean') {
            if (values[0])
                this.node.removeAttributeNode(this.attribute);
            else
                this.node.setAttributeNode(this.attribute);
        }
        else {
            this.attribute.nodeValue = this.generateValue(values);
            this.oldValue = values;
        }
    }
    update(values) {
        if (values.length === 1 && typeof values[0] === 'boolean') {
            if (values[0])
                this.node.removeAttributeNode(this.attribute);
            else
                this.node.setAttributeNode(this.attribute);
        }
        else {
            if (!array_js_1.equalArray(values, this.oldValue)) {
                this.attribute.nodeValue = this.generateValue(values);
                this.oldValue = values;
            }
        }
    }
}
exports.AttributeUpdater = AttributeUpdater;
