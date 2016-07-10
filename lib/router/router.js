"use strict";
const global_event_1 = require('../instance/global-event');
const paramRx = new RegExp('/(:.*)/', 'g');
class Router {
    constructor(Component, routes) {
        this.Component = Component;
        this.routes = [];
        Object.keys(routes).forEach((path, i) => {
            const name = routes[path];
            let params = path.match(paramRx);
            if (params === null)
                params = [];
            params = params.map((param) => param.slice(1));
            params.shift();
            this.routes.push({
                path: path,
                name: name,
                params: params,
                rx: new RegExp(path.replace(paramRx, '/(.*)/'))
            });
            console.log('MAPPING', this.routes[i]);
        });
        console.log(this.routes);
    }
    generateRoute(path) {
        if (!path)
            path = Router.path;
        for (let i = this.routes.length; i--;) {
            const route = this.routes[i];
            if (route.rx.test(path)) {
                Router.currentRouteName = route.name;
                let paramsArr = path.match(route.rx);
                let paramsObj = null;
                if (route.params) {
                    paramsObj = {};
                    route.params.forEach((name, i) => {
                        paramsObj[name] = paramsArr[i];
                    });
                    Router.currentParams = paramsObj;
                }
                else {
                    Router.currentParams = paramsArr;
                }
                i = 0;
            }
        }
        global_event_1.GlobalEvent.emit('route:change', this); // Global Event
    }
    generateElem(path) {
        this.generateRoute(path);
        return (new this.Component()).create();
    }
}
exports.Router = Router;
//# sourceMappingURL=router.js.map