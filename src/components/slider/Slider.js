import DOM from '@core/DomCreator'
import data from '@/data.json'
import { ExcelComponent } from '@core/ExcelComponent'
import { delayTimeOut } from '@core/helpers'

const options = {
  title: 'Slider',
  listeners: ['click'],
  section: true,
  sectionClasses: ['section'],
  duration: 300,
  activeEl: 0,
  gap: 0,
  slideWidth: 400,
  slideHeight: 600,
}

export class Slider extends ExcelComponent {
  constructor(rootComponent) {
    super(rootComponent, options)
    this.transitionDuration = options.duration || 200
    this.activeEl = options.activeEl || 0
    this.side = 0
    this.gap = options.gap || 0
    this.sideWidth = options.slideWidth || 600
    this.sideHeight = options.slideHeight || 400
  }

  static get sectionClasses() {
    if (!options.section) return null
    return options.sectionClasses
  }

  frame(content) {
    const gap = this.gap ? ` g-${this.gap}` : ''
    return `
    <div class="slider-container${gap}" data-slider-container>${content}</div>
    <div class="slider-nav">
      <span class="left" data-transition-to="left"></span>
      <span class="right" data-transition-to="right"></span>
    </div>
    `
  }

  toHTML() {
    const content = []
    const slide = (img, i, classes = '') => `
    <div class="${classes}">
      <img src="${img}" width="${this.sideWidth}" height="${this.sideHeight}"></img>
      <div class="slide-content t-shadow-5">${i}</div>
    </div>`
    const images = data.slider.images
    for (let i = 0; i < 10; i++) {
      if (i == this.activeEl) {
        content.push(slide(images[i], i + 1, 'active'))
      } else if (i >= 5) {
        content.push(slide(images[i - 5], i + 1))
      } else {
        content.push(slide(images[i], i + 1))
      }
    }

    return this.frame(content.join(''))
  }

  // mouse events
  async onClick(event) {
    if (event.target.dataset.transitionTo) {
      const btn = DOM.init(event.target)
      const slider = btn.closest('.slider')
      const container = slider.find('[data-slider-container]')
      const slides = container.findAll(`[data-slider-container] > div`)
      const { width } = slides[0].getCoords()
      const transition = {
        transitionDuration: `${this.transitionDuration}ms`,
        transitionProperty: 'transform',
        transitionTimingFunction: 'ease',
      }

      if (isRight(btn)) {
        if (this.side < 0) clearAndSetOrder.call(this, slides)
        this.side = 1
        container.css({ transform: `translate3d(0, 0, 0)` })
        if (this.activeEl > 0) {
          slides[this.activeEl - 1].css({ order: 1 })
        }
      } else {
        if (this.side > 0) clearAndSetOrder.call(this, slides)
        this.side = -1
        container.css({ transform: `translate3d(-${width + this.gap}px, 0, 0)` })
        slides[this.activeEl - 1].css({ order: -1 })
      }

      setActiveClass.call(this, slides)
      await delayTimeOut()
      const toX = this.side == 1 ? width + this.gap : 0
      container.css({ transform: `translate3d(-${toX}px, 0, 0)` })
      container.css(transition)
      await delayTimeOut(this.transitionDuration)
      container.removeCss(transition)
    }
  }
}

function isRight(btn) {
  return btn.attrsData.transitionTo == 'right'
}

function setActiveClass(slides) {
  let active = this.activeEl
  slides[active].remove('active')
  this.side == 1 ? active++ : active--
  if (active < 1 || active >= slides.length) {
    console.log(active)
    active = 1
    clearOrder(slides)
  }
  slides[active].add('active')
  this.activeEl = active
}

function clearOrder(slides) {
  slides.forEach((slide) => {
    slide.removeCss({ order: 1 })
  })
}

function clearAndSetOrder(slides) {
  slides.forEach((slide, index) => {
    slide.removeCss({ order: 1 })
    if (this.side > 0 && index >= this.activeEl - 1) slide.css({ order: -1 })
    if (this.side < 0 && index < this.activeEl - 1) slide.css({ order: 1 })
  })
}
