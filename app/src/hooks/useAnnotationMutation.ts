import {
  DeleteAnnotationsMutationVariables,
  UpdateAnnotationMutationVariables,
  useDeleteAnnotationsMutation,
  useInsertAnnotationsMutation,
  useUpdateAnnotationMutation,
  InsertAnnotationsMutationVariables,
  AnnotationsQuery,
  AnnotationsDocument,
} from '@/generated/graphql'
import produce from 'immer'
import { remove } from 'lodash'
import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { currentTaskState, currentDocState } from '@/contexts/atoms/annotation'

export const useAnnotationMutation = () => {
  const currentDoc = useRecoilValue(currentDocState)
  const currentTask = useRecoilValue(currentTaskState)

  const [addAnno, { loading: addLoading }] = useInsertAnnotationsMutation()

  const addAnnotations = useCallback(
    async (newAnnos: Array<{ label_id: string; data: any }>) => {
      const annotations: InsertAnnotationsMutationVariables['annotations'] = newAnnos.map(
        (item) => ({
          ...item,
          document_id: currentDoc?.id,
          task_id: currentTask?.id,
        }),
      )
      await addAnno({
        variables: {
          annotations,
        },
        update: (cache, { data }) => {
          if (data) {
            const getExisting = cache.readQuery<AnnotationsQuery>({
              query: AnnotationsDocument,
              variables: {
                document_id: currentDoc?.id,
              },
            })

            const next = produce(getExisting?.annotations || [], (draftState) => {
              draftState.push(...(data.insert_annotations?.returning || []))
            })

            cache.writeQuery<AnnotationsQuery>({
              query: AnnotationsDocument,
              variables: {
                document_id: currentDoc?.id,
              },
              data: { annotations: next },
            })

            // Statistic
            // const getExistingS = cache.readQuery<DocumentsAnnotationQuery>({
            //   query: DocumentsAnnotationDocument,
            //   variables: { project_id: currentProject?.id },
            // })

            // const nextS = produce(getExistingS, (draftState) => {
            //   draftState!.documents = draftState!.documents.map((item) => {
            //     if (item.id === currentTask.id) {
            //       item.annotations_aggregate.aggregate!.count! += newAnnos.length
            //     }
            //     return item
            //   })
            //   draftState!.documents_aggregate.nodes = draftState!.documents_aggregate.nodes.map(
            //     (item) => {
            //       if (item.id === currentTask.id) {
            //         item.annotations_aggregate.aggregate!.count! += newAnnos.length
            //       }
            //       return item
            //     },
            //   )
            // })

            // cache.writeQuery<DocumentsAnnotationQuery>({
            //   query: DocumentsAnnotationDocument,
            //   variables: { project_id: currentProject?.id },
            //   data: nextS!,
            // })
          }
        },
      })
    },

    [currentDoc],
  )

  const [removeAnno, { loading: removeLoading }] = useDeleteAnnotationsMutation()

  const removeAnnotations = useCallback(
    async ({ ids }: DeleteAnnotationsMutationVariables) => {
      await removeAnno({
        variables: { ids },
        update: (cache, { data }) => {
          if (data) {
            const getExisting = cache.readQuery<AnnotationsQuery>({
              query: AnnotationsDocument,
              variables: {
                document_id: currentDoc?.id,
              },
            })
            const next = produce(getExisting?.annotations || [], (draftState) => {
              draftState = remove(draftState, (item) => ids.includes(item.id))
            })
            cache.writeQuery<AnnotationsQuery>({
              query: AnnotationsDocument,
              variables: {
                document_id: currentDoc?.id,
              },
              data: { annotations: next },
            })
            // Statistic
            // const getExistingS = cache.readQuery<DocumentsAnnotationQuery>({
            //   query: DocumentsAnnotationDocument,
            //   variables: { project_id: currentProject?.id },
            // })
            // const nextS = produce(getExistingS, (draftState) => {
            //   draftState!.documents = draftState!.documents.map((item) => {
            //     if (item.id === currentDoc.id) {
            //       item.annotations_aggregate.aggregate!.count! -= ids.length
            //     }
            //     return item
            //   })
            //   draftState!.documents_aggregate.nodes = draftState!.documents_aggregate.nodes.map(
            //     (item) => {
            //       if (item.id === currentDoc.id) {
            //         item.annotations_aggregate.aggregate!.count! -= ids.length
            //       }
            //       return item
            //     },
            //   )
            // })
            // cache.writeQuery<DocumentsAnnotationQuery>({
            //   query: DocumentsAnnotationDocument,
            //   variables: { project_id: currentProject?.id },
            //   data: nextS!,
            // })
          }
        },
      })
    },
    [currentDoc],
  )

  const [editAnno, { loading: editLoading }] = useUpdateAnnotationMutation()

  const editAnnotation = useCallback(async ({ id, changes }: UpdateAnnotationMutationVariables) => {
    await editAnno({
      variables: { id, changes },
    })
  }, [])

  return {
    addAnnotations,
    removeAnnotations,
    editAnnotation,
    loading: addLoading || removeLoading || editLoading,
  }
}
