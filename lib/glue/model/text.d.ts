import { Glue } from '../glue';
import { ObsGetter } from '../../observer/observable';
export declare class TextGlue extends Glue {
    private id;
    private model;
    el: HTMLInputElement | HTMLTextAreaElement;
    constructor(id: string, model: ObsGetter);
    install(): void;
    destroy(): void;
    viewWatcher: any;
    toView(val: any): void;
    modelWatcher: any;
    toModel(): void;
}
