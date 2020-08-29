import { PROJECT_TYPE_ICON, PROJECT_TYPE_TAG } from '@/constants'
import { Project } from '@/types'
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiFlexGrid,
  EuiText,
  EuiStat,
  EuiPanel,
} from '@elastic/eui'
import React from 'react'
import styles from './dashboard.module.scss'

export interface Statistics {
  contributors: number
  documents: number
  labels: number
}

interface DashboardHeaderProps {
  currentProject: Project
  statistics: Statistics
  loading: boolean
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentProject,
  statistics,
  loading,
}) => {
  return (
    <EuiPageContentHeader>
      <EuiPageContentHeaderSection>
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem grow={false} className={styles.projectIcon}>
            {PROJECT_TYPE_ICON[currentProject.project_type]}
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiTitle size="l">
              <h1>{currentProject.name}</h1>
            </EuiTitle>
            <div>{PROJECT_TYPE_TAG[currentProject.project_type]}</div>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentHeaderSection>

      <EuiPageContentHeaderSection>
        {currentProject.is_public && (
          <EuiFlexGrid>
            <EuiFlexItem>
              <EuiPanel style={{ width: 115 }}>
                <EuiStat
                  isLoading={loading}
                  title={statistics.labels}
                  description="Labels"
                  titleColor="danger"
                  textAlign="right"
                />
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiPanel style={{ width: 115 }}>
                <EuiStat
                  isLoading={loading}
                  title={statistics.contributors}
                  description="Contributors"
                  titleColor="primary"
                  textAlign="right"
                />
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiPanel style={{ width: 115 }}>
                <EuiStat
                  isLoading={loading}
                  title={statistics.documents}
                  description="Documents"
                  titleColor="secondary"
                  textAlign="right"
                />
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGrid>
        )}
        {!currentProject.is_public && <EuiText color="warning">Draft Status</EuiText>}
      </EuiPageContentHeaderSection>
    </EuiPageContentHeader>
  )
}

export default DashboardHeader
