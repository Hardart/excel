import '@scss/main.scss'
import Excel from '@/components/excel/Excel'
import components from '@/components/excel/composeComponents'

const app = Excel.create('#app', {
  components: components,
})

app.render()

// for (let i = 65; i < 100; i++) {
//   console.log(`Code of letter ${String.fromCharCode(i)} is ${i}`)
// }
