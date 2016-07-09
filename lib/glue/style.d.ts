import { Glue } from './glue';
import { ObsGetter } from '../observer/observable';
export declare class StyleGlue extends Glue {
    private id;
    private name;
    private value;
    constructor(id: string, name: string, value: ObsGetter);
    install(): void;
    destroy(): void;
    styleWatcher(val: any): void;
}
