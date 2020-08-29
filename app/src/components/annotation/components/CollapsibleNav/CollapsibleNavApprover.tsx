import React, { Fragment, useState, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  pageNumberState,
  docState,
  taskState,
  FilterType,
  docFilterState,
} from '@/contexts/atoms/annotation'
import { DocumentAnnotation } from '@/types'
import {
  EuiListGroupItemProps,
  EuiText,
  EuiFlexItem,
  EuiCollapsibleNavGroup,
  EuiProgress,
  EuiFilterGroup,
  EuiFilterButton,
  EuiSpacer,
  EuiListGroup,
} from '@elastic/eui'

const CollapsibleNavApprover: React.FC = () => {
  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState)

  const [filter, setFilter] = useRecoilState(docFilterState)
  const docList = useRecoilValue(docState)
  const task = useRecoilValue(taskState)

  const filterHandler = (filter: FilterType) => {
    return () => setFilter(filter)
  }

  const total = docList.length
  // const done = docList.filter((item) => item.is_confirmed).length

  const taskListContent: EuiListGroupItemProps[] = useMemo(() => {
    const isConfirm = (docId: string) => {
      return task.find((item) => item.document_id === docId)?.is_confirmed
    }
    return (docList || []).map((item, i) => {
      return {
        label: (
          <EuiText size="s" className="eui-textTruncate">
            {item.text}
          </EuiText>
        ),
        iconType: isConfirm(item.id) ? 'check' : 'questionInCircle',
        size: 's',
        onClick: () => setPageNumber(i),
      }
    })
  }, [docList, setPageNumber])
  return (
    <Fragment>
      <EuiFlexItem className="eui-yScroll">
        <EuiCollapsibleNavGroup
          title={`Current: ${pageNumber + 1} of ${total}`}
          iconType="training"
          isCollapsible={true}
          initialIsOpen={true}
          // onToggle={(isOpen) => toggleAccordion(isOpen, 'DocList')}
        >
          <EuiFilterGroup fullWidth={true}>
            <EuiFilterButton
              withNext
              hasActiveFilters={filter === 'all'}
              onClick={filterHandler('all')}
            >
              All
            </EuiFilterButton>
            <EuiFilterButton
              withNext
              hasActiveFilters={filter === 'active'}
              onClick={filterHandler('active')}
            >
              Active
            </EuiFilterButton>
            <EuiFilterButton
              hasActiveFilters={filter === 'completed'}
              onClick={filterHandler('completed')}
            >
              Confirmed
            </EuiFilterButton>
          </EuiFilterGroup>
          <EuiSpacer size="s" />
          <EuiListGroup listItems={taskListContent} />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </Fragment>
  )
}

export default CollapsibleNavApprover
