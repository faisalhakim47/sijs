import { Glue } from '../glue';
import { ObsGetter } from '../../observer/observable';
export declare class InputCheckboxGlue extends Glue {
    private id;
    private model;
    el: HTMLInputElement;
    value: string;
    constructor(id: string, model: ObsGetter);
    install(): void;
    destroy(): void;
    toView(val: any): void;
    toModel(): void;
}
