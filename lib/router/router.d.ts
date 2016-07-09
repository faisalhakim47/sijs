export interface IRoute {
    name: string;
    path: string;
    params: string[];
    rx: RegExp;
}
export declare class Router {
    static path: any;
    static currentRouteName: string;
    static currentParams: any;
    static currentQuery: any;
    static routes: IRoute[];
    static map(routes: any): void;
    static generateRoute(path: string): void;
}
