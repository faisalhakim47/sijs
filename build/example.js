const fs = require('fs')
const browserify = require('browserify')
const watchify = require('watchify')
const tsify = require('tsify')
const babelify = require('babelify')

const b = browserify({
  entries: [
    'src/common.ts',
    'src/browser.ts',
    'src/server.ts'
  ],
  cache: {},
  packageCache: {}
})
  .plugin(watchify, {
    ignoreWatch: ['**/node_modules/**']
  })
  .plugin(tsify, {
    'target': 'es5',
    'sourceMap': true,
    'module': 'commonjs',
    'experimentalDecorators': true,
    'allowSyntheticDefaultImports': true,
    'emitDecoratorMetadata': true,
    'pretty': true,
    'jsx': 'preserve'
  })
  .transform(babelify, {
    'plugins': [
      ['transform-react-jsx', {
        'pragma': 'e'
      }]
    ]
  })

bundle()
b.on('update', bundle)
b.on('log', (msg) => console.log(msg))

function bundle () {
  b.bundle().pipe(fs.createWriteStream('lib/bundle.js'))
}
