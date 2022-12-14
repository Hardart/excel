import { capitalizeFirst } from '@core/helpers'

export class UIListener {
  constructor() {}
  initListeners() {
    this.listeners.forEach(listener => {
      const method = composeEventName(listener)
      if (!this[method]) throw new Error(`Method ${method} is not define on ${this.title} Component `)
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }
  removeListeners() {
    this.listeners.forEach(listener => {
      const method = composeEventName(listener)
      this.$root.off(listener, this[method])
    })
  }

  init() {
    this.initListeners()
  }

  destroy() {
    this.removeListeners()
  }
}

function composeEventName(event) {
  return 'on' + capitalizeFirst(event)
}
