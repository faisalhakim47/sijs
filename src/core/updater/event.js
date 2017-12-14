"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updater_js_1 = require("./updater.js");
class EventUpdater extends updater_js_1.Updater {
    constructor(element, eventName) {
        super();
        this.element = element;
        this.eventName = eventName;
        this.currentListener = null;
    }
    init(newListeners) {
        this.currentListener = newListeners[0];
        this.element.removeAttribute('on' + this.eventName);
        this.element.addEventListener(this.eventName, (event) => {
            this.currentListener(event);
        });
    }
    update(newListeners) {
        this.currentListener = newListeners[0];
    }
}
exports.EventUpdater = EventUpdater;
