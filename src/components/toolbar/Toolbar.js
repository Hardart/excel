import { ExcelComponent } from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static sectionClasses = ['section', 'section-collapse', 'section-success', 'py-10']
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
}
