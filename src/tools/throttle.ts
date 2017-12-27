export function throttle<T>(fn: T, duration = 100): T {
  let isThrotted = false
  let pendingFunc = null
  let lastValue = null
  function throttledFn(...args) {
    if (isThrotted) {
      pendingFunc = () => {
        return throttledFn.apply(this, args)
      }
      return lastValue
    }
    isThrotted = true
    setTimeout(() => {
      isThrotted = false
      if (typeof pendingFunc === 'function') {
        pendingFunc()
      }
      pendingFunc = false
    }, duration)
    return lastValue = (fn as any).apply(this, args)
  }
  return throttledFn as any
}

export function frameThrottle<T>(fn: T, duration = 100): T {
  let isThrotted = false
  let pendingFunc = null
  let lastValue = null
  function throttledFn(...args) {
    if (isThrotted) {
      pendingFunc = () => {
        return throttledFn.apply(this, args)
      }
      return lastValue
    }
    isThrotted = true
    requestAnimationFrame(() => {
      isThrotted = false
      if (typeof pendingFunc === 'function') {
        pendingFunc()
      }
      pendingFunc = false
    })
    return lastValue = (fn as any).apply(this, args)
  }
  return throttledFn as any
}


window['throttle'] = throttle
window['frameThrottle'] = frameThrottle
