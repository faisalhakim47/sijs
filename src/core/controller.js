export class Controller {
  init(options) { }
  update(options) { }
}

/** @type {Controller[]} */
export const registeredController = []

/**
 * @param {Controller} controller 
 */
export function addController(controller) {
  registeredController.push(controller)
}
