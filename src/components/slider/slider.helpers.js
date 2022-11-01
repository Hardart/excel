export function isDotNav(event) {
  /** @type {HTMLElement} */
  const el = event.target
  return el.getAttributeNames().includes('slide-id')
}

export function isCell(event) {
  return event.target.dataset.type == 'cell'
}

export function keyPress(event) {
  switch (event.key) {
    case 'Enter':
    case 'ArrowDown':
      event.preventDefault()
      console.log('Down')
      break
    case 'ArrowRight':
      console.log('Right')
      break
    case 'ArrowLeft':
      console.log('Left')
      break
    case 'ArrowUp':
      console.log('Up')
      break
  }
}

export function removeActiveClass(...$elems) {
  $elems.forEach(el => el.removeClass('active'))
}

export function addActiveClass(...$elems) {
  $elems.forEach(el => el.addClass('active'))
}

export function findActive(items) {
  return items.find((el, i) => (el.hasClass('active') ? i : null))
}
