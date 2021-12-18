export declare type Target = object;
export declare class Event {
    /**
     * proxies：weakMap 对象
     * Target：observable 对象
     * EventMap：储存该 observable 的所有可观察属性的 callback
     */
    private proxies;
    on(target: Target, key: string, fn: Function): void;
    trigger(target: Target, key: string): void;
    off(target: Target, key: string, fn: Function): void;
    clear(target: Target, key: string): void;
}
