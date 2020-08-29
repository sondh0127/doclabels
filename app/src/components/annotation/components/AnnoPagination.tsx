import {
  taskStatsState,
  pageNumberState,
  docState,
  projectRoleState,
} from '@/contexts/atoms/annotation'
import { EuiFlexGroup, EuiFlexItem, EuiPagination, EuiPanel } from '@elastic/eui'
import React, { useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Role_Types_Enum } from '@/generated/graphql'

const AnnoPagination: React.FC = React.memo(() => {
  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState)
  const docList = useRecoilValue(docState)
  const { totalNum } = useRecoilValue(taskStatsState)
  const projectRole = useRecoilValue(projectRoleState)

  const totalNumComputer = useMemo(() => {
    switch (projectRole) {
      case Role_Types_Enum.ProjectAdmin:
        return docList.length
      case Role_Types_Enum.Annotator:
      case Role_Types_Enum.AnnotationApprover:
        return totalNum
      default:
        return 0
    }
  }, [docList, projectRole, totalNum])

  return (
    <EuiPanel>
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem grow={false}>
          <EuiPagination
            aria-label="Centered pagination example"
            pageCount={totalNumComputer}
            activePage={pageNumber}
            onPageClick={(activePage) => setPageNumber(activePage)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  )
})

AnnoPagination.displayName = 'AnnoPagination'
AnnoPagination.whyDidYouRender = true

export default AnnoPagination
