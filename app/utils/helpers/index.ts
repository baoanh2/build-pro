export function lowercaseFirstLetter(val: string) {
  return val.charAt(0).toLowerCase() + String(val).slice(1);
}
export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
