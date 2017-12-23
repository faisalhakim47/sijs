export function throttle(fn: Function, duration: number = 100) {
  let isThrotted = false
  let pendingFunc = null
  function throttledFunc(...args) {
    if (isThrotted) {
      pendingFunc = () => {
        return throttledFunc.apply(this, args)
      }
    }
    isThrotted = true
    setTimeout(() => {
      isThrotted = false
      if (typeof pendingFunc === 'function') {
        pendingFunc()
      }
      pendingFunc = null
    }, duration)
    fn.apply(this, args)
  }
  return throttledFunc
}

export function frameThrottle(fn: Function) {
  let isThrotted = false
  let pendingFunc = null
  
  function throttledFn(...args) {
    if (isThrotted)
      pendingFunc = () => throttledFn.apply(this, args)

    isThrotted = true

    requestAnimationFrame(() => {
      isThrotted = false
      if (typeof pendingFunc === 'function')
        pendingFunc()
      pendingFunc = null
    })

    fn.apply(this, args)
  }

  return throttledFn
}
