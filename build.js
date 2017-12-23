const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const rollupNodeResolve = require('rollup-plugin-node-resolve')
const buble = require('buble')
const babelMinify = require('babel-minify')

const polyfillCode = fs.readFileSync(
  path.join(__dirname, './src/polyfill.js'), { encoding: 'utf8' }
)

function minify(code) {
  return babelMinify(code)
}

function optimize(code) {
  return minify(code)
}

async function build() {
  const bundle = await rollup.rollup({
    input: './esnext/index.js',
    treeshake: true,
    plugins: [
      rollupNodeResolve()
    ],
  })

  const bundled = await bundle.generate({
    format: 'es',
    sourcemap: true,
  })
  const optimized = minify(bundled.code)

  console.log('module', `${toByte(bundled.code.length)}`, `(${toByte(optimized.code.length)} minified)`, '✔')

  const UMD = await bundle.generate({
    name: 'si',
    format: 'umd',
    exports: 'named',
    sourcemap: true,
  })
  const UMDOptimized = optimize(UMD.code)

  console.log('umd', `${toByte(UMD.code.length)}`, `(${toByte(UMDOptimized.code.length)} minified)`, '✔')

  const ES5 = buble.transform(UMD.code, {
    transforms: { dangerousTaggedTemplateString: true },
  })
  const ES5Optimized = optimize(ES5.code)

  console.log('es5', `${toByte(ES5.code.length)}`, `(${toByte(ES5Optimized.code.length)} minified)`, '✔')

  const polyfilledCode = polyfillCode + ES5.code
  const minifiedPolyfilledCode = polyfillCode + ES5Optimized.code

  console.log('es5.polyfilled', `${toByte(polyfilledCode.length)}`, `(${toByte(minifiedPolyfilledCode.length)} minified)`, '✔')

  fs.writeFileSync(path.join(__dirname, './dist/si.js'), bundled.code, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.min.js'), optimized.code, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.umd.js'), UMD.code, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.umd.min.js'), UMDOptimized.code, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.es5.js'), ES5.code, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.es5.min.js'), ES5Optimized.code, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.es5.polyfilled.js'), polyfillCode, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.es5.polyfilled.min.js'), minifiedPolyfilledCode, { encoding: 'utf8' })

  console.log('done', '✔')
}

function toByte(length) {
  const byteString = ((length * 1000 / 1024) / 1000).toString()
  return byteString.slice(0, byteString.indexOf('.') + 3) + ' KB'
}

build().catch((error) => {
  console.log(error)
})
