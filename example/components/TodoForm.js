// @ts-check

import { Component } from '../../src/component.js';
import { createAttribute as at, createElement as e, createProducerElement, createText as t } from '../../src/element.js';
import { button, form, input } from '../../src/html-element.js';

export class TodoForm extends Component {
  /** @type {HTMLFormElement} */
  #todoForm;

  constructor() {
    super();
    const { element: todoForm, stream: $formSubmit } = createProducerElement('form', 'submit');
    this.#todoForm = todoForm;
    this.$formSubmit = $formSubmit;
  }

  render() {
    return e(this.#todoForm, [
      input(at({ type: 'text' })),
      
    ]);
  }
}
