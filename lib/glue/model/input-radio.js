"use strict";
const glue_1 = require('../glue');
const event_1 = require('../event');
class InputRadioGlue extends glue_1.Glue {
    constructor(id, model) {
        super();
        this.id = id;
        this.model = model;
    }
    install() {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        this.radioName = this.model.path + this.model.val();
        this.el.name = this.radioName;
        event_1.watchEvent(this.id, 'click', this.toModel);
        this.isInstalled = true;
    }
    destroy() {
        if (this.isInstalled) {
            this.model.unwatch(this.toView);
            event_1.unwatchEvent(this.id, 'click', this.toModel);
            this.el = null;
            glue_1.removeElRef(this.id);
        }
        else {
            console.warn('Glue InputRadio #', this.id, 'has not installed yet.', this);
        }
    }
    toView(val) {
        if (this.value === val) {
            this.el.click();
        }
    }
    toModel() {
        this.model.set(this.el.value);
    }
}
exports.InputRadioGlue = InputRadioGlue;
//# sourceMappingURL=input-radio.js.map