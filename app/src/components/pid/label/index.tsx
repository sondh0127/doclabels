import { currentProjectState } from '@/contexts/atoms/currentProject'
import LabelPreview from '@/components/label-preview'
import { PAGE_SIZE } from '@/constants'
import { useDeleteLabelMutation, useLabelsQuery } from '@/generated/graphql'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import { Label } from '@/types'
import {
  EuiAccordion,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiConfirmModal,
  EuiOverlayMask,
} from '@elastic/eui'
import { CriteriaWithPagination } from '@elastic/eui/src/components/basic_table/basic_table'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import CreateForm from '@/components/pid/label/CreateForm'

const LabelPage: NextPage = () => {
  const currentProject = useRecoilValue(currentProjectState)

  const [deleteLabel] = useDeleteLabelMutation()

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [totalItemCount, setTotalItemCount] = useState(0)

  const { data, loading, refetch } = useLabelsQuery({
    variables: {
      project_id: currentProject?.id,
      limit: pageSize,
      offset: pageIndex * pageSize,
    },
  })

  const [toDeleteLabel, setToDeleteLabel] = useState<Label | null>(null)
  const [toUpdateLabel, setToUpdateLabel] = useState<Label | null>(null)

  const { success, error } = useGlobalToasts()

  const onDelete = useCallback(async () => {
    if (toDeleteLabel) {
      try {
        const resDelete = await deleteLabel({
          variables: { id: toDeleteLabel.id },
        })

        if (resDelete.data?.delete_labels_by_pk) {
          success({ title: 'Delete complete!' })
          if (data?.labels.length === 1) {
            setPageIndex((page) => Math.max(page - 1, 0))
          }
          refetch()
        } else {
          error({
            title: 'Oops, there was an error',
            text: <p>You cannot delete document after publishing!</p>,
          })
        }
        setToDeleteLabel(null)
      } catch (err) {
        error({
          title: 'Oops, there was an error',
          text: <p>Something wrong. Try again!</p>,
        })
        setToDeleteLabel(null)
      }
    }
  }, [toDeleteLabel, data?.labels?.length])

  const onEdit = useCallback(async (item: Label) => {
    // try {
    //   const resDelete = await deleteLabel({
    //     variables: { id: item.id },
    //   })
    //   refetch()
    //   if (resDelete.data?.delete_labels_by_pk) {
    //     success({
    //       title: 'Delete complete!',
    //     })
    //   } else {
    //     error({
    //       title: 'Oops, there was an error',
    //       text: <p>You cannot delete document after publishing!</p>,
    //     })
    //   }
    // } catch (err) {
    //   error({
    //     title: 'Oops, there was an error',
    //     text: <p>Something wrong. Try again!</p>,
    //   })
    // }
  }, [])

  useEffect(() => {
    if (data?.labels_aggregate.aggregate?.count) {
      setTotalItemCount(data?.labels_aggregate.aggregate?.count)
    }
  }, [data?.labels_aggregate.aggregate?.count])

  const columns: Array<EuiBasicTableColumn<Label>> = [
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
      field: 'text',
      name: 'Text',
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      field: 'hotkey',
      name: 'Hotkey',
      truncateText: true,
      mobileOptions: {
        show: false,
      },
      // eslint-disable-next-line react/display-name
      render: (_value, record) => <EuiCode>{record.hotkey.toUpperCase()}</EuiCode>,
    },
    {
      field: 'color',
      name: 'Color',
      truncateText: true,
      mobileOptions: {
        show: false,
      },
      // eslint-disable-next-line react/display-name
      render: (_value, record) => <LabelPreview label={record} />,
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Edit',
          isPrimary: true,
          description: 'Edit this label',
          icon: 'pencil',
          type: 'icon',
          onClick: onEdit,
        },
        {
          name: 'Delete',
          description: 'Delete this label',
          icon: 'trash',
          type: 'icon',
          color: 'danger',
          onClick: (item) => setToDeleteLabel(item),
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

  const onTableChange = useCallback(({ page, sort }: CriteriaWithPagination<Label>) => {
    const { index: pageIndex, size: pageSize } = page

    // const { field: sortField, direction: sortDirection } = sort

    setPageIndex(pageIndex)
    setPageSize(pageSize)
    // setSortField(sortField)
    // setSortDirection(sortDirection)
  }, [])

  return (
    <>
      <Head>
        <title>Project Labels</title>
      </Head>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="m">
              <h1>Label Manager</h1>
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
                        <h3>Add label</h3>
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
            <EuiBasicTable<Label>
              loading={loading}
              items={data?.labels || []}
              columns={columns}
              pagination={pagination}
              hasActions={true}
              onChange={onTableChange}
            />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>

      {toDeleteLabel && (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do you sure to delete label"
            onCancel={() => setToDeleteLabel(null)}
            onConfirm={() => onDelete()}
            cancelButtonText="No, don't do it"
            confirmButtonText="Yes, do it"
            buttonColor="danger"
            defaultFocusedButton="confirm"
          />
        </EuiOverlayMask>
      )}
      {/* {toUpdateLabel && (
        <UpdateForm
          modalVisible={Boolean(toUpdateLabel)}
          onCancel={closeUpdateModal}
          initialValues={currentLabel}
          onSubmit={() => {
            closeUpdateModal()
          }}
        />
      )} */}
    </>
  )
}

export default LabelPage
