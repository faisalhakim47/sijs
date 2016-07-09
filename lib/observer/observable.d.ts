import { IWatcher, Emitter } from './emitter';
export declare class Observable {
    private baseData;
    private basePath;
    private id;
    private rawData;
    private EE;
    private childWatcher;
    private childArray;
    private childNum;
    constructor(baseData?: any, basePath?: string, id?: string);
    get(path: string): any;
    set(path: string, value: any): void;
    filter(path: any, filterFn: ((val) => any) | string): any;
    watch(watcher: IWatcher): void;
    unwatch(watcher: any): void;
}
export declare class ObsGetter {
    id: string;
    private rawData;
    path: string;
    private EE;
    private getter;
    private childWatcher;
    constructor(id: string, rawData: any, path: string, EE: Emitter, getter: (path: string) => ObsGetter, childWatcher: any);
    get(childPath: string): ObsGetter;
    raw(): any;
    val(): any;
    set(value: any): void;
    watch(watcher: IWatcher): void;
    unwatch(watcher: any): void;
}
export interface IFilter {
    name: string;
    filterFn: (val) => any;
}
export declare const Filters: any;
export declare function registerFilter(name: string, filterFn: (val) => any): void;
