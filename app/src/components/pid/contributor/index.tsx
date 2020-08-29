import { PAGE_SIZE, ROLE_COLORS, ROLE_LABELS } from '@/constants'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import CreateForm from '@/components/projects/contributor/CreateForm'
import { ProjectContributor } from '@/types'
import {
  useProjectContributorsQuery,
  useDeleteProjectContributorsMutation,
  useTaskDistributionAggregateQuery,
} from '@/generated/graphql'
import UserRequestList from '@/components/projects/contributor/UserRequestList'
import { currentProjectState } from '@/contexts/atoms/currentProject'
import { useRecoilValue } from 'recoil'

import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiPageContent,
  EuiPageContentBody,
  EuiAccordion,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiCode,
  EuiBadge,
  isColorDark,
  hexToRgb,
  EuiOverlayMask,
  EuiConfirmModal,
  EuiSpacer,
} from '@elastic/eui'
import Head from 'next/head'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import { CriteriaWithPagination } from '@elastic/eui/src/components/basic_table/basic_table'
import RoleBadge from '../../projects/contributor/role-badge'

const Contributor: React.FC<{}> = () => {
  const currentProject = useRecoilValue(currentProjectState)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [totalItemCount, setTotalItemCount] = useState(0)

  const { data, loading, refetch } = useProjectContributorsQuery({
    variables: {
      project_id: currentProject?.id,
      limit: pageSize,
      offset: pageIndex * pageSize,
    },
  })

  const [taskDistributions, setTaskDistributions] = useState<
    Array<{ user_id: string; task_num: number }>
  >([])

  console.log(`taskDistributions`, taskDistributions)
  const { data: taskData, refetch: refetchTaskData } = useTaskDistributionAggregateQuery({
    variables: {
      project_id: currentProject?.id,
    },
  })

  useEffect(() => {
    setTaskDistributions(
      taskData?.project_contributors.map((item) => {
        return {
          user_id: item.user.id!,
          task_num: item.user.task_distributions_aggregate.aggregate?.count!,
        }
      }) || [],
    )
  }, [taskData])

  const [deleteContributor] = useDeleteProjectContributorsMutation()

  const [toDelete, setToDelete] = useState<ProjectContributor | null>(null)

  const { success, error } = useGlobalToasts()

  const onDelete = useCallback(async () => {
    if (toDelete) {
      try {
        const resDelete = await deleteContributor({ variables: { id: toDelete.id } })
        if (resDelete.data?.delete_project_contributors_by_pk) {
          if (data?.project_contributors.length === 1) {
            setPageIndex((page) => Math.max(page - 1, 0))
          }
          refetch()

          success({ title: 'Delete complete!' })
        } else {
          error({ title: 'Oops, there was an error' })
        }
        setToDelete(null)
      } catch (err) {
        error({
          title: 'Oops, there was an error',
          text: <p>Something wrong. Try again!</p>,
        })
      }
    }
  }, [data?.project_contributors?.length, toDelete])

  useEffect(() => {
    if (data?.project_contributors_aggregate.aggregate?.count) {
      setTotalItemCount(data?.project_contributors_aggregate.aggregate?.count)
    }
  }, [data?.project_contributors_aggregate.aggregate?.count])

  const columns: Array<EuiBasicTableColumn<ProjectContributor>> = [
    {
      field: 'id',
      name: 'ID',
      truncateText: true,
      hideForMobile: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'user',
      name: 'Username',
      truncateText: true,
      mobileOptions: {
        show: false,
      },
      // eslint-disable-next-line react/display-name
      render: (_value, record) => <EuiCode>{record.user.name}</EuiCode>,
    },
    {
      field: 'role_type',
      name: 'Role',
      truncateText: true,
      mobileOptions: {
        show: false,
      },
      // eslint-disable-next-line react/display-name
      render: (_value, record) => <RoleBadge role={record.role_type} />,
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Delete',
          description: 'Remove this contributor',
          icon: 'trash',
          type: 'icon',
          color: 'danger',
          onClick: (item) => setToDelete(item),
        },
      ],
    },
  ]

  const pagination = useMemo(
    () => ({
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalItemCount: totalItemCount,
      pageSizeOptions: [5, 10, 15],
    }),
    [pageIndex, pageSize, totalItemCount],
  )

  const onTableChange = useCallback(
    ({ page, sort }: CriteriaWithPagination<ProjectContributor>) => {
      const { index: pageIndex, size: pageSize } = page

      // const { field: sortField, direction: sortDirection } = sort

      setPageIndex(pageIndex)
      setPageSize(pageSize)
      // setSortField(sortField)
      // setSortDirection(sortDirection)
    },
    [],
  )

  return (
    <>
      <Head>
        <title>Contributors Manager</title>
      </Head>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="m">
              <h1>Contributors Manager</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          {/* <EuiPageContentHeader>
              <EuiPageContentHeaderSection></EuiPageContentHeaderSection>
            </EuiPageContentHeader> */}
          <EuiPageContentBody>
            <EuiAccordion
              id="accordionForm1"
              className="euiAccordionForm"
              buttonClassName="euiAccordionForm__button"
              buttonContent={
                <div>
                  <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
                    <EuiFlexItem grow={false}>
                      <EuiIcon type="logoWebhook" size="m" />
                    </EuiFlexItem>

                    <EuiFlexItem>
                      <EuiTitle size="s" className="euiAccordionForm__title">
                        <h3>Add Contributor</h3>
                      </EuiTitle>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </div>
              }
              paddingSize="l"
            >
              <CreateForm
                onSubmit={() => {
                  refetch()
                }}
              />
            </EuiAccordion>
          </EuiPageContentBody>
          <EuiPageContentBody>
            <EuiBasicTable<ProjectContributor>
              loading={loading}
              items={data?.project_contributors || []}
              columns={columns}
              pagination={pagination}
              hasActions={true}
              onChange={onTableChange}
            />
          </EuiPageContentBody>
        </EuiPageContent>

        <EuiSpacer />
        <UserRequestList
          onSubmit={() => {
            refetch()
          }}
        />
      </EuiPageBody>
      {toDelete && (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do you sure to remove contributor"
            onCancel={() => setToDelete(null)}
            onConfirm={() => onDelete()}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            buttonColor="danger"
            defaultFocusedButton="confirm"
          />
        </EuiOverlayMask>
      )}
    </>
  )
}

export default Contributor
