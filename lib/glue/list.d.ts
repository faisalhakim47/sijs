import { Glue } from './glue';
import { IElem } from '../compiler/elem';
import { ObsGetter } from '../observer/observable';
import { ObsArray } from '../observer/observable-array';
export declare class ListGlue extends Glue {
    private helperId;
    private items;
    private listFn;
    private opts;
    helperEl: HTMLElement;
    skip: number;
    limit: number;
    currentItems: any[];
    constructor(helperId: string, items: ObsArray, listFn: (item, index: () => number) => IElem, opts: {
        skip?: ObsGetter | number;
        limit?: ObsGetter | number;
    });
    install(): void;
    destroy(): void;
    skipWatcher(val: any): void;
    limitWatcher(val: any): void;
    listGenerator(): void;
}
