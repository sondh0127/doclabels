import HeaderUserMenu from '@/components/layouts/HeaderUserMenu'
import Logo from '@/components/layouts/logo'
import LeftCollapsibleNav from '@/components/layouts/project-layout/LeftCollapsibleNav'
import styles from '@/components/layouts/project.module.scss'
import SwitchTheme from '@/components/layouts/switch_theme'
import SyncCurrentProject from '@/components/layouts/SyncCurrentProject'
import Contributor from '@/components/pid/contributor'
import Dashboard from '@/components/projects/Dashboard'
import Document from '@/components/pid/document'
import Guide from '@/components/pid/guide'
import Label from '@/components/pid/label'
import Setting from '@/components/pid/setting'
import { currentProjectPageState, currentProjectState } from '@/contexts/atoms/currentProject'
import { useToastsComponent } from '@/hooks/useGlobalToasts'
import { useUser } from '@/hooks/useUser'
import { ProjectPageType } from '@/types'
import {
  Breadcrumb,
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiPage,
} from '@elastic/eui'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

const renderSearch = () => (
  <EuiHeaderSectionItemButton aria-label="Search">
    <EuiIcon type="search" size="m" />
  </EuiHeaderSectionItemButton>
)

const PAGES: Record<ProjectPageType, React.ElementType> = {
  contributor: Contributor,
  dashboard: Dashboard,
  document: Document,
  guide: Guide,
  label: Label,
  setting: Setting,
}

interface ProjectProps {
  defaultNavIsDocked: boolean
}

const Project: NextPage<ProjectProps> = ({ defaultNavIsDocked }) => {
  const [currentPage, setCurrentPage] = useRecoilState(currentProjectPageState)
  const Component = useMemo(() => PAGES[currentPage], [currentPage])
  const currentProject = useRecoilValue(currentProjectState)

  const router = useRouter()
  const { user, loading: userLoading } = useUser()
  useEffect(() => {
    if (!user && !userLoading) {
      router.push('/api/login')
    }
  }, [user, userLoading])

  useEffect(() => {
    return () => {
      setCurrentPage('dashboard')
    }
  }, [])

  const renderBreadcrumbs = () => {
    const breadcrumbs: Breadcrumb[] = [
      {
        text: 'Dashboard',
        href: '#',
        onClick: (e) => {
          e.preventDefault()
          router.push('/dashboard')
        },
        'data-test-subj': 'breadcrumbsDashboard',
      },
      {
        text: `${currentProject?.name}`,
        href: '#',
        onClick: (e) => {
          e.preventDefault()
          setCurrentPage('dashboard')
        },
      },
    ]

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
  }

  const ToastList = useToastsComponent()

  return (
    <>
      <SyncCurrentProject />
      <EuiHeader position="fixed">
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem border="right">
            <LeftCollapsibleNav defaultNavIsDocked={defaultNavIsDocked} />

            <Logo onClick={() => router.push('/')} />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem border="right">{/* <HeaderSpacesMenu /> */}</EuiHeaderSectionItem>
        </EuiHeaderSection>
        {renderBreadcrumbs()}

        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem className={styles.switchTheme}>
            <SwitchTheme />
          </EuiHeaderSectionItem>
          {/* <EuiHeaderSectionItem>{renderSearch()}</EuiHeaderSectionItem> */}

          <EuiHeaderSectionItem>
            <HeaderUserMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>

      <div className={styles.wrap}>
        <EuiPage restrictWidth={1140}>
          <Component />
          <ToastList />
        </EuiPage>
      </div>
    </>
  )
}

Project.getInitialProps = async function (ctx) {
  const cookies = parseCookies(ctx)
  return { defaultNavIsDocked: cookies.navIsDocked === 'true' }
}

export default Project
