import DOM from '@core/Dom'
import { delayTimeout } from '@core/helpers'
import icons from '@core/icons'

const DEFULTS = {
  text: 'Alert',
  status: 'danger',
  duration: 3000,
  autoClose: true,
  closable: true
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
    return DOM.create('div', 'alert', `alert-${this.status}`, 'open')
  }

  prepareAlert() {
    this.alert = this.createAlert()
    this.alert.append(DOM.create('div', 'alert-text').append(this.text))
  }

  checkContainer() {
    this.container = DOM.body.find('.alert-container')
    if (this.container) return
    this.container = DOM.create('div', 'alert-container')
    DOM.body.append(this.container)
  }

  async showAlert() {
    this.prepareAlert()
    this.container.append(this.alert)
    if (this.closable) {
      const close = DOM.create().append(icons.close).setAttr('close')
      this.alert.append(close)
      this.onClose()
    }
    await delayTimeout()
    this.alert.removeClass('open')
    if (this.autoClose) this.close()
  }

  async close(ms = this.duration) {
    await delayTimeout(ms)
    closeAlert.call(this)
  }

  onClose() {
    const btn = this.alert.find('[close]')
    const close = closeAlert.bind(this)
    btn.on('click', close)
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

function closeAlert() {
  const height = this.alert.getCoords().height
  this.alert.css({ 'margin-top': -height + 'px', opacity: '0' })
  this.alert.on('transitionend', () => {
    this.alert.delete()
    if (this.container.isEmpty) this.container.delete()
  })
}
