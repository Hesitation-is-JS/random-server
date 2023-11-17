export function isObjEmpty(obj: Record<any, any> | undefined) {
  if (!obj) return false;
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isArrayEmpty(arr: any[] | undefined) {
  if (!arr) return false;
  return arr.length === 0;
}
