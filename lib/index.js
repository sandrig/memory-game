import * as R from 'rambda'

export function allEquals(xs) {
  if (xs.length < 2) {
    return true
  }
  const [head, ...tail] = xs
  return R.all(R.equals(head), tail)
}
