import { globalState } from "./global-state";

type EventMap = { [propName: string]: Set<Function> }
export type Target = object

export class Event {
  /**
   * proxies：weakMap 对象
   * Target：observable 对象
   * EventMap：储存该 observable 的所有可观察属性的 callback 
   */
  private proxies = new WeakMap<Target, EventMap>();

  on(target: Target, key: string, fn: Function) {
    if (!this.proxies.has(target)) {
      this.proxies.set(target, {});
    }
    const eventMap = this.proxies.get(target)
    // 如果 map[key] 不存在，则赋值新 Set 对象
    eventMap[key] = eventMap[key] || new Set()
    const fns = eventMap[key];
    fns.add(fn);
  }

  trigger(target: Target, key: string) {
    const eventMap = this.proxies.get(target)
    if (!eventMap) return
    const fns = eventMap[key];
    if (!fns || !fns.size) return
    fns.forEach(fn => {
      // 如果开启了 batch 模式（ action 调用栈深度不为 0），调用 saveBatchEvent 将 fn 储存起来，否则直接执行。
      if (globalState.batchDeep !== 0) {
        globalState.saveBatchEvent(target, fn)
      } else {
        fn()
      }
    });
  }

  off(target: Target, key: string, fn: Function) {
    const eventMap = this.proxies.get(target);
    const fns = eventMap[key];
    fns.delete(fn);
  }

  clear(target: Target, key: string) {
    const eventMap = this.proxies.get(target);
    eventMap[key].clear()
  }
}