"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_js_1 = require("./template.js");
const constant_js_1 = require("../constant.js");
const dom_js_1 = require("../tools/dom.js");
/**
 * LitTag is class that represent the Tagged Template Literal
 * it is created by html function
 */
class LitTag {
    constructor(staticParts, dymanicParts) {
        this.staticParts = staticParts;
        this.dymanicParts = dymanicParts;
    }
    verify(instance) {
        return instance instanceof template_js_1.TemplateInstance
            && instance.staticParts === this.staticParts;
    }
    compile() {
        const instance = template_js_1.requestTemplate(this.staticParts).clone();
        instance.init(this.dymanicParts);
        return instance;
    }
    mount(container) {
        const instance = container[constant_js_1.INSTANCE];
        if (this.verify(instance)) {
            instance.update(this.dymanicParts);
        }
        else {
            dom_js_1.replaceNode(container, this.compile().element);
        }
    }
}
exports.LitTag = LitTag;
