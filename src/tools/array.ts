export function find(
  items: any[],
  condFn: (item, i: number) => boolean
) {
  for (let i = items.length; i--;) {
    if (condFn(items[i], i)) {
      return items[i]
    }
  }
}
