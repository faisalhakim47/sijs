import { Component, html, repeat, until } from '../src/index.js'

const items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

class TestUntil extends Component {
  loadText() {
    return new Promise((resolve) => {
      const interval = 5000 * Math.random()
      setTimeout(() => {
        resolve({ interval })
      }, interval)
    })
  }

  render() {
    return this.html`
      <p>${repeat(items, () =>
        until(this.loadText().then(({ interval }) =>
          this.html`<span> - ${interval} - </span>`
        ), this.html`<p><loading class=""></loading></p>`)
      )}</p>
    `
  }
}

class Test1 extends Component {
  props(index = 0) {
    this.index = index
    return this
  }

  beforeCreate() {
    this.name = 'World'
  }

  count() {
    this.index++
    this.update()
  }

  render() {
    return this.html`
      <p onmousemove="${this.count}">Hello ${this.name}. Let's hover and count! ${this.index}</p>
    `
  }
}

class Test1n2 extends Component {
  click() {
    this.update()
  }

  render() {
    return html`
      <div>
        <h2>Without Skip</h2>
        ${new Test1().props(Math.random() * 10)}
        <p>click to update component: <button onclick=${this.click}>Reset</button></p>
      </div>
    `
  }
}

html`
  <section>
    <h1>Test 1</h1>
    ${new Test1n2()}
    <h1>TestUntil</h1>
    ${new TestUntil()}
  </section>
`.mount(document.getElementById('test1'))
