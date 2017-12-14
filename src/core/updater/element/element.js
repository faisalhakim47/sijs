"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updater_js_1 = require("../updater.js");
const controller_js_1 = require("./controller.js");
const constant_js_1 = require("../../../constant.js");
class ElementUpdater extends updater_js_1.Updater {
    constructor(element) {
        super();
        this.element = element;
        this.element = element;
    }
    init(options) {
        this.element.removeAttribute(constant_js_1.MARKER);
        const length = controller_js_1.registeredController.length;
        for (let index = 0; index < length; index++)
            controller_js_1.registeredController[index].init(this.element, options);
    }
    update(options) {
        const length = controller_js_1.registeredController.length;
        for (let index = 0; index < length; index++)
            controller_js_1.registeredController[index].update(this.element, options);
    }
}
exports.ElementUpdater = ElementUpdater;
