import { DOMListener } from '@core/DomListener'

export class ExcelComponent extends DOMListener {
  constructor($rootComponent, options = {}) {
    super($rootComponent, options.listeners)
  }
  static get rootClasses() {
    return [`${this.name.toLowerCase()}`, 'container']
  }

  toHTML() {
    return `<h1>${this.constructor.name}</h1>`
  }

  init() {
    this.initListeners()
  }
}
