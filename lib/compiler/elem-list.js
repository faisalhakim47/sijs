"use strict";
const uid_1 = require('./uid');
const list_1 = require('../glue/list');
const observable_1 = require('../observer/observable');
function isListFn(t) {
    return t && typeof t === 'function';
}
function eList(items, listFn, opts) {
    if (!opts)
        opts = { limit: 0, skip: 0 };
    let skip = opts.skip instanceof observable_1.ObsGetter
        ? opts.skip.val()
        : (opts.skip || 0);
    let limit = opts.limit instanceof observable_1.ObsGetter
        ? opts.limit.val()
        : (opts.limit || 0);
    const id = uid_1.genId();
    const glues = [];
    const listGlue = new list_1.ListGlue(id, items, listFn, opts);
    let template = '<script id="' + id + '"></script>';
    let length = items.length(), i;
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
    if (skip > length)
        skip = length;
    else if (skip < 0)
        skip = 0;
    for (let index = 0; index < i; index++) {
        const currentItem = listGlue.currentItems[index] = {
            index: index,
            item: items.get(skip + index)
        };
        const e = listFn(currentItem.item, () => currentItem.index);
        template += e.template.replace('>', ' ' + id + '>');
        glues.push(...currentItem['glues'] = e.glues);
    }
    glues.unshift(listGlue);
    return { id: id, template: template, glues: glues, _isElm: true };
}
exports.eList = eList;
//# sourceMappingURL=elem-list.js.map