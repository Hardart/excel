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
    this.renderComponent()
    this.init()
  }

  createPages() {
    const pages = []
    pages.push(createStartPages.call(this, 2))

    switch (true) {
      case this.currentPage == 2:
        pages.push(createCurrentPages.call(this, 1, -1))
        break
      case this.currentPage == 3:
        pages.push(createCurrentPages.call(this, 2, 0))
        break
      case this.currentPage > 3 && this.currentPage < 5:
        pages.push(createCurrentPages.call(this, 3, 1))
        break
      case this.currentPage == 5:
        pages.push(createCurrentPages.call(this, 4, 2))
        break
    }

    pages.push(createDots())

    switch (true) {
      case this.currentPage == this.totalPages - 2:
        pages.push(createCurrentPages.call(this, 2, 1))
        break
      case this.currentPage == this.totalPages - 1:
        pages.push(createCurrentPages.call(this, 3, 1))
        break
      case this.currentPage == this.totalPages:
        pages.push(createCurrentPages.call(this, 2, 1))
        break
      case this.currentPage > 5:
        pages.push(createCurrentPages.call(this, 3, 1))
        break
    }

    if (this.currentPage > 5 && this.currentPage <= this.totalPages - 4) {
      pages.push(createDots())
    }

    if (this.currentPage < this.totalPages - 1) {
      pages.push(createEndPages.call(this, 2))
    }

    return pages
  }

  init() {
    super.init()
  }

  paginationListBundle(pagesArray) {
    if (!pagesArray) throw new Error('No pages for start')

    this.list = DOM.create('ul', 'pnz-pages')
    pagesArray.forEach(p => {
      this.list.append(p.join(''))
    })
    return this.list
  }

  renderComponent() {
    const pagination = this.paginationListBundle(this.createPages())
    this.$root.append(pagination)
  }

  onClick(event) {
    console.log(event.target)
  }
}

function createCurrentPages(pagesLength, startFrom) {
  const mapPages = createCurrentPageElement(startFrom)
  return pagesCount(pagesLength).map(mapPages.bind(this))
}

function createCurrentPageElement(startFrom) {
  return function (_, index) {
    const page = this.currentPage - startFrom + index
    return `<li${page == this.currentPage ? ' class="active"' : ''}>${page}</li>`
  }
}

function createStartPages(count) {
  return pagesCount(count).map(createPageElement.bind(this))
}

function createPageElement(_, index) {
  const page = index + 1
  return `<li${page == this.currentPage ? ' class="active"' : ''}>${page}</li>`
}

function createEndPages(count) {
  return pagesCount(count).map(createEndPageElement.bind(this)).reverse()
}

function createEndPageElement(_, index) {
  return `<li>${this.totalPages - index}</li>`
}

function createDots() {
  return [`<li class="pnz-disabled">...</li>`]
}

function pagesCount(count) {
  return new Array(count).fill('')
}
