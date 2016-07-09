let uid = 0

export function getId() {
  return uid
}

export function genId() {
  return '_' + uid++
}
