export interface IWatcher {
    (...data: any[]): void;
    wi?: number;
}
export declare class Emitter {
    watchers: any;
    on(name: string, watcher: IWatcher): void;
    off(name: string, watcher: IWatcher): void;
    emit(name: string, ...data: any[]): void;
}
