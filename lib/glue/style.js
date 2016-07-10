"use strict";
const glue_1 = require('./glue');
class StyleGlue extends glue_1.Glue {
    constructor(id, name, value) {
        super();
        this.id = id;
        this.name = name;
        this.value = value;
    }
    install() {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not been inserted yet.', this);
        }
        this.value.watch(this.styleWatcher);
        this.isInstalled = true;
    }
    destroy() {
        if (this.isInstalled) {
            this.value.unwatch(this.styleWatcher);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue style #', this.id, 'has not been installed yet.', this);
        }
    }
    styleWatcher(val) {
        this.el.style[this.name] = val;
    }
}
exports.StyleGlue = StyleGlue;
//# sourceMappingURL=style.js.map