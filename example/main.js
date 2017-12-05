import { App } from './pages/TheApp.js'

performance.mark(`app-begin`)

new App().$mount(document.getElementById('app'))

performance.mark(`app-end`)

performance.measure(
  'app',
  'app-begin',
  'app-end'
)

console.log('PERFORMANCE :', performance.getEntriesByName('app')[0].duration)
