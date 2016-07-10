"use strict";
var status_1 = require('./status');
var glue_1 = require('../glue/glue');
function Bootsrap(selector, RouterInstance) {
    if (status_1.is.browser) {
        document.addEventListener('DOMContentLoaded', function () {
            var el = document.querySelector(selector);
            var _a = RouterInstance.generateElem(window.location.pathname), template = _a.template, glues = _a.glues;
            if (!status_1.is.prerender)
                el.outerHTML = template;
            console.log(!status_1.is.prerender, template, glues);
            glue_1.installGlues(glues);
            status_1.is.prerender = false;
        });
    }
    else {
        console.error('Cannot Bootsrap(), this is not browser.');
    }
}
exports.Bootsrap = Bootsrap;
//# sourceMappingURL=browser.js.map