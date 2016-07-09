"use strict";
var elem_1 = require('./elem');
var routerview_1 = require('../glue/routerview');
var router_1 = require('../router/router');
var paramRx = new RegExp('/:(.*)/', 'g');
var RouterView = (function () {
    function RouterView() {
        this.routes = [];
    }
    RouterView.prototype.register = function (_a) {
        var _this = this;
        var name = _a.name;
        return function (constructor) {
            _this.routes.push({ name: name, Component: constructor });
        };
    };
    RouterView.prototype.Elem = function () {
        var rvGlue = new routerview_1.RouterViewGlue('', this);
        var helperE = elem_1.createElem('script', null);
        for (var i = 0, l = this.routes.length; i < l; i++) {
            var route = this.routes[i];
            if (route.name === router_1.Router.currentRouteName) {
                var e = (new route.Component()).create();
                helperE.template += e.template;
                (_a = helperE.glues).push.apply(_a, e.glues);
                break;
            }
        }
        rvGlue.id = helperE.id;
        helperE.glues.unshift(rvGlue);
        return helperE;
        var _a;
    };
    return RouterView;
}());
exports.RouterView = RouterView;
//# sourceMappingURL=elem-routerview.js.map