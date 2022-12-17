import DOM from '@core/Dom'
import { delayTimeout } from '@core/helpers'
import icons from '@core/icons'
import { initArgs, closeAlert } from './alert.settings'

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
    this.alert = DOM.create('div', 'alert', `alert-${this.status}`, 'open')
    this.alert.append(DOM.create('div', 'alert-text').append(this.text))
  }

  checkContainer() {
    this.container = DOM.body.find('.alert-container')
    if (this.container) return
    this.container = DOM.create('div', 'alert-container')
    DOM.body.append(this.container)
  }

  async showAlert() {
    this.createAlert()
    this.container.append(this.alert)
    this.onClose()
    await delayTimeout()
    this.alert.removeClass('open')
    if (this.autoClose) this.close()
  }

  async close(ms = this.duration) {
    await delayTimeout(ms)
    closeAlert.call(this)
  }

  onClose() {
    if (!this.closable) return
    const close = DOM.create().append(icons.close).setAttr('close')
    this.alert.append(close)
    this.closeAlert = closeAlert.bind(this)
    this.alert.on('click', this.closeAlert)
  }
}
