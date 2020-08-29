import { Project_Types_Enum, Order_By } from '@/autogen'
import { GQLHooks } from '@/autogen/hasura/react'
import ProjectFieldSet from '@/components/ProjectFieldSet'
import { useUser } from '@/hooks/useUser'
import { ProjectWithStatistics } from '@/types'
import {
  EuiButton,
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiSpacer,
  EuiText,
} from '@elastic/eui'
import { useDebounce } from '@umijs/hooks'
import produce from 'immer'
import { useRouter } from 'next/router'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import RequestForm from './RequestForm'
import { NetworkStatus } from '@apollo/client'

export interface ProjectsVariables {
  name_or_description: string
  project_types: Project_Types_Enum[]
}

interface MyProjectsProps {
  filterVariables: ProjectsVariables
  hasFilters: boolean
  removeFilters: () => void
}

const ProjectList: React.FC<MyProjectsProps> = ({ filterVariables, hasFilters, removeFilters }) => {
  const router = useRouter()
  const { user } = useUser()

  const { name_or_description, project_types } = useDebounce(filterVariables, 500)

  const {
    objects,
    loading,
    fetchMore,
    networkStatus,
    variables,
  } = GQLHooks.Fragments.ProjectExplore.useQueryObjects({
    variables: {
      order_by: [{ updated_at: Order_By.Desc }],
      limit: 4,
      where: {
        _and: [
          {
            _or: [
              { name: { _ilike: name_or_description } },
              { description: { _ilike: name_or_description } },
            ],
          },
          { project_type: { _in: project_types } },
          { is_public: { _eq: true } },
          { _not: { project_contributors: { user: { auth0_id: { _eq: user?.sub } } } } },
        ],
      },
    },
    notifyOnNetworkStatusChange: true,
    skip: !user,
  })
  console.log(`networkStatus`, networkStatus)

  const hasMore = useMemo(() => {
    return (
      networkStatus !== 3
      // networkStatus !== 3 && objects?.projects_aggregate.aggregate?.count !== data?.projects.length
    )
  }, [objects, networkStatus])

  const onLoadMore = useCallback(() => {
    fetchMore({
      variables: {
        limit: 2,
        where: {
          updated_at: {
            _lt: objects[objects.length - 1].updated_at,
          },
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev
        }

        const next = produce(prev, (draftState) => {
          draftState.projects.push(...fetchMoreResult.projects)
        })

        return next
      },
    })
  }, [fetchMore, objects])

  const [selectedProject, setSelectedProject] = useState<ProjectWithStatistics>()

  const isLoading = useMemo(() => {
    return loading || networkStatus === NetworkStatus.fetchMore
  }, [loading, networkStatus])

  return (
    <Fragment>
      <EuiFlexGroup direction="column" alignItems="center" justifyContent="center">
        <EuiFlexItem>
          <EuiFlexGrid columns={2}>
            {objects.map((item) => {
              const isSendRequest = item.project_notifications.length > 0

              return (
                <EuiFlexItem key={item.id}>
                  <ProjectFieldSet
                    item={item}
                    extra={isSendRequest ? 'Requested' : 'Join'}
                    onClickExtra={
                      isSendRequest
                        ? () => {
                            return
                          }
                        : () => {
                            if (user) {
                              setSelectedProject(item)
                            } else {
                              router.replace(`/api/login`)
                            }
                          }
                    }
                  />
                </EuiFlexItem>
              )
            })}
          </EuiFlexGrid>
        </EuiFlexItem>
        {isLoading && <EuiLoadingSpinner size="xl" />}
        {!isLoading && hasMore && (
          <EuiButton onClick={onLoadMore} isLoading={networkStatus === 3}>
            Load more
          </EuiButton>
        )}
        {objects.length === 0 && (
          <EuiFlexGroup alignItems="center" direction="column">
            <EuiFlexItem>
              <EuiText>No project</EuiText>
            </EuiFlexItem>
            <EuiFlexItem>
              {hasFilters && (
                <>
                  <EuiSpacer size="s" />
                  <EuiButton size="s" type="secondary" onClick={removeFilters}>
                    Remove filter
                  </EuiButton>
                </>
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
        )}
      </EuiFlexGroup>
      {selectedProject && (
        <RequestForm
          project={selectedProject}
          onClose={() => setSelectedProject(undefined)}
          variables={variables}
        />
      )}
    </Fragment>
  )
}

export default ProjectList
