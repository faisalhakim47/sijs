"use strict";
var Glue = (function () {
    function Glue() {
        this.isInstalled = false;
    }
    return Glue;
}());
exports.Glue = Glue;
var elReference = {};
function getEl(id) {
    if (!elReference[id]) {
        elReference[id] = {
            refCount: 1,
            el: document.getElementById(id)
        };
    }
    else {
        elReference[id].refCount++;
    }
    return elReference[id];
}
exports.getEl = getEl;
function removeElRef(id) {
    var ref = elReference[id];
    if (ref) {
        ref.refCount--;
        if (ref.refCount === 0) {
            elReference[id] = null;
        }
    }
    else {
        console.warn('removeRef error:', id);
    }
}
exports.removeElRef = removeElRef;
function installGlues(glues) {
    console.log('install', glues);
    glues.forEach(function (glue) { return glue.install(); });
}
exports.installGlues = installGlues;
function destroyGlues(glues) {
    glues.forEach(function (glue) { return glue.destroy(); });
}
exports.destroyGlues = destroyGlues;
//# sourceMappingURL=glue.js.map