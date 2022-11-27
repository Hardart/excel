import DOM from '@core/Dom'
import { delayTimeout } from '@core/helpers'

const DEFULTS = {
  text: 'Alert',
  status: 'danger',
  duration: 5000,
  autoClose: true
}

export default class Alert {
  constructor(...args) {
    initArgs.call(this, args)
    this.checkContainer()
    this.showAlert()
  }

  console() {
    console.log(this.duration)
  }

  createAlert() {
    return DOM.create('div', 'alert')
  }

  initAlert() {
    this.alert = this.createAlert()
    this.alert.addClass(`alert-${this.status}`)
    this.alert.html(this.text)
  }

  checkContainer() {
    this.container = DOM.body.find('.alert-container')
    if (this.container) return
    this.container = DOM.create('div', 'alert-container')
    DOM.body.append(this.container)
  }

  showAlert() {
    this.initAlert()
    this.container.append(this.alert)
    if (this.autoClose) this.close()
  }

  async close(ms = this.duration) {
    await delayTimeout(ms)
    this.alert.delete()
  }
}

function keyToMethod(options) {
  Object.entries(options).forEach(([key, value]) => {
    this[key] = value
  })
}

function initArgs(args) {
  if (typeof args[0] == 'object') return keyToMethod.call(this, { ...DEFULTS, ...args[0] })
  const options = {}
  args.forEach(initOptions(options))
  keyToMethod.call(this, { ...DEFULTS, ...options })
}

function initOptions(options) {
  const keys = Object.keys(DEFULTS)
  return function (option, i) {
    const key = keys[i]
    options[key] = option
  }
}
