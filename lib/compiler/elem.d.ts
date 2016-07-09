import { IComponentClass } from './component';
import { RouterView } from './elem-routerview';
import { Glue } from '../glue/glue';
import { ObsGetter } from '../observer/observable';
export interface IElem {
    id: string;
    _isElm: boolean;
    template: string;
    glues: Glue[];
}
export declare function isElem(t: any): t is IElem;
export declare function createElem(tag: string | IComponentClass, attrs: any, ...children: (string | ObsGetter | IElem | RouterView)[]): IElem;
