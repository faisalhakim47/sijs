"use strict";
const glue_1 = require('./glue');
class ClassGlue extends glue_1.Glue {
    constructor(id, className, cond) {
        super();
        this.id = id;
        this.className = className;
        this.cond = cond;
    }
    install() {
        this.el = glue_1.getEl(this.id);
        this.cond.watch(this.classNameWatcher);
        this.isInstalled = true;
    }
    destroy() {
        if (this.isInstalled) {
            this.cond.unwatch(this.classNameWatcher);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
        }
    }
    classNameWatcher(val) {
        const isContain = this.el.classList.contains(this.className);
        if (val && !isContain) {
            this.el.classList.add(this.className);
        }
        else if (!val && isContain) {
            this.el.classList.remove(this.className);
        }
    }
}
exports.ClassGlue = ClassGlue;
//# sourceMappingURL=class.js.map