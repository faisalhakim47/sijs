"use strict";
const glue_1 = require('../glue');
const event_1 = require('../event');
class TextGlue extends glue_1.Glue {
    constructor(id, model) {
        super();
        this.id = id;
        this.model = model;
    }
    install() {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        this.model.watch(this.toView);
        event_1.watchEvent(this.id, 'input', this.toModel);
        this.isInstalled = true;
    }
    destroy() {
        if (this.isInstalled) {
            this.model.unwatch(this.toView);
            event_1.unwatchEvent(this.id, 'input', this.toModel);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue InputText #', this.id, 'has not installed yet.', this);
        }
    }
    toView(val) {
        this.el.value = val;
    }
    toModel() {
        this.model.set(this.el.value);
    }
}
exports.TextGlue = TextGlue;
//# sourceMappingURL=text.js.map