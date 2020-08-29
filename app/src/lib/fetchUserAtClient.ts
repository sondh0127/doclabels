import { User } from '@/types'

/**
 * Global user state; should only ever be used client-side; server-side, fetching from session.
 */
let userState: User | null = null

export default async function fetchUserAtClient(profilePath = '/api/profile', force = false) {
  if (typeof window === 'undefined')
    throw new Error('Must never be called server-side as this will intermingle sessions.')

  if (userState != null && !force) {
    return userState
  }

  const res = await fetch(profilePath)
  userState = res.ok ? await res.json() : null
  return userState
}