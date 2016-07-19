const test = {}

try {
  test['bowser'] = !!window && !!document
} catch (e) { }

try {
  test['server'] = !!(global as any)
} catch (e) { }

const browser = !!test['bowser']

const server = !!test['server'] && !browser

const prerender = browser && window['_prerender']

export const is = {
  browser,
  server,
  prerender
}

export default is
