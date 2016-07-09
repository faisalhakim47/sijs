import { Glue } from './glue';
import { IElem } from '../compiler/elem';
import { ObsGetter } from '../observer/observable';
export declare class IfGlue extends Glue {
    private id;
    private cond;
    private elem;
    helperEl: HTMLElement;
    activeGlues: Glue[];
    constructor(id: string, cond: ObsGetter | boolean, elem: () => IElem);
    ifWatcher(cond: any): void;
    isExist(): boolean;
    install(): void;
    destroy(): void;
}
