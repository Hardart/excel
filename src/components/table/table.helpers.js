export function canIStartResize(event) {
  return event.target.dataset.resize
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

export function cellIdToArray() {
  const str = '0:3'
  const [col, row] = str.split(':')
  return { col, row }
}
