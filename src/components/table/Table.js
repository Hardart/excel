import { ExcelComponent } from '@core/ExcelComponent'
import createTable from '@/components/table/table.setings'
export class Table extends ExcelComponent {
  static sectionClasses = ['section', 'section-collapse', 'section-muted']

  toHTML() {
    return createTable()
  }
}
