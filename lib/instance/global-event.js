"use strict";
var status_1 = require('./status');
var emitter_1 = require('../observer/emitter');
var router_1 = require('../router/router');
exports.GlobalEvent = new emitter_1.Emitter();
if (status_1.default.browser) {
    var addEvent = function (name, eventFn) {
        window.addEventListener(name, eventFn);
    };
    addEvent('popstate', function (e) {
        router_1.Router.generateRoute(window.location.pathname + window.location.search);
        exports.GlobalEvent.emit('browser:popstate', e);
    });
    addEvent('online', function (e) {
        exports.GlobalEvent.emit('browser:online', e);
    });
    addEvent('offline', function (e) {
        exports.GlobalEvent.emit('browser:offline', e);
    });
}
//# sourceMappingURL=global-event.js.map