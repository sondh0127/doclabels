import { PROJECT_TYPE_ICON } from '@/constants'
import { ProjectWithStatistics } from '@/types'
import { EuiButton, EuiCard, EuiCode, EuiFlexGroup, EuiFlexItem, EuiText } from '@elastic/eui'
import moment from 'moment'
import React, { useMemo } from 'react'
import ProjectBadge from '../project-badge'

export interface Statistics {
  tasks: number
  done: number
  contributors: number
  documents: number
  labels: number
}

interface ProjectFieldSetProps {
  item: ProjectWithStatistics
  extra?: string
  extraDescription?: React.ReactNode
  onClickExtra: () => void
}

const ProjectFieldSet: React.FC<ProjectFieldSetProps> = ({
  item,
  extra,
  onClickExtra,
  extraDescription,
}) => {
  const statistics = useMemo<Statistics>(() => {
    const labels = item.labels_aggregate.aggregate?.count!
    const contributors = item.project_contributors_aggregate.aggregate?.count!
    const documents = item.documents_aggregate.aggregate?.count!
    const tasks = item.documents_aggregate.nodes.reduce(
      (result, curr) => result + curr.task_distributions.length,
      0,
    )
    const done = item.documents_aggregate.nodes.reduce(
      (result, curr) => result + curr.task_distributions.filter((item) => item.is_approved).length,
      0,
    )

    return {
      tasks,
      done,
      contributors,
      documents,
      labels,
    }
  }, [item])

  return (
    <EuiCard
      layout="vertical"
      icon={<span>{PROJECT_TYPE_ICON[item.project_type]}</span>}
      title={`${item.name}`}
      description={
        <span>
          <ProjectBadge projectType={item.project_type} />
        </span>
      }
      footer={
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFlexGroup justifyContent="center" gutterSize="l" alignItems="center">
              <EuiCode>
                <EuiText size="xs" color="subdued">
                  {statistics.labels} labels
                </EuiText>
              </EuiCode>
              <EuiCode>
                <EuiText size="xs" color="subdued">
                  {statistics.contributors} contributors
                </EuiText>
              </EuiCode>
              <EuiCode>
                <EuiText size="xs" color="subdued">
                  {statistics.documents} documents
                </EuiText>
              </EuiCode>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={false} onClick={onClickExtra}>
            <EuiButton>{extra}</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      }
    >
      <EuiFlexGroup direction="column" gutterSize="m">
        {extraDescription && <EuiFlexItem grow={false}>{extraDescription}</EuiFlexItem>}
        <EuiFlexItem>
          <EuiText size="xs">Update {moment(item.created_at).fromNow()}</EuiText>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCode>
            <EuiText size="s" color="secondary">
              {item.description}
            </EuiText>
          </EuiCode>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiFlexGroup justifyContent="center" gutterSize="l" alignItems="center">
            <EuiCode>
              <EuiText size="xs" color="accent">
                {statistics.tasks} {Number(statistics.tasks) === 1 ? ' task' : ' tasks'}
              </EuiText>
            </EuiCode>
            <EuiCode>
              <EuiText size="xs" color="warning">
                {statistics.done} done
              </EuiText>
            </EuiCode>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiCard>
  )
}

export default ProjectFieldSet
