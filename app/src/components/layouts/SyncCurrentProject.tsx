import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useProjectsByPkQuery } from '@/generated/graphql'
import { useSetRecoilState } from 'recoil'
import { currentProjectState } from '@/contexts/atoms/currentProject'

const SyncCurrentProject: React.FC = () => {
  const route = useRouter()
  const { data } = useProjectsByPkQuery({ variables: { id: route.query.pid } })
  const setCurrentProject = useSetRecoilState(currentProjectState)

  useEffect(() => {
    if (data) {
      setCurrentProject(data.projects_by_pk || null)
    }
    return () => {
      setCurrentProject(null)
    }
  }, [data])

  return null
}

export default SyncCurrentProject
