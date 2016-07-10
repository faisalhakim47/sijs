"use strict";
const status_1 = require('./status');
const glue_1 = require('../glue/glue');
function Bootsrap(selector, Comp) {
    const el = document.querySelector(selector);
    const { template, glues } = (new Comp()).create();
    if (!status_1.default.prerender)
        el.outerHTML = template;
    glue_1.installGlues(glues);
    status_1.default.prerender = false;
}
exports.Bootsrap = Bootsrap;
//# sourceMappingURL=browser.js.map