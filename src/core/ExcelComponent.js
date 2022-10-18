import { DOMListener } from '@core/DomListener'

export class ExcelComponent extends DOMListener {
  constructor(rootComponent, options = {}) {
    super(rootComponent, options.listeners)
    this.title = options.title || ''
  }

  static get rootClasses() {
    return [`${this.name.toLowerCase()}`, 'px-20']
  }

  toHTML() {
    return `<h1>${this.constructor.name}</h1>`
  }

  prepare() {
    console.log('prepare')
  }

  init() {
    this.initListeners()
  }

  destroy() {
    this.removeListeners()
  }

  throttle(callback, delay, options) {
    const { noTrailing = false } = options || {}

    let timeoutID
    let lastExec = 0

    function clearExistingTimeout() {
      if (timeoutID) {
        clearTimeout(timeoutID)
      }
    }

    function wrapper(...arguments_) {
      const self = this
      const elapsed = Date.now() - lastExec

      async function exec() {
        lastExec = Date.now()
        await callback.apply(self, arguments_)
      }
      clearExistingTimeout()
      if (elapsed > delay) {
        exec()
      } else if (noTrailing !== true) {
        timeoutID = setTimeout(exec, delay)
      }
    }

    return wrapper
  }
}
