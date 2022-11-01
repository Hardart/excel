import '@scss/main.scss'
import Excel from '@/components/excel/Excel'
import components from '@/components/excel/composeComponents'

const app = Excel.create('#app', {
  components: components
})

app.render()
