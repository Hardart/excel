import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static sectionClasses = ['section', 'section-collapse', 'py-5']
  toHTML() {
    return `
    <div class="formula__label">fx</div>
    <div class="formula__input" contenteditable spellcheck="false"></div>
    `
  }
}
