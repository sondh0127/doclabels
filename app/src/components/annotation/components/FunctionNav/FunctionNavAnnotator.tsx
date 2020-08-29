import Markdown from '@/components/Markdown'
import {
  annoListState,
  currentDocState,
  currentProjectState,
  projectRoleState,
  currentTaskState,
} from '@/contexts/atoms/annotation'
import { useSetConfirmTaskMutation } from '@/generated/graphql'
import { useDraftAnno } from '@/hooks/useDraftAnno'
import { ProjectTypes } from '@/types'
import {
  EuiButton,
  EuiButtonIcon,
  EuiButtonToggle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSpacer,
  EuiText,
} from '@elastic/eui'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import PdfLabelingProjectLabelList from '../LabelList/PdfLabelingProject'
import Seq2seqProjectLabelList from '../LabelList/Seq2seqProject'
import SequenceLabelingProjectLabelList from '../LabelList/SequenceLabelingProject'
import TextClassificationProjectLabelList from '../LabelList/TextClassificationProject'

const LabelList: Record<ProjectTypes, React.ElementType> = {
  PdfLabelingProject: PdfLabelingProjectLabelList,
  Seq2seqProject: Seq2seqProjectLabelList,
  SequenceLabelingProject: SequenceLabelingProjectLabelList,
  TextClassificationProject: TextClassificationProjectLabelList,
}

const FunctionNavAnnotator: React.FC = () => {
  const currentProject = useRecoilValue(currentProjectState)

  const LabelListComponent = useMemo<React.ElementType>(() => {
    if (currentProject) {
      return LabelList[currentProject.project_type]
    }
    return () => null
  }, [currentProject])

  const {
    presentAnno,
    pastAnno,
    futureAnno,
    undoAnno,
    redoAnno,
    resetAnno,
    saveAnno,
    loading,
  } = useDraftAnno()

  const currentTask = useRecoilValue(currentTaskState)
  const projectRole = useRecoilValue(projectRoleState)
  const annoList = useRecoilValue(annoListState)
  const [setConfirmTask, { loading: confirmTaskLoading }] = useSetConfirmTaskMutation()

  const isDisabledConfirm = useMemo(() => {
    return annoList.length <= 0 || currentTask?.is_approved
  }, [annoList.length, currentTask])

  const onChangeConfirm = useCallback(() => {
    if (currentTask && !isDisabledConfirm) {
      setConfirmTask({
        variables: {
          id: currentTask.id,
          is_confirmed: !currentTask.is_confirmed,
        },
      })
    }
  }, [currentTask, isDisabledConfirm, setConfirmTask])

  return (
    <Fragment>
      <EuiFlexItem>
        <LabelListComponent />
      </EuiFlexItem>
      <EuiHorizontalRule margin="m" />

      <EuiFlexItem grow={false}>
        <EuiText textAlign="center">History</EuiText>
        <EuiSpacer size="xs" />
        <EuiFlexGroup wrap gutterSize="none">
          <EuiFlexItem>
            <EuiButtonIcon
              aria-label="Save"
              color="primary"
              iconType="save"
              title="Save"
              iconSize="l"
              onClick={() => {
                saveAnno()
              }}
              disabled={loading || pastAnno.length === 0}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButtonIcon
              aria-label="Undo"
              iconType="editorUndo"
              title="Undo"
              iconSize="l"
              onClick={undoAnno}
              disabled={pastAnno.length === 0}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButtonIcon
              aria-label="Redo"
              iconType="editorRedo"
              title="Redo"
              iconSize="l"
              onClick={redoAnno}
              disabled={futureAnno.length === 0}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButtonIcon
              aria-label="Reset"
              iconType="refresh"
              title="Reset"
              iconSize="l"
              onClick={resetAnno}
              disabled={pastAnno.length === 0 && futureAnno.length === 0}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiSpacer size="xs" />
      <EuiFlexItem>
        <EuiButtonToggle
          size="s"
          label={currentTask?.is_confirmed ? 'Confirmed' : 'Confirm'}
          fullWidth
          disabled={isDisabledConfirm}
          iconType={currentTask?.is_confirmed ? 'checkInCircleFilled' : 'check'}
          onChange={onChangeConfirm}
          isSelected={currentTask?.is_confirmed}
        />
      </EuiFlexItem>
    </Fragment>
  )
}

export default FunctionNavAnnotator
