import DOM from '@core/Dom'
import { delayTimeout } from '@core/helpers'
import icons from '@core/icons'
import { UIListener } from '@core/UiListener'
import { initArgs } from './components.settings'

const DEFULTS = {
  text: 'Alert text',
  status: 'danger',
  duration: 3000,
  autoClose: true,
  closable: true,
  selector: '[alert-container]',
  listeners: ['click', 'transitionend'],
  title: 'Alert'
}

export default class Alert extends UIListener {
  constructor(...args) {
    super()
    initArgs.call(this, DEFULTS, args)
    this.createContainer()
    this.prepare()
    this.init()
    this.showAlert()
  }

  prepare() {
    this.$root = DEFULTS.selector ? DOM.init(DEFULTS.selector) : DOM.body
  }

  init() {
    super.init()
  }

  console() {}

  prepareAlert() {
    this.alert = DOM.create('div', 'alert', `alert-${this.status}`, 'open')
    this.alert.append(DOM.create('div', 'alert-text').append(this.text))
  }

  createContainer() {
    this.container = DOM.body.find('.alert-container')
    if (this.container) return
    this.container = DOM.create('div', 'alert-container').setAttr('alert-container')
    DOM.body.append(this.container)
  }

  async showAlert() {
    this.prepareAlert()
    this.container.append(this.alert)
    if (this.closable) {
      const close = DOM.create().append(icons.close).setAttr('close')
      this.alert.append(close)
    }
    await delayTimeout()
    this.alert.removeClass('open')
    if (this.autoClose) this.close()
  }

  async close(ms = this.duration) {
    await delayTimeout(ms)
    closeAlert(this.alert)
  }

  onClick(event) {
    const $target = DOM.init(event.target)
    if ($target.closest('[close]')) {
      const alert = $target.closest('.alert')
      closeAlert(alert)
    }
  }

  onTransitionend(event) {
    if (event.target.hasAttribute('style')) event.target.remove()
    if (this.container.isEmpty) {
      this.container.delete()
      this.destroy()
    }
  }
}

function closeAlert($el) {
  const height = $el.getCoords().height
  $el.css({ 'margin-top': -height + 'px', opacity: '0' })
}
