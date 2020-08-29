import { Notification_Types_Enum } from '@/generated/graphql'
import { ProjectTypes, RoleTypes } from '@/types'
import { EuiBadge, EuiIcon, EuiIconProps } from '@elastic/eui'
import React, { ReactElement } from 'react'

export const PAGE_SIZE = 5

export const PROJECT_TYPE_LABLE: Record<ProjectTypes, string> = {
  TextClassificationProject: 'Sentiment Analysis',
  SequenceLabelingProject: 'Named Entity Recognition',
  Seq2seqProject: 'Translation',
  PdfLabelingProject: 'PDF Labeling',
}

export const PROJECT_TYPE_COLOR: Record<ProjectTypes, string> = {
  TextClassificationProject: '#A987D1',
  SequenceLabelingProject: '#79AAD9',
  Seq2seqProject: '#6DCCB1',
  PdfLabelingProject: '#EE789D',
}

export const PROJECT_TYPE_ICON: Record<ProjectTypes, ReactElement<EuiIconProps>> = {
  TextClassificationProject: <EuiIcon size="xl" type="indexEdit" color="#A987D1" />,
  SequenceLabelingProject: <EuiIcon size="xl" type="visText" color="#79AAD9" />,
  Seq2seqProject: <EuiIcon size="xl" type="tag" color="#6DCCB1" />,
  PdfLabelingProject: <EuiIcon size="xl" type="document" color="#EE789D" />,
}

export const PROJECT_TYPE_TAG: Record<ProjectTypes, React.ReactNode> = {
  TextClassificationProject: (
    <EuiBadge color={PROJECT_TYPE_COLOR.TextClassificationProject}>
      {PROJECT_TYPE_LABLE.TextClassificationProject}
    </EuiBadge>
  ),
  SequenceLabelingProject: (
    <EuiBadge color={PROJECT_TYPE_COLOR.SequenceLabelingProject}>
      {PROJECT_TYPE_LABLE.SequenceLabelingProject}
    </EuiBadge>
  ),
  Seq2seqProject: (
    <EuiBadge color={PROJECT_TYPE_COLOR.Seq2seqProject}>
      {PROJECT_TYPE_LABLE.Seq2seqProject}
    </EuiBadge>
  ),
  PdfLabelingProject: (
    <EuiBadge color={PROJECT_TYPE_COLOR.PdfLabelingProject}>
      {PROJECT_TYPE_LABLE.PdfLabelingProject}
    </EuiBadge>
  ),
}

// ROLES

export const ROLE_COLORS: Record<RoleTypes, string> = {
  project_admin: '#006DE4',
  annotator: '#00BFB3',
  annotation_approver: '#FC358E',
}

export const ROLE_LABELS: Record<RoleTypes, string> = {
  project_admin: 'Project Admin',
  annotator: 'Annotator',
  annotation_approver: 'Annotation Approver',
}

// NOTIFICATION
export const NOTIFICATION_TYPES: Record<Notification_Types_Enum, string> = {
  contributor_request: 'request to join as',
  admin_response: 'admin_response',
}
