import $ from '@core/DomCreator'

export default class Excel {
  constructor(selector, options) {
    this.$app = document.querySelector(selector)
    this.components = options.components || []
  }

  static create(selector, options) {
    return new Excel(selector, options)
  }

  getRoot() {
    const $rootElement = $.create('div', `${this.components[0].baseClass}`)
    this.components.forEach((Component) => {
      const $element = $.create('div', `${Component.componentClass}`)
      const component = new Component($element)
      $element.insertAdjacentHTML('beforeend', component.toHTML())
      $rootElement.insertAdjacentElement('beforeend', $element)
    })
    return $rootElement
  }

  render() {
    this.$app.append(this.getRoot())
  }
}
