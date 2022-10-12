import DOM from '@core/DomCreator'

export default class Excel {
  constructor(selector, options) {
    this.$app = DOM.init(selector)
    this.components = options.components || []
    this.baseClass = options.baseClass || 'excel'
  }

  static create(selector, options) {
    return new Excel(selector, options)
  }

  componentsCompose() {
    const $rootElement = DOM.create('div', this.baseClass)
    this.components = this.components.map((Component) => {
      const $section = DOM.create('section', Component.sectionClasses)
      const $element = DOM.create('div', Component.rootClasses)
      const component = new Component($element)
      // DEBUG
      if (component.title) window['c' + component.title] = component
      //
      $element.html(component.toHTML())
      $section.append($element)
      $rootElement.append($section)
      return component
    })
    return $rootElement
  }

  render() {
    this.$app.append(this.componentsCompose())
    this.components.forEach((component) => component.init())
  }
}
