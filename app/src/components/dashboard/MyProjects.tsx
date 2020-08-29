import ProjectFieldSet from '@/components/ProjectFieldSet'
import {
  MyProjectsQuery,
  RoleProjectsQuery,
  Role_Types_Enum,
  useMyProjectsLazyQuery,
  useRoleProjectsLazyQuery,
  Project_Types_Enum,
} from '@/generated/graphql'
import { useUser } from '@/hooks/useUser'
import produce from 'immer'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo } from 'react'
import {
  EuiLoadingSpinner,
  EuiFlexGrid,
  EuiButton,
  EuiText,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
} from '@elastic/eui'
import NextLink from 'next/link'

export interface DashBoardVariables {
  project_types: Project_Types_Enum[]
  name_or_description: string
  role_type: Role_Types_Enum | 'mine'
}

interface CommonVariables {
  auth0_id: string
  limit: number
  offset: number
}

interface MyProjectsProps {
  filterVariables: DashBoardVariables
  hasFilters: boolean
  removeFilters: () => void
}

const MyProjects: React.FC<MyProjectsProps> = ({ filterVariables, hasFilters, removeFilters }) => {
  const router = useRouter()
  const { user } = useUser()

  const commonVariables: CommonVariables = useMemo(
    () => ({
      auth0_id: user?.sub!,
      limit: 4,
      offset: 0,
    }),
    [user?.sub],
  )

  const [query, { data, loading, fetchMore, networkStatus }] = useMyProjectsLazyQuery({
    notifyOnNetworkStatusChange: true,
  })

  const [
    queryRole,
    {
      data: dataRole,
      loading: loadingRole,
      fetchMore: fetchMoreRole,
      networkStatus: networkStatusRole,
    },
  ] = useRoleProjectsLazyQuery({
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    if (filterVariables.role_type !== 'mine') {
      queryRole({
        variables: {
          ...filterVariables,
          role_type: filterVariables.role_type,
          ...commonVariables,
        },
      })
    } else {
      const { role_type, ...variables } = filterVariables
      query({
        variables: {
          ...variables,
          ...commonVariables,
        },
      })
    }
  }, [commonVariables, filterVariables])

  const hasMore = useMemo(() => {
    if (filterVariables.role_type !== 'mine') {
      return (
        networkStatusRole !== 3 &&
        dataRole?.projects_aggregate.aggregate?.count !== dataRole?.projects.length
      )
    } else {
      return (
        networkStatus !== 3 && data?.projects_aggregate.aggregate?.count !== data?.projects.length
      )
    }
  }, [
    filterVariables.role_type,
    networkStatusRole,
    dataRole?.projects_aggregate?.aggregate?.count,
    dataRole?.projects?.length,
    networkStatus,
    data?.projects_aggregate?.aggregate?.count,
    data?.projects?.length,
  ])

  const onLoadMore = useCallback(() => {
    if (filterVariables.role_type !== 'mine') {
      fetchMoreRole({
        variables: {
          limit: 2,
          offset: dataRole?.projects.length,
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
    } else {
      fetchMore({
        variables: {
          limit: 2,
          offset: data?.projects.length,
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
    }
  }, [
    data?.projects.length,
    fetchMore,
    fetchMoreRole,
    dataRole?.projects.length,
    filterVariables.role_type,
  ])

  const renderData = useMemo<
    MyProjectsQuery['projects'] | RoleProjectsQuery['projects'] | undefined
  >(() => {
    if (filterVariables.role_type === 'mine') {
      return data?.projects
    } else {
      return dataRole?.projects
    }
  }, [data?.projects, dataRole?.projects, filterVariables.role_type])

  const onClickCallback = useCallback(
    (id: string) => {
      const roleType = filterVariables.role_type
      if (roleType === 'mine' || roleType === Role_Types_Enum.ProjectAdmin) {
        router.push(`/projects/[pid]`, `/projects/${id}`)
      } else {
        router.push(`/annotation/[pid]`, `/annotation/${id}`)
      }
    },
    [filterVariables.role_type],
  )

  const onClickExtra = useCallback((id: string) => {
    router.push(`/annotation/[pid]`, `/annotation/${id}`)
  }, [])

  const extra = useMemo(() => {
    const roleType = filterVariables.role_type
    if (roleType === 'mine' || roleType === Role_Types_Enum.ProjectAdmin) {
      return 'Review'
    } else {
      return 'Visit'
    }
  }, [filterVariables.role_type])

  const extraDescription = useCallback(
    (id: string) => {
      const roleType = filterVariables.role_type
      if (roleType === 'mine' || roleType === Role_Types_Enum.ProjectAdmin) {
        return (
          <NextLink href="/projects/[pid]" as={`/projects/${id}`}>
            <EuiLink style={{ textAlign: 'center' }} href={`/projects/${id}`}>
              Setting
            </EuiLink>
          </NextLink>
        )
      } else {
        return null
      }
    },
    [filterVariables.role_type],
  )

  return (
    <EuiFlexGroup direction="column" alignItems="center" justifyContent="center">
      <EuiFlexItem>
        <EuiFlexGrid columns={2}>
          {(renderData || []).map((item) => {
            console.log(`item`, item)
            return (
              <EuiFlexItem key={item.id}>
                <ProjectFieldSet
                  item={item}
                  extra={extra}
                  extraDescription={extraDescription(item.id)}
                  onClickExtra={() => onClickExtra(item.id)}
                />
              </EuiFlexItem>
            )
          })}
        </EuiFlexGrid>
      </EuiFlexItem>
      {(loading || loadingRole) && <EuiLoadingSpinner size="xl" />}
      {hasMore && !(loading || loadingRole) && (
        <EuiButton onClick={onLoadMore} isLoading={networkStatus === 3}>
          Load more
        </EuiButton>
      )}
      {renderData && renderData.length === 0 && (
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
  )
}

export default MyProjects
