"use strict";
const status_1 = require('./status');
const emitter_1 = require('../observer/emitter');
const router_1 = require('../router/router');
exports.GlobalEvent = new emitter_1.Emitter();
if (status_1.default.browser) {
    const addEvent = (name, eventFn) => {
        window.addEventListener(name, eventFn);
    };
    addEvent('popstate', (e) => {
        router_1.Router.generateRoute(window.location.pathname + window.location.search);
        exports.GlobalEvent.emit('browser:popstate', e);
    });
    addEvent('online', (e) => {
        exports.GlobalEvent.emit('browser:online', e);
    });
    addEvent('offline', (e) => {
        exports.GlobalEvent.emit('browser:offline', e);
    });
}
//# sourceMappingURL=global-event.js.map