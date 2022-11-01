import { ExcelComponent } from '@core/ExcelComponent'

const options = {
  title: 'Header',
  listeners: ['input', 'click'],
  section: {
    class: ['section', 'section-collapse', 'py-10']
  }
}
export class Header extends ExcelComponent {
  constructor(rootComponent) {
    super(rootComponent, options)
  }

  static get sectionClasses() {
    if (!options.section) return null
    return options.section.class
  }

  toHTML() {
    return `
    <input type="text" class="header__input" value="Новая таблица" />
    <div class="header__buttons">
      <div class="btn btn-icon btn-danger mr-10">
        <span class="material-symbols-outlined"> exit_to_app </span>
      </div>
      <div class="btn btn-icon btn-secondary"><span class="material-symbols-outlined"> delete_forever </span></div>
    </div>
    `
  }

  // mouse events
  onClick(event) {
    console.log(event.target)
  }
  onInput() {
    console.log('input')
  }
}
