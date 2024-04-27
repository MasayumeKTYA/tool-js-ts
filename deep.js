const hashMap = {
  "[object Number]": (value) => value,
  "[object String]": (value) => value,
  "[object Null]": (value) => value,
  "[object Undefined]": (value) => value,
  "[object Boolean]": (value) => value,
  "[object Array]": (value) => deepArrClone(value),
  "[object Object]": (value) => deepObjectClone(value),
  "[object Map]": (value) => deepMapClone(value),
  "[object Set]": (value) => deepSetClone(value),
}
function deepObjectClone(obj) {
  const newObj = {}
  for (keys in obj) {
    const value = obj[keys]
    const type = Object.prototype.toString.call(value)
    newObj[keys] = hashMap[type](value)
  }
  return newObj
}
function deepArrClone(arr) {
  const newArr = new Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    const type = Object.prototype.toString.call(value)
    newArr[keys] = hashMap[type](value)
  }
  return newArr
}
function deepMapClone(map) {
  const newMap = new Map()
  map.forEach((values, keys) => {
    const type = Object.prototype.toString.call(values)
    newMap.set(keys, hashMap[type](values))
  })
  return newMap
}
function deepSetClone(set) {
  const newSet = new Set()
  set.forEach(value => {
    const type = Object.prototype.toString.call(item)
    newSet.add(hashMap[type](value))
  })
  return newSet
}