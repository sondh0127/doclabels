import React, { useState, useCallback } from 'react'
import {
  EuiHeaderSectionItemButton,
  EuiAvatar,
  EuiPopover,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiLink,
  EuiIcon,
  EuiButton,
  EuiHeaderLink,
  EuiHeaderSectionItem,
} from '@elastic/eui'

import { useUser } from '@/hooks/useUser'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const HeaderUserMenu: React.FC = () => {
  const { user, loading } = useUser()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }
  if (!user) {
    return (
      <EuiHeaderSectionItem>
        <EuiHeaderLink href="#" onClick={() => router.push('/api/login')}>
          Login
        </EuiHeaderLink>
      </EuiHeaderSectionItem>
    )
  }

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls="headerUserMenu"
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar name={user.name} size="s" imageUrl={user.picture} />
    </EuiHeaderSectionItemButton>
  )

  return (
    <EuiPopover
      id="headerUserMenu"
      ownFocus
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup gutterSize="m" className="euiHeaderProfile" responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiAvatar name={user.name} size="xl" imageUrl={user.picture} />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>{user.nickname}</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <NextLink href="/dashboard">
                      <EuiLink>Dashboard</EuiLink>
                    </NextLink>
                  </EuiFlexItem>

                  <EuiFlexItem grow={false}>
                    <NextLink href="/api/logout">
                      <EuiLink>Log out</EuiLink>
                    </NextLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  )
}

export default HeaderUserMenu
