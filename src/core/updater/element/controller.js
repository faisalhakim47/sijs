"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * extends this class to create element control filter
 * element control is object inserted in static element
 * ex. <div ${{ example: true }}></div>
 * the object will be passed as options in init and update function
 */
class Controller {
    init(options, element) {
        this.update(options, element);
    }
    update(options, element) { }
}
exports.Controller = Controller;
exports.registeredController = [];
function addController(controller) {
    exports.registeredController.push(controller);
}
exports.addController = addController;
