import { Component } from '../src/index.js'

class Dashboard extends Component {
  render() {
    return this.html`
      <p>Dashboard</p>
    `
  }
}

const heroesRouter = new Router([
  new Route('/', 'HeroList'),
])

class Heroes extends Component {
  data() {
    this.heroes = [
      { name: 'Gatotkaca', slogan: 'Otot kawat tulang besi' },
      { name: 'Aurora', slogan: 'Tukang es krim' },
      { name: 'Eudora', slogan: 'Tukang listrik' },
      { name: 'Zilong', slogan: 'Heroes never fade' },
      { name: 'Roger', slogan: 'Manusia jadi-jadian' },
    ]
  }

  render() {
    const { html } = this
    return html`
      <ul>
        ${repeat(this.items, item => html`
        <li>${Router.link({ name: 'Hero' },
          html`<a class="hero-link">${item.name} - <small>${item.slogan}</small></a>`
        )}
        </li>`
      )}
      </ul>
      <section>
        ${heroesRouter.view()}
      </section>
    `
  }
}

const router = new Router([
  new Route('/', 'Dashboard', Dashboard),
  new Route('/heroes/*', 'HeroList', Heroes),
])

class App extends Component {
  render() {
    const { html } = this
    return html`
      <div>
        <h1>Parent</h1>
        <nav>
          <ul>
            <li>${Router.link({ name: 'Dashboard' }, html`<a class="link">Dashboard</a>`)}</li>
            <li>${Router.link({ name: 'HeroList' }, html`<a class="link">Heroes</a>`)}</li>
          </ul>
        </nav>
        ${router.view()}
      </div>
    `
  }
}
