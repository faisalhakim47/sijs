"use strict";
var status_1 = require('./status');
var glue_1 = require('../glue/glue');
function Bootsrap(selector, Comp) {
    var el = document.querySelector(selector);
    var _a = (new Comp()).create(), template = _a.template, glues = _a.glues;
    if (!status_1.default.prerender)
        el.outerHTML = template;
    glue_1.installGlues(glues);
    status_1.default.prerender = false;
}
exports.Bootsrap = Bootsrap;
//# sourceMappingURL=browser.js.map