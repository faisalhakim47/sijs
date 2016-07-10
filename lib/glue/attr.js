"use strict";
const glue_1 = require('./glue');
class AttrGlue extends glue_1.Glue {
    constructor(id, attrName, attrValue) {
        super();
        this.id = id;
        this.attrName = attrName;
        this.attrValue = attrValue;
    }
    attrWatcher(val) {
        this.el.setAttribute(this.attrName, val);
    }
    install() {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        this.attrValue.watch(this.attrWatcher);
        this.isInstalled = true;
    }
    destroy() {
        if (this.isInstalled) {
            this.attrValue.unwatch(this.attrWatcher);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue InputText #', this.id, 'has not installed yet.', this);
        }
    }
}
exports.AttrGlue = AttrGlue;
//# sourceMappingURL=attr.js.map