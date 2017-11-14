/**
 * extends this class to create element control filter
 * element control is object inserted in static element
 * ex. <div ${{ example: true }}></div>
 * the object will be passed as options in init and update function
 */
export class Controller {
  /**
   * @param {*} options 
   * @param {Node} node 
   */
  init(options, node) { }
  /**
   * @param {*} options 
   * @param {Node} node 
   */
  update(options, node) { }
}

/** @type {Controller[]} */
export const registeredController = []

/**
 * @param {Controller} controller 
 */
export function addController(controller) {
  registeredController.push(controller)
}
