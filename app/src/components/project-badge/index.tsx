import React from 'react'
import { EuiBadge, isColorDark, hexToRgb } from '@elastic/eui'
import { PROJECT_TYPE_LABLE, PROJECT_TYPE_COLOR } from '@/constants'
import { Project_Types_Enum } from '@/generated/graphql'

interface ProjectBadgeProps {
  projectType: Project_Types_Enum
}

const ProjectBadge: React.FC<ProjectBadgeProps> = ({ projectType }) => {
  return (
    <EuiBadge color={PROJECT_TYPE_COLOR[projectType]}>
      {isColorDark(...hexToRgb(PROJECT_TYPE_COLOR[projectType])) ? (
        <span style={{ color: 'white' }}>{PROJECT_TYPE_LABLE[projectType]}</span>
      ) : (
        <span style={{ color: 'black' }}>{PROJECT_TYPE_LABLE[projectType]}</span>
      )}
    </EuiBadge>
  )
}

export default ProjectBadge
