import { GlobalEvent } from '../instance/global-event'

let uid = 0

export function getId() {
  return uid
}

export function genId() {
  return '_' + uid++
}

export function resetElemId() {
  uid = 0
}
