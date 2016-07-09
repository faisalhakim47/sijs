import { IComponentClass } from './component';
import { IElem } from './elem';
export interface IRouteView {
    name: string;
    Component: IComponentClass;
}
export declare class RouterView {
    routes: IRouteView[];
    register({name}: {
        name: any;
    }): (constructor: IComponentClass) => void;
    Elem(): IElem;
}
