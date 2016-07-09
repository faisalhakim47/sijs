export declare function get(obj: any, path: any): any;
export declare function set(obj: any, path: string, value: any): boolean;
export declare function pathParse(path: string): string[];
/**
 * Object.defineProperty syntatic sugar
 *
 * @param {*} Obj
 * @param {string} propName
 * @param {{ get: function, set: function }|*} value
 * @param {boolean} isEnum
 * @param {boolean} isConf
 */
export declare function def(obj: any, propName: any, value: any, isEnum: any, isConf: any): void;
export declare function isPlainObject(obj: any): boolean;
