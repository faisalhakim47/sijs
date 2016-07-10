"use strict";
var uid = 0;
function getId() {
    return uid;
}
exports.getId = getId;
function genId() {
    return '_' + uid++;
}
exports.genId = genId;
//# sourceMappingURL=uid.js.map