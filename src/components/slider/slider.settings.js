import icons from '@core/icons'
import data from '@/images.json'
const content = []
const dots = []
const images = data.slider.images

const addActiveClass = (i, activeSlide) => (i == activeSlide ? 'active' : '')

function slide(img, i, active = '') {
  return `
    <div class="${active}">
      <img src="${img}"></img>
      <div class="slide-content t-shadow-5">${i}</div>
    </div>`
}

function slider(content, nav, dotnav) {
  return `
  <div class="slider-container grid  childs-w-33" data-slider-container>${content}</div>
  ${nav}
  ${dotnav}
  `
}

function sliderNav() {
  return `
  <div class="slider-nav">
    <span class="left" data-direction="left" data-type="slider-nav" icon="ratio: 1.5">
      ${icons['chevron-left']}
    </span>
    <span class="right" data-direction="right" data-type='slider-nav' icon="ratio: 1.5">
      ${icons['chevron-right']}
    </span>
  </div>
  `
}

function dotnav(dots) {
  return `<ul class="slider-dotnav flex flex-center" dotnav>${dots}</ul>`
}

function dot(index, active = '') {
  return `<li class="${active}" slide-id="${index}"></li>`
}

export function createSlider(activeSlide) {
  for (let i = 0; i < images.length; i++) {
    content.push(slide(images[i], i + 1, addActiveClass(i, activeSlide)))
    dots.push(dot(i, addActiveClass(i, activeSlide)))
  }

  return slider(content.join(''), sliderNav(), dotnav(dots.join('')))
}
