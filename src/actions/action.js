export function addItem(item) {
  return ({
    type: "ADD",
    data: item
  });
}

export function inIt(items, size) {
  return ({
    type: "INIT",
    data: items,
    size: size
  });
}