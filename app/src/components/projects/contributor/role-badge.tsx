import React from 'react'
import { EuiBadge, isColorDark, hexToRgb } from '@elastic/eui'
import { ROLE_COLORS, ROLE_LABELS } from '@/constants'
import { Role_Types_Enum } from '@/generated/graphql'

interface RoleBadgeProps {
  role: Role_Types_Enum
}

const RoleBadge: React.FC<RoleBadgeProps> = React.memo(({ role }) => {
  return (
    <EuiBadge color={ROLE_COLORS[role]}>
      {isColorDark(...hexToRgb(ROLE_COLORS[role])) ? (
        <div style={{ color: 'white' }}>{ROLE_LABELS[role]}</div>
      ) : (
        <div style={{ color: 'black' }}>{ROLE_LABELS[role]}</div>
      )}
    </EuiBadge>
  )
})

RoleBadge.displayName = 'RoleBadge'

export default RoleBadge
