class DOMCreator {
  constructor(selector) {
    this.$node = typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(htmlString) {
    if (typeof htmlString !== 'string') return this.$node.outerHtml
    this.$node.innerHTML = htmlString
    return this
  }

  clear() {
    this.html('')
    return this
  }

  append(element) {
    if (element instanceof DOMCreator) element = element.$node
    if (Element.prototype.append) {
      this.$node.append(element)
    } else {
      this.$node.appendChild(element)
    }
    return this
  }
}

// function for easy dom manipulations
export default function $(selector) {
  return new DOMCreator(selector)
}

$.create = (tagName = 'div', classes = ['']) => {
  const el = document.createElement(tagName)
  if (classes) {
    if (typeof classes === 'string') classes = [classes]
    el.classList.add(...classes)
  }
  return $(el)
}
