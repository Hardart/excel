import '@scss/main.scss'
import Excel from './components/excel/Excel'
import { Formula } from './components/formula/Formula'
import { Header } from './components/header/Header'
import { Toolbar } from './components/toolbar/Toolbar'
import { Table } from './components/table/Table'

const app = Excel.create('#app', {
  components: [Header, Toolbar, Formula, Table],
})

console.log(app)
