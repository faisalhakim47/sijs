import { RouterView } from '../../lib/common'
import { Page1 } from './page1'
import { Page2 } from './page2'

export const PageView = new RouterView({
  'page1': Page1,
  'page2': Page2
})
