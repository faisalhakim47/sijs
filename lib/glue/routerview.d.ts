import { Glue } from './glue';
import { RouterView } from '../compiler/elem-routerview';
export declare class RouterViewGlue extends Glue {
    private id;
    private rv;
    private activeGlues;
    constructor(id: string, rv: RouterView, activeGlues: Glue[]);
    install(): void;
    destroy(): void;
    routeWatcher(): void;
}
