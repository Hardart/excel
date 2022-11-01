import { ExcelComponent } from '@core/ExcelComponent'

const options = {
  title: 'Formula',
  section: {
    class: ['section', 'section-collapse', 'py-5']
  }
}

export class Formula extends ExcelComponent {
  constructor(rootComponent) {
    super(rootComponent, options)
  }

  static get sectionClasses() {
    if (!options.section) return null
    return options.section.class
  }
  toHTML() {
    return `
    <div class="formula__label">fx</div>
    <div class="formula__input" contenteditable spellcheck="false"></div>
    `
  }
}
