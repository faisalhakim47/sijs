"use strict";
const elem_1 = require('./elem');
const observable_1 = require('../observer/observable');
const router_1 = require('../router/router');
function isComponentClass(t) {
    return t && t._isComponentClass;
}
exports.isComponentClass = isComponentClass;
class Component {
    constructor(attrs, children) {
        this.attrs = attrs;
        this.children = children;
        this.rawState = {};
        this._isComponent = true;
        this.params = {};
        this.query = {};
        this.state = new observable_1.Observable(this, 'rawState');
    }
    create() {
        this.params = router_1.Router.currentParams;
        this.query = router_1.Router.currentQuery;
        const e = this.render(elem_1.createElem, this.state);
        if (this.created)
            this.created();
        return e;
    }
}
Component._isComponentClass = true;
Component.awaitState = [];
exports.Component = Component;
//# sourceMappingURL=component.js.map