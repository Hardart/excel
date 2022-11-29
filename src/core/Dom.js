import { isArray, isString } from './helpers.js'

export default class DOM {
  constructor(selector) {
    this.$node = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  static init(selector) {
    return new DOM(selector)
  }

  static create = (tagName = 'div', ...classes) => {
    const el = document.createElement(tagName)
    if (classes[0]) {
      if (isArray(classes[0])) classes = classes.flat(1)
      el.classList.add(...classes)
    }
    return this.init(el)
  }

  static get body() {
    return this.init(document.body)
  }

  static stopScroll() {
    this.body.addClass('overflow-h')
  }

  scroll() {
    this.$node.classList.remove('overflow-h')
  }

  stopScroll() {
    this.$node.classList.add('overflow-h')
  }

  static scroll() {
    this.body.clearClass()
  }

  html(htmlString) {
    if (typeof htmlString !== 'string') return this.$node.outerHTML.trim()
    this.$node.innerHTML = htmlString
    return this
  }

  delete() {
    this.$node.remove()
    return this
  }

  clear() {
    this.html('')
    return this
  }

  append(element, where = 'beforeend') {
    if (!element) return
    if (element instanceof DOM) element = element.$node
    if (typeof element == 'string') {
      this.$node.insertAdjacentHTML(where, element)
    } else {
      this.$node.insertAdjacentElement(where, element)
    }
    return this
  }

  on(event, cb) {
    this.$node.addEventListener(event, cb)
    return this
  }

  off(event, cb) {
    this.$node.removeEventListener(event, cb)
    return this
  }

  getCoords() {
    return this.$node.getBoundingClientRect()
  }

  closest(selector) {
    return DOM.init(this.$node.closest(selector))
  }

  addClass(classes) {
    if (isString(classes)) classes = classes.split(',').map((/** @type {string} */ el) => el.trim())
    this.$node.classList.add(...classes)
  }

  toggle(className) {
    this.$node.classList.toggle(className)
  }

  hasClass(prop) {
    if (!isString(prop)) return
    return this.$node.classList.contains(prop)
  }

  removeClass(classes) {
    if (typeof classes === 'string') classes = [classes]
    this.$node.classList.remove(...classes)
    return this
  }

  find(selector) {
    const $el = this.$node.querySelector(selector)
    if (!$el) return null
    return DOM.init($el)
  }

  findAll(selector) {
    return Array.from(this.$node.querySelectorAll(selector)).map(el => DOM.init(el))
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$node.style.setProperty(key, styles[key])
    })
    return this
  }

  removeCss(styles = {}) {
    if (typeof styles == 'string') {
      this.$node.style.removeProperty(styles)
    } else {
      Object.keys(styles).forEach(key => {
        this.$node.style.removeProperty(transformStyleString(key))
      })
    }
  }

  clearClass() {
    this.$node.removeAttribute('class')
  }

  clearCss() {
    this.$node.removeAttribute('style')
  }

  idData(isParce) {
    if (!isParce) return this.$node.dataset.id
    const [col, row] = this.idData().split(':')
    return { col: Number(col), row: Number(row) }
  }

  get attrsData() {
    return this.$node.dataset
  }

  getAttr(attributeName) {
    if (!this.$node) return
    return this.$node.getAttribute(attributeName)
  }

  setAttr(attributeName, attributeValue) {
    this.$node.setAttribute(attributeName, attributeValue ? attributeValue : '')
    return this
  }

  removeAttr(attributeName) {
    this.$node.removeAttribute(attributeName)
    return this
  }

  focus() {
    this.$node.focus()
    return this
  }

  blur() {
    this.$node.blur()
    return this
  }

  value(value) {
    if (!('value' in this.$node)) return
    if (!value && value !== '') return this.$node.value.trim()
    this.$node.value = value
    return this
  }

  get isEmpty() {
    if (this.$node.children[0]) return false
    return true
  }
}

function transformStyleString(str) {
  return str
    .split('')
    .map((/** @type {string} */ l) => (l.match(/[A-Z]/g) ? `-${l.toLowerCase()}` : l))
    .join('')
}
