"use strict";
const glue_1 = require('./glue');
const observable_1 = require('../observer/observable');
class ListGlue extends glue_1.Glue {
    constructor(helperId, items, listFn, opts) {
        super();
        this.helperId = helperId;
        this.items = items;
        this.listFn = listFn;
        this.opts = opts;
        this.currentItems = [];
        const { skip, limit } = opts;
        if (skip instanceof observable_1.ObsGetter) {
            this.skip = skip.val();
            skip.watch(this.skipWatcher);
        }
        if (limit instanceof observable_1.ObsGetter) {
            this.limit = limit.val();
            limit.watch(this.limitWatcher);
        }
    }
    install() {
        this.helperEl = document.getElementById(this.helperId);
        const helperParentEl = this.helperEl.parentElement;
        const elIndex = Array.prototype.indexOf.call(helperParentEl.children, this.helperEl);
        this.currentItems = this.currentItems.map((oldItem, index) => {
            oldItem['el'] = helperParentEl.children[elIndex + index + 1];
            return oldItem;
        });
        this.items.watch(this.listGenerator);
        this.isInstalled = true;
    }
    destroy() {
        const { skip, limit } = this.opts;
        if (skip instanceof observable_1.ObsGetter) {
            skip.unwatch(this.skipWatcher);
        }
        if (limit instanceof observable_1.ObsGetter) {
            limit.unwatch(this.limitWatcher);
        }
        if (!this.isInstalled)
            return;
        this.items.unwatch(this.listGenerator);
        this.helperEl = null;
    }
    skipWatcher(val) {
        this.skip = val;
    }
    limitWatcher(val) {
        this.limit = val;
    }
    listGenerator() {
        const { helperId, helperEl, items, listFn, skip, limit, currentItems } = this;
        let newItems = [];
        let length = items.length();
        let i;
        if (length <= skip + limit) {
            i = length - skip;
            if (i < 0)
                i = 0;
        }
        else if (limit === 0) {
            i = length - skip;
        }
        else {
            i = limit;
        }
        let skipIndex = skip;
        if (skip > length)
            skipIndex = length;
        else if (skip < 0)
            skipIndex = 0;
        while (i--) {
            const index = skipIndex + i;
            const item = items.get(index);
            let indexItem = -1;
            for (let i = 0, l = currentItems.length; i < l; i++) {
                if (currentItems[i].item === item) {
                    indexItem = i;
                    break;
                }
            }
            if (indexItem !== -1) {
                helperEl.insertAdjacentElement('afterend', currentItems[indexItem].el);
                const currentItem = currentItems.splice(indexItem, 1)[0];
                currentItem.index = index;
                currentItems.push(currentItem);
            }
            else {
                const itemParam = { item: item, index: index };
                const e = listFn(itemParam.item, () => itemParam.index);
                helperEl.insertAdjacentHTML('afterend', e.template.replace('>', ' ' + helperId + '>'));
                glue_1.installGlues(itemParam['glues'] = e.glues);
                itemParam['el'] = helperEl.nextSibling;
                newItems.push(itemParam);
            }
        }
        currentItems.forEach((oldItem) => {
            helperEl.parentElement.removeChild(oldItem.el);
            glue_1.destroyGlues(oldItem.glues);
        });
        this.currentItems = newItems;
        newItems = [];
    }
}
exports.ListGlue = ListGlue;
//# sourceMappingURL=list.js.map