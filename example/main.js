import { html, repeat } from '../src/index.js'

function Heading(title, subtitle) {
  return html`<h1>${title} <small>${subtitle}</small></h1>`
}

let x = 0
let y = 0
const random = (min, max) => (min + Math.floor(Math.random() * (max - min)))

const onmousemove = (e) => {
  x = e.clientX
  y = e.clientY
  const xy = x + y
  renderUpdate()
}

function MousemoveApp() {
  const items = []
  for (let index = 0; index < 10; index++) items.push(' ' + random(x, y))
  return html`
    <section id="app" data-test="${random(10, 100)}-${random(10, 100)}" onmousemove=${onmousemove}>
      ${Heading('SIJS', '= new HyperHTML()')}
      <p>x: ${x}, y: ${y}</p>
      <p ${{ if: x + y < (window.innerHeight / 2) }}>the fact is that ${window.innerHeight / 2} is greater than ${x + y}</p>
      <p ${{ elseIf: true }}>the fact is not right.</p>
      <p>${repeat(items, item =>
        html`<span> ${item}</span>`
      )}</p>
    </section>
  `
}

function renderUpdate() {
  MousemoveApp().render(document.getElementById('app'))
}

renderUpdate()
