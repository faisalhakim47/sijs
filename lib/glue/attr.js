"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('./glue');
var AttrGlue = (function (_super) {
    __extends(AttrGlue, _super);
    function AttrGlue(id, attrName, attrValue) {
        _super.call(this);
        this.id = id;
        this.attrName = attrName;
        this.attrValue = attrValue;
    }
    AttrGlue.prototype.attrWatcher = function (val) {
        this.el.setAttribute(this.attrName, val);
    };
    AttrGlue.prototype.install = function () {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        this.attrValue.watch(this.attrWatcher);
        this.isInstalled = true;
    };
    AttrGlue.prototype.destroy = function () {
        if (this.isInstalled) {
            this.attrValue.unwatch(this.attrWatcher);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue InputText #', this.id, 'has not installed yet.', this);
        }
    };
    return AttrGlue;
}(glue_1.Glue));
exports.AttrGlue = AttrGlue;
//# sourceMappingURL=attr.js.map