export default class DOM {
  constructor(selector) {
    this.$node = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  static init(selector) {
    return new DOM(selector)
  }

  static create = (tagName = 'div', classes = null) => {
    const el = document.createElement(tagName)
    if (classes) {
      if (typeof classes === 'string') classes = [classes]
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
}
