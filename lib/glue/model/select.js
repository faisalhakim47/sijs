"use strict";
const glue_1 = require('../glue');
const event_1 = require('../event');
class SelectGlue extends glue_1.Glue {
    constructor(id, model) {
        super();
        this.id = id;
        this.model = model;
    }
    toView(val) {
        this.el.value = val;
    }
    toModel() {
        this.model.set(this.el.value);
    }
    install() {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Select element #', this.id, 'has not inserted yet.', this);
        }
        this.el.value = this.model.val();
        this.model.watch(this.toView);
        event_1.watchEvent(this.id, 'change', this.toModel);
        this.isInstalled = true;
    }
    destroy() {
        if (this.isInstalled) {
            this.model.unwatch(this.toView);
            event_1.unwatchEvent(this.id, 'change', this.toModel);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue select #', this.id, 'has not installed yet.', this);
        }
    }
}
exports.SelectGlue = SelectGlue;
//# sourceMappingURL=select.js.map