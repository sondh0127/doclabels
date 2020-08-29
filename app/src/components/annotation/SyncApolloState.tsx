import {
  annoListState,
  currentProjectState,
  labelState,
  projectRoleState,
  versionIdState,
  docState,
  currentDocState,
  isApprovedState,
  downloadDocState,
  selectedLabelState,
  docFilterState,
  taskState,
} from '@/contexts/atoms/annotation'
import {
  Role_Types_Enum,
  useAnnotationsLazyQuery,
  useLabelsQuery,
  useProjectsByPkQuery,
  useDocumentsAnnotationLazyQuery,
  useDocumentsDownloadLazyQuery,
} from '@/generated/graphql'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

const SyncApolloState: React.FC = () => {
  const router = useRouter()
  const { pid } = router.query

  const setProjectState = useSetRecoilState(currentProjectState)

  const { data, loading } = useProjectsByPkQuery({ variables: { id: pid } })

  useEffect(() => {
    setProjectState(data?.projects_by_pk || null)
    return () => {
      setProjectState(null)
    }
  }, [data?.projects_by_pk])

  // Document
  const [queryDoc, { data: docData, loading: docLoading }] = useDocumentsAnnotationLazyQuery()

  const projectRole = useRecoilValue(projectRoleState)
  const versionUserId = useRecoilValue(versionIdState)

  useEffect(() => {
    if (projectRole === Role_Types_Enum.AnnotationApprover) {
      queryDoc({ variables: { project_id: pid, user_id: versionUserId } })
    }
    if (projectRole === Role_Types_Enum.Annotator) {
      queryDoc({ variables: { project_id: pid } })
    }
    if (projectRole === Role_Types_Enum.ProjectAdmin) {
      queryDoc({
        variables: {
          project_id: pid,
        },
      })
    }
  }, [pid, projectRole, versionUserId])

  const setDoc = useSetRecoilState(docState)
  const setTask = useSetRecoilState(taskState)

  useEffect(() => {
    setDoc(docData?.documents || [])
    setTask(docData?.task_distribution || [])
    return () => {
      setDoc([])
      setTask([])
    }
  }, [docData])

  // Label
  const { data: labelData, loading: labelLoading } = useLabelsQuery({
    variables: { project_id: pid },
  })

  const setLabel = useSetRecoilState(labelState)
  const setSelectedLabel = useSetRecoilState(selectedLabelState)

  useEffect(() => {
    setLabel(labelData?.labels || [])
    setSelectedLabel(labelData?.labels[0])
    return () => {
      setLabel([])
      setSelectedLabel(undefined)
    }
  }, [labelData?.labels])

  const currentDoc = useRecoilValue(currentDocState)
  const isApprovedAnno = useRecoilValue(isApprovedState)

  const setAnnoList = useSetRecoilState(annoListState)
  // Annotation List

  const [queryAnno, { data: annoData, loading: annoLoading }] = useAnnotationsLazyQuery()

  useEffect(() => {
    if (currentDoc) {
      const variables: {
        document_id: string
        user_id?: string
        is_approved?: boolean
      } = {
        document_id: currentDoc.id,
      }
      if (versionUserId !== 'all') {
        variables['user_id'] = versionUserId
      }
      if (isApprovedAnno) {
        variables['is_approved'] = isApprovedAnno
      }
      queryAnno({
        variables: variables,
      })
    }
  }, [currentDoc, isApprovedAnno, versionUserId])

  useEffect(() => {
    setAnnoList(annoData?.annotations || [])
    return () => {
      setAnnoList([])
    }
  }, [annoData])

  // Document Download
  const [
    queryDocDown,
    { data: docDownData, loading: docDownLoading },
  ] = useDocumentsDownloadLazyQuery()

  useEffect(() => {
    if (projectRole === Role_Types_Enum.AnnotationApprover) {
      queryDocDown({ variables: { project_id: pid, user_id: versionUserId } })
    }
    if (projectRole === Role_Types_Enum.Annotator) {
      queryDocDown({ variables: { project_id: pid } })
    }
    if (projectRole === Role_Types_Enum.ProjectAdmin) {
      const variables: {
        project_id: string
        user_id?: string
        is_approved?: boolean
      } = {
        project_id: pid as string,
      }
      if (versionUserId !== 'all') {
        variables['user_id'] = versionUserId
      }
      if (isApprovedAnno) {
        variables['is_approved'] = isApprovedAnno
      }

      queryDocDown({
        variables: variables,
      })
    }
  }, [pid, projectRole, versionUserId])

  const setDocDown = useSetRecoilState(downloadDocState)

  useEffect(() => {
    setDocDown(docDownData?.documents || [])
    return () => {
      setDocDown([])
    }
  }, [docDownData])

  return null
}

export default SyncApolloState
