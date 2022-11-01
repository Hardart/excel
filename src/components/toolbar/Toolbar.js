import { ExcelComponent } from '@core/ExcelComponent'

const options = {
  title: 'Toolbar',
  listeners: ['click'],
  section: {
    class: ['section', 'section-collapse', 'py-5', 'hr-y']
  }
}

export class Toolbar extends ExcelComponent {
  constructor(rootComponent) {
    super(rootComponent, options)
  }

  static get sectionClasses() {
    if (!options.section) return null
    return options.section.class
  }

  toHTML() {
    return `
    <div class="toolbar__font-style">
      <span class="material-symbols-outlined"> format_bold </span>
      <span class="material-symbols-outlined"> format_italic </span>
      <span class="material-symbols-outlined"> format_underlined </span>
    </div>
    <div class="toolbar__font-align">
      <span class="material-symbols-outlined"> format_align_left </span>
      <span class="material-symbols-outlined"> format_align_center </span>
      <span class="material-symbols-outlined"> format_align_right </span>
    </div>
    `
  }

  // events
  onClick(event) {
    console.log(this.rootComponent)
  }
}
