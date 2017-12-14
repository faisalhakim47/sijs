"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const littag_js_1 = require("./core/littag.js");
function html(staticParts, ...dynamicParts) {
    return new littag_js_1.LitTag(staticParts, dynamicParts);
}
exports.html = html;
