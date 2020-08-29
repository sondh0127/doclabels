import { Project } from '@/types'
import React from 'react'
import ContributionCard from './components/ContributionCard'
import { ProjectDashboardQuery } from '@/generated/graphql'
import { EuiFlexGroup, EuiFlexItem, EuiText, EuiCallOut, EuiLink } from '@elastic/eui'

import Link from 'next/link'

interface PublishedContentProps {
  currentProject: Project
  data?: ProjectDashboardQuery
  loading: boolean
  percent: number
}

const PublishedContent: React.FC<PublishedContentProps> = ({
  currentProject,
  data,
  loading,
  percent,
}) => {
  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem>
        <EuiCallOut title="Review and export labeled data" color="success" iconType="usersRolesApp">
          <Link href="/annotation/[pid]" as={`/annotation/${currentProject.id}`}>
            <EuiLink href={`/annotation/${currentProject.id}`}>Go to Annotation</EuiLink>
          </Link>
        </EuiCallOut>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup>
          <EuiFlexItem>
            <ContributionCard data={data} loading={loading} />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup>{/* <EuiText size="s">Project progress</EuiText> */}</EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default PublishedContent
