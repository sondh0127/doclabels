import { parse } from 'querystring'
import uuid from 'uuid'

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string) => reg.test(path)

export const getPageQuery = (href: string) => parse(href.split('?')[1])
export const getPageSearch = (href: string) => `?${href.split('?')[1]}`

// ==============================================================================================
// Get graphql error constraint from message
export const getConstraintError = (message: string): string => {
  console.log(`message`, message)
  // TODO: Check if not GraphQL Error:
  const constraint = message.match(/\"(.*?)\"/)
  return constraint ? constraint[1] : 'Unknown error'
}

// ==============================================================================================
// Other
export const pageToOffset = (page: number, pageSize: number): number =>
  page ? (page - 1) * pageSize : 0

export const offsetToPage = (offset: number, pageSize: number): number =>
  offset ? Math.ceil(offset / pageSize) + 1 : 1

// ==============================================================================================

export const isValidHex = (color: string): boolean => {
  if (!color || typeof color !== 'string') return false

  // Validate hex values
  if (color.substring(0, 1) === '#') color = color.substring(1)

  switch (color.length) {
    case 3:
      return /^[0-9A-F]{3}$/i.test(color)
    case 6:
      return /^[0-9A-F]{6}$/i.test(color)
    default:
      return false
  }
}
// ==============================================================================================
export const arrayToMap = <T extends Record<string, any>>(array: T[], indexKey: keyof T) => {
  return new Map(array.map((item) => [item[indexKey], item] as [string, T]))
}

export const arrayToDictObj = <T extends Record<string, any>>(array: T[], indexKey: keyof T) => {
  return array.reduce((map, obj) => {
    map[obj[indexKey]] = obj
    return map
  }, {} as Record<string, T>)
}

// ==============================================================================================
export const getContrastYIQ = (hexcolor: string) => {
  const r = parseInt(hexcolor.substr(0, 2), 16)
  const g = parseInt(hexcolor.substr(2, 2), 16)
  const b = parseInt(hexcolor.substr(4, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}

// ==============================================================================================
export const getRandomUUID = () => {
  return uuid.v4()
}
// ==============================================================================================

export const getLinkPath = (path: string, pid: string | string[] | undefined) => {
  if (pid && !Array.isArray(pid)) {
    return path.replace(`[pid]`, pid)
  }
  return path
}
