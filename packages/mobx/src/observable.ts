import { globalState } from './global-state'
import { isObject } from './utils'

/**
 * @param obj 被代理的对象
 * @returns ： obj 的 observable 对象
 * A：指代 get 和 set 的 target 的 key 属性对应的值
 * B：globalState.event 对象，维护了一个 WeakMap<object, { [key: string]: Set<Function> }>，其中：
 *    object：对应 tartget
 *    key：对应 key
 *    Set<Function>：储存 target 对象 的 key 属性的 observer 列表
 */
export const observable = <T extends object>(obj: T = {} as T): T => {
  return new Proxy(obj, {
    get: (target, key, receiver) => {
      const currentFn = globalState.currentFn
      if (currentFn) {
        globalState.event.on(target, key as string, currentFn)
        globalState.disposes.push(() => {
          globalState.event.off(target, key as string, currentFn)
        })
      }

      // 惰性代理：如果 A 是个对象，处理成可观察对象并返回；否则直接返回值 A
      if (isObject(target[key])) return observable(target[key])
      return Reflect.get(target, key, receiver)
    },
    set: (target, key, value, receiver) => {
      // 如果 set 的值相同，直接 return true；否则根据 target 和 key 执行对应的 observer 列表
      if (target[key] === value) return true
      const result = Reflect.set(target, key, value, receiver)
      globalState.event.trigger(target, key as string)
      return result
    },
    deleteProperty: (target, key) => {
      // 删除属性时根据 target 和 key 清空对应的 observer 列表
      globalState.event.clear(target, key as string)
      return Reflect.deleteProperty(target, key)
    }
  })
}

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
export const autorun = (fn: Function) => {
  const wrapFn = () => {
    globalState.currentFn = wrapFn
    fn()
    globalState.currentFn = null
  }
  wrapFn()
}

/**
 * 1. reaction 只响应 fn 访问到的可观察属性，约定 fn 不能更改其他可观察属性
 * 2. 返回 dispose 方法，用于清除 reaction
 */
export const reaction = (fn: Function, sideEffect: Function) => {
  const value: { old?: any } = {}
  globalState.currentFn = (newValue: any) => sideEffect(newValue, value.old)
  value.old = fn()
  globalState.currentFn = null
  const disposes = globalState.disposes
  const dispose = () => {
    disposes.forEach(d => d())
  };
  globalState.disposes = []
  return dispose;
}

export const action = (fn: Function) => {
  return () => {
    globalState.batchDeep++
    fn()
    globalState.batchDeep--
    // 当调用栈深度为 0 时，调用 triggerBatchEvent 方法
    if (globalState.batchDeep === 0) {
      globalState.triggerBatchEvent()
    }
  }
}