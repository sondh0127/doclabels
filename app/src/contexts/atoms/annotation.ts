import { atom, selector } from 'recoil'
import {
  Label,
  RoleTypes,
  Annotation,
  Project,
  DocumentAnnotation,
  DraftAnnotation,
  TaskAnnotation,
} from '@/types'
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list'
import {
  Role_Types_Enum,
  TaskDistributionFragment,
  DocumentsDownloadQuery,
} from '@/generated/graphql'

export const selectedLabelState = atom<Label | undefined>({
  key: 'selectedLabelState',
  default: undefined,
})

export const selectedAnnotationState = atom<DraftAnnotation | null>({
  key: 'selectedAnnotationState',
  default: null,
})

export const projectRoleState = atom<RoleTypes>({
  key: 'projectRoleState',
  default: Role_Types_Enum.Annotator,
})

export const versionIdState = atom<string>({
  key: 'versionIdState',
  default: 'all',
})

export const isApprovedState = atom<boolean>({
  key: 'isApprovedState',
  default: false,
})

export const exportFormatState = atom<'json' | 'csv' | 'txt'>({
  key: 'exportFormatState',
  default: 'json',
})

export const currentProjectState = atom<Project | null>({
  key: 'currentProjectState',
  default: null,
})

export const docState = atom<DocumentAnnotation[]>({
  key: 'docState',
  default: [],
})

export type FilterType = 'all' | 'active' | 'completed'

export const docFilterState = atom<FilterType>({
  key: 'docFilterState',
  default: 'all',
})

export const taskState = atom<Array<TaskAnnotation>>({
  key: 'taskState',
  default: [],
})

export const docFilteredState = selector<DocumentAnnotation[]>({
  key: 'docFilteredState',
  get: ({ get }) => {
    const docList = get(docState)
    const docFilter = get(docFilterState)
    const taskList = get(taskState)

    switch (docFilter) {
      case 'active':
        return docList.filter((doc) => {
          const task = taskList.find((item) => item.document_id === doc.id)
          return !task?.is_confirmed
        })
      case 'completed':
        return docList.filter((doc) => {
          const task = taskList.find((item) => item.document_id === doc.id)
          return task?.is_confirmed
        })
      default:
        return docList
    }
  },
})

export const taskStatsState = selector({
  key: 'taskStatsState',
  get: ({ get }) => {
    const list = get(taskState)
    const totalNum = list.length
    const totalCompletedNum = list.filter((item) => item.is_confirmed).length
    const totalUncompletedNum = totalNum - totalCompletedNum
    const percentCompleted = totalNum === 0 ? 0 : Math.floor((totalCompletedNum / totalNum) * 100)

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    }
  },
})

export const downloadDocState = atom<DocumentsDownloadQuery['documents']>({
  key: 'downloadDocState',
  default: [],
})

export const labelState = atom<Label[]>({
  key: 'labelState',
  default: [],
})

export const pageNumberState = atom({
  key: 'pageNumberState',
  default: 0,
})

export const currentDocState = selector<DocumentAnnotation | null>({
  key: 'currentDocState',
  get: ({ get }) => {
    const pageNumber = get(pageNumberState)
    const docs = get(docState)

    return docs[pageNumber]
  },
})

export const currentTaskState = selector<TaskDistributionFragment | undefined>({
  key: 'currentTaskState',
  get: ({ get }) => {
    const currentDoc = get(currentDocState)
    const taskList = get(taskState)

    return taskList.find((item) => item.document_id === currentDoc?.id)
  },
})

export const annoListState = atom<Annotation[]>({
  key: 'annoListState',
  default: [],
})

// isDisabled: boolean,
export type DraftAnnoState = DraftAnnotation[]

export const presentAnnoState = atom<DraftAnnoState>({
  key: 'presentAnnoState',
  default: [],
})

export const pastAnnoState = atom<DraftAnnoState[]>({
  key: 'pastAnnoState',
  default: [],
})

export const futureAnnoState = atom<DraftAnnoState[]>({
  key: 'futureAnnoState',
  default: [],
})

export const globalAnnoToastListState = atom<Toast[]>({
  key: 'globalAnnoToastListState',
  default: [],
})
