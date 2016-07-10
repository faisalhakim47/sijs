"use strict";
const glue_1 = require('./glue');
class BindGlue extends glue_1.Glue {
    constructor(id, value) {
        super();
        this.id = id;
        this.value = value;
    }
    bindWatcher(val) {
        this.el.innerText = val;
    }
    install() {
        this.el = glue_1.getEl(this.id);
        this.value.watch(this.bindWatcher);
        this.isInstalled = true;
    }
    destroy() {
        if (this.isInstalled) {
            this.value.unwatch(this.bindWatcher);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
        }
    }
}
exports.BindGlue = BindGlue;
//# sourceMappingURL=bind.js.map