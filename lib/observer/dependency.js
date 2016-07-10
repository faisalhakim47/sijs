"use strict";
function dependsOn(deps, fn) {
    const Emit = () => {
        fn(...deps.map(dep => dep.val()));
    };
    Emit();
    deps.forEach((dep) => {
        dep.watch(Emit);
    });
    return () => {
        deps.forEach((dep) => {
            dep.unwatch(Emit);
        });
    };
}
exports.dependsOn = dependsOn;
//# sourceMappingURL=dependency.js.map