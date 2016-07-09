import { ObsGetter } from './observable';
import { ObsArray } from './observable-array';
export declare function dependsOn(deps: (ObsGetter | ObsArray)[], fn: any): () => void;
