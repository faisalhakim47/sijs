"use strict";
// import { readFileSync } from 'fs'
function Generate(path, RouterInstance, linkToApp) {
    var template = RouterInstance.generateElem(path).template;
    template = "\n    <script>(function() {\n      window._prerender = true;\n      window._E = function _E() {};\n    })()</script>\n  " + template + ("\n    <script src=\"" + linkToApp + "\"></script>\n  ");
    return template;
}
exports.Generate = Generate;
//# sourceMappingURL=server.js.map