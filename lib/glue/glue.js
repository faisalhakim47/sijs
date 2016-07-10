"use strict";
class Glue {
    constructor() {
        this.isInstalled = false;
    }
}
exports.Glue = Glue;
const elReference = {};
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
    const ref = elReference[id];
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
    glues.forEach((glue) => glue.install());
}
exports.installGlues = installGlues;
function destroyGlues(glues) {
    glues.forEach((glue) => glue.destroy());
}
exports.destroyGlues = destroyGlues;
//# sourceMappingURL=glue.js.map