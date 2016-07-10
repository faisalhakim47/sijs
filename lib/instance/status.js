"use strict";
var test = {};
try {
    test['bowser'] = !!window && !!document;
    test['server'] = !!global;
}
catch (e) { }
var browser = !!test['bowser'];
var server = test['server'] && !browser;
var prerender = browser && window['_prerender'];
exports.is = {
    browser: browser,
    server: server,
    prerender: prerender
};
//# sourceMappingURL=status.js.map