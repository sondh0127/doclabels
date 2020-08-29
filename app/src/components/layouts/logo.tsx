import React from 'react'
import { EuiHeaderLogo } from '@elastic/eui'
import LogoIcon from '@/components/Icons/LogoIcon'

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <EuiHeaderLogo iconType={LogoIcon} onClick={onClick} aria-label="Goes to home">
    DocLabels
  </EuiHeaderLogo>
)

export default Logo
