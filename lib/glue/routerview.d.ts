import { Glue } from './glue';
import { RouterView } from '../compiler/elem-routerview';
export declare class RouterViewGlue extends Glue {
    id: string;
    private rv;
    constructor(id: string, rv: RouterView);
    install(): void;
    destroy(): void;
}
