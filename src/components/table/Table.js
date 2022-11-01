import { ExcelComponent } from '@core/ExcelComponent'
import createTable from '@/components/table/table.settings'
import { resizeHandler } from './table.resize'
import { canIStartResize, keyPress, isCell } from './table.helpers'
import { Selection } from './Selection'
import DOM from '@core/Dom'

const options = {
  title: 'Table',
  listeners: ['mousedown', 'input', 'keydown', 'click'],
  section: {
    class: ['section', 'section-collapse', 'h-50vh']
  }
}

export class Table extends ExcelComponent {
  constructor(rootComponent) {
    super(rootComponent, options)
  }

  static get sectionClasses() {
    if (!options.section) return null
    return options.section.class
  }

  beforeInit() {
    this.selection = new Selection()
  }

  init() {
    super.init()
    const firstInitCell = this.rootComponent.find('[data-id="1:1"]')
    this.selection.select(firstInitCell)
  }

  toHTML() {
    return createTable(40)
  }

  // events
  onMousedown(event) {
    if (!canIStartResize(event)) return
    resizeHandler(this.rootComponent, event)
  }

  onInput(event) {
    if (!event.target.dataset.type) return
    // const cell = DOM.init(event.target)
  }

  onKeydown(event) {
    keyPress(event)
  }

  onClick(event) {
    if (!isCell(event)) return
    const cell = DOM.init(event.target)
    if (!event.shiftKey) return this.selection.select(cell)
    const selectedCell = cell.idData(true)
    const currentCell = this.selection.current.idData(true)
    range(currentCell.col, selectedCell.col)
  }
}

function range(startCell, endCell) {
  const count = new Array(endCell - startCell + 1).fill('').map((_, i) => i + startCell)
  console.log(count)
}
