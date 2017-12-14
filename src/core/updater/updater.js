"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * this is base class for every Updater
 * the purpose of Updater is to do the dirty work with DOM
 * the Updaters will be stored in TemplateInstance
 * with DOM that they manage
 */
class Updater {
    constructor() {
        this.numberOfPart = 1;
    }
    init(values) {
        return this.update(values);
    }
    update(values) { }
}
exports.Updater = Updater;
