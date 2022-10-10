import { DOMListener } from '@core/DomListener'

export class ExcelComponent extends DOMListener {
  constructor($rootComponent) {
    super($rootComponent)
  }
  static baseClass = 'excel'

  static get componentClass() {
    return `${this.baseClass}__${this.name.toLowerCase()}`
  }

  toHTML() {
    return `<h1>${this.constructor.name}</h1>`
  }
}
