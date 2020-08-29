import React, { Fragment, useMemo, useCallback } from 'react'
import {
  EuiSpacer,
  EuiFlexItem,
  EuiButton,
  EuiHorizontalRule,
  EuiSuperSelect,
  EuiText,
  EuiSwitch,
  EuiFormFieldset,
  EuiFormRow,
} from '@elastic/eui'
import { Role_Types_Enum, Project_Types_Enum } from '@/generated/graphql'
import { useRecoilValue, useRecoilState } from 'recoil'
import {
  currentProjectState,
  versionIdState,
  isApprovedState,
  exportFormatState,
} from '@/contexts/atoms/annotation'
import { useMergeAnno } from '@/hooks/useMergeAnno'

const FunctionNavAdmin: React.FC = () => {
  const currentProject = useRecoilValue(currentProjectState)

  const versionOptions = useMemo(() => {
    return [
      {
        value: 'all',
        inputDisplay: 'All',
      },
      ...(currentProject?.project_contributors || [])
        .filter((item) => item.role_type === Role_Types_Enum.Annotator)
        .map((item) => ({
          value: item.user.id,
          inputDisplay: item.user.name,
        })),
    ]
  }, [currentProject?.project_contributors])

  const [version, setVersion] = useRecoilState(versionIdState)
  const [exportFormat, setExportFormat] = useRecoilState(exportFormatState)
  const onChangeVersion = useCallback((value: string) => {
    setVersion(value)
  }, [])

  const [isApproved, setIsApproved] = useRecoilState(isApprovedState)
  const {
    exportAllTextClassification,
    exportTextClassification,
    exportSeq2seq,
    exportAllSeq2seq,
    exportSequenceLabeling,
    exportAllSequenceLabeling,
    exportPdfLabeling,
    exportAllPdfLabeling,
  } = useMergeAnno()

  const exportCurrent = useMemo(() => {
    switch (currentProject?.project_type) {
      case Project_Types_Enum.TextClassificationProject:
        return exportTextClassification
      case Project_Types_Enum.Seq2seqProject:
        return exportSeq2seq
      case Project_Types_Enum.SequenceLabelingProject:
        return exportSequenceLabeling
      case Project_Types_Enum.PdfLabelingProject:
        return exportPdfLabeling
      default:
        return () => null
    }
  }, [
    currentProject?.project_type,
    exportPdfLabeling,
    exportSeq2seq,
    exportSequenceLabeling,
    exportTextClassification,
  ])

  const exportAll = useMemo(() => {
    switch (currentProject?.project_type) {
      case Project_Types_Enum.TextClassificationProject:
        return exportAllTextClassification
      case Project_Types_Enum.Seq2seqProject:
        return exportAllSeq2seq
      case Project_Types_Enum.SequenceLabelingProject:
        return exportAllSequenceLabeling
      case Project_Types_Enum.PdfLabelingProject:
        return exportAllPdfLabeling
      default:
        return () => null
    }
  }, [
    currentProject?.project_type,
    exportAllPdfLabeling,
    exportAllSeq2seq,
    exportAllSequenceLabeling,
    exportAllTextClassification,
  ])

  const formatOptions = useMemo<
    {
      value: 'json' | 'csv' | 'txt'
      inputDisplay: string
    }[]
  >(() => {
    switch (currentProject?.project_type) {
      case Project_Types_Enum.TextClassificationProject:
      case Project_Types_Enum.Seq2seqProject:
      case Project_Types_Enum.SequenceLabelingProject:
        return [
          {
            value: 'json',
            inputDisplay: 'JSON',
          },
          {
            value: 'csv',
            inputDisplay: 'CSV',
          },
          {
            value: 'txt',
            inputDisplay: 'Plain',
          },
        ]
      case Project_Types_Enum.PdfLabelingProject:
        return [
          {
            value: 'json',
            inputDisplay: 'JSON',
          },
        ]
      default:
        return []
    }
  }, [currentProject?.project_type])

  return (
    <Fragment>
      <EuiFlexItem>
        <EuiText textAlign="center">Annotation Review</EuiText>
        <EuiSpacer size="s" />
        <EuiFormRow label="Version (user)">
          <EuiSuperSelect
            valueOfSelected={version}
            onChange={onChangeVersion}
            placeholder="Select user version"
            options={versionOptions}
          />
        </EuiFormRow>
        <EuiSpacer size="s" />
        <EuiFormFieldset legend={{ children: 'Approved annotation' }}>
          <EuiSwitch
            label="Only approved annotation"
            checked={isApproved}
            onChange={(e) => setIsApproved(e.target.checked)}
          />
        </EuiFormFieldset>
      </EuiFlexItem>

      <EuiHorizontalRule margin="m" />

      <EuiText textAlign="center">Exported Annotation</EuiText>
      <EuiSpacer size="s" />
      <EuiFormRow label="Format">
        <EuiSuperSelect
          valueOfSelected={exportFormat}
          onChange={(value) => setExportFormat(value)}
          options={formatOptions}
        />
      </EuiFormRow>
      <EuiSpacer size="s" />

      <EuiFlexItem>
        <EuiButton
          size="s"
          fullWidth
          onClick={exportCurrent}
          // disabled={isDisabledConfirm}
          // iconType={currentTask?.is_confirmed ? 'checkInCircleFilled' : 'check'}
        >
          Export current document
        </EuiButton>
      </EuiFlexItem>
      <EuiSpacer size="s" />
      <EuiFlexItem>
        <EuiButton size="s" fullWidth onClick={exportAll}>
          Export all document
        </EuiButton>
      </EuiFlexItem>
    </Fragment>
  )
}

export default FunctionNavAdmin
