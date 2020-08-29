import {
  LabelFragment,
  DocumentFragment,
  DocumentAnnotationFragment,
  ProjectFragment,
  AnnotationFragment,
  ProjectContributorFragment,
  ProjectNotificationFragment,
  Role_Types_Enum,
  Project_Types_Enum,
  Project_Contributors,
  DocumentsAnnotationQuery,
  ProjectStatisticsFragment,
} from '@/generated/graphql'
import { PdfJs } from './components/pdf-annotation'

export interface UUID {
  id: string
}

export interface User {
  name: string
  nickname: string
  picture: string
  sub: string
  email: string
}

export type ProjectContributor = ProjectContributorFragment

export type ProjectTypes = Project_Types_Enum

export type RoleTypes = Role_Types_Enum

export type ProjectContributors = Pick<Project_Contributors, 'role_type'> & {
  user: Pick<Users, 'id' | 'name' | 'auth0_id'>
}

export type Project = ProjectFragment
export type ProjectWithStatistics = ProjectFragment & ProjectStatisticsFragment

export type Label = LabelFragment

export type Document = DocumentFragment

export type Annotation = AnnotationFragment

export type DocumentAnnotation = DocumentsAnnotationQuery['documents'][number]

export type TaskAnnotation = DocumentsAnnotationQuery['task_distribution'][number]

export type ProjectNotification = ProjectNotificationFragment

export interface TextClassificationAnnotation extends Annotation {
  data: {
    type: 'TextClassificationAnnotation'
    label_text: string
  }
}

export interface SequenceLabelingAnnotation extends Annotation {
  data: {
    type: 'SequenceLabelingAnnotation'
    start: number
    end: number
    text: string
    label_text: string
  }
}

export interface Seq2seqAnnotation extends Annotation {
  data: {
    type: 'Seq2seqAnnotation'
    text: string
  }
}

export interface PdfLabelingAnnotation extends Annotation {
  data: {
    type: 'PdfLabelingAnnotation'
    contents: {
      text?: string
      image?: string
    }
    position: PdfJs.Annotation
    pageNumber: number
    label_text: string
  }
}
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

export type DraftAnnotationType<T = Annotation> = Optional<
  T,
  'is_submit' | 'manual' | 'document_id' | 'user_id' | 'document' | 'user'
>

export type DraftTextClassificationAnnotation = DraftAnnotationType<TextClassificationAnnotation>
export type DraftSequenceLabelingAnnotation = DraftAnnotationType<SequenceLabelingAnnotation>
export type DraftSeq2seqAnnotation = DraftAnnotationType<Seq2seqAnnotation>
export type DraftPdfLabelingAnnotation = DraftAnnotationType<PdfLabelingAnnotation>

export type DraftAnnotation =
  | DraftTextClassificationAnnotation
  | DraftSequenceLabelingAnnotation
  | DraftSeq2seqAnnotation
  | DraftPdfLabelingAnnotation

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, any> ? DeepPartial<T[P]> : T[P]
}

export type ProjectPageType =
  | 'dashboard'
  | 'contributor'
  | 'label'
  | 'guide'
  | 'document'
  | 'setting'
