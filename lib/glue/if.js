"use strict";
const glue_1 = require('./glue');
const observable_1 = require('../observer/observable');
class IfGlue extends glue_1.Glue {
    constructor(id, cond, elem) {
        super();
        this.id = id;
        this.cond = cond;
        this.elem = elem;
    }
    ifWatcher(cond) {
        if (cond && !this.isExist()) {
            const e = this.elem();
            this.helperEl.insertAdjacentHTML('afterend', e.template);
            glue_1.installGlues(e.glues);
            this.activeGlues = e.glues;
        }
        else if (!cond && this.isExist()) {
            this.helperEl.parentElement.removeChild(this.helperEl.nextElementSibling);
            glue_1.destroyGlues(this.activeGlues);
            this.activeGlues = [];
        }
    }
    isExist() {
        return this.helperEl.nextElementSibling.id === this.id;
    }
    install() {
        const cond = this.cond;
        this.helperEl = document.getElementById('if' + this.id);
        if (cond instanceof observable_1.ObsGetter) {
            cond.watch(this.ifWatcher);
        }
        this.isInstalled = true;
    }
    destroy() {
        if (!this.isInstalled)
            return;
        const cond = this.cond;
        if (cond instanceof observable_1.ObsGetter) {
            cond.unwatch(this.ifWatcher);
        }
        this.helperEl = null;
    }
}
exports.IfGlue = IfGlue;
//# sourceMappingURL=if.js.map