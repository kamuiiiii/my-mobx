import { Event, Target } from './event'

class GlobalState {
  public currentFn: null | Function = null // 记录当前执行的函数
  public disposes: Array<Function> = [] // 记录释放 reaction 的 track 的 callback 的 dispose 数组
  public event = new Event // 订阅发布模型 Event 实例
  public batchDeep = 0 // 记录 action 调用栈深度
  /**
   * 使用 action 调用栈且深度不为 0 时，同一个 Target 的多次 set 行为只会触发一次同一个 callback
   * Target：observable 对象
   * Set<Function>：储存该 observable 的所有可观察属性的 callback 
   */
  public batchEventSet = new Map<Target, Set<Function>>()
  // 储存 callback 对应的 new value 的 map
  public callbackMap = new Map<Function, any>()

  // 设置 target 的回调函数 fn
  public saveBatchEvent(target: Target, fn: Function, value: any) {
    if (!this.batchEventSet.has(target)) {
      this.batchEventSet.set(target, new Set())
    }
    const set = this.batchEventSet.get(target)
    set.add(fn)
    this.callbackMap.set(fn, value)
  }

  // 执行所有 observable 的 set 列表储存的所有回调函数
  public triggerBatchEvent() {
    this.batchEventSet.forEach((set, target, batchEventQueue) => {
      if (set.size) {
        set.forEach(fn => {
          const value = this.callbackMap.get(fn)
          fn(value)
        })
      }
      batchEventQueue.delete(target)
    })
  }
}

export const globalState = new GlobalState()