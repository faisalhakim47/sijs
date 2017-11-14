import { Component, html, repeat, until } from '../src/index.js'

function H1(title, subtitle) {
  return html`<h1>${title} <small>${subtitle}</small></h1>`
}

function H2(title) {
  return html`<h2>${title}</h2>`
}

const random = (min, max) => (min + Math.floor(Math.random() * (max - min)))

class App extends Component {
  beforeCreate() {
    this.x = 0
    this.y = 0
    this.ariving = new Promise((resolve) => {
      setTimeout(() => resolve(
        html`<p>I am arrive!!! :D</p>`
      ), 2000)
    })
  }

  onmousemove(e) {
    this.x = e.clientX
    this.y = e.clientY
    this.update()
  }

  render() {
    const { x, y } = this
    const items = []
    const randomLength = 10 + Math.floor(Math.random() * 10)
    for (let index = 0; index < randomLength; index++) items.push(random(x, y))
    return html`
      <section id="app" class="container" data-test="${random(10, 100)}-${random(10, 100)}" onmousemove=${this.onmousemove}>
        ${H1('SIJS', '= new HyperHTML()')}
        <p>x: ${x}, y: ${y}</p>
        ${H2('IF ELSE')}
        ${x + y < (window.innerHeight / 2)
        ? html`<p>the fact is that ${window.innerHeight / 2} is greater than ${x + y}</p>`
        : html`<p>the fact is not right.</p>`
      }
        ${H2('repeat')}
        <p>${repeat(items, item =>
        html`<span> ${item}</span>`
      )}</p>
        ${H2('until')}
        ${until(this.ariving, html`<p>waiting...</p>`)}
      </section>
    `
  }
}

html`<div class="container">${new App()}<div>`.mount(
  document.getElementById('app')
)
