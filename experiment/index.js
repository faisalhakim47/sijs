import { Component, html } from '../src/index.js'

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
  </section>
`.mount(document.getElementById('test1'))
