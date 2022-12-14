/* eslint-disable max-len */

import DOM from '@core/Dom'
import { ExcelComponent } from '@core/ExcelComponent'
// import { delayTimeout } from '@core/helpers'
import UI from '@core/ui'

import { renderCards } from './feed.settings'

const options = {
  title: 'Feed',
  section: {
    class: ['section']
  }
}

export class Feed extends ExcelComponent {
  constructor(rootComponent) {
    super(rootComponent, options)
    this.transitionDuration = options.duration || 200
  }

  static get sectionClasses() {
    if (!options.section) return null
    return options.section.class
  }

  toHTML() {
    setTimeout(() => UI.alert('Непредвиденная ошибка, попробуйте перезагрузить страницу', 'danger'), 5000)
    UI.alert({ text: 'Сеть восстановлена', autoClose: false, status: 'success' })

    const lottie = `
    <div class="flex flex-center hidden">
      <lottie-player autoplay loop mode="normal" src="https://assets4.lottiefiles.com/packages/lf20_l5qvxwtf.json" style="width: 50%"></lottie-player>
    </div>
    `

    const menu = `<section class="section"><div class="card-body card-dark" pnz-nav></div></section>`
    renderCards()
    return [menu, lottie].join('')
  }

  init() {
    const cards = DOM.body.findAll('.card')
    showCards(cards)
    // UI.pagination('.excel', { currentPage: 2, totalPages: 4738 }).console()
    UI.burgermenu('[pnz-nav]')
  }
}

/** @type {IntersectionObserverInit} */
const observerOptions = {
  rootMargin: '100px'
}

function observerCards() {
  return new IntersectionObserver(intersectCards, observerOptions)
}

/** @param {DOM[]} cards */
function showCards(cards) {
  cards.forEach(lazyLoad)
}

function lazyLoad(target) {
  if (target instanceof DOM) target = target.$node
  const io = observerCards()
  io.observe(target)
}

function intersectCards(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const $el = DOM.init(entry.target)
    const $img = $el.find('img')
    const src = $img.getAttr('data-src')
    $img.setAttr('src', src)
    $el.removeClass('hide')
    observer.disconnect()
  })
}
