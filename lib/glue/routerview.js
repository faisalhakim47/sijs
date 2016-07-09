"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('./glue');
var RouterViewGlue = (function (_super) {
    __extends(RouterViewGlue, _super);
    function RouterViewGlue(id, rv) {
        _super.call(this);
        this.id = id;
        this.rv = rv;
    }
    RouterViewGlue.prototype.install = function () {
    };
    RouterViewGlue.prototype.destroy = function () {
    };
    return RouterViewGlue;
}(glue_1.Glue));
exports.RouterViewGlue = RouterViewGlue;
var instances = {};
//# sourceMappingURL=routerview.js.map