import {
  docFilteredState,
  docFilterState,
  FilterType,
  pageNumberState,
  taskState,
  taskStatsState,
} from '@/contexts/atoms/annotation'
import {
  EuiCollapsibleNavGroup,
  EuiFilterButton,
  EuiFilterGroup,
  EuiFlexItem,
  EuiListGroup,
  EuiListGroupItemProps,
  EuiProgress,
  EuiSpacer,
  EuiText,
} from '@elastic/eui'
import React, { Fragment, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isUrl } from '@/utils/utils'

const CollapsibleNavAnnotator: React.FC = () => {
  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState)

  const [filter, setFilter] = useRecoilState(docFilterState)
  const docList = useRecoilValue(docFilteredState)
  const task = useRecoilValue(taskState)
  const { percentCompleted, totalCompletedNum, totalNum, totalUncompletedNum } = useRecoilValue(
    taskStatsState,
  )

  const filterHandler = (filter: FilterType) => {
    return () => {
      setPageNumber(0)
      setFilter(filter)
    }
  }

  const taskListContent = useMemo<EuiListGroupItemProps[]>(() => {
    const isConfirm = (docId: string) => {
      return task.find((item) => item.document_id === docId)?.is_confirmed
    }

    return (docList || []).map((item, i) => {
      return {
        label: (
          <EuiText size="s" className="eui-textTruncate">
            {isUrl(item.text) ? item.text.split('/').pop() : item.text}
          </EuiText>
        ),
        iconType: isConfirm(item.id) ? 'check' : 'questionInCircle',
        size: 's',
        onClick: () => setPageNumber(i),
        isActive: i === pageNumber,
      }
    })
  }, [docList, pageNumber, setPageNumber, task])

  return (
    <Fragment>
      <EuiFlexItem grow={false} style={{ flexShrink: 0 }}>
        <EuiCollapsibleNavGroup
          title="Progress"
          iconType="training"
          isCollapsible={true}
          initialIsOpen={true}
          // onToggle={(isOpen) => toggleAccordion(isOpen, 'Progress')}
        >
          <EuiText size="s" style={{ padding: 4 }}>
            Total: {`${totalCompletedNum}/${totalNum}`}
          </EuiText>
          <EuiProgress value={percentCompleted} max={100} color="secondary" size="m" />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      <EuiFlexItem className="eui-yScroll">
        {/* Docking button only for larger screens that can support it*/}
        <EuiCollapsibleNavGroup
          title={`Current: ${pageNumber + 1} of ${totalNum}`}
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
          {/* List */}
          <EuiListGroup listItems={taskListContent} />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </Fragment>
  )
}

export default CollapsibleNavAnnotator
