import { ExcelComponent } from '@core/ExcelComponent'
import createTable from '@/components/table/table.settings'
import { resizeHandler } from './table.resize'
import { canIStartResize } from './table.helpers'

const options = {
  title: 'Table',
  listeners: ['mousedown', 'input', 'keydown'],
  section: true,
  sectionClasses: ['section', 'section-collapse'],
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
    return createTable(40)
  }

  // events
  onMousedown(event) {
    if (!canIStartResize) return
    resizeHandler(this.rootComponent, event)
  }

  onInput(event) {
    if (!event.target.dataset.type) return
    // const cell = DOM.init(event.target)
  }

  onKeydown(event) {
    keyPress(event)
  }
}

function keyPress(event) {
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
