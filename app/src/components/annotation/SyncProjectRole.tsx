import React, { useEffect } from 'react'
import { useUser } from '@/hooks/useUser'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { projectRoleState, currentProjectState } from '@/contexts/atoms/annotation'
import { Role_Types_Enum } from '@/generated/graphql'

const SyncIsProjectAdmin: React.FC = () => {
  const { user } = useUser()
  const currentProject = useRecoilValue(currentProjectState)
  const setProjectRole = useSetRecoilState(projectRoleState)

  useEffect(() => {
    const isOwner = currentProject?.user.auth0_id === user?.sub

    const myContributor = currentProject?.project_contributors?.find(
      (item) => item.user.auth0_id === user?.sub,
    )

    if (isOwner) {
      setProjectRole(Role_Types_Enum.ProjectAdmin)
    }
    if (myContributor) {
      setProjectRole(myContributor?.role_type)
    }
    return () => {
      setProjectRole(Role_Types_Enum.Annotator)
    }
  }, [currentProject, user])

  return null
}

export default SyncIsProjectAdmin
