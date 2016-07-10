const test = {}

try {
  test['bowser'] = !!window && !!document
  test['server'] = !!global
} catch (e) { }

const browser = !!test['bowser']

const server = test['server'] && !browser

const prerender = browser && window['_prerender']

export const is = {
  browser,
  server,
  prerender
}
