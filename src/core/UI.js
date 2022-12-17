import uiComponents from '../components/ui/index'

class UiHdrt {
  constructor() {
    this.prepare()
  }

  static init() {
    return new UiHdrt()
  }

  prepare() {
    uiComponents.forEach(Component => {
      const name = Component.name.toLowerCase()
      this[name] = (...options) => new Component(...options)
    })
  }
}

export default UiHdrt.init()
