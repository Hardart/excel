import '@scss/main.scss'

async function start() {
  return await Promise.resolve('ok')
}

start().then(console.log)
