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

  init() {
    this.initListeners()
  }

  destroy() {
    this.removeListeners()
  }
}
