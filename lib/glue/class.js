"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('./glue');
var ClassGlue = (function (_super) {
    __extends(ClassGlue, _super);
    function ClassGlue(id, className, cond) {
        _super.call(this);
        this.id = id;
        this.className = className;
        this.cond = cond;
    }
    ClassGlue.prototype.install = function () {
        this.el = glue_1.getEl(this.id);
        this.cond.watch(this.classNameWatcher);
        this.isInstalled = true;
    };
    ClassGlue.prototype.destroy = function () {
        if (this.isInstalled) {
            this.cond.unwatch(this.classNameWatcher);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
        }
    };
    ClassGlue.prototype.classNameWatcher = function (val) {
        var isContain = this.el.classList.contains(this.className);
        if (val && !isContain) {
            this.el.classList.add(this.className);
        }
        else if (!val && isContain) {
            this.el.classList.remove(this.className);
        }
    };
    return ClassGlue;
}(glue_1.Glue));
exports.ClassGlue = ClassGlue;
//# sourceMappingURL=class.js.map