import { setupAlphabetCodes } from '@core/helpers'

const CHAR_CODE = setupAlphabetCodes()
const table = []
const rows = []
const columnsLength = CHAR_CODE.V - CHAR_CODE.A + 1

function toChar(_, index) {
  return String.fromCharCode(CHAR_CODE.A + index)
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

function setupTableHead() {
  const headRow = Array(columnsLength).fill('').map(toChar).map(toColumn)
  headRow.unshift(rowLabelTemplate())
  return headRow.join('')
}

function setupTableBody(rowCount) {
  for (let row = 0; row < rowCount; row++) {
    const cells = Array(columnsLength)
      .fill('')
      .map((el, col) => createCell(col, row))
      .join('')
    rows.push(toRow(row, cells))
  }

  return rows.join('')
}

function toColumn(el, i) {
  return `
  <div class="column" data-element="resizable" data-col="${i + 1}">
    ${el}
    <div data-resize="col"></div>
  </div>`
}

function toRow(row, cells) {
  return `
  <div class="row" data-element="resizable">
    ${rowLabelTemplate(row + 1)}${cells}
  </div>
  `
}

function createCell(column, row) {
  return `
    <div class="cell" data-col="${column + 1}" data-row="${row + 1}" data-type="cell" contenteditable></div>`
}

function rowLabelTemplate(i = '') {
  return `
  <div class="first-cell">
    ${i == 0 ? '' : i}
    <div data-resize="row"></div>
  </div>`
}

export default function createTable(rowsCount = 15) {
  table.push(createHead())
  table.push(createBody(rowsCount))
  return table.join('')
}
