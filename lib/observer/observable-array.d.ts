import { Observable, ObsGetter } from './observable';
export declare class ObsArray {
    private baseData;
    private basePath;
    private rawItems;
    private obsItems;
    private EE;
    constructor(baseData?: {
        _dummy: any[];
    }, basePath?: string);
    length(): number;
    get(index: number): Observable;
    getAll(): Observable[];
    val(): Observable[];
    set(index: number, value: any): void;
    pop(): any;
    push(val: any): number;
    shift(): any;
    unshift(val: any): number;
    splice(start: number, delCount: number, ...vals: any[]): any[];
    filter(deps: (ObsGetter | ObsArray)[], filterFn: (item, index: number, ...val) => boolean): Observable;
    watch(p1: (() => any) | string, p2?: (...dat) => any): void;
    unwatch(p1: (() => any) | string, p2?: (...dat) => any): void;
}
