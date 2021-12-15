import { Event, Target } from './event'

class GlobalState {
  public currentFn: null | Function = null // 记录当前执行的函数
  public disposes: Array<Function> = [] // 记录释放 reaction 的 track 的 callback 的 dispose 数组
  public event = new Event // 订阅发布模型 Event 实例
  public batchDeep = 0 // 记录 action 调用栈深度
  /**
   * batch 模式下，同一个 Target 的多次 set 行为只会触发一次同一个 callback
   * Target：observable 对象
   * Set<Function>：储存该 observable 的所有可观察属性的 callback 
   */
  public batchEventQueue = new Map<Target, Set<Function>>()

  // 设置 target 的回调函数 fn
  public saveBatchEvent(target: Target, fn: Function) {
    if (!this.batchEventQueue.has(target)) {
      this.batchEventQueue.set(target, new Set())
    }
    const set = this.batchEventQueue.get(target)
    set.add(fn)
  }

  // 执行所有 observable 的 set 列表储存的所有回调函数
  public triggerBatchEvent() {
    this.batchEventQueue.forEach((set, target, batchEventQueue) => {
      if (set.size) {
        set.forEach(fn => fn())
      }
      batchEventQueue.delete(target)
    })
  }
}

export const globalState = new GlobalState()