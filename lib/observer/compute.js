"use strict";
var dependency_1 = require('./dependency');
var observable_1 = require('./observable');
function compute(deps, computeFn) {
    var obs = new observable_1.Observable();
    dependency_1.dependsOn(deps, function () {
        var datas = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            datas[_i - 0] = arguments[_i];
        }
        obs.set(null, computeFn.apply(void 0, datas));
    });
    return obs;
}
exports.compute = compute;
//# sourceMappingURL=compute.js.map