import { useContext, useEffect, useState } from 'react'
import { UserContext, UserState } from '@/contexts/UserContext'
import fetchUserAtClient from '@/lib/fetchUserAtClient'

/**
 * Ensures you get the user that is available, if there's a user available.
 */
export function useUser(force = false, log = false): UserState {
  const ctxUser = useContext(UserContext)

  const [userState, setUserState] = useState({
    user: ctxUser.user,
    loading: ctxUser.user == null,
    hasFetched: ctxUser.user != null && !force,
  })

  useEffect(() => {
    if (log) console.info('useUser effect called')

    async function fetcher() {
      const found = await fetchUserAtClient('/api/profile', force)
      if (log) console.info('useUser effect client-side fetch =>', found)

      setUserState({
        user: found,
        loading: false,
        hasFetched: true,
      })
    }

    if (!userState.hasFetched) {
      fetcher()
    }
  }, [userState, setUserState, force, log])

  if (log) console.info('useUser =>', userState)
  return userState
}
