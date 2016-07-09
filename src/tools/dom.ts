export function $(selector) {
  return document.querySelector(selector)
}

export function $$(selector) {
  return document.querySelectorAll(selector)
}

export function $id(id) {
  return document.getElementById(id)
}
