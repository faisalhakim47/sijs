"use strict";
var global_event_1 = require('../instance/global-event');
var paramRx = new RegExp('/(:.*)/', 'g');
var Router = (function () {
    function Router() {
    }
    Router.map = function (routes) {
        var _this = this;
        Object.keys(routes).forEach(function (path) {
            var string = routes[path].name;
            var params = path.match(paramRx)
                .map(function (param) { return param.slice(1); });
            params.shift();
            _this.routes.push({
                path: path,
                name: name,
                params: params,
                rx: new RegExp(path.replace(paramRx, '/(.*)/'))
            });
        });
    };
    Router.generateRoute = function (path) {
        var _loop_1 = function(i) {
            var route = this_1.routes[i];
            if (route.rx.test(path)) {
                this_1.currentRouteName = route.name;
                var paramsArr_1 = path.match(route.rx);
                var paramsObj_1 = null;
                if (route.params) {
                    paramsObj_1 = {};
                    route.params.forEach(function (name, i) {
                        paramsObj_1[name] = paramsArr_1[i];
                    });
                    this_1.currentParams = paramsObj_1;
                }
                else {
                    this_1.currentParams = paramsArr_1;
                }
                i = 0;
            }
            out_i_1 = i;
        };
        var out_i_1;
        var this_1 = this;
        for (var i = this.routes.length; i--;) {
            _loop_1(i);
            i = out_i_1;
        }
        global_event_1.GlobalEvent.emit('route:change', this); // Global Event
    };
    Router.routes = [];
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=router.js.map