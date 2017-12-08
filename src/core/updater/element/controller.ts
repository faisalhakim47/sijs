/**
 * extends this class to create element control filter
 * element control is object inserted in static element
 * ex. <div ${{ example: true }}></div>
 * the object will be passed as options in init and update function
 */
export class Controller {
  init(options, element: Element) {
    this.update(options, element)
  }

  update(options, element: Element) { }
}

export const registeredController: Controller[] = []

export function addController(controller: Controller) {
  registeredController.push(controller)
}
