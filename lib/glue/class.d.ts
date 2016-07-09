import { Glue } from './glue';
import { ObsGetter } from '../observer/observable';
export declare class ClassGlue extends Glue {
    private id;
    private className;
    private cond;
    constructor(id: string, className: string, cond: ObsGetter);
    install(): void;
    destroy(): void;
    classNameWatcher(val: any): void;
}
