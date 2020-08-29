import SwitchTheme from '@/components/layouts/switch_theme'
import HeaderUserMenu from '@/components/layouts/HeaderUserMenu'
import Logo from '@/components/layouts/logo'
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiHeaderBreadcrumbs,
} from '@elastic/eui'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useMemo, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import styles from '@/components/annotation/annotation.module.scss'
import SyncProjectRole from '@/components/annotation/SyncProjectRole'
import CollapsibleNav from '@/components/annotation/components/CollapsibleNav'
import FunctionNav from '@/components/annotation/components/FunctionNav'
import { useToastsComponent } from '@/hooks/useGlobalToasts'
import { ProjectTypes } from '@/types'
import PdfLabelingProject from '@/components/annotation/components/AnnotationArea/PdfLabelingProject'
import Seq2seqProject from '@/components/annotation/components/AnnotationArea/Seq2seqProject'
import SequenceLabelingProject from '@/components/annotation/components/AnnotationArea/SequenceLabelingProject'
import TextClassificationProject from '@/components/annotation/components/AnnotationArea/TextClassificationProject'
import SyncApolloState from '@/components/annotation/SyncApolloState'
import { useUser } from '@/hooks/useUser'
import Head from 'next/head'
import { currentProjectState } from '@/contexts/atoms/annotation'
import { parseCookies } from 'nookies'

const AnnotationArea: Record<ProjectTypes, React.ElementType> = {
  PdfLabelingProject,
  Seq2seqProject,
  SequenceLabelingProject,
  TextClassificationProject,
}

interface AnnotationProps {
  defaultNavIsDocked: boolean
}

const Annotation: NextPage<AnnotationProps> = ({ defaultNavIsDocked }) => {
  const router = useRouter()
  const currentProject = useRecoilValue(currentProjectState)

  const { user, loading: userLoading } = useUser()

  useEffect(() => {
    if (!user && !userLoading) {
      router.push('/api/login')
    }
  }, [user, userLoading])

  const AnnotationAreaComponent = useMemo(() => {
    if (currentProject) {
      return AnnotationArea[currentProject.project_type]
    }
    return () => null
  }, [currentProject])

  const renderBreadcrumbs = () => {
    const breadcrumbs = [
      {
        text: 'Dashboard',
        href: '#',
        onClick: (e) => {
          router.push('/dashboard')
        },
        'data-test-subj': 'breadcrumbsAnimals',
        className: 'customClass',
      },
      {
        text: `${currentProject?.name}`,
        href: '#',
        onClick: (e) => {
          console.log('You clicked users')
        },
      },
      {
        text: `annotation`,
        href: '#',
        onClick: (e) => {
          console.log('You clicked annotation')
        },
      },
    ]

    return <EuiHeaderBreadcrumbs breadcrumbs={breadcrumbs} />
  }

  const ToastList = useToastsComponent()

  return (
    <>
      <Head>
        <title>Annotation Editor</title>
      </Head>
      <SyncApolloState />
      <SyncProjectRole />
      <EuiHeader position="fixed">
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem border="right">
            <CollapsibleNav defaultNavIsDocked={defaultNavIsDocked} />

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
      <EuiPage restrictWidth={1310}>
        <EuiPageBody component="div">
          <EuiPageContent style={{ height: `calc(100vh - 49px - 32px)` }}>
            <AnnotationAreaComponent />
          </EuiPageContent>
        </EuiPageBody>
        <FunctionNav />
      </EuiPage>
      <ToastList />
    </>
  )
}

Annotation.getInitialProps = async function (ctx) {
  const cookies = parseCookies(ctx)
  return { defaultNavIsDocked: cookies.navAnnoIsDocked === 'true' }
}

export default Annotation
