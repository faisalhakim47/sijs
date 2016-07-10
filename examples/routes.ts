import { Router, is } from '../lib/common'
import { Bootsrap } from '../lib/browser'
import { App } from './main'

export const Routes = new Router(App, [
  { path: '/', name: 'default' },
  { path: '/page1', name: 'page1' },
  { path: '/page2', name: 'page2' }
])

if (is.browser) {
  Bootsrap('body', Routes)
}

module.exports = Routes
