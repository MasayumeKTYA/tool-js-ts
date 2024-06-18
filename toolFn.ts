//计算年龄
export function calAge(str: string) {
  const y = Number(str.split('-')[0])
  const m = Number(str.split('-')[1])
  const d = Number(str.split('-')[2])
  const curDate = new Date();
  const curYears = curDate.getFullYear();
  const curMonth = curDate.getMonth() + 1;
  const curDay = curDate.getDate();
  let age = curYears - y
  switch (true) {
    case curMonth < m:
      age -= 1
      break
    case curMonth < m:
      break
    case curMonth === m:
      if (curDay <= d) {
        age -= 1
      }
      break
  }
  return age
}
//两种判空
const isEmpty = <T>(val: T) => {
  const arr = [0, '', null, undefined]
  return arr.some(item => item === val)
}
const isNotEmpty = <T>(val: T) => {
  const arr = [0, '', null, undefined]
  return arr.every(item => item !== val)
}
