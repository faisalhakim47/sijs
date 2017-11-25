const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const buble = require('buble')
const babelMinify = require('babel-minify')

async function build() {
  const bundle = await rollup.rollup({
    input: './src/index.js',
  })

  const { code } = await bundle.generate({
    format: 'es',
    sourcemap: false,
  })
  const minifiedCode = babelMinify(code).code

  console.log('module', `${toByte(code.length)}`, `(${toByte(minifiedCode.length)} minified)`, '✔')

  const { code: UMDCode } = await bundle.generate({
    name: 'si',
    format: 'umd',
    sourcemap: false,
  })
  const minifiedUMDCode = babelMinify(UMDCode).code

  console.log('umd', `${toByte(UMDCode.length)}`, `(${toByte(minifiedUMDCode.length)} minified)`, '✔')

  const ES5Code = buble.transform(UMDCode, {
    transforms: { dangerousTaggedTemplateString: true },
  }).code
  const minifiedES5Code = babelMinify(ES5Code).code

  console.log('es5', `${toByte(ES5Code.length)}`, `(${toByte(minifiedES5Code.length)} minified)`, '✔')

  fs.writeFileSync(path.join(__dirname, './dist/si.js'), code, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.min.js'), minifiedCode, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.umd.js'), UMDCode, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.umd.min.js'), minifiedUMDCode, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.es5.js'), ES5Code, { encoding: 'utf8' })
  fs.writeFileSync(path.join(__dirname, './dist/si.es5.min.js'), minifiedES5Code, { encoding: 'utf8' })

  console.log('done', '✔')
}

function toByte(length) {
  const byteString = ((length * 1000 / 1024) / 1000).toString()
  return byteString.slice(0, byteString.indexOf('.') + 3) + ' KB'
}

build().catch((error) => {
  console.log(error)
})
