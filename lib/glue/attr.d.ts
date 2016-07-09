import { Glue } from './glue';
import { ObsGetter } from '../observer/observable';
export declare class AttrGlue extends Glue {
    private id;
    private attrName;
    private attrValue;
    constructor(id: string, attrName: string, attrValue: ObsGetter);
    attrWatcher(val: any): void;
    install(): void;
    destroy(): void;
}
