const DEFULTS = {
  text: 'default text',
  status: 'danger',
  duration: 5000,
  autoClose: false,
  closable: true
}

function initOptions(options) {
  const keys = Object.keys(DEFULTS)
  return function (option, i) {
    const key = keys[i]
    options[key] = option
  }
}

function keyToMethod(options) {
  Object.entries(options).forEach(([key, value]) => {
    this[key] = value
  })
}

export function initArgs(args) {
  if (typeof args[0] == 'object') return keyToMethod.call(this, { ...DEFULTS, ...args[0] })
  const options = {}
  args.forEach(initOptions(options, DEFULTS))
  keyToMethod.call(this, { ...DEFULTS, ...options })
}

export function closeAlert(e) {
  const target = e.target
  if (!target.closest('[close]')) return
  const height = this.alert.getCoords().height
  this.alert.css({ 'margin-top': -height + 'px', opacity: '0' })
  this.transitionend = onTransitionEnd.bind(this)
  this.alert.on('transitionend', this.transitionend)
}

function onTransitionEnd() {
  this.alert.off('transitionend', this.transitionend)
  this.alert.off('click', this.closeAlert)
  this.alert.delete()
  if (this.container.isEmpty) this.container.delete()
}
