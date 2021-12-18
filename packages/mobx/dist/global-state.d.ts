import { Event, Target } from './event';
declare class GlobalState {
    currentFn: null | Function;
    disposes: Array<Function>;
    event: Event;
    batchDeep: number;
    /**
     * batch 模式下，同一个 Target 的多次 set 行为只会触发一次同一个 callback
     * Target：observable 对象
     * Set<Function>：储存该 observable 的所有可观察属性的 callback
     */
    batchEventQueue: Map<object, Set<Function>>;
    saveBatchEvent(target: Target, fn: Function): void;
    triggerBatchEvent(): void;
}
export declare const globalState: GlobalState;
export {};
