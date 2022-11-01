import { isArray, isString } from './helpers'

export default class DOM {
  /**
   *
   * @param {string | Node} selector
   */
  constructor(selector) {
    this.$node = typeof selector === 'string' ? document.querySelector(selector) : selector
  }
  /**
   *
   * @param {string | Node} selector
   */
  static init(selector) {
    return new DOM(selector)
  }
  /**
   *
   * @param {keyof HTMLElementTagNameMap} tagName
   * @param  {...string} classes
   * @returns
   */
  static create = (tagName = 'div', ...classes) => {
    const el = document.createElement(tagName)
    if (classes[0]) {
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

  addClass(classes = null) {
    if (!classes) return
    if (isString(classes)) classes = classes.split(',').map(el => el.trim())
    this.$node.classList.add(...classes)
  }

  hasClass(prop = null) {
    if (!prop) return
    if (!isString(prop)) return
    return this.$node.classList.contains(prop)
  }

  removeClass(classes = null) {
    if (!classes) return
    if (typeof classes === 'string') classes = [classes]
    this.$node.classList.remove(...classes)
    return this
  }

  find(selector) {
    return DOM.init(this.$node.querySelector(selector))
  }

  findAll(selector) {
    return Array.from(this.$node.querySelectorAll(selector)).map(el => DOM.init(el))
  }

  findPrev() {
    return DOM.init(this.$node.previousSibling)
  }
  /**
   *
   * @param {CSSStyleDeclaration} styles
   * @returns {DOM}
   */
  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$node.style[key] = styles[key]
    })
    return this
  }

  removeCss(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$node.style.removeProperty(transformStyleString(key))
    })
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
    return this.$node.getAttribute(attributeName)
  }
}

function transformStyleString(str) {
  return str
    .split('')
    .map(l => (l.match(/[A-Z]/g) ? `-${l.toLowerCase()}` : l))
    .join('')
}
