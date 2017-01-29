
let id = Math.round(Math.random() * 1000000) + Date.now();

export function uniqueGlobalId() {
  return id;
}
