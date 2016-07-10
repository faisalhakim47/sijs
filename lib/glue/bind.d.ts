import { Glue } from './glue';
import { ObsGetter } from '../observer/observable';
export declare class BindGlue extends Glue {
    private id;
    private value;
    constructor(id: string, value: ObsGetter);
    install(): void;
    destroy(): void;
    bindWatcher: any;
    toViewBind(val: any): void;
}
