import React, { useMemo, Fragment } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { docState, pageNumberState, taskState } from '@/contexts/atoms/annotation'
import {
  EuiListGroupItemProps,
  EuiText,
  EuiListGroup,
  EuiFlexItem,
  EuiCollapsibleNavGroup,
} from '@elastic/eui'
import { isUrl } from '@/utils/utils'

interface CollapsibleNavAdminProps {}

const CollapsibleNavAdmin: React.FC<CollapsibleNavAdminProps> = () => {
  const docList = useRecoilValue(docState)
  const task = useRecoilValue(taskState)

  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState)

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

  const totalNum = docList.length

  return (
    <Fragment>
      <EuiFlexItem className="eui-yScroll">
        {/* Docking button only for larger screens that can support it*/}
        <EuiCollapsibleNavGroup
          title={`Current: ${pageNumber + 1} of ${totalNum}`}
          iconType="training"
          isCollapsible={true}
          initialIsOpen={true}
        >
          {/* List */}
          <EuiListGroup listItems={taskListContent} />
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
    </Fragment>
  )
}

export default CollapsibleNavAdmin
