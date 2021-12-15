export const isObject = (obj: unknown) => {
  return obj !== null && typeof obj === 'object'
}