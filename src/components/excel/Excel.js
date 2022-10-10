import $ from '@core/DomCreator'

export default class Excel {
  constructor(selector, options) {
    this.$app = $(selector)
    this.components = options.components || []
    this.baseClass = options.baseClass || 'excel'
  }

  static create(selector, options) {
    return new Excel(selector, options)
  }

  getRoot() {
    const $rootElement = $.create('div', this.baseClass)
    this.components = this.components.map((Component) => {
      const $section = $.create('section', Component.sectionClasses)
      const $element = $.create('div', Component.rootClasses)
      const component = new Component($element)
      $element.html(component.toHTML())
      $section.append($element)
      $rootElement.append($section)
      return component
    })
    return $rootElement
  }

  render() {
    this.$app.append(this.getRoot())
    console.log(this.components)
  }
}
