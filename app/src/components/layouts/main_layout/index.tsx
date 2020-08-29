import { useUser } from '@/hooks/useUser'
import {
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHorizontalRule,
  EuiIcon,
  EuiNavDrawer,
  EuiNavDrawerGroup,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiFlexGroup,
} from '@elastic/eui'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import HeaderUserMenu from '../HeaderUserMenu'
import { buildMainLinks } from '../main_links'
import SwitchTheme from '../switch_theme'
import { buildTopLinks } from '../top_links'
import styles from './main_layout.module.scss'
import Logo from '../logo'

const renderSearch = () => (
  <EuiHeaderSectionItemButton aria-label="Search">
    <EuiIcon type="search" size="m" />
  </EuiHeaderSectionItemButton>
)

const renderBreadcrumbs = () => {
  const breadcrumbs = [
    {
      text: 'Management',
      href: '#',
      onClick: (e) => {
        e.preventDefault()
        console.log('You clicked management')
      },
      'data-test-subj': 'breadcrumbsAnimals',
      className: 'customClass',
    },
    {
      text: 'Users',
      href: '#',
      onClick: (e) => {
        e.preventDefault()
        console.log('You clicked users')
      },
    },
  ]

  return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
}

const MainLayout: React.FC = ({ children }) => {
  const router = useRouter()

  const isActiveLink = (path: string) => {
    return path === router.route
  }

  return (
    <>
      <EuiHeader position="fixed">
        <EuiFlexGroup justifyContent="spaceBetween" className={styles.header}>
          <EuiHeaderSection grow={false}>
            <EuiHeaderSectionItem border="right">
              <Logo onClick={() => router.push('/')} />
            </EuiHeaderSectionItem>
            <EuiHeaderSectionItem border="right">
              <EuiHeaderLinks>
                <EuiHeaderLink
                  iconType="home"
                  // href="/"
                  isActive={isActiveLink('/')}
                  onClick={() => router.push('/')}
                >
                  Home
                </EuiHeaderLink>
                <EuiHeaderLink
                  iconType="search"
                  // href="/explore"
                  isActive={isActiveLink('/explore')}
                  onClick={() => router.push('/explore')}
                >
                  Explore
                </EuiHeaderLink>
                <EuiHeaderLink
                  iconType="tableOfContents"
                  // href="/dashboard"
                  isActive={isActiveLink('/dashboard')}
                  onClick={() => router.push('/dashboard')}
                >
                  Dashboard
                </EuiHeaderLink>
              </EuiHeaderLinks>
            </EuiHeaderSectionItem>
          </EuiHeaderSection>
          <EuiHeaderSection side="right">
            <EuiHeaderSectionItem className={styles.switchTheme}>
              <SwitchTheme />
            </EuiHeaderSectionItem>
            {/* <EuiHeaderSectionItem>{renderSearch()}</EuiHeaderSectionItem> */}

            <EuiHeaderSectionItem>
              <HeaderUserMenu />
            </EuiHeaderSectionItem>
          </EuiHeaderSection>
        </EuiFlexGroup>
      </EuiHeader>

      <div className={styles.wrap}>{children}</div>
    </>
  )
}

export default MainLayout
