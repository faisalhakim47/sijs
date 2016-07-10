import { IComponentClass } from '../compiler/component';
import { IElem } from '../compiler/elem';
export interface IRoute {
    name: string;
    path: string;
    params: string[];
    rx: RegExp;
}
export declare class Router {
    Component: IComponentClass;
    static currentRouteName: string;
    static currentParams: any;
    static currentQuery: string;
    static path: string;
    routes: IRoute[];
    constructor(Component: IComponentClass, routes: any);
    generateRoute(path?: string): void;
    generateElem(path?: string): IElem;
}
