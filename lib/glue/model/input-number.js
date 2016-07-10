"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('../glue');
var event_1 = require('../event');
var InputNumberGlue = (function (_super) {
    __extends(InputNumberGlue, _super);
    function InputNumberGlue(id, model) {
        _super.call(this);
        this.id = id;
        this.model = model;
    }
    InputNumberGlue.prototype.toView = function (val) {
        this.el.value = val;
    };
    InputNumberGlue.prototype.toModel = function () {
        this.model.set(parseFloat(this.el.value));
    };
    InputNumberGlue.prototype.install = function () {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        this.model.watch(this.toView);
        event_1.watchEvent(this.id, 'oninput', this.toModel);
        this.isInstalled = true;
    };
    InputNumberGlue.prototype.destroy = function () {
        if (this.isInstalled) {
            this.model.unwatch(this.toView);
            event_1.unwatchEvent(this.id, 'oninput', this.toModel);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue InputNumber #', this.id, 'has not installed yet.', this);
        }
    };
    return InputNumberGlue;
}(glue_1.Glue));
exports.InputNumberGlue = InputNumberGlue;
//# sourceMappingURL=input-number.js.map