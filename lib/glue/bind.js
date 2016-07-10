"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('./glue');
var BindGlue = (function (_super) {
    __extends(BindGlue, _super);
    function BindGlue(id, value) {
        _super.call(this);
        this.id = id;
        this.value = value;
        this.bindWatcher = this.toViewBind.bind(this);
    }
    BindGlue.prototype.install = function () {
        this.el = glue_1.getEl(this.id);
        this.value.watch(this.bindWatcher);
        window['test'] = this.value;
        this.isInstalled = true;
    };
    BindGlue.prototype.destroy = function () {
        if (this.isInstalled) {
            this.value.unwatch(this.bindWatcher);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
        }
    };
    BindGlue.prototype.toViewBind = function (val) {
        this.el.innerText = val;
    };
    return BindGlue;
}(glue_1.Glue));
exports.BindGlue = BindGlue;
//# sourceMappingURL=bind.js.map