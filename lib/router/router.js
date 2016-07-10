"use strict";
const global_event_1 = require('../instance/global-event');
const paramRx = new RegExp('/(:.*)/', 'g');
class Router {
    static map(routes) {
        Object.keys(routes).forEach((path) => {
            const { name: string } = routes[path];
            const params = path.match(paramRx)
                .map((param) => param.slice(1));
            params.shift();
            this.routes.push({
                path: path,
                name: name,
                params: params,
                rx: new RegExp(path.replace(paramRx, '/(.*)/'))
            });
        });
    }
    static generateRoute(path) {
        for (let i = this.routes.length; i--;) {
            const route = this.routes[i];
            if (route.rx.test(path)) {
                this.currentRouteName = route.name;
                let paramsArr = path.match(route.rx);
                let paramsObj = null;
                if (route.params) {
                    paramsObj = {};
                    route.params.forEach((name, i) => {
                        paramsObj[name] = paramsArr[i];
                    });
                    this.currentParams = paramsObj;
                }
                else {
                    this.currentParams = paramsArr;
                }
                i = 0;
            }
        }
        global_event_1.GlobalEvent.emit('route:change', this); // Global Event
    }
}
Router.routes = [];
exports.Router = Router;
//# sourceMappingURL=router.js.map