import { isArray, isString } from './helpers'

export default class DOM {
  constructor(selector) {
    this.$node = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  static init(selector) {
    return new DOM(selector)
  }

  static create = (tagName = 'div', ...classes) => {
    const el = document.createElement(tagName)
    if (classes) {
      if (isArray(classes[0])) classes = classes.flat(1)
      el.classList.add(...classes)
    }
    return this.init(el)
  }

  html(htmlString) {
    if (typeof htmlString !== 'string') return this.$node.outerHTML.trim()
    this.$node.innerHTML = htmlString
    return this
  }

  clear() {
    this.html('')
    return this
  }

  append(element) {
    if (element instanceof DOM) element = element.$node
    if (Element.prototype.append) {
      this.$node.append(element)
    } else {
      this.$node.appendChild(element)
    }
    return this
  }

  on(event, cb) {
    this.$node.addEventListener(event, cb)
  }

  off(event, cb) {
    this.$node.removeEventListener(event, cb)
  }

  getCoords() {
    return this.$node.getBoundingClientRect()
  }

  closest(selector) {
    return DOM.init(this.$node.closest(selector))
  }

  add(classes = null) {
    if (!classes) return
    if (isString(classes)) classes = classes.split(',').map((el) => el.trim())
    this.$node.classList.add(...classes)
  }

  has(prop = null) {
    if (!prop) return
    if (!isString(prop)) return
    return this.$node.classList.contains(prop)
  }

  remove(classes = null) {
    if (!classes) return
    if (typeof classes === 'string') classes = [classes]
    this.$node.classList.remove(...classes)
  }

  find(selector) {
    return DOM.init(this.$node.querySelector(selector))
  }

  findAll(selector) {
    return Array.from(this.$node.querySelectorAll(selector)).map((el) => DOM.init(el))
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$node.style[key] = styles[key]
    })
  }

  removeCss(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$node.style.removeProperty(transformStyle(key))
    })
  }

  get attrsData() {
    return this.$node.dataset
  }
}

function transformStyle(str) {
  return str
      .split('')
      .map((l) => (l.match(/[A-Z]/g) ? `-${l.toLowerCase()}` : l))
      .join('')
}
