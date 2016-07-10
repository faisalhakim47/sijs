"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('../glue');
var event_1 = require('../event');
var InputCheckboxGlue = (function (_super) {
    __extends(InputCheckboxGlue, _super);
    function InputCheckboxGlue(id, model) {
        _super.call(this);
        this.id = id;
        this.model = model;
    }
    InputCheckboxGlue.prototype.install = function () {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        event_1.watchEvent(this.id, 'oninput', this.toModel);
        this.isInstalled = true;
    };
    InputCheckboxGlue.prototype.destroy = function () {
        if (this.isInstalled) {
            this.model.unwatch(this.toView);
            event_1.unwatchEvent(this.id, 'oninput', this.toModel);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue InputCheckbox #', this.id, 'has not installed yet.', this);
        }
    };
    InputCheckboxGlue.prototype.toView = function (val) {
        if (val.indexOf(this.el.value) === -1) {
            this.el.checked = false;
        }
        else {
            this.el.checked = true;
        }
    };
    InputCheckboxGlue.prototype.toModel = function () {
        this.model.set(this.el.value);
    };
    return InputCheckboxGlue;
}(glue_1.Glue));
exports.InputCheckboxGlue = InputCheckboxGlue;
//# sourceMappingURL=input-checkbox.js.map