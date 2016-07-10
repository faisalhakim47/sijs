"use strict";
const elem_1 = require('./elem');
const routerview_1 = require('../glue/routerview');
const router_1 = require('../router/router');
const paramRx = new RegExp('/:(.*)/', 'g');
class RouterView {
    contructor(obj) {
        Object.keys(obj).forEach((key) => {
            this.routes[key] = obj[key];
        });
    }
    init() {
        const helperElem = elem_1.createElem('script', null);
        const e = this.Elem();
        e.glues.unshift(new routerview_1.RouterViewGlue(helperElem.id, this, e.glues));
        return e;
    }
    Elem() {
        const Component = this.routes[router_1.Router.currentRouteName];
        if (Component) {
            return (new Component()).create();
        }
        else {
            return elem_1.createElem('script', { dummy: true });
        }
    }
}
exports.RouterView = RouterView;
//# sourceMappingURL=elem-routerview.js.map