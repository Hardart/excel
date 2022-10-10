import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  constructor($rootComponent) {
    super($rootComponent, {
      title: 'Header',
      listeners: ['input', 'click'],
    })
  }
  static sectionClasses = ['section', 'section-collapse', 'section-primary', 'py-5']

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
}
