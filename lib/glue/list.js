"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var glue_1 = require('./glue');
var observable_1 = require('../observer/observable');
var ListGlue = (function (_super) {
    __extends(ListGlue, _super);
    function ListGlue(helperId, items, listFn, opts) {
        _super.call(this);
        this.helperId = helperId;
        this.items = items;
        this.listFn = listFn;
        this.opts = opts;
        this.currentItems = [];
        var skip = opts.skip, limit = opts.limit;
        if (skip instanceof observable_1.ObsGetter) {
            this.skip = skip.val();
            skip.watch(this.skipWatcher);
        }
        if (limit instanceof observable_1.ObsGetter) {
            this.limit = limit.val();
            limit.watch(this.limitWatcher);
        }
    }
    ListGlue.prototype.install = function () {
        this.helperEl = document.getElementById(this.helperId);
        var helperParentEl = this.helperEl.parentElement;
        var elIndex = Array.prototype.indexOf.call(helperParentEl.children, this.helperEl);
        this.currentItems = this.currentItems.map(function (oldItem, index) {
            oldItem['el'] = helperParentEl.children[elIndex + index + 1];
            return oldItem;
        });
        this.items.watch(this.listGenerator);
        this.isInstalled = true;
    };
    ListGlue.prototype.destroy = function () {
        var _a = this.opts, skip = _a.skip, limit = _a.limit;
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
    };
    ListGlue.prototype.skipWatcher = function (val) {
        this.skip = val;
    };
    ListGlue.prototype.limitWatcher = function (val) {
        this.limit = val;
    };
    ListGlue.prototype.listGenerator = function () {
        var _a = this, helperId = _a.helperId, helperEl = _a.helperEl, items = _a.items, listFn = _a.listFn, skip = _a.skip, limit = _a.limit, currentItems = _a.currentItems;
        var newItems = [];
        var length = items.length();
        var i;
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
        var skipIndex = skip;
        if (skip > length)
            skipIndex = length;
        else if (skip < 0)
            skipIndex = 0;
        var _loop_1 = function() {
            var index = skipIndex + i;
            var item = items.get(index);
            var indexItem = -1;
            for (var i_1 = 0, l = currentItems.length; i_1 < l; i_1++) {
                if (currentItems[i_1].item === item) {
                    indexItem = i_1;
                    break;
                }
            }
            if (indexItem !== -1) {
                helperEl.insertAdjacentElement('afterend', currentItems[indexItem].el);
                var currentItem = currentItems.splice(indexItem, 1)[0];
                currentItem.index = index;
                currentItems.push(currentItem);
            }
            else {
                var itemParam_1 = { item: item, index: index };
                var e = listFn(itemParam_1.item, function () { return itemParam_1.index; });
                helperEl.insertAdjacentHTML('afterend', e.template.replace('>', ' ' + helperId + '>'));
                glue_1.installGlues(itemParam_1['glues'] = e.glues);
                itemParam_1['el'] = helperEl.nextSibling;
                newItems.push(itemParam_1);
            }
        };
        while (i--) {
            _loop_1();
        }
        currentItems.forEach(function (oldItem) {
            helperEl.parentElement.removeChild(oldItem.el);
            glue_1.destroyGlues(oldItem.glues);
        });
        this.currentItems = newItems;
        newItems = [];
    };
    return ListGlue;
}(glue_1.Glue));
exports.ListGlue = ListGlue;
//# sourceMappingURL=list.js.map