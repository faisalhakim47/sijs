import { IElem } from './elem';
import { Observable } from '../observer/observable';
export interface IComponentClass {
    new (attrs?: any, children?: any, params?: any): Component;
}
export declare function isComponentClass(t: any): t is IComponentClass;
export declare abstract class Component {
    private attrs;
    private children;
    static _isComponentClass: boolean;
    static awaitState: PromiseLike<any>[];
    protected rawState: {};
    _isComponent: boolean;
    state: Observable;
    params: {};
    query: {};
    constructor(attrs?: any, children?: any);
    create(): IElem;
    abstract render(e: (tag, attrs, ...children) => IElem, state: Observable): IElem;
}
export interface Component {
    created?: () => void;
    ready?: () => void;
}
