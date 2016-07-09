"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('./glue');
var observable_1 = require('../observer/observable');
var IfGlue = (function (_super) {
    __extends(IfGlue, _super);
    function IfGlue(id, cond, elem) {
        _super.call(this);
        this.id = id;
        this.cond = cond;
        this.elem = elem;
    }
    IfGlue.prototype.ifWatcher = function (cond) {
        if (cond && !this.isExist()) {
            var e = this.elem();
            this.helperEl.insertAdjacentHTML('afterend', e.template);
            glue_1.installGlues(e.glues);
            this.activeGlues = e.glues;
        }
        else if (!cond && this.isExist()) {
            this.helperEl.parentElement.removeChild(this.helperEl.nextElementSibling);
            glue_1.destroyGlues(this.activeGlues);
            this.activeGlues = [];
        }
    };
    IfGlue.prototype.isExist = function () {
        return this.helperEl.nextElementSibling.id === this.id;
    };
    IfGlue.prototype.install = function () {
        var cond = this.cond;
        this.helperEl = document.getElementById('if' + this.id);
        if (cond instanceof observable_1.ObsGetter) {
            cond.watch(this.ifWatcher);
        }
        this.isInstalled = true;
    };
    IfGlue.prototype.destroy = function () {
        if (!this.isInstalled)
            return;
        var cond = this.cond;
        if (cond instanceof observable_1.ObsGetter) {
            cond.unwatch(this.ifWatcher);
        }
        this.helperEl = null;
    };
    return IfGlue;
}(glue_1.Glue));
exports.IfGlue = IfGlue;
//# sourceMappingURL=if.js.map