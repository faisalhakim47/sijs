import { Observable, ObsGetter } from './observable';
import { ObsArray } from './observable-array';
export declare function compute(deps: (ObsGetter | ObsArray)[], computeFn: any): Observable;
