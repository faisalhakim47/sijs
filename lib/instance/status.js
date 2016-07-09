"use strict";
var test = {};
try {
    test['bowser'] = !!window && !!document;
    test['server'] = !!global;
}
catch (e) { }
var browser = !!test['bowser'];
var server = test['server'] && !browser ? false : true;
var prerender = browser && window['_prerender'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    browser: browser,
    server: server,
    prerender: prerender
};
//# sourceMappingURL=status.js.map