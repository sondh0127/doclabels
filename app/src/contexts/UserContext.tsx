import { User } from '@/types'
import { createContext } from 'react'

export type UserState = Readonly<{
  user: User | null
  loading: boolean
}>

export const UserContext = createContext<UserState>({ user: null, loading: false })
