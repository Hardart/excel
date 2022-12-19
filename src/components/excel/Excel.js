import DOM from '@core/Dom'
import { setIconsSize } from '@core/helpers'
import UI from '@core/UI'
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
    this.components = this.components.map(Component => {
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
    this.components.forEach(component => component.init())
    setIconsSize()
    UI.pagination('.excel', { currentPage: 10, totalPages: 5000 })
    UI.modal(
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus veniam ut autem, rem commodi saepe harum itaque dignissimos laudantium iste, soluta voluptatibus facere incidunt vitae similique sit corrupti ducimus nostrum.'
    )
  }
}
