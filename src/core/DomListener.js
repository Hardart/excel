import { capitalizeFirst } from '@core/helpers'
export class DOMListener {
  constructor(rootComponent, listeners = []) {
    if (!rootComponent) throw new Error('No root component passed')
    this.rootComponent = rootComponent
    this.listeners = listeners
  }

  initListeners() {
    this.listeners.forEach((listener) => {
      const method = composeEventName(listener)
      if (!this[method]) throw new Error(`Method ${method} is not define on Component ${this.title}`)
      this[method] = this[method].bind(this)
      // addEventListener
      this.rootComponent.on(listener, this[method])
    })
  }
  removeListeners() {
    this.listeners.forEach((listener) => {
      const method = composeEventName(listener)
      // addEventListener
      this.rootComponent.off(listener, this[method])
    })
  }
}

function composeEventName(event) {
  return 'on' + capitalizeFirst(event)
}
