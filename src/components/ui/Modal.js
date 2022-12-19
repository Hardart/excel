import DOM from '@core/Dom'
import { delayTimeout } from '@core/helpers'
import icons from '@core/icons'
import { UIListener } from '@core/UiListener'
import { initArgs } from './components.settings'

const DEFULTS = {
  text: 'Alert text',
  status: 'danger',
  duration: 3000,
  closable: true,
  selector: '[modal-container]',
  listeners: ['click', 'transitionend'],
  title: 'Modal'
}

export default class Modal extends UIListener {
  constructor(...args) {
    super()
    initArgs.call(this, DEFULTS, args)
    this.createContainer()
    this.prepare()
    this.showModal()
  }

  prepare() {
    this.$root = DEFULTS.selector ? DOM.init(DEFULTS.selector) : DOM.body
  }

  init() {
    super.init()
  }

  console() {}

  prepareModal() {
    this.modal = DOM.create('div', 'modal', `modal-${this.status}`, 'open')
    this.modal.append(DOM.create('div', 'modal-text').append(this.text))
  }

  createContainer() {
    this.container = DOM.body.find('.modal-container')
    if (this.container) return
    this.container = DOM.create('div', 'modal-container').setAttr('modal-container')
    DOM.body.append(this.container)
  }

  async showModal() {
    this.prepareModal()
    this.container.append(this.modal)
    if (this.closable) {
      const close = DOM.create().append(icons.close).setAttr('close')
      this.modal.append(close)
    }
    await delayTimeout()
    this.modal.removeClass('open')
  }

  async close(ms = this.duration) {
    await delayTimeout(ms)
    closeAlert(this.modal)
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
