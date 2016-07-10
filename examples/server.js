const Generate = require('../lib/server').Generate
const Routes = require('./dist/main')
const http = require('http')
const urlParse = require('url').parse

http.createServer((req, res) => {
  const start = (new Date()).getTime()
  const path = urlParse(req.url).path
  const html = Generate(path, Routes, 'http://127.0.0.1:8080/dist/main.js')
  console.log(path, (new Date()).getTime() - start, 'ms')
  res.end(html)
}).listen(3000)

console.log('listen', 3000)
