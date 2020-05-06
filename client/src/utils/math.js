export function GetRandom(min, max) {
  if (min > max) {
    let swap
    swap = min
    min = max
    max = swap
  }
  max++
  return Math.floor(Math.random() * (max - min)) + min
}