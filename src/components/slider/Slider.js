/* eslint-disable valid-jsdoc */
import DOM from '@core/Dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { createSlider } from './slider.settings'
import { delayTimeout } from '@/core/helpers'
import { isDotNav } from './slider.helpers'

const options = {
  title: 'Slider',
  listeners: ['click'],
  section: {
    class: ['section']
  },
  duration: 400,
  activeSlide: 1,
  slideWidth: 400
}

export class Slider extends ExcelComponent {
  constructor(rootComponent) {
    super(rootComponent, options)
    this.transitionDuration = options.duration || 200
    this.activeSlide = options.activeSlide - 1 || 0
    this.side = 1
    this.sideWidth = options.slideWidth || 600
    this.sideHeight = options.slideHeight || 400
    this.click = 0
  }

  static get sectionClasses() {
    if (!options.section) return null
    return options.section.class
  }

  toHTML() {
    return createSlider(this.activeSlide)
  }

  onClick(event) {
    this.nextSlide(event)
    if (isDotNav(event)) this.toSlide(event)
  }

  async nextSlide(event) {
    const span = event.target.closest('[data-type="slider-nav"]')
    if (span) {
      const btn = DOM.init(span)
      const { slides, container } = getSliderElements(btn)
      const { width } = slides[0].getCoords()
      const transition = {
        transitionDuration: `${this.transitionDuration}ms`,
        transitionProperty: 'transform',
        transitionTimingFunction: 'ease'
      }

      this.oneSlide(btn, slides, container, width)

      setActiveClass.call(this, slides)
      const toX = this.side == 1 ? width : 0
      await delayTimeout()
      container.css({ transform: `translate3d(-${toX}px, 0, 0)` })
      container.css(transition)
      container.on('transitionend', () => container.removeCss(transition))
    }
  }

  async toSlide(event) {
    const btn = DOM.init(event.target)
    const { dots } = getSliderElements(btn)
    const id = +btn.getAttr('slide-id')
    dots[id].addClass('active')
    dots[this.activeSlide].removeClass('active')
    this.activeSlide = id
  }

  oneSlide(btn, slides, container, width) {
    if (isRight(btn)) {
      if (this.side < 0) clearAndSetOrder.call(this, slides)
      this.side = 1
      container.css({ transform: `translate3d(0, 0, 0)` })
      if (this.activeSlide > 0) slides[this.activeSlide - 1].css({ order: 1 })
    } else {
      if (this.side > 0) clearAndSetOrder.call(this, slides)
      this.side = -1
      container.css({ transform: `translate3d(-${width}px, 0, 0)` })
    }
  }
}

function isRight(btn) {
  return btn.attrsData.direction == 'right'
}

function setActiveClass(items) {
  let active = this.activeSlide
  items[active].removeClass('active')
  this.side == 1 ? active++ : active--
  if (active == 1 && this.side !== -1) clearOrder(items)
  if (active < 0 && this.side == -1) {
    clearOrder(items)
    active = items.length - 1
  }
  if (active >= items.length) active = 0
  if (this.side == -1) items[active].css({ order: -1 })
  items[active].addClass('active')
  this.activeSlide = active
}

function clearOrder(slides) {
  slides.forEach(slide => {
    slide.removeCss({ order: 1 })
  })
}

function clearAndSetOrder(slides) {
  slides.forEach((slide, index) => {
    slide.removeCss({ order: 1 })
    if (this.side > 0 && index >= this.activeSlide - 1) slide.css({ order: -1 })
    if (this.side < 0 && index < this.activeSlide - 1) slide.css({ order: 1 })
  })
}
/**
 *
 * @param {DOM} btn
 * @returns {{dots: DOM[], container: DOM, slides: DOM[]}}
 */
function getSliderElements(btn) {
  const slider = btn.closest('.slider')
  const container = slider.find('[data-slider-container]')
  const slides = container.findAll(`[data-slider-container] > div`)
  const dots = slider.findAll('[dotnav] > li')
  return { container, slides, dots }
}
