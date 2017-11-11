import { Expression } from '../2_expression/expression.js'
import { List } from '../../tools/list.js'

export class Updater {
  static filter() { }
  static map() { }
  update() { }
}

const updaterList = new List()

/**
 * @param {typeof Expression} expressionBase
 * @return {(typeof Updater)[]}
 */
export function getUpdatersFor(expressionBase) {
  return updaterList.get(expressionBase)
}

/**
 * @param {typeof Expression} expressionBase
 * @param {typeof Updater} updater
 */
export function addUpdaterFor(expressionBase, updater) {
  const updaters = getUpdatersFor(expressionBase)
  if (Array.isArray(updaters)) updaters.push(updater)
  else updaterList.set(expressionBase, [updater])
}
