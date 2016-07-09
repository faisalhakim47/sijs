import { Glue } from '../glue';
import { ObsGetter } from '../../observer/observable';
export declare class SelectGlue extends Glue {
    private id;
    private model;
    el: HTMLSelectElement;
    constructor(id: string, model: ObsGetter);
    toView(val: any): void;
    toModel(): void;
    install(): void;
    destroy(): void;
}
