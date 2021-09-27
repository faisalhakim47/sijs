import { el, at, ev } from './si';

function App() {
    return el('div', [
        at('id', 'app'),
        at('class', 'app'),
        at('onclick', 'alert("HAI")'),
        el('main', [
            el('button', (button) => [
                // button.addEventListener('click', () => {}),
            ]),
        ]),
    ]);
}

const a = document.createElement('a');
a.addEventListener('click', () => {});
