"use strict";
const test = {};
try {
    test['bowser'] = !!window && !!document;
    test['server'] = !!global;
}
catch (e) { }
const browser = !!test['bowser'];
const server = test['server'] && !browser ? false : true;
const prerender = browser && window['_prerender'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    browser: browser,
    server: server,
    prerender: prerender
};
//# sourceMappingURL=status.js.map