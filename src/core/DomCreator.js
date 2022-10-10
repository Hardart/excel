class DOMCreator {
  constructor(selector) {}
}

// function for easy dom manipulations
export default function $(selector) {
  return new DOMCreator(selector)
}

$.create = (tagName = 'div', classes = '') => {
  const el = document.createElement(tagName)
  if (classes) el.classList.add(classes)
  return el
}
