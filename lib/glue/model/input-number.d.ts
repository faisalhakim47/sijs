import { Glue } from '../glue';
import { ObsGetter } from '../../observer/observable';
export declare class InputNumberGlue extends Glue {
    private id;
    private model;
    el: HTMLInputElement;
    constructor(id: string, model: ObsGetter);
    toView(val: any): void;
    toModel(): void;
    install(): void;
    destroy(): void;
}
