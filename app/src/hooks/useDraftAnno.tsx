import { useEffect, useCallback, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  DraftAnnoState,
  futureAnnoState,
  pastAnnoState,
  presentAnnoState,
  projectRoleState,
  currentTaskState,
} from '@/contexts/atoms/annotation'
import { useAnnotationMutation } from '@/hooks/useAnnotationMutation'
import { difference, differenceWith } from 'lodash'
import { DraftAnnotation } from '@/types'
import { useGlobalToasts } from './useGlobalToasts'
import { annoListState, currentDocState } from '@/contexts/atoms/annotation'
import { Role_Types_Enum } from '@/generated/graphql'

export const useDraftAnno = () => {
  const annoList = useRecoilValue(annoListState)
  const [presentAnno, setPresentAnno] = useRecoilState(presentAnnoState)
  const [pastAnno, setPastAnno] = useRecoilState(pastAnnoState)
  const [futureAnno, setFutureAnno] = useRecoilState(futureAnnoState)
  const { addAnnotations, removeAnnotations, editAnnotation, loading } = useAnnotationMutation()

  const currentTask = useRecoilValue(currentTaskState)
  const projectRole = useRecoilValue(projectRoleState)

  const isDisabled = useMemo(() => {
    const isAnnotator = projectRole === Role_Types_Enum.Annotator
    const isConfirmed = currentTask?.is_confirmed
    return isConfirmed || !isAnnotator
  }, [currentTask, projectRole])

  useEffect(() => {
    setPresentAnno(annoList as DraftAnnoState)

    return () => {
      setPresentAnno([])
    }
  }, [annoList])

  const undoAnno = useCallback(() => {
    const newPresent = pastAnno[pastAnno.length - 1]
    if (!newPresent) return
    setPastAnno((past) => past.slice(0, past.length - 1))
    setFutureAnno((future) => [presentAnno, ...future])
    setPresentAnno(newPresent)
  }, [pastAnno, presentAnno])

  const redoAnno = useCallback(() => {
    const newPresent = futureAnno[0]
    if (!newPresent) return
    setFutureAnno((future) => future.slice(1, future.length))
    setPastAnno((past) => [...past, presentAnno])
    setPresentAnno(newPresent)
  }, [futureAnno, presentAnno])

  const resetAnno = useCallback(() => {
    const newPresent = pastAnno[0]
    if (!newPresent) return
    setFutureAnno((future) => [...pastAnno.slice(1, pastAnno.length), presentAnno, ...future])
    setPresentAnno(newPresent)
    setPastAnno([])

    // setPresentAnno(annoList as DraftAnnoState)
  }, [annoList, pastAnno, presentAnno])

  const onNewPresent = useCallback(() => {
    setPastAnno((past) => [...past, presentAnno])
    setFutureAnno([])
  }, [presentAnno])

  const addAnno = useCallback(
    (newAnno: DraftAnnotation) => {
      if (!isDisabled) {
        onNewPresent()
        setPresentAnno((present) => [...present, newAnno])
      }
    },
    [onNewPresent, isDisabled],
  )

  const removeAnno = useCallback(
    (id: string) => {
      if (!isDisabled) {
        onNewPresent()
        setPresentAnno((present) => present.filter((item) => item.id !== id))
      }
    },
    [onNewPresent, isDisabled],
  )

  const editAnno = useCallback(
    (editedAnno: DraftAnnotation) => {
      if (!isDisabled) {
        onNewPresent()
        setPresentAnno((present) => {
          const index = present.findIndex((item) => item.id === editedAnno.id)
          return [...present.slice(0, index), editedAnno, ...present.slice(index + 1)]
        })
      }
    },
    [onNewPresent, isDisabled],
  )

  const addedAnnoList = useMemo(() => {
    if (annoList) {
      return differenceWith(presentAnno, annoList, (a, b) => a.id === b.id)
    }
    return []
  }, [presentAnno, annoList])

  const deletedAnnoList = useMemo(() => {
    if (annoList) {
      return differenceWith(annoList, presentAnno, (a, b) => a.id === b.id)
    }
    return []
  }, [presentAnno, annoList])

  const editedAnnoList = useMemo(() => {
    if (annoList) {
      return difference(difference(presentAnno, annoList), addedAnnoList)
    }
    return []
  }, [presentAnno, annoList, addedAnnoList])

  const { error, success } = useGlobalToasts()

  const saveAnno = useCallback(async () => {
    if (!isDisabled) {
      try {
        if (addedAnnoList.length > 0) {
          const annos: {
            label_id: string
            data: any
          }[] = addedAnnoList.map((anno) => ({
            label_id: anno.label_id,
            data: anno.data,
          }))
          await addAnnotations(annos)
        }

        if (deletedAnnoList.length > 0) {
          removeAnnotations({ ids: deletedAnnoList.map((item) => item.id) })
        }

        if (editedAnnoList.length > 0) {
          for await (const element of editedAnnoList) {
            editAnnotation({ id: element.id, changes: { data: element.data } })
          }
        }

        success({ title: 'Saved annotation successfully !' })
      } catch (err) {
        error({ title: 'Saved failed. Try again.' })
      }
    }
  }, [addedAnnoList, deletedAnnoList, editedAnnoList, isDisabled])

  return {
    presentAnno,
    pastAnno,
    futureAnno,
    undoAnno,
    redoAnno,
    addAnno,
    removeAnno,
    editAnno,
    resetAnno,
    saveAnno,
    loading,
  }
}

export default useDraftAnno
