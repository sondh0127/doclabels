import { currentProjectState } from '@/contexts/atoms/currentProject'
import { PAGE_SIZE } from '@/constants'
import { useDeleteDocumentMutation, useDocumentsQuery } from '@/generated/graphql'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import { Document } from '@/types'
import {
  EuiAccordion,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiOverlayMask,
  EuiConfirmModal,
  EuiText,
} from '@elastic/eui'
import { CriteriaWithPagination } from '@elastic/eui/src/components/basic_table/basic_table'
import Head from 'next/head'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import CreateForm from './CreateForm'

const ProjectTask: React.FC<{}> = () => {
  const currentProject = useRecoilValue(currentProjectState)

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [totalItemCount, setTotalItemCount] = useState(0)

  const { data, loading, refetch } = useDocumentsQuery({
    variables: {
      project_id: currentProject?.id,
      limit: pageSize,
      offset: pageIndex * pageSize,
    },
  })

  const [deleteDocument, { loading: deleteLoading }] = useDeleteDocumentMutation()
  const [toDelete, setToDelete] = useState<Document | null>(null)

  const { success, error } = useGlobalToasts()

  const onDelete = useCallback(async () => {
    if (toDelete) {
      try {
        const resDelete = await deleteDocument({ variables: { id: toDelete.id } })
        if (resDelete.data?.delete_documents_by_pk) {
          if (data?.documents.length === 1) {
            setPageIndex((page) => Math.max(page - 1, 0))
          }
          refetch()

          success({
            title: 'Delete complete!',
          })
        } else {
          error({
            title: 'Oops, there was an error',
            text: <p>You cannot delete document after publishing!</p>,
          })
        }
        setToDelete(null)
      } catch (err) {
        error({
          title: 'Oops, there was an error',
          text: <p>Something wrong. Try again!</p>,
        })
      }
    }
  }, [data?.documents?.length, toDelete])

  useEffect(() => {
    if (data?.documents_aggregate.aggregate?.count) {
      setTotalItemCount(data?.documents_aggregate.aggregate?.count)
    }
  }, [data?.documents_aggregate.aggregate?.count])

  const columns: Array<EuiBasicTableColumn<Document>> = [
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
      name: 'Content',
      truncateText: true,
      mobileOptions: {
        show: false,
      },
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Delete',
          description: 'Delete this document',
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

  const onTableChange = useCallback(({ page, sort }: CriteriaWithPagination<Document>) => {
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
        <title>Project Documents</title>
        {/* Bug: add document before has any contributor */}
      </Head>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="m">
              <h1>Document Manager</h1>
            </EuiTitle>
            <EuiText>
              Total documents: <strong>{totalItemCount}</strong>
            </EuiText>
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
                        <h3>Import document</h3>
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
            <EuiBasicTable<Document>
              loading={loading}
              items={data?.documents || []}
              columns={columns}
              pagination={pagination}
              hasActions={true}
              onChange={onTableChange}
            />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>

      {/* Overpage */}
      {toDelete && (
        <EuiOverlayMask>
          <EuiConfirmModal
            title="Do you sure to delete document"
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

export default ProjectTask
