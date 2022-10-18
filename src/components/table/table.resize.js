import DOM from '@core/DomCreator'

export function resizeHandler($root, event) {
  const resize = DOM.init(event.target)
  const type = resize.attrsData.resize
  const parent = resize.closest('[data-element="resizable"')
  const coords = parent.getCoords()
  const resizeCoords = resize.getCoords()
  const cells = $root.findAll(`[data-col="${parent.attrsData.col}"]`)
  let value

  document.onmousemove = (e) => {
    resize.add(['resizing'])
    const deltaX = coords.width + (e.pageX - coords.right) + 2
    const deltaY = coords.height + (e.pageY - coords.bottom) + 2
    const posX = resizeCoords.right - resizeCoords.width - e.pageX
    const posY = resizeCoords.bottom - resizeCoords.height - e.pageY
    value = type == 'col' ? deltaX : deltaY
    type == 'col' ? resize.css({ right: posX + 'px' }) : resize.css({ bottom: posY + 'px' })
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    resize.remove('resizing')

    if (type == 'col') {
      cells.forEach((cell) => cell.css({ width: value + 'px' }))
      resize.css({ right: '-2px' })
    } else {
      parent.css({ height: value + 'px' })
      resize.css({ bottom: 0 })
    }
  }
}
