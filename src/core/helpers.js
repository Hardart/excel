export function capitalizeFirst(event) {
  if (typeof event !== 'string') return
  return event.trim().charAt(0).toUpperCase() + event.substring(1)
}

export function setupAlphabetCodes() {
  const alphabet = {}
  for (let i = 65; i < 123; i++) {
    // console.log(`Code of letter ${String.fromCharCode(i)} is ${i}`)
    alphabet[String.fromCharCode(i)] = i
  }
  return alphabet
}

export function isArray(element) {
  return Array.isArray(element)
}

export function isString(str) {
  return typeof str === 'string'
}

export async function delayTimeout(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function setIconsSize() {
  const elems = document.querySelectorAll('[icon]')
  elems.forEach(setElementSize)
}

export function setElementSize(el) {
  const params = el.getAttribute('icon')
  const ratio = parseCssStyle(params).ratio
  const svg = el.children[0]
  if (svg.tagName === 'svg') changeWidthHeight(svg, ratio)
}

function changeWidthHeight(svg, ratio) {
  const width = svg.clientWidth * ratio
  svg.setAttribute('width', `${width}`)
  svg.setAttribute('height', `${width}`)
}

function parseCssStyle(string) {
  return JSON.parse(`{${string.split(':').map(addDoubleQuote).join(':')}}`)
}

function addDoubleQuote(el, i) {
  if (2 % i !== 0) return '"' + el + '"'
  return el.trim()
}
