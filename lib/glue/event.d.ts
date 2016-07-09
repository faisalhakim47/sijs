import { Glue } from './glue';
import { Emitter } from '../observer/emitter';
export declare const eventBus: Emitter;
export declare function watchEvent(id: string, name: string, eventFn: any): void;
export declare function unwatchEvent(id: string, name: string, eventFn: any): void;
export declare class EventGlue extends Glue {
    private id;
    private name;
    private eventFn;
    static context: any;
    constructor(id: string, name: string, eventFn: () => void);
    install(): void;
    destroy(): void;
}
