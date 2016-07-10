"use strict";
function get(obj, path) {
    if (!path)
        return;
    var parsedPath = pathParse(path);
    var l = parsedPath.length - 1;
    for (var i = 0; i < l; i++) {
        obj = obj[parsedPath[i]];
        if (!obj) {
            console.warn('can\'t get object', obj, 'on path', path);
            return { undefined: true };
        }
    }
    return obj[parsedPath[l]];
}
exports.get = get;
function set(obj, path, value) {
    if (!path)
        return;
    var parsedPath = pathParse(path);
    var l = parsedPath.length - 1;
    for (var i = 0; i < l; i++) {
        obj = obj[parsedPath[i]];
        if (!obj) {
            console.warn('can\'t get object', obj, 'on path', path);
            return false;
        }
    }
    obj[parsedPath[l]] = value;
    return true;
}
exports.set = set;
var pathRx = /\[|\]\./g;
function pathParse(path) {
    return path.replace(pathRx, '.').split('.');
}
exports.pathParse = pathParse;
/**
 * Object.defineProperty syntatic sugar
 *
 * @param {*} Obj
 * @param {string} propName
 * @param {{ get: function, set: function }|*} value
 * @param {boolean} isEnum
 * @param {boolean} isConf
 */
function def(obj, propName, value, isEnum, isConf) {
    if (typeof value.get === 'function' ||
        typeof value.set === 'function') {
        Object.defineProperty(obj, propName, {
            get: value.get,
            set: value.set,
            enumerable: isEnum,
            configurable: isConf
        });
    }
    else {
        Object.defineProperty(obj, propName, {
            value: value,
            enumerable: isEnum,
            configurable: isConf
        });
    }
}
exports.def = def;
/*
**  ref: https://stackoverflow.com/questions/5876332/how-can-i-differentiate-between-an-object-literal-other-javascript-objects/5878101#5878101
**  Function to test if an object is a plain object, i.e. is constructed
**  by the built-in Object constructor and inherits directly from Object.prototype
**  or null. Some built-in objects pass the test, e.g. Math which is a plain object
**  and some host or exotic objects may pass also.
**
**  @param {} obj - value to test
**  @returns {Boolean} true if passes tests, false otherwise
*/
function isPlainObject(obj) {
    // Basic check for Type object that's not null
    if (typeof obj === 'object' && obj !== null) {
        // If Object.getPrototypeOf supported, use it
        if (typeof Object.getPrototypeOf === 'function') {
            var proto = Object.getPrototypeOf(obj);
            return proto === Object.prototype || proto === null;
        }
        // Otherwise, use internal class
        // This should be reliable as if getPrototypeOf not supported, is pre-ES5
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    // Not an object
    return false;
}
exports.isPlainObject = isPlainObject;
//# sourceMappingURL=object.js.map