import { currentProjectPageState } from '@/contexts/atoms/currentProject'
import { ProjectPageType } from '@/types'
import {
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiShowFor,
} from '@elastic/eui'
import dynamic from 'next/dynamic'
import { setCookie } from 'nookies'
import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { buildProjectLinks } from './build-project-links'

const EuiCollapsibleNav = dynamic(
  () => import('@elastic/eui').then((mod) => mod.EuiCollapsibleNav),
  {
    ssr: false,
  },
)

interface LeftCollapsibleNavProps {
  defaultNavIsDocked: boolean
}

const LeftCollapsibleNav: React.FC<LeftCollapsibleNavProps> = ({ defaultNavIsDocked }) => {
  const [navIsOpen, setNavIsOpen] = useState(true)

  const [navIsDocked, setNavIsDocked] = useState(defaultNavIsDocked)

  useEffect(() => {
    setCookie(null, 'navIsDocked', `${navIsDocked}`, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }, [navIsDocked])

  const setCurrentPage = useSetRecoilState(currentProjectPageState)

  const buildOnClick = (path: string) => () => setCurrentPage(path as ProjectPageType)
  // router.push(`/projects/[pid]/${path}`, `/projects/${pid}/${path}`)

  return (
    <EuiCollapsibleNav
      aria-label="Left navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      style={{ maxWidth: `15vw` }}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}
        >
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
    >
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiListGroup
          aria-label="Settings"
          maxWidth="none"
          color="subdued"
          size="s"
          listItems={buildProjectLinks(buildOnClick)}
        />
      </EuiFlexItem>
      <EuiShowFor sizes={['l', 'xl']}>
        <EuiCollapsibleNavGroup>
          <EuiListGroupItem
            size="xs"
            color="subdued"
            label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
            onClick={() => {
              setNavIsDocked(!navIsDocked)
            }}
            iconType={navIsDocked ? 'lock' : 'lockOpen'}
          />
        </EuiCollapsibleNavGroup>
      </EuiShowFor>
    </EuiCollapsibleNav>
  )
}

export default LeftCollapsibleNav
