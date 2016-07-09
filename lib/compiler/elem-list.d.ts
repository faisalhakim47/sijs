import { IElem } from './elem';
import { ObsGetter } from '../observer/observable';
import { ObsArray } from '../observer/observable-array';
export interface IListFn {
    (item: any, index: () => number): IElem;
}
export declare function eList(items: ObsArray, listFn: IListFn, opts?: {
    limit?: number | ObsGetter;
    skip?: number | ObsGetter;
    key?: string;
}): IElem;
