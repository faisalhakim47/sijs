"use strict";
const dependency_1 = require('./dependency');
const observable_1 = require('./observable');
function compute(deps, computeFn) {
    const obs = new observable_1.Observable();
    dependency_1.dependsOn(deps, (...datas) => {
        obs.set(null, computeFn(...datas));
    });
    return obs;
}
exports.compute = compute;
//# sourceMappingURL=compute.js.map