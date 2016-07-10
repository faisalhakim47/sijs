"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('./glue');
var global_event_1 = require('../instance/global-event');
var RouterViewGlue = (function (_super) {
    __extends(RouterViewGlue, _super);
    function RouterViewGlue(id, rv, activeGlues) {
        _super.call(this);
        this.id = id;
        this.rv = rv;
        this.activeGlues = activeGlues;
    }
    RouterViewGlue.prototype.install = function () {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        global_event_1.GlobalEvent.on('route:change', this.routeWatcher);
    };
    RouterViewGlue.prototype.destroy = function () {
        global_event_1.GlobalEvent.off('route:change', this.routeWatcher);
        this.el = null;
        glue_1.removeElRef(this.id);
    };
    RouterViewGlue.prototype.routeWatcher = function () {
        var e = this.rv.Elem();
        if (this.el.nextElementSibling.hasAttribute(this.id)) {
            glue_1.destroyGlues(this.activeGlues);
            this.el.parentElement.removeChild(this.el.nextElementSibling);
        }
        this.el.insertAdjacentHTML('afterend', e.template.replace('>', " " + this.id + ">"));
        glue_1.installGlues(e.glues);
        this.activeGlues = e.glues;
    };
    return RouterViewGlue;
}(glue_1.Glue));
exports.RouterViewGlue = RouterViewGlue;
var instances = {};
//# sourceMappingURL=routerview.js.map