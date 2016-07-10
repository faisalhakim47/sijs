"use strict";
function dependsOn(deps, fn) {
    var Emit = function () {
        fn.apply(void 0, deps.map(function (dep) { return dep.val(); }));
    };
    Emit();
    deps.forEach(function (dep) {
        dep.watch(Emit);
    });
    return function () {
        deps.forEach(function (dep) {
            dep.unwatch(Emit);
        });
    };
}
exports.dependsOn = dependsOn;
//# sourceMappingURL=dependency.js.map