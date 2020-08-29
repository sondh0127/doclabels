import styles from '@/components/projects/dashboard/dashboard.module.scss'
import DashboardHeader, { Statistics } from '@/components/projects/dashboard/DashboardHeader'
import PublishedContent from '@/components/projects/dashboard/PublishedContent'
import UnPublishedContent from '@/components/projects/dashboard/UnPublishedContent'
import { currentProjectState } from '@/contexts/atoms/currentProject'
import { useProjectDashboardQuery } from '@/generated/graphql'
import { EuiPageBody, EuiPageContent, EuiLoadingContent } from '@elastic/eui'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useMemo, Fragment } from 'react'
import { useRecoilValue } from 'recoil'

const Dashboard: NextPage = () => {
  const currentProject = useRecoilValue(currentProjectState)

  const { data, loading } = useProjectDashboardQuery({
    variables: { project_id: currentProject?.id },
  })

  const percent = useMemo(() => {
    const total =
      data?.documents_aggregate.aggregate?.count! * currentProject?.annotator_per_example!
    const done = data?.documents_aggregate.nodes.filter(
      (n) => n.annotations_aggregate.aggregate?.count,
    ).length!

    return Math.min(Math.floor((done / total) * 100), 100)
  }, [data, currentProject])

  const statistics = useMemo<Statistics>(() => {
    return {
      contributors: data?.project_contributors_aggregate.aggregate?.count || 0,
      documents: data?.documents_aggregate.aggregate?.count || 0,
      labels: data?.labels_aggregate.aggregate?.count || 0,
    }
  }, [data])

  const isPublishedDisabled = useMemo(() => !statistics.documents || !statistics.labels, [
    statistics,
  ])

  return (
    <>
      {!currentProject && <EuiLoadingContent lines={3} />}
      {currentProject && (
        <Fragment>
          <Head>
            <title>Project Dashboard</title>
          </Head>
          <EuiPageBody>
            <EuiPageContent>
              <DashboardHeader
                currentProject={currentProject}
                loading={loading}
                statistics={statistics}
              />
            </EuiPageContent>
            <EuiPageContent className={styles.content}>
              {!currentProject.is_public && (
                <UnPublishedContent statistics={statistics} currentProject={currentProject} />
              )}
              {currentProject.is_public && (
                <PublishedContent
                  currentProject={currentProject}
                  data={data}
                  loading={loading}
                  percent={percent}
                />
              )}
            </EuiPageContent>
          </EuiPageBody>
        </Fragment>
      )}
    </>
  )
}

export default Dashboard
