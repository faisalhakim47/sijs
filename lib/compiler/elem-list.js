"use strict";
var uid_1 = require('./uid');
var list_1 = require('../glue/list');
var observable_1 = require('../observer/observable');
function isListFn(t) {
    return t && typeof t === 'function';
}
function eList(items, listFn, opts) {
    if (!opts)
        opts = { limit: 0, skip: 0 };
    var skip = opts.skip instanceof observable_1.ObsGetter
        ? opts.skip.val()
        : (opts.skip || 0);
    var limit = opts.limit instanceof observable_1.ObsGetter
        ? opts.limit.val()
        : (opts.limit || 0);
    var id = uid_1.genId();
    var glues = [];
    var listGlue = new list_1.ListGlue(id, items, listFn, opts);
    var template = '<script id="' + id + '"></script>';
    var length = items.length(), i;
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
    var _loop_1 = function(index) {
        var currentItem = listGlue.currentItems[index] = {
            index: index,
            item: items.get(skip + index)
        };
        var e = listFn(currentItem.item, function () { return currentItem.index; });
        template += e.template.replace('>', ' ' + id + '>');
        glues.push.apply(glues, (currentItem['glues'] = e.glues));
    };
    for (var index = 0; index < i; index++) {
        _loop_1(index);
    }
    glues.unshift(listGlue);
    return { id: id, template: template, glues: glues, _isElm: true };
}
exports.eList = eList;
//# sourceMappingURL=elem-list.js.map