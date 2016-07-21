## intro

Sijs adalah sebuah framework javascript.

## fitur-fitur

Sama dengan framework-framework lain.

## instalasi

untuk menggunakan aplikasi anda membutuhkan npm/node dan juga typescript yang sudah terintall didalamnya secara global.

installasi dapat dilakukan memalui npm.
```
npm install --save sijs
```

## kode

Sijs menggunakan typescript. Ini adalah file aplikasi utama dari sijs.

```typescript
// app.ts

// import abstrak class Component dari sijs
import { Component } from 'sijs'

// Buat komponen dengan nama App (atau apapun) sebagai komponen utama dari aplikasi
export class App extends Component {
  // Buat method render (wajib!) sebagai templatenya
  // Gunakan parameter pertama untuk mengambil state dan parameter kedua untuk fungsi hyperscript
  render(state, h) {
    return h('html', {}, [
      h('head', {}, [
        h('title', {}, 'Aplikasi Sijs')
      ]),
      h('body', {}, [
        h('h2', {}, state,get('input')),
        h('input', { model: state.get('input') })
      ])
    ])
  }
}
```

Kemudian buat lagi sebagai *container* untuk *environment* browser atau server.

#### untuk browser

```typescript
// ambil fungsi Bootstrap dari sijs/browser
import { Bootstrap } from 'sijs/browser'
// ambil komponen App dari file app.ts yang kita buat tadi
import { App } from './app'

// Jalankan aplikasi dengan Bootstrap fungsi berisi parameter komponen
Bootstrap(new App())
```

setelah itu *compile* typescript ke javascript dengan menggunakan modul commonjs. Karena commonjs tidak bisa dijalankan di browser maka kita harus *compile* lagi file browser.js dengan browserify atau webpack atau juga yang lainya.

#### untuk server

untuk server contohnya sebagai berikut.

```typescript
import { parse as urlParse } from 'url'
import { createServer } from 'http'
import { Generate } from 'sijs/server'
import { App } from './app'

const url = urlParse(req.url)
const path = url.pathname + (url.query || '')

if (path === '/app.js') {
  try {
    createReadStream(/* isikan path file absolut dari browser.js yang sudah di compile */).pipe(res)
  } catch (e) {
    res.end()
  }
  return
}

const html = Generate(path, App, '/app.js')
res.end(html)
```