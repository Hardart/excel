import uiComponents from '@ui/'

class UI {
  constructor() {
    this.prepare()
  }

  static init() {
    return new UI()
  }

  prepare() {
    uiComponents.forEach(Component => {
      const name = Component.name.toLowerCase()
      this[name] = (...options) => new Component(...options)
    })
  }
}

export default UI.init()
