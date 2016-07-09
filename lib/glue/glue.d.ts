export declare abstract class Glue {
    el: HTMLElement;
    isInstalled: boolean;
    abstract install(): void;
    abstract destroy(): void;
}
export declare function getEl(id: string): HTMLElement;
export declare function removeElRef(id: string): void;
export declare function installGlues(glues: Glue[]): void;
export declare function destroyGlues(glues: Glue[]): void;
