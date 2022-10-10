export default class Excel {
  constructor(selector, options) {
    this.$rootEl = document.querySelector(selector)
    this.components = options.components || []
  }

  toHTML() {
    this
  }

  static create(selector, options) {
    return new Excel(selector, options)
  }
}
