"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('../glue');
var event_1 = require('../event');
var InputRadioGlue = (function (_super) {
    __extends(InputRadioGlue, _super);
    function InputRadioGlue(id, model) {
        _super.call(this);
        this.id = id;
        this.model = model;
    }
    InputRadioGlue.prototype.install = function () {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        this.radioName = this.model.path + this.model.val();
        this.el.name = this.radioName;
        event_1.watchEvent(this.id, 'click', this.toModel);
        this.isInstalled = true;
    };
    InputRadioGlue.prototype.destroy = function () {
        if (this.isInstalled) {
            this.model.unwatch(this.toView);
            event_1.unwatchEvent(this.id, 'click', this.toModel);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue InputRadio #', this.id, 'has not installed yet.', this);
        }
    };
    InputRadioGlue.prototype.toView = function (val) {
        if (this.value === val) {
            this.el.click();
        }
    };
    InputRadioGlue.prototype.toModel = function () {
        this.model.set(this.el.value);
    };
    return InputRadioGlue;
}(glue_1.Glue));
exports.InputRadioGlue = InputRadioGlue;
//# sourceMappingURL=input-radio.js.map