"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('../glue');
var event_1 = require('../event');
var SelectGlue = (function (_super) {
    __extends(SelectGlue, _super);
    function SelectGlue(id, model) {
        _super.call(this);
        this.id = id;
        this.model = model;
    }
    SelectGlue.prototype.toView = function (val) {
        this.el.value = val;
    };
    SelectGlue.prototype.toModel = function () {
        this.model.set(this.el.value);
    };
    SelectGlue.prototype.install = function () {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Select element #', this.id, 'has not inserted yet.', this);
        }
        this.el.value = this.model.val();
        this.model.watch(this.toView);
        event_1.watchEvent(this.id, 'change', this.toModel);
        this.isInstalled = true;
    };
    SelectGlue.prototype.destroy = function () {
        if (this.isInstalled) {
            this.model.unwatch(this.toView);
            event_1.unwatchEvent(this.id, 'change', this.toModel);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue select #', this.id, 'has not installed yet.', this);
        }
    };
    return SelectGlue;
}(glue_1.Glue));
exports.SelectGlue = SelectGlue;
//# sourceMappingURL=select.js.map