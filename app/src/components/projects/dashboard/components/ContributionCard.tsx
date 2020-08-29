import { ProjectDashboardQuery } from '@/generated/graphql'
import { EuiFlexGroup, EuiFlexItem, EuiTabbedContent } from '@elastic/eui'
import React, { useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'

interface ContributionCardProps {
  loading?: boolean
  data?: ProjectDashboardQuery
}

type TabTypes = 'documents' | 'labels' | 'contributors'

const ContributionCard: React.FC<ContributionCardProps> = ({ loading, data }) => {
  const labelData = useMemo(() => {
    const labels = data?.labels_aggregate.nodes.map((label) => label.text)
    const datasets = data?.labels_aggregate.nodes.map(
      (label) => label.annotations_aggregate.aggregate?.count,
    )
    const backgroundColor = data?.labels_aggregate.nodes.map((label) => `${label.color}33`)
    const borderColor = data?.labels_aggregate.nodes.map((label) => label.color)
    return {
      labels: labels,
      datasets: [
        {
          label: '# of Annotations',
          data: datasets,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    }
  }, [data])

  const docData = useMemo(() => {
    const labels = data?.documents_aggregate.nodes.map((doc) => `${doc.text.slice(0, 7)}...`)
    const datasets = data?.documents_aggregate.nodes.map(
      (doc) => doc.annotations_aggregate.aggregate?.count,
    )
    const backgroundColor = `rgba(54, 162, 235, 0.2)`
    const borderColor = `rgba(54, 162, 235, 1)`
    return {
      labels: labels,
      datasets: [
        {
          label: '# of Annotations',
          data: datasets,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    }
  }, [data])

  const contributorData = useMemo(() => {
    const labels = data?.project_contributors_aggregate.nodes.map((contr) => contr.user.name)
    const datasets = data?.project_contributors_aggregate.nodes.map(
      (cont) => cont.user.annotations_aggregate.aggregate?.count,
    )
    const backgroundColor = `rgba(255, 99, 132, 0.2)`
    const borderColor = `rgba(255, 99, 132, 1)`
    return {
      labels: labels,
      datasets: [
        {
          label: '# of Annotations',
          data: datasets,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ],
    }
  }, [data])

  /* Docs progress  remaining/total */
  const tabs = [
    {
      id: 'labels',
      name: 'Labels',
      content: (
        <EuiFlexGroup>
          <EuiFlexItem>
            <Bar
              data={labelData}
              width={400}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
    {
      id: 'contributors',
      name: 'Contributors',
      content: (
        <EuiFlexGroup>
          <EuiFlexItem>
            <Bar
              data={contributorData}
              width={400}
              height={300}
              options={{ maintainAspectRatio: false }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
    {
      id: 'documents',
      name: 'Documents',
      content: (
        <EuiFlexGroup>
          <EuiFlexItem>
            <Bar data={docData} width={400} height={300} options={{ maintainAspectRatio: false }} />
          </EuiFlexItem>
        </EuiFlexGroup>
      ),
    },
  ]

  return <EuiTabbedContent initialSelectedTab={tabs[0]} autoFocus="selected" tabs={tabs} />
}

export default ContributionCard
