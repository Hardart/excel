import DOM from '@core/DomCreator'
import data from '@/data.json'
import { ExcelComponent } from '@core/ExcelComponent'
// import { delayTimeOut } from '@core/helpers'

const options = {
  title: 'Slider',
  listeners: ['click'],
  section: true,
  sectionClasses: ['section'],
  duration: 200,
  activeEl: 1,
  gap: 0,
  slideWidth: 400,
  slideHeight: 600,
}

export class Slider extends ExcelComponent {
  constructor(rootComponent) {
    super(rootComponent, options)
    this.transitionDuration = options.duration || 200
    this.activeEl = options.activeEl - 1 || 0
    this.side = 1
    this.gap = options.gap || 0
    this.sideWidth = options.slideWidth || 600
    this.sideHeight = options.slideHeight || 400
    this.click = 0
  }

  static get sectionClasses() {
    if (!options.section) return null
    return options.sectionClasses
  }

  container(content) {
    return `
    <div class="slider-container grid childs-w-25" data-slider-container>${content}</div>
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
    const addActiveClass = (i) => (i == this.activeEl - 1 ? 'active' : '')

    for (let i = 0; i < images.length; i++) {
      content.push(slide(images[i], i + 1, addActiveClass(i)))
    }
    return this.container(content.join(''))
  }

  onClick(event) {
    this.start(event)
  }

  start(event) {
    if (event.target.dataset.transitionTo) {
      const btn = DOM.init(event.target)
      const { slides, container } = getSliderElements(btn)
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
        if (this.activeEl > 0) slides[this.activeEl - 1].css({ order: 1 })
      } else {
        if (this.side > 0) clearAndSetOrder.call(this, slides)
        this.side = -1
        container.css({ transform: `translate3d(-${width + this.gap}px, 0, 0)` })
      }

      setActiveClass.call(this, slides)
      const toX = this.side == 1 ? width + this.gap : 0
      setTimeout(() => {
        container.css({ transform: `translate3d(-${toX}px, 0, 0)` })
        container.css(transition)
      }, 0)

      setTimeout(() => {
        container.removeCss(transition)
      }, this.transitionDuration)
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

  if (active == 1 && this.side !== -1) clearOrder(slides)
  if (active < 0 && this.side == -1) {
    clearOrder(slides)
    active = slides.length - 1
  }
  if (active >= slides.length) {
    active = 0
  }
  if (this.side == -1) slides[active].css({ order: -1 })
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

function getSliderElements(btn) {
  const slider = btn.closest('.slider')
  const container = slider.find('[data-slider-container]')
  const slides = container.findAll(`[data-slider-container] > div`)
  return { container, slides }
}
