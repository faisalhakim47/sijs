"use strict";
var elem_1 = require('./elem');
var observable_1 = require('../observer/observable');
var router_1 = require('../router/router');
function isComponentClass(t) {
    return t && t._isComponentClass;
}
exports.isComponentClass = isComponentClass;
var Component = (function () {
    function Component(attrs, children) {
        this.attrs = attrs;
        this.children = children;
        this.rawState = {};
        this._isComponent = true;
        this.params = {};
        this.query = {};
        this.state = new observable_1.Observable(this, 'rawState');
    }
    Component.prototype.create = function () {
        this.params = router_1.Router.currentParams;
        this.query = router_1.Router.currentQuery;
        var e = this.render(elem_1.createElem, this.state);
        if (this.created)
            this.created();
        return e;
    };
    Component._isComponentClass = true;
    Component.awaitState = [];
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map