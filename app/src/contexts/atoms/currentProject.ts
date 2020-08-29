import { atom } from 'recoil'
import { Project, ProjectPageType } from '@/types'

export const currentProjectState = atom<Project | null>({
  key: 'currentProjectState',
  default: null,
})

export const currentProjectPageState = atom<ProjectPageType>({
  key: 'currentProjectPageState',
  default: 'dashboard',
})
