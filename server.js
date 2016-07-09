const http = require('http')
const HTML = require('./examples/server').HTML
const si = require('./lib/server')
const parseUrl = require('url').parse

http.createServer((req, res) => {
  const url = parseUrl(req.url)
  res.end(si.Generate(url.pathname, HTML))
}).listen(3000)

console.log('Server run at', 3000)
