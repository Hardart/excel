import DOM from '@core/Dom'
import { UIListener } from '@core/UiListener'
import { initArgs } from './components.settings'
// import { delayTimeout } from '@core/helpers'
// import icons from '@core/icons'

const DEFULTS = {
  title: 'Pagination',
  arrows: false,
  currentPage: 1,
  totalPages: 4000,
  listeners: ['click']
}

export default class Pagination extends UIListener {
  constructor(rootComponent, ...args) {
    super()
    this.$root = rootComponent == 'body' ? DOM.body : DOM.init(rootComponent)
    initArgs.call(this, DEFULTS, args)
    this.createPages()
    this.renderComponent()
    this.init()
  }

  console() {}

  createPages() {
    const startPages = createStartPages.bind(this)
    const endPages = createEndPages.bind(this)
    this.startPages = new Array(3).fill('').map(startPages)
    this.endPages = new Array(2).fill('').map(endPages).reverse()
  }

  init() {
    super.init()
    this.pages = this.list.findAll('li')
    this.activePage = this.pages.find(el => el.hasClass('active'))
  }

  createPaginateList(pages) {
    this.list = DOM.create('ul', 'pnz-pages').append(pages)
    this.list.append(createDots())
    this.list.append(this.endPages.join(''))
    return this.list
  }

  renderComponent() {
    const pagination = this.createPaginateList(this.startPages.join(''))
    this.$root.append(pagination)
  }

  clickOnPageItem(event) {
    if (event.target.classList.contains('pnz-disabled')) return
    const $el = event.target
    console.log(this.activePage)
    this.activePage.removeClass('active')
    $el.addClass('active')
    this.activePage = $el
    this.currentPage = +$el.$node.innerText
    isNearToDots.call(this, $el)
  }

  onClick(event) {
    console.log(event.target)
  }
}

function createStartPages(_, index) {
  const page = index + 1
  return createPaginationElement.call(this, page)
}

function createPaginationElement(pageN) {
  return `<li${pageN == this.currentPage ? ' class="active"' : ''}>${pageN}</li>`
}

function createEndPages(_, index) {
  return `<li>${this.totalPages - index}</li>`
}

function createDots() {
  return `<li class="pnz-disabled">...</li>`
}

function isNearToDots(pageEl) {
  if (pageEl.$node.nextSibling?.classList.contains('pnz-disabled')) {
    const page = createPaginationElement.call(this, this.currentPage + 1)
    pageEl.append(page, 'afterend')
    this.init()
    this.onClick()
  }
}
