import uiComponents from '@ui/'
class UI {
  constructor() {
    this.prepare()
  }

  static init() {
    return new UI()
  }

  static onlyOptions() {
    return ['alert']
  }

  prepare() {
    uiComponents.forEach(Component => {
      const name = Component.name.toLowerCase()
      if (UI.onlyOptions().includes(this[name])) {
        this[name] = (...options) => new Component(...options)
      } else {
        this[name] = (rootComponent = 'body', ...options) => new Component(rootComponent, ...options)
      }
    })
  }
}

export default UI.init()
