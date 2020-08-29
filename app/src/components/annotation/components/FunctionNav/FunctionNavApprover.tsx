import React, { useState, useMemo, Fragment, ReactNode, useCallback, useEffect } from 'react'
import {
  EuiPageSideBar,
  EuiButton,
  EuiHorizontalRule,
  EuiIcon,
  EuiText,
  EuiModal,
  EuiOverlayMask,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
  EuiPanel,
  EuiSpacer,
  EuiTextAlign,
  EuiButtonToggle,
  EuiSuperSelect,
} from '@elastic/eui'
import { ProjectTypes } from '@/types'
import PdfLabelingProject from '../DraftList/PdfLabelingProject'
import Seq2seqProject from '../DraftList/Seq2seqProject'
import SequenceLabelingProject from '../DraftList/SequenceLabelingProject'
import TextClassificationProject from '../DraftList/TextClassificationProject'

import PdfLabelingProjectLabelList from '../LabelList/PdfLabelingProject'
import Seq2seqProjectLabelList from '../LabelList/Seq2seqProject'
import SequenceLabelingProjectLabelList from '../LabelList/SequenceLabelingProject'
import TextClassificationProjectLabelList from '../LabelList/TextClassificationProject'

import { useDraftAnno } from '@/hooks/useDraftAnno'
import Markdown from '@/components/Markdown'
import { useRecoilValue, useRecoilState } from 'recoil'
import {
  currentProjectState,
  annoListState,
  currentDocState,
  currentTaskState,
} from '@/contexts/atoms/annotation'
import {
  useSetConfirmTaskMutation,
  Role_Types_Enum,
  useSetApproveTaskMutation,
} from '@/generated/graphql'
import { projectRoleState, versionIdState } from '@/contexts/atoms/annotation'

const DraftList: Record<ProjectTypes, React.ElementType> = {
  PdfLabelingProject,
  Seq2seqProject,
  SequenceLabelingProject,
  TextClassificationProject,
}

const LabelList: Record<ProjectTypes, React.ElementType> = {
  PdfLabelingProject: PdfLabelingProjectLabelList,
  Seq2seqProject: Seq2seqProjectLabelList,
  SequenceLabelingProject: SequenceLabelingProjectLabelList,
  TextClassificationProject: TextClassificationProjectLabelList,
}
interface FunctionNavApproverProps {}

const FunctionNavApprover: React.FC<FunctionNavApproverProps> = () => {
  const currentProject = useRecoilValue(currentProjectState)

  const LabelListComponent = useMemo<React.ElementType>(() => {
    if (currentProject) {
      return LabelList[currentProject.project_type]
    }
    return () => null
  }, [currentProject])

  const DraftListComponent = useMemo<React.ElementType>(() => {
    if (currentProject) {
      return DraftList[currentProject.project_type]
    }
    return () => null
  }, [currentProject])

  const currentTask = useRecoilValue(currentTaskState)
  const projectRole = useRecoilValue(projectRoleState)
  const annoList = useRecoilValue(annoListState)

  const [version, setVersion] = useRecoilState(versionIdState)

  const versionOptions = useMemo(() => {
    return (currentProject?.project_contributors || [])
      .filter((item) => item.role_type === Role_Types_Enum.Annotator)
      .map((item) => ({
        value: item.user.id,
        inputDisplay: item.user.name,
      }))
  }, [currentProject?.project_contributors])

  useEffect(() => {
    if (versionOptions[0]) {
      setVersion(versionOptions[0].value)
    }
  }, [versionOptions])

  const onChangeVersion = useCallback((value: string) => {
    setVersion(value)
  }, [])

  // Approve
  const isDisabledApprove = useMemo(() => {
    return !currentTask?.is_confirmed
  }, [currentTask])

  const [setApproveTask, { loading: approveTaskLoading }] = useSetApproveTaskMutation()

  const onChangeApprove = useCallback(() => {
    if (currentTask && !isDisabledApprove) {
      setApproveTask({
        variables: {
          id: currentTask.id,
          is_approved: !currentTask.is_approved,
        },
      })
    }
  }, [currentTask, setApproveTask])
  return (
    <Fragment>
      <EuiFlexItem>
        <EuiText textAlign="center">Version</EuiText>
        <EuiSpacer size="xs" />
        <EuiSuperSelect
          valueOfSelected={version}
          onChange={onChangeVersion}
          placeholder="Select user version"
          options={versionOptions}
        />
      </EuiFlexItem>
      <EuiHorizontalRule margin="m" />
      <EuiFlexItem>
        <EuiButtonToggle
          size="s"
          label={currentTask?.is_approved ? 'Approved' : 'Approve'}
          fullWidth
          disabled={isDisabledApprove}
          iconType={currentTask?.is_approved ? 'checkInCircleFilled' : 'check'}
          onChange={onChangeApprove}
          isSelected={currentTask?.is_approved}
        />
      </EuiFlexItem>

      <EuiHorizontalRule margin="m" />
      <EuiFlexItem>
        <DraftListComponent />
      </EuiFlexItem>
    </Fragment>
  )
}

export default FunctionNavApprover
