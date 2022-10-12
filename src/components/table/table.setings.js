import { setupAlphabetCodes } from '@core/helpers'
// eslint-disable-next-line no-unused-vars
const CHAR_CODE = setupAlphabetCodes()
const table = []
const cells = []
const columnsLength = CHAR_CODE.V - CHAR_CODE.A + 1

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODE.A + index)
}

function setupTableHead() {
  const headRow = Array(columnsLength).fill('').map(toChar).map(toColumn)
  headRow.unshift(rowLabelTemplate())
  return headRow.join('')
}

function setupTableBody(rowCount) {
  for (let i = 0; i < columnsLength; i++) {
    cells.push(createCell())
  }
  const bodyRows = Array(rowCount).fill('').map(toRow)
  return bodyRows.join('')
}

function toColumn(el) {
  return `
  <div class="column" data-resize="col">
    ${el}
    <span></span>
  </div>`
}

function toRow(_, index) {
  return `
  <div class="row" data-resize="row">
    ${rowLabelTemplate(index + 1)}${cells.join('')}
  </div>
  `
}

function createCell() {
  return `
    <div class="cell" contenteditable></div>`
}

function rowLabelTemplate(content = '') {
  return `
  <div class="row-label">
    ${content}
    <span></span>
  </div>`
}

function createHead() {
  return `<div class="table__head">
  ${setupTableHead()}
</div>`
}

function createBody(rowCount) {
  return `<div class="table__body">
  ${setupTableBody(rowCount)}
</div>`
}

export default function createTable(rowCount = 15) {
  table.push(createHead())
  table.push(createBody(rowCount))
  return table.join('\n')
}
