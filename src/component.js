/**
 * @interface
 */
export class Component {
  /**
   * @abstract
   * @returns {Element}
   */
  render() {
    throw new Error('Not implemented');
  }
}
