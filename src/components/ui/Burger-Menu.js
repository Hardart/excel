// burger.addEventListener('click', () => {
//   burger.classList.toggle('animo')

//   // elBody.onclick = () => {
//   //   nav.classList.remove('active-nav')
//   //   burger.classList.remove('animo')
//   //   navItem.forEach((item, i) => {
//   //     item.classList.remove('menu-link')
//   //   })
//   // }
// })

import DOM from '@core/Dom'
import { UIListener } from '@core/UiListener'
import { initArgs } from './components.settings'

const DEFULTS = {
  title: 'Buger-Menu',
  animationDuration: 300,
  selector: 'pnz-nav-btn',
  listeners: ['click']
}

export default class BurgerMenu extends UIListener {
  constructor(parentNode, ...args) {
    super()
    this.parentNode = DOM.body.find(parentNode) || DOM.body
    initArgs.call(this, DEFULTS, args)
    this.createBtn()
    this.$root = DOM.init(`[${DEFULTS.selector}]`)
    console.log(this.$root)
    this.init()
  }

  console() {}

  init() {
    super.init()
  }

  createBtn() {
    this.btn = DOM.create('div', 'burger').setAttr(DEFULTS.selector)
    const lines = `
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="line3"></div>
    `
    this.btn.append(lines)
    this.parentNode.append(this.btn)
  }

  onClick() {
    this.btn.toggle('animo')
  }
}
