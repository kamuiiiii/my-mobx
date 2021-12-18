/**
 * @param obj 被代理的对象
 * @returns ： obj 的 observable 对象
 * A：指代 get 和 set 的 target 的 key 属性对应的值
 * B：globalState.event 对象，维护了一个 WeakMap<object, { [key: string]: Set<Function> }>，其中：
 *    object：对应 tartget
 *    key：对应 key
 *    Set<Function>：储存 target 对象 的 key 属性的 observer 列表
 */
export declare const observable: <T extends object>(obj?: T) => T;
/**
   * globalState.currentFn 会指向 wrapFn，wrapFn 是对应 Proxy 对象的属性的 observer。
   * 每次 autorun 内的方法执行都要设置 globalState.currentFn 收集依赖，因为 autorun 里可能存在条件逻辑，初始并不执行。
   * autorun(() => {
   *   if (store.a === 2) {
   *     console.log(store.b.c);
   *   }
   * });
   * 当初始时条件逻辑不成立，store.b 和 store.b.c 并不会触发 getter 添加对应的 observer。
   * 所以需要 wrapFn，每次 autorun 内的方法执行时都要设置 globalState.currentFn，使得延迟 observable 的 Proxy 也能绑定到 fn
   */
export declare const autorun: (fn: Function) => void;
/**
 * 1. reaction 只响应 fn 访问到的可观察属性，约定 fn 不能更改其他可观察属性
 * 2. 返回 dispose 方法，用于清除 reaction
 */
export declare const reaction: (fn: Function, sideEffect: Function) => () => void;
export declare const action: (fn: Function) => () => void;
