"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('../glue');
var event_1 = require('../event');
var TextGlue = (function (_super) {
    __extends(TextGlue, _super);
    function TextGlue(id, model) {
        _super.call(this);
        this.id = id;
        this.model = model;
        this.viewWatcher = this.toModel.bind(this);
        this.modelWatcher = this.toModel.bind(this);
    }
    TextGlue.prototype.install = function () {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        this.model.watch(this.viewWatcher);
        event_1.watchEvent(this.id, 'oninput', this.modelWatcher);
        this.isInstalled = true;
    };
    TextGlue.prototype.destroy = function () {
        if (this.isInstalled) {
            this.model.unwatch(this.viewWatcher);
            event_1.unwatchEvent(this.id, 'oninput', this.modelWatcher);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue InputText #', this.id, 'has not installed yet.', this);
        }
    };
    TextGlue.prototype.toView = function (val) {
        this.el.value = val;
    };
    TextGlue.prototype.toModel = function () {
        this.model.set(this.el.value);
    };
    return TextGlue;
}(glue_1.Glue));
exports.TextGlue = TextGlue;
//# sourceMappingURL=text.js.map