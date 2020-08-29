import {
  projectRoleState,
  currentProjectState,
  selectedAnnotationState,
} from '@/contexts/atoms/annotation'
import { Role_Types_Enum } from '@/generated/graphql'
import React, { Fragment, useState, useMemo } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import FunctionNavAdmin from './FunctionNav/FunctionNavAdmin'
import FunctionNavAnnotator from './FunctionNav/FunctionNavAnnotator'
import FunctionNavApprover from './FunctionNav/FunctionNavApprover'
import {
  EuiPageSideBar,
  EuiPanel,
  EuiFlexItem,
  EuiButton,
  EuiHorizontalRule,
  EuiText,
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiSpacer,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiTitle,
  EuiFlyoutBody,
  EuiFlexGroup,
  EuiCode,
  EuiButtonIcon,
  EuiFlyoutFooter,
  EuiButtonEmpty,
} from '@elastic/eui'
import styles from './FunctionNav/function-nav.module.scss'
import Markdown from '@/components/Markdown'
import PdfLabelingProject from './DraftList/PdfLabelingProject'
import Seq2seqProject from './DraftList/Seq2seqProject'
import SequenceLabelingProject from './DraftList/SequenceLabelingProject'
import TextClassificationProject from './DraftList/TextClassificationProject'
import { ProjectTypes } from '@/types'

const FunctionNavComponents: Record<Role_Types_Enum, React.ElementType> = {
  [Role_Types_Enum.Annotator]: FunctionNavAnnotator,
  [Role_Types_Enum.AnnotationApprover]: FunctionNavApprover,
  [Role_Types_Enum.ProjectAdmin]: FunctionNavAdmin,
}

const DraftList: Record<ProjectTypes, React.ElementType> = {
  PdfLabelingProject,
  Seq2seqProject,
  SequenceLabelingProject,
  TextClassificationProject,
}

const FunctionNav: React.FC = () => {
  const currentProject = useRecoilValue(currentProjectState)
  const role = useRecoilValue(projectRoleState)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const FunctionNavComponent = FunctionNavComponents[role]

  const DraftListComponent = useMemo<React.ElementType>(() => {
    if (currentProject) {
      return DraftList[currentProject.project_type]
    }
    return () => null
  }, [currentProject])
  const [selectedAnnotation, setSelectedAnnotation] = useRecoilState(selectedAnnotationState)

  const content = useMemo(() => {
    if (selectedAnnotation?.data) {
    }
  }, [selectedAnnotation])

  return (
    <Fragment>
      <EuiPageSideBar className={styles.functionBar}>
        <EuiPanel>
          <EuiFlexItem grow={false}>
            <EuiButton type="default" iconType="apmTrace" onClick={() => setIsModalVisible(true)}>
              <EuiText>Guidelines</EuiText>
            </EuiButton>
          </EuiFlexItem>
          <EuiHorizontalRule margin="m" />

          <FunctionNavComponent />

          <DraftListComponent />
        </EuiPanel>
      </EuiPageSideBar>
      {/* Modal */}
      {isModalVisible && (
        <EuiOverlayMask>
          <EuiModal onClose={() => setIsModalVisible(false)} initialFocus="[name=popswitch]">
            <EuiModalHeader>
              <EuiModalHeaderTitle>Annotation Guideline</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <Markdown markdownSrc={currentProject?.guideline} />
            </EuiModalBody>
          </EuiModal>
        </EuiOverlayMask>
      )}
      {selectedAnnotation && (
        <EuiFlyout onClose={() => setSelectedAnnotation(null)} size="s">
          <EuiFlyoutHeader hasBorder aria-labelledby={'Annotation List'}>
            <EuiTitle>
              <h2 id={'Annotation List'}>Annotation Detail</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            {selectedAnnotation.data.type === 'PdfLabelingAnnotation' && (
              <EuiPanel key={selectedAnnotation.id}>
                {selectedAnnotation.data.contents.text && (
                  <EuiPanel paddingSize="s">
                    <EuiText>
                      {selectedAnnotation.data.contents.text.length > 90
                        ? `${selectedAnnotation.data.contents.text.slice(0, 90).trim()}…`
                        : `${selectedAnnotation.data.contents.text}`}
                    </EuiText>
                  </EuiPanel>
                )}
                {selectedAnnotation.data.contents.image && (
                  <EuiPanel>
                    <img src={selectedAnnotation.data.contents.image} alt="Screenshot" />
                  </EuiPanel>
                )}
                <EuiSpacer size="xs" />
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiCode>Page {selectedAnnotation.data.pageNumber + 1}</EuiCode>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButtonIcon
                      iconType="cross"
                      // disabled={item.is_submit}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPanel>
            )}
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  iconType="cross"
                  onClick={() => setSelectedAnnotation(null)}
                  flush="left"
                >
                  Close
                </EuiButtonEmpty>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </EuiFlyout>
      )}
    </Fragment>
  )
}

export default FunctionNav
