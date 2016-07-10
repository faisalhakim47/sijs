"use strict";
const glue_1 = require('./glue');
const global_event_1 = require('../instance/global-event');
class RouterViewGlue extends glue_1.Glue {
    constructor(id, rv, activeGlues) {
        super();
        this.id = id;
        this.rv = rv;
        this.activeGlues = activeGlues;
    }
    install() {
        if (!(this.el = glue_1.getEl(this.id))) {
            return console.warn('Input element #', this.id, 'has not inserted yet.', this);
        }
        global_event_1.GlobalEvent.on('route:change', this.routeWatcher);
    }
    destroy() {
        global_event_1.GlobalEvent.off('route:change', this.routeWatcher);
        this.el = null;
        glue_1.removeElRef(this.id);
    }
    routeWatcher() {
        const e = this.rv.Elem();
        if (this.el.nextElementSibling.hasAttribute(this.id)) {
            glue_1.destroyGlues(this.activeGlues);
            this.el.parentElement.removeChild(this.el.nextElementSibling);
        }
        this.el.insertAdjacentHTML('afterend', e.template.replace('>', ` ${this.id}>`));
        glue_1.installGlues(e.glues);
        this.activeGlues = e.glues;
    }
}
exports.RouterViewGlue = RouterViewGlue;
const instances = {};
//# sourceMappingURL=routerview.js.map