import DOM from '@core/DomCreator'
import { ExcelComponent } from '@core/ExcelComponent'
import createTable from '@/components/table/table.settings'

const options = {
  title: 'Table',
  listeners: ['mousedown'],
  section: true,
  sectionClasses: ['section', 'section-collapse', 'h-l', 'overflow-h'],
}

export class Table extends ExcelComponent {
  constructor(rootComponent) {
    super(rootComponent, options)
  }

  static get sectionClasses() {
    if (!options.section) return null
    return options.sectionClasses
  }

  toHTML() {
    return createTable(20)
  }

  // events
  onMousedown(event) {
    if (!event.target.dataset.resize) return
    const resize = DOM.init(event.target)
    const type = resize.attrsData.resize
    const parent = resize.closest('[data-element="resizable"')
    const coords = parent.getCoords()
    const resizeCoords = resize.getCoords()
    const cells = this.rootComponent.findAll(`[data-col="${parent.attrsData.col}"]`)
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

    document.onmouseup = (e) => {
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
}
