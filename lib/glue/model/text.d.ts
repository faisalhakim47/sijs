import { Glue } from '../glue';
import { ObsGetter } from '../../observer/observable';
export declare class TextGlue extends Glue {
    private id;
    private model;
    el: HTMLInputElement | HTMLTextAreaElement;
    constructor(id: string, model: ObsGetter);
    install(): void;
    destroy(): void;
    toView(val: any): void;
    toModel(): void;
}
