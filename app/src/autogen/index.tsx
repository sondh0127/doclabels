import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  json: any;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

export type AddResult = {
  __typename?: 'AddResult';
  sum?: Maybe<Scalars['Int']>;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

export type CheckAndRegisterUserOutput = {
  __typename?: 'CheckAndRegisterUserOutput';
  affected_rows: Scalars['Int'];
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "annotations" */
export type Annotations = {
  __typename?: 'annotations';
  created_at?: Maybe<Scalars['timestamptz']>;
  data: Scalars['jsonb'];
  /** An object relationship */
  document: Documents;
  document_id: Scalars['uuid'];
  id: Scalars['uuid'];
  is_submit: Scalars['Boolean'];
  /** An object relationship */
  label?: Maybe<Labels>;
  label_id?: Maybe<Scalars['uuid']>;
  manual: Scalars['Boolean'];
  /** An object relationship */
  task_distribution: Task_Distribution;
  task_id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};


/** columns and relationships of "annotations" */
export type AnnotationsDataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "annotations" */
export type Annotations_Aggregate = {
  __typename?: 'annotations_aggregate';
  aggregate?: Maybe<Annotations_Aggregate_Fields>;
  nodes: Array<Annotations>;
};

/** aggregate fields of "annotations" */
export type Annotations_Aggregate_Fields = {
  __typename?: 'annotations_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Annotations_Max_Fields>;
  min?: Maybe<Annotations_Min_Fields>;
};


/** aggregate fields of "annotations" */
export type Annotations_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Annotations_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "annotations" */
export type Annotations_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Annotations_Max_Order_By>;
  min?: Maybe<Annotations_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Annotations_Append_Input = {
  data?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "annotations" */
export type Annotations_Arr_Rel_Insert_Input = {
  data: Array<Annotations_Insert_Input>;
  on_conflict?: Maybe<Annotations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "annotations". All fields are combined with a logical 'AND'. */
export type Annotations_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Annotations_Bool_Exp>>>;
  _not?: Maybe<Annotations_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Annotations_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  data?: Maybe<Jsonb_Comparison_Exp>;
  document?: Maybe<Documents_Bool_Exp>;
  document_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_submit?: Maybe<Boolean_Comparison_Exp>;
  label?: Maybe<Labels_Bool_Exp>;
  label_id?: Maybe<Uuid_Comparison_Exp>;
  manual?: Maybe<Boolean_Comparison_Exp>;
  task_distribution?: Maybe<Task_Distribution_Bool_Exp>;
  task_id?: Maybe<Uuid_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "annotations" */
export enum Annotations_Constraint {
  /** unique or primary key constraint */
  AnnotationsPkey = 'annotations_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Annotations_Delete_At_Path_Input = {
  data?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Annotations_Delete_Elem_Input = {
  data?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Annotations_Delete_Key_Input = {
  data?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "annotations" */
export type Annotations_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  data?: Maybe<Scalars['jsonb']>;
  document?: Maybe<Documents_Obj_Rel_Insert_Input>;
  document_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  is_submit?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Labels_Obj_Rel_Insert_Input>;
  label_id?: Maybe<Scalars['uuid']>;
  manual?: Maybe<Scalars['Boolean']>;
  task_distribution?: Maybe<Task_Distribution_Obj_Rel_Insert_Input>;
  task_id?: Maybe<Scalars['uuid']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Annotations_Max_Fields = {
  __typename?: 'annotations_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  document_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  label_id?: Maybe<Scalars['uuid']>;
  task_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "annotations" */
export type Annotations_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  document_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label_id?: Maybe<Order_By>;
  task_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Annotations_Min_Fields = {
  __typename?: 'annotations_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  document_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  label_id?: Maybe<Scalars['uuid']>;
  task_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "annotations" */
export type Annotations_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  document_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  label_id?: Maybe<Order_By>;
  task_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "annotations" */
export type Annotations_Mutation_Response = {
  __typename?: 'annotations_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Annotations>;
};

/** input type for inserting object relation for remote table "annotations" */
export type Annotations_Obj_Rel_Insert_Input = {
  data: Annotations_Insert_Input;
  on_conflict?: Maybe<Annotations_On_Conflict>;
};

/** on conflict condition type for table "annotations" */
export type Annotations_On_Conflict = {
  constraint: Annotations_Constraint;
  update_columns: Array<Annotations_Update_Column>;
  where?: Maybe<Annotations_Bool_Exp>;
};

/** ordering options when selecting data from "annotations" */
export type Annotations_Order_By = {
  created_at?: Maybe<Order_By>;
  data?: Maybe<Order_By>;
  document?: Maybe<Documents_Order_By>;
  document_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_submit?: Maybe<Order_By>;
  label?: Maybe<Labels_Order_By>;
  label_id?: Maybe<Order_By>;
  manual?: Maybe<Order_By>;
  task_distribution?: Maybe<Task_Distribution_Order_By>;
  task_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "annotations" */
export type Annotations_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Annotations_Prepend_Input = {
  data?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "annotations" */
export enum Annotations_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  DocumentId = 'document_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsSubmit = 'is_submit',
  /** column name */
  LabelId = 'label_id',
  /** column name */
  Manual = 'manual',
  /** column name */
  TaskId = 'task_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "annotations" */
export type Annotations_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  data?: Maybe<Scalars['jsonb']>;
  document_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  is_submit?: Maybe<Scalars['Boolean']>;
  label_id?: Maybe<Scalars['uuid']>;
  manual?: Maybe<Scalars['Boolean']>;
  task_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "annotations" */
export enum Annotations_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  DocumentId = 'document_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsSubmit = 'is_submit',
  /** column name */
  LabelId = 'label_id',
  /** column name */
  Manual = 'manual',
  /** column name */
  TaskId = 'task_id',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "documents" */
export type Documents = {
  __typename?: 'documents';
  /** An array relationship */
  annotations: Array<Annotations>;
  /** An aggregated array relationship */
  annotations_aggregate: Annotations_Aggregate;
  created_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  meta?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  /** An array relationship */
  task_distributions: Array<Task_Distribution>;
  /** An aggregated array relationship */
  task_distributions_aggregate: Task_Distribution_Aggregate;
  text: Scalars['String'];
};


/** columns and relationships of "documents" */
export type DocumentsAnnotationsArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** columns and relationships of "documents" */
export type DocumentsAnnotations_AggregateArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** columns and relationships of "documents" */
export type DocumentsMetaArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "documents" */
export type DocumentsTask_DistributionsArgs = {
  distinct_on?: Maybe<Array<Task_Distribution_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Task_Distribution_Order_By>>;
  where?: Maybe<Task_Distribution_Bool_Exp>;
};


/** columns and relationships of "documents" */
export type DocumentsTask_Distributions_AggregateArgs = {
  distinct_on?: Maybe<Array<Task_Distribution_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Task_Distribution_Order_By>>;
  where?: Maybe<Task_Distribution_Bool_Exp>;
};

/** aggregated selection of "documents" */
export type Documents_Aggregate = {
  __typename?: 'documents_aggregate';
  aggregate?: Maybe<Documents_Aggregate_Fields>;
  nodes: Array<Documents>;
};

/** aggregate fields of "documents" */
export type Documents_Aggregate_Fields = {
  __typename?: 'documents_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Documents_Max_Fields>;
  min?: Maybe<Documents_Min_Fields>;
};


/** aggregate fields of "documents" */
export type Documents_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Documents_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "documents" */
export type Documents_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Documents_Max_Order_By>;
  min?: Maybe<Documents_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Documents_Append_Input = {
  meta?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "documents" */
export type Documents_Arr_Rel_Insert_Input = {
  data: Array<Documents_Insert_Input>;
  on_conflict?: Maybe<Documents_On_Conflict>;
};

/** Boolean expression to filter rows from the table "documents". All fields are combined with a logical 'AND'. */
export type Documents_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Documents_Bool_Exp>>>;
  _not?: Maybe<Documents_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Documents_Bool_Exp>>>;
  annotations?: Maybe<Annotations_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  meta?: Maybe<Jsonb_Comparison_Exp>;
  project?: Maybe<Projects_Bool_Exp>;
  project_id?: Maybe<Uuid_Comparison_Exp>;
  task_distributions?: Maybe<Task_Distribution_Bool_Exp>;
  text?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "documents" */
export enum Documents_Constraint {
  /** unique or primary key constraint */
  DocumentsPkey = 'documents_pkey',
  /** unique or primary key constraint */
  DocumentsProjectIdTextKey = 'documents_project_id_text_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Documents_Delete_At_Path_Input = {
  meta?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Documents_Delete_Elem_Input = {
  meta?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Documents_Delete_Key_Input = {
  meta?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "documents" */
export type Documents_Insert_Input = {
  annotations?: Maybe<Annotations_Arr_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  meta?: Maybe<Scalars['jsonb']>;
  project?: Maybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: Maybe<Scalars['uuid']>;
  task_distributions?: Maybe<Task_Distribution_Arr_Rel_Insert_Input>;
  text?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Documents_Max_Fields = {
  __typename?: 'documents_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "documents" */
export type Documents_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Documents_Min_Fields = {
  __typename?: 'documents_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "documents" */
export type Documents_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
};

/** response of any mutation on the table "documents" */
export type Documents_Mutation_Response = {
  __typename?: 'documents_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Documents>;
};

/** input type for inserting object relation for remote table "documents" */
export type Documents_Obj_Rel_Insert_Input = {
  data: Documents_Insert_Input;
  on_conflict?: Maybe<Documents_On_Conflict>;
};

/** on conflict condition type for table "documents" */
export type Documents_On_Conflict = {
  constraint: Documents_Constraint;
  update_columns: Array<Documents_Update_Column>;
  where?: Maybe<Documents_Bool_Exp>;
};

/** ordering options when selecting data from "documents" */
export type Documents_Order_By = {
  annotations_aggregate?: Maybe<Annotations_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  meta?: Maybe<Order_By>;
  project?: Maybe<Projects_Order_By>;
  project_id?: Maybe<Order_By>;
  task_distributions_aggregate?: Maybe<Task_Distribution_Aggregate_Order_By>;
  text?: Maybe<Order_By>;
};

/** primary key columns input for table: "documents" */
export type Documents_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Documents_Prepend_Input = {
  meta?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "documents" */
export enum Documents_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Meta = 'meta',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Text = 'text'
}

/** input type for updating data in table "documents" */
export type Documents_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  meta?: Maybe<Scalars['jsonb']>;
  project_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
};

/** update columns of table "documents" */
export enum Documents_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Meta = 'meta',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Text = 'text'
}

export type FileOutput = {
  __typename?: 'fileOutput';
  file_path: Scalars['String'];
};


/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: Maybe<Scalars['json']>;
  _gt?: Maybe<Scalars['json']>;
  _gte?: Maybe<Scalars['json']>;
  _in?: Maybe<Array<Scalars['json']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['json']>;
  _lte?: Maybe<Scalars['json']>;
  _neq?: Maybe<Scalars['json']>;
  _nin?: Maybe<Array<Scalars['json']>>;
};


/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "labels" */
export type Labels = {
  __typename?: 'labels';
  /** An array relationship */
  annotations: Array<Annotations>;
  /** An aggregated array relationship */
  annotations_aggregate: Annotations_Aggregate;
  color: Scalars['String'];
  created_at: Scalars['timestamptz'];
  hotkey: Scalars['String'];
  id: Scalars['uuid'];
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  text: Scalars['String'];
};


/** columns and relationships of "labels" */
export type LabelsAnnotationsArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** columns and relationships of "labels" */
export type LabelsAnnotations_AggregateArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};

/** aggregated selection of "labels" */
export type Labels_Aggregate = {
  __typename?: 'labels_aggregate';
  aggregate?: Maybe<Labels_Aggregate_Fields>;
  nodes: Array<Labels>;
};

/** aggregate fields of "labels" */
export type Labels_Aggregate_Fields = {
  __typename?: 'labels_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Labels_Max_Fields>;
  min?: Maybe<Labels_Min_Fields>;
};


/** aggregate fields of "labels" */
export type Labels_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Labels_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "labels" */
export type Labels_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Labels_Max_Order_By>;
  min?: Maybe<Labels_Min_Order_By>;
};

/** input type for inserting array relation for remote table "labels" */
export type Labels_Arr_Rel_Insert_Input = {
  data: Array<Labels_Insert_Input>;
  on_conflict?: Maybe<Labels_On_Conflict>;
};

/** Boolean expression to filter rows from the table "labels". All fields are combined with a logical 'AND'. */
export type Labels_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Labels_Bool_Exp>>>;
  _not?: Maybe<Labels_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Labels_Bool_Exp>>>;
  annotations?: Maybe<Annotations_Bool_Exp>;
  color?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  hotkey?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  project?: Maybe<Projects_Bool_Exp>;
  project_id?: Maybe<Uuid_Comparison_Exp>;
  text?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "labels" */
export enum Labels_Constraint {
  /** unique or primary key constraint */
  LabelsPkey = 'labels_pkey',
  /** unique or primary key constraint */
  LabelsProjectIdColorKey = 'labels_project_id_color_key',
  /** unique or primary key constraint */
  LabelsProjectIdHotkeyKey = 'labels_project_id_hotkey_key',
  /** unique or primary key constraint */
  LabelsProjectIdTextKey = 'labels_project_id_text_key'
}

/** input type for inserting data into table "labels" */
export type Labels_Insert_Input = {
  annotations?: Maybe<Annotations_Arr_Rel_Insert_Input>;
  color?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  hotkey?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  project?: Maybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Labels_Max_Fields = {
  __typename?: 'labels_max_fields';
  color?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  hotkey?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "labels" */
export type Labels_Max_Order_By = {
  color?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  hotkey?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Labels_Min_Fields = {
  __typename?: 'labels_min_fields';
  color?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  hotkey?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "labels" */
export type Labels_Min_Order_By = {
  color?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  hotkey?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
};

/** response of any mutation on the table "labels" */
export type Labels_Mutation_Response = {
  __typename?: 'labels_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Labels>;
};

/** input type for inserting object relation for remote table "labels" */
export type Labels_Obj_Rel_Insert_Input = {
  data: Labels_Insert_Input;
  on_conflict?: Maybe<Labels_On_Conflict>;
};

/** on conflict condition type for table "labels" */
export type Labels_On_Conflict = {
  constraint: Labels_Constraint;
  update_columns: Array<Labels_Update_Column>;
  where?: Maybe<Labels_Bool_Exp>;
};

/** ordering options when selecting data from "labels" */
export type Labels_Order_By = {
  annotations_aggregate?: Maybe<Annotations_Aggregate_Order_By>;
  color?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  hotkey?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project?: Maybe<Projects_Order_By>;
  project_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
};

/** primary key columns input for table: "labels" */
export type Labels_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "labels" */
export enum Labels_Select_Column {
  /** column name */
  Color = 'color',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Hotkey = 'hotkey',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Text = 'text'
}

/** input type for updating data in table "labels" */
export type Labels_Set_Input = {
  color?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  hotkey?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
};

/** update columns of table "labels" */
export enum Labels_Update_Column {
  /** column name */
  Color = 'color',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Hotkey = 'hotkey',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Text = 'text'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** perform the action: "checkAndRegisterUser" */
  checkAndRegisterUser?: Maybe<CheckAndRegisterUserOutput>;
  /** delete data from the table: "annotations" */
  delete_annotations?: Maybe<Annotations_Mutation_Response>;
  /** delete single row from the table: "annotations" */
  delete_annotations_by_pk?: Maybe<Annotations>;
  /** delete data from the table: "documents" */
  delete_documents?: Maybe<Documents_Mutation_Response>;
  /** delete single row from the table: "documents" */
  delete_documents_by_pk?: Maybe<Documents>;
  /** delete data from the table: "labels" */
  delete_labels?: Maybe<Labels_Mutation_Response>;
  /** delete single row from the table: "labels" */
  delete_labels_by_pk?: Maybe<Labels>;
  /** delete data from the table: "notification_types" */
  delete_notification_types?: Maybe<Notification_Types_Mutation_Response>;
  /** delete single row from the table: "notification_types" */
  delete_notification_types_by_pk?: Maybe<Notification_Types>;
  /** delete data from the table: "project_contributors" */
  delete_project_contributors?: Maybe<Project_Contributors_Mutation_Response>;
  /** delete single row from the table: "project_contributors" */
  delete_project_contributors_by_pk?: Maybe<Project_Contributors>;
  /** delete data from the table: "project_notifications" */
  delete_project_notifications?: Maybe<Project_Notifications_Mutation_Response>;
  /** delete single row from the table: "project_notifications" */
  delete_project_notifications_by_pk?: Maybe<Project_Notifications>;
  /** delete data from the table: "project_types" */
  delete_project_types?: Maybe<Project_Types_Mutation_Response>;
  /** delete single row from the table: "project_types" */
  delete_project_types_by_pk?: Maybe<Project_Types>;
  /** delete data from the table: "projects" */
  delete_projects?: Maybe<Projects_Mutation_Response>;
  /** delete single row from the table: "projects" */
  delete_projects_by_pk?: Maybe<Projects>;
  /** delete data from the table: "role_types" */
  delete_role_types?: Maybe<Role_Types_Mutation_Response>;
  /** delete single row from the table: "role_types" */
  delete_role_types_by_pk?: Maybe<Role_Types>;
  /** delete data from the table: "task_distribution" */
  delete_task_distribution?: Maybe<Task_Distribution_Mutation_Response>;
  /** delete single row from the table: "task_distribution" */
  delete_task_distribution_by_pk?: Maybe<Task_Distribution>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** perform the action: "fileUpload" */
  fileUpload?: Maybe<FileOutput>;
  /** insert data into the table: "annotations" */
  insert_annotations?: Maybe<Annotations_Mutation_Response>;
  /** insert a single row into the table: "annotations" */
  insert_annotations_one?: Maybe<Annotations>;
  /** insert data into the table: "documents" */
  insert_documents?: Maybe<Documents_Mutation_Response>;
  /** insert a single row into the table: "documents" */
  insert_documents_one?: Maybe<Documents>;
  /** insert data into the table: "labels" */
  insert_labels?: Maybe<Labels_Mutation_Response>;
  /** insert a single row into the table: "labels" */
  insert_labels_one?: Maybe<Labels>;
  /** insert data into the table: "notification_types" */
  insert_notification_types?: Maybe<Notification_Types_Mutation_Response>;
  /** insert a single row into the table: "notification_types" */
  insert_notification_types_one?: Maybe<Notification_Types>;
  /** insert data into the table: "project_contributors" */
  insert_project_contributors?: Maybe<Project_Contributors_Mutation_Response>;
  /** insert a single row into the table: "project_contributors" */
  insert_project_contributors_one?: Maybe<Project_Contributors>;
  /** insert data into the table: "project_notifications" */
  insert_project_notifications?: Maybe<Project_Notifications_Mutation_Response>;
  /** insert a single row into the table: "project_notifications" */
  insert_project_notifications_one?: Maybe<Project_Notifications>;
  /** insert data into the table: "project_types" */
  insert_project_types?: Maybe<Project_Types_Mutation_Response>;
  /** insert a single row into the table: "project_types" */
  insert_project_types_one?: Maybe<Project_Types>;
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<Projects_Mutation_Response>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /** insert data into the table: "role_types" */
  insert_role_types?: Maybe<Role_Types_Mutation_Response>;
  /** insert a single row into the table: "role_types" */
  insert_role_types_one?: Maybe<Role_Types>;
  /** insert data into the table: "task_distribution" */
  insert_task_distribution?: Maybe<Task_Distribution_Mutation_Response>;
  /** insert a single row into the table: "task_distribution" */
  insert_task_distribution_one?: Maybe<Task_Distribution>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "annotations" */
  update_annotations?: Maybe<Annotations_Mutation_Response>;
  /** update single row of the table: "annotations" */
  update_annotations_by_pk?: Maybe<Annotations>;
  /** update data of the table: "documents" */
  update_documents?: Maybe<Documents_Mutation_Response>;
  /** update single row of the table: "documents" */
  update_documents_by_pk?: Maybe<Documents>;
  /** update data of the table: "labels" */
  update_labels?: Maybe<Labels_Mutation_Response>;
  /** update single row of the table: "labels" */
  update_labels_by_pk?: Maybe<Labels>;
  /** update data of the table: "notification_types" */
  update_notification_types?: Maybe<Notification_Types_Mutation_Response>;
  /** update single row of the table: "notification_types" */
  update_notification_types_by_pk?: Maybe<Notification_Types>;
  /** update data of the table: "project_contributors" */
  update_project_contributors?: Maybe<Project_Contributors_Mutation_Response>;
  /** update single row of the table: "project_contributors" */
  update_project_contributors_by_pk?: Maybe<Project_Contributors>;
  /** update data of the table: "project_notifications" */
  update_project_notifications?: Maybe<Project_Notifications_Mutation_Response>;
  /** update single row of the table: "project_notifications" */
  update_project_notifications_by_pk?: Maybe<Project_Notifications>;
  /** update data of the table: "project_types" */
  update_project_types?: Maybe<Project_Types_Mutation_Response>;
  /** update single row of the table: "project_types" */
  update_project_types_by_pk?: Maybe<Project_Types>;
  /** update data of the table: "projects" */
  update_projects?: Maybe<Projects_Mutation_Response>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update data of the table: "role_types" */
  update_role_types?: Maybe<Role_Types_Mutation_Response>;
  /** update single row of the table: "role_types" */
  update_role_types_by_pk?: Maybe<Role_Types>;
  /** update data of the table: "task_distribution" */
  update_task_distribution?: Maybe<Task_Distribution_Mutation_Response>;
  /** update single row of the table: "task_distribution" */
  update_task_distribution_by_pk?: Maybe<Task_Distribution>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_AnnotationsArgs = {
  where: Annotations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Annotations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_DocumentsArgs = {
  where: Documents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Documents_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_LabelsArgs = {
  where: Labels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Labels_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Notification_TypesArgs = {
  where: Notification_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Notification_Types_By_PkArgs = {
  key: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Project_ContributorsArgs = {
  where: Project_Contributors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Project_Contributors_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Project_NotificationsArgs = {
  where: Project_Notifications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Project_Notifications_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Project_TypesArgs = {
  where: Project_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Project_Types_By_PkArgs = {
  key: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectsArgs = {
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Projects_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Role_TypesArgs = {
  where: Role_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Role_Types_By_PkArgs = {
  key: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Task_DistributionArgs = {
  where: Task_Distribution_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Task_Distribution_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootFileUploadArgs = {
  base64str: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_AnnotationsArgs = {
  objects: Array<Annotations_Insert_Input>;
  on_conflict?: Maybe<Annotations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Annotations_OneArgs = {
  object: Annotations_Insert_Input;
  on_conflict?: Maybe<Annotations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DocumentsArgs = {
  objects: Array<Documents_Insert_Input>;
  on_conflict?: Maybe<Documents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Documents_OneArgs = {
  object: Documents_Insert_Input;
  on_conflict?: Maybe<Documents_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LabelsArgs = {
  objects: Array<Labels_Insert_Input>;
  on_conflict?: Maybe<Labels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Labels_OneArgs = {
  object: Labels_Insert_Input;
  on_conflict?: Maybe<Labels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notification_TypesArgs = {
  objects: Array<Notification_Types_Insert_Input>;
  on_conflict?: Maybe<Notification_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Notification_Types_OneArgs = {
  object: Notification_Types_Insert_Input;
  on_conflict?: Maybe<Notification_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_ContributorsArgs = {
  objects: Array<Project_Contributors_Insert_Input>;
  on_conflict?: Maybe<Project_Contributors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_Contributors_OneArgs = {
  object: Project_Contributors_Insert_Input;
  on_conflict?: Maybe<Project_Contributors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_NotificationsArgs = {
  objects: Array<Project_Notifications_Insert_Input>;
  on_conflict?: Maybe<Project_Notifications_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_Notifications_OneArgs = {
  object: Project_Notifications_Insert_Input;
  on_conflict?: Maybe<Project_Notifications_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_TypesArgs = {
  objects: Array<Project_Types_Insert_Input>;
  on_conflict?: Maybe<Project_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_Types_OneArgs = {
  object: Project_Types_Insert_Input;
  on_conflict?: Maybe<Project_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectsArgs = {
  objects: Array<Projects_Insert_Input>;
  on_conflict?: Maybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Projects_OneArgs = {
  object: Projects_Insert_Input;
  on_conflict?: Maybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Role_TypesArgs = {
  objects: Array<Role_Types_Insert_Input>;
  on_conflict?: Maybe<Role_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Role_Types_OneArgs = {
  object: Role_Types_Insert_Input;
  on_conflict?: Maybe<Role_Types_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_DistributionArgs = {
  objects: Array<Task_Distribution_Insert_Input>;
  on_conflict?: Maybe<Task_Distribution_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_Distribution_OneArgs = {
  object: Task_Distribution_Insert_Input;
  on_conflict?: Maybe<Task_Distribution_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AnnotationsArgs = {
  _append?: Maybe<Annotations_Append_Input>;
  _delete_at_path?: Maybe<Annotations_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Annotations_Delete_Elem_Input>;
  _delete_key?: Maybe<Annotations_Delete_Key_Input>;
  _prepend?: Maybe<Annotations_Prepend_Input>;
  _set?: Maybe<Annotations_Set_Input>;
  where: Annotations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Annotations_By_PkArgs = {
  _append?: Maybe<Annotations_Append_Input>;
  _delete_at_path?: Maybe<Annotations_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Annotations_Delete_Elem_Input>;
  _delete_key?: Maybe<Annotations_Delete_Key_Input>;
  _prepend?: Maybe<Annotations_Prepend_Input>;
  _set?: Maybe<Annotations_Set_Input>;
  pk_columns: Annotations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_DocumentsArgs = {
  _append?: Maybe<Documents_Append_Input>;
  _delete_at_path?: Maybe<Documents_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Documents_Delete_Elem_Input>;
  _delete_key?: Maybe<Documents_Delete_Key_Input>;
  _prepend?: Maybe<Documents_Prepend_Input>;
  _set?: Maybe<Documents_Set_Input>;
  where: Documents_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Documents_By_PkArgs = {
  _append?: Maybe<Documents_Append_Input>;
  _delete_at_path?: Maybe<Documents_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Documents_Delete_Elem_Input>;
  _delete_key?: Maybe<Documents_Delete_Key_Input>;
  _prepend?: Maybe<Documents_Prepend_Input>;
  _set?: Maybe<Documents_Set_Input>;
  pk_columns: Documents_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_LabelsArgs = {
  _set?: Maybe<Labels_Set_Input>;
  where: Labels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Labels_By_PkArgs = {
  _set?: Maybe<Labels_Set_Input>;
  pk_columns: Labels_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Notification_TypesArgs = {
  _set?: Maybe<Notification_Types_Set_Input>;
  where: Notification_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Notification_Types_By_PkArgs = {
  _set?: Maybe<Notification_Types_Set_Input>;
  pk_columns: Notification_Types_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Project_ContributorsArgs = {
  _set?: Maybe<Project_Contributors_Set_Input>;
  where: Project_Contributors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Project_Contributors_By_PkArgs = {
  _set?: Maybe<Project_Contributors_Set_Input>;
  pk_columns: Project_Contributors_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Project_NotificationsArgs = {
  _append?: Maybe<Project_Notifications_Append_Input>;
  _delete_at_path?: Maybe<Project_Notifications_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Project_Notifications_Delete_Elem_Input>;
  _delete_key?: Maybe<Project_Notifications_Delete_Key_Input>;
  _prepend?: Maybe<Project_Notifications_Prepend_Input>;
  _set?: Maybe<Project_Notifications_Set_Input>;
  where: Project_Notifications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Project_Notifications_By_PkArgs = {
  _append?: Maybe<Project_Notifications_Append_Input>;
  _delete_at_path?: Maybe<Project_Notifications_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Project_Notifications_Delete_Elem_Input>;
  _delete_key?: Maybe<Project_Notifications_Delete_Key_Input>;
  _prepend?: Maybe<Project_Notifications_Prepend_Input>;
  _set?: Maybe<Project_Notifications_Set_Input>;
  pk_columns: Project_Notifications_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Project_TypesArgs = {
  _set?: Maybe<Project_Types_Set_Input>;
  where: Project_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Project_Types_By_PkArgs = {
  _set?: Maybe<Project_Types_Set_Input>;
  pk_columns: Project_Types_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectsArgs = {
  _append?: Maybe<Projects_Append_Input>;
  _delete_at_path?: Maybe<Projects_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Projects_Delete_Elem_Input>;
  _delete_key?: Maybe<Projects_Delete_Key_Input>;
  _inc?: Maybe<Projects_Inc_Input>;
  _prepend?: Maybe<Projects_Prepend_Input>;
  _set?: Maybe<Projects_Set_Input>;
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_By_PkArgs = {
  _append?: Maybe<Projects_Append_Input>;
  _delete_at_path?: Maybe<Projects_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Projects_Delete_Elem_Input>;
  _delete_key?: Maybe<Projects_Delete_Key_Input>;
  _inc?: Maybe<Projects_Inc_Input>;
  _prepend?: Maybe<Projects_Prepend_Input>;
  _set?: Maybe<Projects_Set_Input>;
  pk_columns: Projects_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Role_TypesArgs = {
  _set?: Maybe<Role_Types_Set_Input>;
  where: Role_Types_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Role_Types_By_PkArgs = {
  _set?: Maybe<Role_Types_Set_Input>;
  pk_columns: Role_Types_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Task_DistributionArgs = {
  _set?: Maybe<Task_Distribution_Set_Input>;
  where: Task_Distribution_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Task_Distribution_By_PkArgs = {
  _set?: Maybe<Task_Distribution_Set_Input>;
  pk_columns: Task_Distribution_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** columns and relationships of "notification_types" */
export type Notification_Types = {
  __typename?: 'notification_types';
  key: Scalars['String'];
  /** An array relationship */
  project_notifications: Array<Project_Notifications>;
  /** An aggregated array relationship */
  project_notifications_aggregate: Project_Notifications_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "notification_types" */
export type Notification_TypesProject_NotificationsArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};


/** columns and relationships of "notification_types" */
export type Notification_TypesProject_Notifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};

/** aggregated selection of "notification_types" */
export type Notification_Types_Aggregate = {
  __typename?: 'notification_types_aggregate';
  aggregate?: Maybe<Notification_Types_Aggregate_Fields>;
  nodes: Array<Notification_Types>;
};

/** aggregate fields of "notification_types" */
export type Notification_Types_Aggregate_Fields = {
  __typename?: 'notification_types_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Notification_Types_Max_Fields>;
  min?: Maybe<Notification_Types_Min_Fields>;
};


/** aggregate fields of "notification_types" */
export type Notification_Types_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Notification_Types_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "notification_types" */
export type Notification_Types_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Notification_Types_Max_Order_By>;
  min?: Maybe<Notification_Types_Min_Order_By>;
};

/** input type for inserting array relation for remote table "notification_types" */
export type Notification_Types_Arr_Rel_Insert_Input = {
  data: Array<Notification_Types_Insert_Input>;
  on_conflict?: Maybe<Notification_Types_On_Conflict>;
};

/** Boolean expression to filter rows from the table "notification_types". All fields are combined with a logical 'AND'. */
export type Notification_Types_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Notification_Types_Bool_Exp>>>;
  _not?: Maybe<Notification_Types_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Notification_Types_Bool_Exp>>>;
  key?: Maybe<String_Comparison_Exp>;
  project_notifications?: Maybe<Project_Notifications_Bool_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "notification_types" */
export enum Notification_Types_Constraint {
  /** unique or primary key constraint */
  NotificationTypesPkey = 'notification_types_pkey',
  /** unique or primary key constraint */
  NotificationTypesValueKey = 'notification_types_value_key'
}

export enum Notification_Types_Enum {
  /** Admin Response */
  AdminResponse = 'admin_response',
  /** Contributor Request */
  ContributorRequest = 'contributor_request'
}

/** expression to compare columns of type notification_types_enum. All fields are combined with logical 'AND'. */
export type Notification_Types_Enum_Comparison_Exp = {
  _eq?: Maybe<Notification_Types_Enum>;
  _in?: Maybe<Array<Notification_Types_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Notification_Types_Enum>;
  _nin?: Maybe<Array<Notification_Types_Enum>>;
};

/** input type for inserting data into table "notification_types" */
export type Notification_Types_Insert_Input = {
  key?: Maybe<Scalars['String']>;
  project_notifications?: Maybe<Project_Notifications_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Notification_Types_Max_Fields = {
  __typename?: 'notification_types_max_fields';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "notification_types" */
export type Notification_Types_Max_Order_By = {
  key?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Notification_Types_Min_Fields = {
  __typename?: 'notification_types_min_fields';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "notification_types" */
export type Notification_Types_Min_Order_By = {
  key?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "notification_types" */
export type Notification_Types_Mutation_Response = {
  __typename?: 'notification_types_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Notification_Types>;
};

/** input type for inserting object relation for remote table "notification_types" */
export type Notification_Types_Obj_Rel_Insert_Input = {
  data: Notification_Types_Insert_Input;
  on_conflict?: Maybe<Notification_Types_On_Conflict>;
};

/** on conflict condition type for table "notification_types" */
export type Notification_Types_On_Conflict = {
  constraint: Notification_Types_Constraint;
  update_columns: Array<Notification_Types_Update_Column>;
  where?: Maybe<Notification_Types_Bool_Exp>;
};

/** ordering options when selecting data from "notification_types" */
export type Notification_Types_Order_By = {
  key?: Maybe<Order_By>;
  project_notifications_aggregate?: Maybe<Project_Notifications_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "notification_types" */
export type Notification_Types_Pk_Columns_Input = {
  key: Scalars['String'];
};

/** select columns of table "notification_types" */
export enum Notification_Types_Select_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "notification_types" */
export type Notification_Types_Set_Input = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "notification_types" */
export enum Notification_Types_Update_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Value = 'value'
}

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "project_contributors" */
export type Project_Contributors = {
  __typename?: 'project_contributors';
  created_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  /** An object relationship */
  roleType: Role_Types;
  role_type: Role_Types_Enum;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "project_contributors" */
export type Project_Contributors_Aggregate = {
  __typename?: 'project_contributors_aggregate';
  aggregate?: Maybe<Project_Contributors_Aggregate_Fields>;
  nodes: Array<Project_Contributors>;
};

/** aggregate fields of "project_contributors" */
export type Project_Contributors_Aggregate_Fields = {
  __typename?: 'project_contributors_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Project_Contributors_Max_Fields>;
  min?: Maybe<Project_Contributors_Min_Fields>;
};


/** aggregate fields of "project_contributors" */
export type Project_Contributors_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Contributors_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "project_contributors" */
export type Project_Contributors_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Project_Contributors_Max_Order_By>;
  min?: Maybe<Project_Contributors_Min_Order_By>;
};

/** input type for inserting array relation for remote table "project_contributors" */
export type Project_Contributors_Arr_Rel_Insert_Input = {
  data: Array<Project_Contributors_Insert_Input>;
  on_conflict?: Maybe<Project_Contributors_On_Conflict>;
};

/** Boolean expression to filter rows from the table "project_contributors". All fields are combined with a logical 'AND'. */
export type Project_Contributors_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Project_Contributors_Bool_Exp>>>;
  _not?: Maybe<Project_Contributors_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Project_Contributors_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  project?: Maybe<Projects_Bool_Exp>;
  project_id?: Maybe<Uuid_Comparison_Exp>;
  roleType?: Maybe<Role_Types_Bool_Exp>;
  role_type?: Maybe<Role_Types_Enum_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "project_contributors" */
export enum Project_Contributors_Constraint {
  /** unique or primary key constraint */
  ProjectContributorsPkey = 'project_contributors_pkey',
  /** unique or primary key constraint */
  ProjectContributorsProjectIdUserIdKey = 'project_contributors_project_id_user_id_key'
}

/** input type for inserting data into table "project_contributors" */
export type Project_Contributors_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  project?: Maybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: Maybe<Scalars['uuid']>;
  roleType?: Maybe<Role_Types_Obj_Rel_Insert_Input>;
  role_type?: Maybe<Role_Types_Enum>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Project_Contributors_Max_Fields = {
  __typename?: 'project_contributors_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "project_contributors" */
export type Project_Contributors_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Project_Contributors_Min_Fields = {
  __typename?: 'project_contributors_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "project_contributors" */
export type Project_Contributors_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "project_contributors" */
export type Project_Contributors_Mutation_Response = {
  __typename?: 'project_contributors_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Project_Contributors>;
};

/** input type for inserting object relation for remote table "project_contributors" */
export type Project_Contributors_Obj_Rel_Insert_Input = {
  data: Project_Contributors_Insert_Input;
  on_conflict?: Maybe<Project_Contributors_On_Conflict>;
};

/** on conflict condition type for table "project_contributors" */
export type Project_Contributors_On_Conflict = {
  constraint: Project_Contributors_Constraint;
  update_columns: Array<Project_Contributors_Update_Column>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};

/** ordering options when selecting data from "project_contributors" */
export type Project_Contributors_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project?: Maybe<Projects_Order_By>;
  project_id?: Maybe<Order_By>;
  roleType?: Maybe<Role_Types_Order_By>;
  role_type?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "project_contributors" */
export type Project_Contributors_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "project_contributors" */
export enum Project_Contributors_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  RoleType = 'role_type',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "project_contributors" */
export type Project_Contributors_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  role_type?: Maybe<Role_Types_Enum>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "project_contributors" */
export enum Project_Contributors_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  RoleType = 'role_type',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "project_notifications" */
export type Project_Notifications = {
  __typename?: 'project_notifications';
  addition_data: Scalars['jsonb'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  is_read: Scalars['Boolean'];
  /** An object relationship */
  notificationType: Notification_Types;
  notification_type: Notification_Types_Enum;
  /** An object relationship */
  project: Projects;
  sender_id: Scalars['uuid'];
  target_id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
};


/** columns and relationships of "project_notifications" */
export type Project_NotificationsAddition_DataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "project_notifications" */
export type Project_Notifications_Aggregate = {
  __typename?: 'project_notifications_aggregate';
  aggregate?: Maybe<Project_Notifications_Aggregate_Fields>;
  nodes: Array<Project_Notifications>;
};

/** aggregate fields of "project_notifications" */
export type Project_Notifications_Aggregate_Fields = {
  __typename?: 'project_notifications_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Project_Notifications_Max_Fields>;
  min?: Maybe<Project_Notifications_Min_Fields>;
};


/** aggregate fields of "project_notifications" */
export type Project_Notifications_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Notifications_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "project_notifications" */
export type Project_Notifications_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Project_Notifications_Max_Order_By>;
  min?: Maybe<Project_Notifications_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Project_Notifications_Append_Input = {
  addition_data?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "project_notifications" */
export type Project_Notifications_Arr_Rel_Insert_Input = {
  data: Array<Project_Notifications_Insert_Input>;
  on_conflict?: Maybe<Project_Notifications_On_Conflict>;
};

/** Boolean expression to filter rows from the table "project_notifications". All fields are combined with a logical 'AND'. */
export type Project_Notifications_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Project_Notifications_Bool_Exp>>>;
  _not?: Maybe<Project_Notifications_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Project_Notifications_Bool_Exp>>>;
  addition_data?: Maybe<Jsonb_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_read?: Maybe<Boolean_Comparison_Exp>;
  notificationType?: Maybe<Notification_Types_Bool_Exp>;
  notification_type?: Maybe<Notification_Types_Enum_Comparison_Exp>;
  project?: Maybe<Projects_Bool_Exp>;
  sender_id?: Maybe<Uuid_Comparison_Exp>;
  target_id?: Maybe<Uuid_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "project_notifications" */
export enum Project_Notifications_Constraint {
  /** unique or primary key constraint */
  NotificationsPkey = 'notifications_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Project_Notifications_Delete_At_Path_Input = {
  addition_data?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Project_Notifications_Delete_Elem_Input = {
  addition_data?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Project_Notifications_Delete_Key_Input = {
  addition_data?: Maybe<Scalars['String']>;
};

/** input type for inserting data into table "project_notifications" */
export type Project_Notifications_Insert_Input = {
  addition_data?: Maybe<Scalars['jsonb']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  is_read?: Maybe<Scalars['Boolean']>;
  notificationType?: Maybe<Notification_Types_Obj_Rel_Insert_Input>;
  notification_type?: Maybe<Notification_Types_Enum>;
  project?: Maybe<Projects_Obj_Rel_Insert_Input>;
  sender_id?: Maybe<Scalars['uuid']>;
  target_id?: Maybe<Scalars['uuid']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Project_Notifications_Max_Fields = {
  __typename?: 'project_notifications_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  sender_id?: Maybe<Scalars['uuid']>;
  target_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "project_notifications" */
export type Project_Notifications_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  sender_id?: Maybe<Order_By>;
  target_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Project_Notifications_Min_Fields = {
  __typename?: 'project_notifications_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  sender_id?: Maybe<Scalars['uuid']>;
  target_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "project_notifications" */
export type Project_Notifications_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  sender_id?: Maybe<Order_By>;
  target_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "project_notifications" */
export type Project_Notifications_Mutation_Response = {
  __typename?: 'project_notifications_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Project_Notifications>;
};

/** input type for inserting object relation for remote table "project_notifications" */
export type Project_Notifications_Obj_Rel_Insert_Input = {
  data: Project_Notifications_Insert_Input;
  on_conflict?: Maybe<Project_Notifications_On_Conflict>;
};

/** on conflict condition type for table "project_notifications" */
export type Project_Notifications_On_Conflict = {
  constraint: Project_Notifications_Constraint;
  update_columns: Array<Project_Notifications_Update_Column>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};

/** ordering options when selecting data from "project_notifications" */
export type Project_Notifications_Order_By = {
  addition_data?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_read?: Maybe<Order_By>;
  notificationType?: Maybe<Notification_Types_Order_By>;
  notification_type?: Maybe<Order_By>;
  project?: Maybe<Projects_Order_By>;
  sender_id?: Maybe<Order_By>;
  target_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "project_notifications" */
export type Project_Notifications_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Project_Notifications_Prepend_Input = {
  addition_data?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "project_notifications" */
export enum Project_Notifications_Select_Column {
  /** column name */
  AdditionData = 'addition_data',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsRead = 'is_read',
  /** column name */
  NotificationType = 'notification_type',
  /** column name */
  SenderId = 'sender_id',
  /** column name */
  TargetId = 'target_id'
}

/** input type for updating data in table "project_notifications" */
export type Project_Notifications_Set_Input = {
  addition_data?: Maybe<Scalars['jsonb']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  is_read?: Maybe<Scalars['Boolean']>;
  notification_type?: Maybe<Notification_Types_Enum>;
  sender_id?: Maybe<Scalars['uuid']>;
  target_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "project_notifications" */
export enum Project_Notifications_Update_Column {
  /** column name */
  AdditionData = 'addition_data',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsRead = 'is_read',
  /** column name */
  NotificationType = 'notification_type',
  /** column name */
  SenderId = 'sender_id',
  /** column name */
  TargetId = 'target_id'
}

/** columns and relationships of "project_types" */
export type Project_Types = {
  __typename?: 'project_types';
  key: Scalars['String'];
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregated array relationship */
  projects_aggregate: Projects_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "project_types" */
export type Project_TypesProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** columns and relationships of "project_types" */
export type Project_TypesProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};

/** aggregated selection of "project_types" */
export type Project_Types_Aggregate = {
  __typename?: 'project_types_aggregate';
  aggregate?: Maybe<Project_Types_Aggregate_Fields>;
  nodes: Array<Project_Types>;
};

/** aggregate fields of "project_types" */
export type Project_Types_Aggregate_Fields = {
  __typename?: 'project_types_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Project_Types_Max_Fields>;
  min?: Maybe<Project_Types_Min_Fields>;
};


/** aggregate fields of "project_types" */
export type Project_Types_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Types_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "project_types" */
export type Project_Types_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Project_Types_Max_Order_By>;
  min?: Maybe<Project_Types_Min_Order_By>;
};

/** input type for inserting array relation for remote table "project_types" */
export type Project_Types_Arr_Rel_Insert_Input = {
  data: Array<Project_Types_Insert_Input>;
  on_conflict?: Maybe<Project_Types_On_Conflict>;
};

/** Boolean expression to filter rows from the table "project_types". All fields are combined with a logical 'AND'. */
export type Project_Types_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Project_Types_Bool_Exp>>>;
  _not?: Maybe<Project_Types_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Project_Types_Bool_Exp>>>;
  key?: Maybe<String_Comparison_Exp>;
  projects?: Maybe<Projects_Bool_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "project_types" */
export enum Project_Types_Constraint {
  /** unique or primary key constraint */
  ProjectTypesPkey = 'project_types_pkey',
  /** unique or primary key constraint */
  ProjectTypesValueKey = 'project_types_value_key'
}

export enum Project_Types_Enum {
  /** PDF Labeling */
  PdfLabelingProject = 'PdfLabelingProject',
  /** Translation */
  Seq2seqProject = 'Seq2seqProject',
  /** Named Entity Recognition */
  SequenceLabelingProject = 'SequenceLabelingProject',
  /** Sentiment Analysis */
  TextClassificationProject = 'TextClassificationProject'
}

/** expression to compare columns of type project_types_enum. All fields are combined with logical 'AND'. */
export type Project_Types_Enum_Comparison_Exp = {
  _eq?: Maybe<Project_Types_Enum>;
  _in?: Maybe<Array<Project_Types_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Project_Types_Enum>;
  _nin?: Maybe<Array<Project_Types_Enum>>;
};

/** input type for inserting data into table "project_types" */
export type Project_Types_Insert_Input = {
  key?: Maybe<Scalars['String']>;
  projects?: Maybe<Projects_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Project_Types_Max_Fields = {
  __typename?: 'project_types_max_fields';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "project_types" */
export type Project_Types_Max_Order_By = {
  key?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Project_Types_Min_Fields = {
  __typename?: 'project_types_min_fields';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "project_types" */
export type Project_Types_Min_Order_By = {
  key?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "project_types" */
export type Project_Types_Mutation_Response = {
  __typename?: 'project_types_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Project_Types>;
};

/** input type for inserting object relation for remote table "project_types" */
export type Project_Types_Obj_Rel_Insert_Input = {
  data: Project_Types_Insert_Input;
  on_conflict?: Maybe<Project_Types_On_Conflict>;
};

/** on conflict condition type for table "project_types" */
export type Project_Types_On_Conflict = {
  constraint: Project_Types_Constraint;
  update_columns: Array<Project_Types_Update_Column>;
  where?: Maybe<Project_Types_Bool_Exp>;
};

/** ordering options when selecting data from "project_types" */
export type Project_Types_Order_By = {
  key?: Maybe<Order_By>;
  projects_aggregate?: Maybe<Projects_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "project_types" */
export type Project_Types_Pk_Columns_Input = {
  key: Scalars['String'];
};

/** select columns of table "project_types" */
export enum Project_Types_Select_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "project_types" */
export type Project_Types_Set_Input = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "project_types" */
export enum Project_Types_Update_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Value = 'value'
}

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'projects';
  annotator_per_example: Scalars['Int'];
  check_dates?: Maybe<Scalars['jsonb']>;
  collaborative_annotation: Scalars['Boolean'];
  created_at: Scalars['timestamptz'];
  description: Scalars['String'];
  /** An array relationship */
  documents: Array<Documents>;
  /** An aggregated array relationship */
  documents_aggregate: Documents_Aggregate;
  due_date?: Maybe<Scalars['timestamptz']>;
  guideline: Scalars['String'];
  id: Scalars['uuid'];
  is_deleted?: Maybe<Scalars['Boolean']>;
  is_public: Scalars['Boolean'];
  /** An array relationship */
  labels: Array<Labels>;
  /** An aggregated array relationship */
  labels_aggregate: Labels_Aggregate;
  name: Scalars['String'];
  owner_id: Scalars['uuid'];
  /** An object relationship */
  projectType: Project_Types;
  /** An array relationship */
  project_contributors: Array<Project_Contributors>;
  /** An aggregated array relationship */
  project_contributors_aggregate: Project_Contributors_Aggregate;
  /** An array relationship */
  project_notifications: Array<Project_Notifications>;
  /** An aggregated array relationship */
  project_notifications_aggregate: Project_Notifications_Aggregate;
  project_type: Project_Types_Enum;
  published_date?: Maybe<Scalars['timestamptz']>;
  randomize_document_order: Scalars['Boolean'];
  updated_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Users;
};


/** columns and relationships of "projects" */
export type ProjectsCheck_DatesArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "projects" */
export type ProjectsDocumentsArgs = {
  distinct_on?: Maybe<Array<Documents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Documents_Order_By>>;
  where?: Maybe<Documents_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsDocuments_AggregateArgs = {
  distinct_on?: Maybe<Array<Documents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Documents_Order_By>>;
  where?: Maybe<Documents_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsLabelsArgs = {
  distinct_on?: Maybe<Array<Labels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Labels_Order_By>>;
  where?: Maybe<Labels_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsLabels_AggregateArgs = {
  distinct_on?: Maybe<Array<Labels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Labels_Order_By>>;
  where?: Maybe<Labels_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsProject_ContributorsArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsProject_Contributors_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsProject_NotificationsArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsProject_Notifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};

/** aggregated selection of "projects" */
export type Projects_Aggregate = {
  __typename?: 'projects_aggregate';
  aggregate?: Maybe<Projects_Aggregate_Fields>;
  nodes: Array<Projects>;
};

/** aggregate fields of "projects" */
export type Projects_Aggregate_Fields = {
  __typename?: 'projects_aggregate_fields';
  avg?: Maybe<Projects_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Projects_Max_Fields>;
  min?: Maybe<Projects_Min_Fields>;
  stddev?: Maybe<Projects_Stddev_Fields>;
  stddev_pop?: Maybe<Projects_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Projects_Stddev_Samp_Fields>;
  sum?: Maybe<Projects_Sum_Fields>;
  var_pop?: Maybe<Projects_Var_Pop_Fields>;
  var_samp?: Maybe<Projects_Var_Samp_Fields>;
  variance?: Maybe<Projects_Variance_Fields>;
};


/** aggregate fields of "projects" */
export type Projects_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Projects_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects" */
export type Projects_Aggregate_Order_By = {
  avg?: Maybe<Projects_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Projects_Max_Order_By>;
  min?: Maybe<Projects_Min_Order_By>;
  stddev?: Maybe<Projects_Stddev_Order_By>;
  stddev_pop?: Maybe<Projects_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Projects_Stddev_Samp_Order_By>;
  sum?: Maybe<Projects_Sum_Order_By>;
  var_pop?: Maybe<Projects_Var_Pop_Order_By>;
  var_samp?: Maybe<Projects_Var_Samp_Order_By>;
  variance?: Maybe<Projects_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Projects_Append_Input = {
  check_dates?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "projects" */
export type Projects_Arr_Rel_Insert_Input = {
  data: Array<Projects_Insert_Input>;
  on_conflict?: Maybe<Projects_On_Conflict>;
};

/** aggregate avg on columns */
export type Projects_Avg_Fields = {
  __typename?: 'projects_avg_fields';
  annotator_per_example?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "projects" */
export type Projects_Avg_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type Projects_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Projects_Bool_Exp>>>;
  _not?: Maybe<Projects_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Projects_Bool_Exp>>>;
  annotator_per_example?: Maybe<Int_Comparison_Exp>;
  check_dates?: Maybe<Jsonb_Comparison_Exp>;
  collaborative_annotation?: Maybe<Boolean_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  documents?: Maybe<Documents_Bool_Exp>;
  due_date?: Maybe<Timestamptz_Comparison_Exp>;
  guideline?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_deleted?: Maybe<Boolean_Comparison_Exp>;
  is_public?: Maybe<Boolean_Comparison_Exp>;
  labels?: Maybe<Labels_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  owner_id?: Maybe<Uuid_Comparison_Exp>;
  projectType?: Maybe<Project_Types_Bool_Exp>;
  project_contributors?: Maybe<Project_Contributors_Bool_Exp>;
  project_notifications?: Maybe<Project_Notifications_Bool_Exp>;
  project_type?: Maybe<Project_Types_Enum_Comparison_Exp>;
  published_date?: Maybe<Timestamptz_Comparison_Exp>;
  randomize_document_order?: Maybe<Boolean_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "projects" */
export enum Projects_Constraint {
  /** unique or primary key constraint */
  ProjectsNameKey = 'projects_name_key',
  /** unique or primary key constraint */
  ProjectsPkey = 'projects_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Projects_Delete_At_Path_Input = {
  check_dates?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Projects_Delete_Elem_Input = {
  check_dates?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Projects_Delete_Key_Input = {
  check_dates?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "projects" */
export type Projects_Inc_Input = {
  annotator_per_example?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "projects" */
export type Projects_Insert_Input = {
  annotator_per_example?: Maybe<Scalars['Int']>;
  check_dates?: Maybe<Scalars['jsonb']>;
  collaborative_annotation?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  documents?: Maybe<Documents_Arr_Rel_Insert_Input>;
  due_date?: Maybe<Scalars['timestamptz']>;
  guideline?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  is_deleted?: Maybe<Scalars['Boolean']>;
  is_public?: Maybe<Scalars['Boolean']>;
  labels?: Maybe<Labels_Arr_Rel_Insert_Input>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['uuid']>;
  projectType?: Maybe<Project_Types_Obj_Rel_Insert_Input>;
  project_contributors?: Maybe<Project_Contributors_Arr_Rel_Insert_Input>;
  project_notifications?: Maybe<Project_Notifications_Arr_Rel_Insert_Input>;
  project_type?: Maybe<Project_Types_Enum>;
  published_date?: Maybe<Scalars['timestamptz']>;
  randomize_document_order?: Maybe<Scalars['Boolean']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Projects_Max_Fields = {
  __typename?: 'projects_max_fields';
  annotator_per_example?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['timestamptz']>;
  guideline?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['uuid']>;
  published_date?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "projects" */
export type Projects_Max_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  due_date?: Maybe<Order_By>;
  guideline?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  published_date?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Projects_Min_Fields = {
  __typename?: 'projects_min_fields';
  annotator_per_example?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['timestamptz']>;
  guideline?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['uuid']>;
  published_date?: Maybe<Scalars['timestamptz']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "projects" */
export type Projects_Min_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  due_date?: Maybe<Order_By>;
  guideline?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  published_date?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "projects" */
export type Projects_Mutation_Response = {
  __typename?: 'projects_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Projects>;
};

/** input type for inserting object relation for remote table "projects" */
export type Projects_Obj_Rel_Insert_Input = {
  data: Projects_Insert_Input;
  on_conflict?: Maybe<Projects_On_Conflict>;
};

/** on conflict condition type for table "projects" */
export type Projects_On_Conflict = {
  constraint: Projects_Constraint;
  update_columns: Array<Projects_Update_Column>;
  where?: Maybe<Projects_Bool_Exp>;
};

/** ordering options when selecting data from "projects" */
export type Projects_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
  check_dates?: Maybe<Order_By>;
  collaborative_annotation?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  documents_aggregate?: Maybe<Documents_Aggregate_Order_By>;
  due_date?: Maybe<Order_By>;
  guideline?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_deleted?: Maybe<Order_By>;
  is_public?: Maybe<Order_By>;
  labels_aggregate?: Maybe<Labels_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  projectType?: Maybe<Project_Types_Order_By>;
  project_contributors_aggregate?: Maybe<Project_Contributors_Aggregate_Order_By>;
  project_notifications_aggregate?: Maybe<Project_Notifications_Aggregate_Order_By>;
  project_type?: Maybe<Order_By>;
  published_date?: Maybe<Order_By>;
  randomize_document_order?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "projects" */
export type Projects_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Projects_Prepend_Input = {
  check_dates?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "projects" */
export enum Projects_Select_Column {
  /** column name */
  AnnotatorPerExample = 'annotator_per_example',
  /** column name */
  CheckDates = 'check_dates',
  /** column name */
  CollaborativeAnnotation = 'collaborative_annotation',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DueDate = 'due_date',
  /** column name */
  Guideline = 'guideline',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsPublic = 'is_public',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  ProjectType = 'project_type',
  /** column name */
  PublishedDate = 'published_date',
  /** column name */
  RandomizeDocumentOrder = 'randomize_document_order',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "projects" */
export type Projects_Set_Input = {
  annotator_per_example?: Maybe<Scalars['Int']>;
  check_dates?: Maybe<Scalars['jsonb']>;
  collaborative_annotation?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['timestamptz']>;
  guideline?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  is_deleted?: Maybe<Scalars['Boolean']>;
  is_public?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['uuid']>;
  project_type?: Maybe<Project_Types_Enum>;
  published_date?: Maybe<Scalars['timestamptz']>;
  randomize_document_order?: Maybe<Scalars['Boolean']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Projects_Stddev_Fields = {
  __typename?: 'projects_stddev_fields';
  annotator_per_example?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "projects" */
export type Projects_Stddev_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Projects_Stddev_Pop_Fields = {
  __typename?: 'projects_stddev_pop_fields';
  annotator_per_example?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "projects" */
export type Projects_Stddev_Pop_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Projects_Stddev_Samp_Fields = {
  __typename?: 'projects_stddev_samp_fields';
  annotator_per_example?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "projects" */
export type Projects_Stddev_Samp_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Projects_Sum_Fields = {
  __typename?: 'projects_sum_fields';
  annotator_per_example?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "projects" */
export type Projects_Sum_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
};

/** update columns of table "projects" */
export enum Projects_Update_Column {
  /** column name */
  AnnotatorPerExample = 'annotator_per_example',
  /** column name */
  CheckDates = 'check_dates',
  /** column name */
  CollaborativeAnnotation = 'collaborative_annotation',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  DueDate = 'due_date',
  /** column name */
  Guideline = 'guideline',
  /** column name */
  Id = 'id',
  /** column name */
  IsDeleted = 'is_deleted',
  /** column name */
  IsPublic = 'is_public',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  ProjectType = 'project_type',
  /** column name */
  PublishedDate = 'published_date',
  /** column name */
  RandomizeDocumentOrder = 'randomize_document_order',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Projects_Var_Pop_Fields = {
  __typename?: 'projects_var_pop_fields';
  annotator_per_example?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "projects" */
export type Projects_Var_Pop_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Projects_Var_Samp_Fields = {
  __typename?: 'projects_var_samp_fields';
  annotator_per_example?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "projects" */
export type Projects_Var_Samp_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Projects_Variance_Fields = {
  __typename?: 'projects_variance_fields';
  annotator_per_example?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "projects" */
export type Projects_Variance_Order_By = {
  annotator_per_example?: Maybe<Order_By>;
};

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "annotations" */
  annotations: Array<Annotations>;
  /** fetch aggregated fields from the table: "annotations" */
  annotations_aggregate: Annotations_Aggregate;
  /** fetch data from the table: "annotations" using primary key columns */
  annotations_by_pk?: Maybe<Annotations>;
  /** fetch data from the table: "documents" */
  documents: Array<Documents>;
  /** fetch aggregated fields from the table: "documents" */
  documents_aggregate: Documents_Aggregate;
  /** fetch data from the table: "documents" using primary key columns */
  documents_by_pk?: Maybe<Documents>;
  /** fetch data from the table: "labels" */
  labels: Array<Labels>;
  /** fetch aggregated fields from the table: "labels" */
  labels_aggregate: Labels_Aggregate;
  /** fetch data from the table: "labels" using primary key columns */
  labels_by_pk?: Maybe<Labels>;
  /** fetch data from the table: "notification_types" */
  notification_types: Array<Notification_Types>;
  /** fetch aggregated fields from the table: "notification_types" */
  notification_types_aggregate: Notification_Types_Aggregate;
  /** fetch data from the table: "notification_types" using primary key columns */
  notification_types_by_pk?: Maybe<Notification_Types>;
  /** fetch data from the table: "project_contributors" */
  project_contributors: Array<Project_Contributors>;
  /** fetch aggregated fields from the table: "project_contributors" */
  project_contributors_aggregate: Project_Contributors_Aggregate;
  /** fetch data from the table: "project_contributors" using primary key columns */
  project_contributors_by_pk?: Maybe<Project_Contributors>;
  /** fetch data from the table: "project_notifications" */
  project_notifications: Array<Project_Notifications>;
  /** fetch aggregated fields from the table: "project_notifications" */
  project_notifications_aggregate: Project_Notifications_Aggregate;
  /** fetch data from the table: "project_notifications" using primary key columns */
  project_notifications_by_pk?: Maybe<Project_Notifications>;
  /** fetch data from the table: "project_types" */
  project_types: Array<Project_Types>;
  /** fetch aggregated fields from the table: "project_types" */
  project_types_aggregate: Project_Types_Aggregate;
  /** fetch data from the table: "project_types" using primary key columns */
  project_types_by_pk?: Maybe<Project_Types>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "role_types" */
  role_types: Array<Role_Types>;
  /** fetch aggregated fields from the table: "role_types" */
  role_types_aggregate: Role_Types_Aggregate;
  /** fetch data from the table: "role_types" using primary key columns */
  role_types_by_pk?: Maybe<Role_Types>;
  /** fetch data from the table: "task_distribution" */
  task_distribution: Array<Task_Distribution>;
  /** fetch aggregated fields from the table: "task_distribution" */
  task_distribution_aggregate: Task_Distribution_Aggregate;
  /** fetch data from the table: "task_distribution" using primary key columns */
  task_distribution_by_pk?: Maybe<Task_Distribution>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootAnnotationsArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** query root */
export type Query_RootAnnotations_AggregateArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** query root */
export type Query_RootAnnotations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootDocumentsArgs = {
  distinct_on?: Maybe<Array<Documents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Documents_Order_By>>;
  where?: Maybe<Documents_Bool_Exp>;
};


/** query root */
export type Query_RootDocuments_AggregateArgs = {
  distinct_on?: Maybe<Array<Documents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Documents_Order_By>>;
  where?: Maybe<Documents_Bool_Exp>;
};


/** query root */
export type Query_RootDocuments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootLabelsArgs = {
  distinct_on?: Maybe<Array<Labels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Labels_Order_By>>;
  where?: Maybe<Labels_Bool_Exp>;
};


/** query root */
export type Query_RootLabels_AggregateArgs = {
  distinct_on?: Maybe<Array<Labels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Labels_Order_By>>;
  where?: Maybe<Labels_Bool_Exp>;
};


/** query root */
export type Query_RootLabels_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootNotification_TypesArgs = {
  distinct_on?: Maybe<Array<Notification_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notification_Types_Order_By>>;
  where?: Maybe<Notification_Types_Bool_Exp>;
};


/** query root */
export type Query_RootNotification_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Notification_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notification_Types_Order_By>>;
  where?: Maybe<Notification_Types_Bool_Exp>;
};


/** query root */
export type Query_RootNotification_Types_By_PkArgs = {
  key: Scalars['String'];
};


/** query root */
export type Query_RootProject_ContributorsArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};


/** query root */
export type Query_RootProject_Contributors_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};


/** query root */
export type Query_RootProject_Contributors_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootProject_NotificationsArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};


/** query root */
export type Query_RootProject_Notifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};


/** query root */
export type Query_RootProject_Notifications_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootProject_TypesArgs = {
  distinct_on?: Maybe<Array<Project_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Types_Order_By>>;
  where?: Maybe<Project_Types_Bool_Exp>;
};


/** query root */
export type Query_RootProject_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Types_Order_By>>;
  where?: Maybe<Project_Types_Bool_Exp>;
};


/** query root */
export type Query_RootProject_Types_By_PkArgs = {
  key: Scalars['String'];
};


/** query root */
export type Query_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** query root */
export type Query_RootProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** query root */
export type Query_RootProjects_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootRole_TypesArgs = {
  distinct_on?: Maybe<Array<Role_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Role_Types_Order_By>>;
  where?: Maybe<Role_Types_Bool_Exp>;
};


/** query root */
export type Query_RootRole_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Role_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Role_Types_Order_By>>;
  where?: Maybe<Role_Types_Bool_Exp>;
};


/** query root */
export type Query_RootRole_Types_By_PkArgs = {
  key: Scalars['String'];
};


/** query root */
export type Query_RootTask_DistributionArgs = {
  distinct_on?: Maybe<Array<Task_Distribution_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Task_Distribution_Order_By>>;
  where?: Maybe<Task_Distribution_Bool_Exp>;
};


/** query root */
export type Query_RootTask_Distribution_AggregateArgs = {
  distinct_on?: Maybe<Array<Task_Distribution_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Task_Distribution_Order_By>>;
  where?: Maybe<Task_Distribution_Bool_Exp>;
};


/** query root */
export type Query_RootTask_Distribution_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "role_types" */
export type Role_Types = {
  __typename?: 'role_types';
  key: Scalars['String'];
  /** An array relationship */
  project_contributors: Array<Project_Contributors>;
  /** An aggregated array relationship */
  project_contributors_aggregate: Project_Contributors_Aggregate;
  value: Scalars['String'];
};


/** columns and relationships of "role_types" */
export type Role_TypesProject_ContributorsArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};


/** columns and relationships of "role_types" */
export type Role_TypesProject_Contributors_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};

/** aggregated selection of "role_types" */
export type Role_Types_Aggregate = {
  __typename?: 'role_types_aggregate';
  aggregate?: Maybe<Role_Types_Aggregate_Fields>;
  nodes: Array<Role_Types>;
};

/** aggregate fields of "role_types" */
export type Role_Types_Aggregate_Fields = {
  __typename?: 'role_types_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Role_Types_Max_Fields>;
  min?: Maybe<Role_Types_Min_Fields>;
};


/** aggregate fields of "role_types" */
export type Role_Types_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Role_Types_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "role_types" */
export type Role_Types_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Role_Types_Max_Order_By>;
  min?: Maybe<Role_Types_Min_Order_By>;
};

/** input type for inserting array relation for remote table "role_types" */
export type Role_Types_Arr_Rel_Insert_Input = {
  data: Array<Role_Types_Insert_Input>;
  on_conflict?: Maybe<Role_Types_On_Conflict>;
};

/** Boolean expression to filter rows from the table "role_types". All fields are combined with a logical 'AND'. */
export type Role_Types_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Role_Types_Bool_Exp>>>;
  _not?: Maybe<Role_Types_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Role_Types_Bool_Exp>>>;
  key?: Maybe<String_Comparison_Exp>;
  project_contributors?: Maybe<Project_Contributors_Bool_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "role_types" */
export enum Role_Types_Constraint {
  /** unique or primary key constraint */
  RolesPkey = 'roles_pkey',
  /** unique or primary key constraint */
  RolesValueKey = 'roles_value_key'
}

export enum Role_Types_Enum {
  /** Approver */
  AnnotationApprover = 'annotation_approver',
  /** Annotator */
  Annotator = 'annotator',
  /** Admin */
  ProjectAdmin = 'project_admin'
}

/** expression to compare columns of type role_types_enum. All fields are combined with logical 'AND'. */
export type Role_Types_Enum_Comparison_Exp = {
  _eq?: Maybe<Role_Types_Enum>;
  _in?: Maybe<Array<Role_Types_Enum>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Role_Types_Enum>;
  _nin?: Maybe<Array<Role_Types_Enum>>;
};

/** input type for inserting data into table "role_types" */
export type Role_Types_Insert_Input = {
  key?: Maybe<Scalars['String']>;
  project_contributors?: Maybe<Project_Contributors_Arr_Rel_Insert_Input>;
  value?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Role_Types_Max_Fields = {
  __typename?: 'role_types_max_fields';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "role_types" */
export type Role_Types_Max_Order_By = {
  key?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Role_Types_Min_Fields = {
  __typename?: 'role_types_min_fields';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "role_types" */
export type Role_Types_Min_Order_By = {
  key?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

/** response of any mutation on the table "role_types" */
export type Role_Types_Mutation_Response = {
  __typename?: 'role_types_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Role_Types>;
};

/** input type for inserting object relation for remote table "role_types" */
export type Role_Types_Obj_Rel_Insert_Input = {
  data: Role_Types_Insert_Input;
  on_conflict?: Maybe<Role_Types_On_Conflict>;
};

/** on conflict condition type for table "role_types" */
export type Role_Types_On_Conflict = {
  constraint: Role_Types_Constraint;
  update_columns: Array<Role_Types_Update_Column>;
  where?: Maybe<Role_Types_Bool_Exp>;
};

/** ordering options when selecting data from "role_types" */
export type Role_Types_Order_By = {
  key?: Maybe<Order_By>;
  project_contributors_aggregate?: Maybe<Project_Contributors_Aggregate_Order_By>;
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "role_types" */
export type Role_Types_Pk_Columns_Input = {
  key: Scalars['String'];
};

/** select columns of table "role_types" */
export enum Role_Types_Select_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "role_types" */
export type Role_Types_Set_Input = {
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

/** update columns of table "role_types" */
export enum Role_Types_Update_Column {
  /** column name */
  Key = 'key',
  /** column name */
  Value = 'value'
}

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "annotations" */
  annotations: Array<Annotations>;
  /** fetch aggregated fields from the table: "annotations" */
  annotations_aggregate: Annotations_Aggregate;
  /** fetch data from the table: "annotations" using primary key columns */
  annotations_by_pk?: Maybe<Annotations>;
  /** fetch data from the table: "documents" */
  documents: Array<Documents>;
  /** fetch aggregated fields from the table: "documents" */
  documents_aggregate: Documents_Aggregate;
  /** fetch data from the table: "documents" using primary key columns */
  documents_by_pk?: Maybe<Documents>;
  /** fetch data from the table: "labels" */
  labels: Array<Labels>;
  /** fetch aggregated fields from the table: "labels" */
  labels_aggregate: Labels_Aggregate;
  /** fetch data from the table: "labels" using primary key columns */
  labels_by_pk?: Maybe<Labels>;
  /** fetch data from the table: "notification_types" */
  notification_types: Array<Notification_Types>;
  /** fetch aggregated fields from the table: "notification_types" */
  notification_types_aggregate: Notification_Types_Aggregate;
  /** fetch data from the table: "notification_types" using primary key columns */
  notification_types_by_pk?: Maybe<Notification_Types>;
  /** fetch data from the table: "project_contributors" */
  project_contributors: Array<Project_Contributors>;
  /** fetch aggregated fields from the table: "project_contributors" */
  project_contributors_aggregate: Project_Contributors_Aggregate;
  /** fetch data from the table: "project_contributors" using primary key columns */
  project_contributors_by_pk?: Maybe<Project_Contributors>;
  /** fetch data from the table: "project_notifications" */
  project_notifications: Array<Project_Notifications>;
  /** fetch aggregated fields from the table: "project_notifications" */
  project_notifications_aggregate: Project_Notifications_Aggregate;
  /** fetch data from the table: "project_notifications" using primary key columns */
  project_notifications_by_pk?: Maybe<Project_Notifications>;
  /** fetch data from the table: "project_types" */
  project_types: Array<Project_Types>;
  /** fetch aggregated fields from the table: "project_types" */
  project_types_aggregate: Project_Types_Aggregate;
  /** fetch data from the table: "project_types" using primary key columns */
  project_types_by_pk?: Maybe<Project_Types>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "role_types" */
  role_types: Array<Role_Types>;
  /** fetch aggregated fields from the table: "role_types" */
  role_types_aggregate: Role_Types_Aggregate;
  /** fetch data from the table: "role_types" using primary key columns */
  role_types_by_pk?: Maybe<Role_Types>;
  /** fetch data from the table: "task_distribution" */
  task_distribution: Array<Task_Distribution>;
  /** fetch aggregated fields from the table: "task_distribution" */
  task_distribution_aggregate: Task_Distribution_Aggregate;
  /** fetch data from the table: "task_distribution" using primary key columns */
  task_distribution_by_pk?: Maybe<Task_Distribution>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootAnnotationsArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAnnotations_AggregateArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAnnotations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootDocumentsArgs = {
  distinct_on?: Maybe<Array<Documents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Documents_Order_By>>;
  where?: Maybe<Documents_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDocuments_AggregateArgs = {
  distinct_on?: Maybe<Array<Documents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Documents_Order_By>>;
  where?: Maybe<Documents_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDocuments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootLabelsArgs = {
  distinct_on?: Maybe<Array<Labels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Labels_Order_By>>;
  where?: Maybe<Labels_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLabels_AggregateArgs = {
  distinct_on?: Maybe<Array<Labels_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Labels_Order_By>>;
  where?: Maybe<Labels_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootLabels_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootNotification_TypesArgs = {
  distinct_on?: Maybe<Array<Notification_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notification_Types_Order_By>>;
  where?: Maybe<Notification_Types_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootNotification_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Notification_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Notification_Types_Order_By>>;
  where?: Maybe<Notification_Types_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootNotification_Types_By_PkArgs = {
  key: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProject_ContributorsArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProject_Contributors_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProject_Contributors_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootProject_NotificationsArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProject_Notifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProject_Notifications_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootProject_TypesArgs = {
  distinct_on?: Maybe<Array<Project_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Types_Order_By>>;
  where?: Maybe<Project_Types_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProject_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Types_Order_By>>;
  where?: Maybe<Project_Types_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProject_Types_By_PkArgs = {
  key: Scalars['String'];
};


/** subscription root */
export type Subscription_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProjects_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootRole_TypesArgs = {
  distinct_on?: Maybe<Array<Role_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Role_Types_Order_By>>;
  where?: Maybe<Role_Types_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRole_Types_AggregateArgs = {
  distinct_on?: Maybe<Array<Role_Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Role_Types_Order_By>>;
  where?: Maybe<Role_Types_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootRole_Types_By_PkArgs = {
  key: Scalars['String'];
};


/** subscription root */
export type Subscription_RootTask_DistributionArgs = {
  distinct_on?: Maybe<Array<Task_Distribution_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Task_Distribution_Order_By>>;
  where?: Maybe<Task_Distribution_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTask_Distribution_AggregateArgs = {
  distinct_on?: Maybe<Array<Task_Distribution_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Task_Distribution_Order_By>>;
  where?: Maybe<Task_Distribution_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTask_Distribution_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "task_distribution" */
export type Task_Distribution = {
  __typename?: 'task_distribution';
  /** An array relationship */
  annotations: Array<Annotations>;
  /** An aggregated array relationship */
  annotations_aggregate: Annotations_Aggregate;
  /** An object relationship */
  document: Documents;
  document_id: Scalars['uuid'];
  id: Scalars['uuid'];
  is_approved: Scalars['Boolean'];
  is_confirmed: Scalars['Boolean'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};


/** columns and relationships of "task_distribution" */
export type Task_DistributionAnnotationsArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** columns and relationships of "task_distribution" */
export type Task_DistributionAnnotations_AggregateArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};

/** aggregated selection of "task_distribution" */
export type Task_Distribution_Aggregate = {
  __typename?: 'task_distribution_aggregate';
  aggregate?: Maybe<Task_Distribution_Aggregate_Fields>;
  nodes: Array<Task_Distribution>;
};

/** aggregate fields of "task_distribution" */
export type Task_Distribution_Aggregate_Fields = {
  __typename?: 'task_distribution_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Task_Distribution_Max_Fields>;
  min?: Maybe<Task_Distribution_Min_Fields>;
};


/** aggregate fields of "task_distribution" */
export type Task_Distribution_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Task_Distribution_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "task_distribution" */
export type Task_Distribution_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Task_Distribution_Max_Order_By>;
  min?: Maybe<Task_Distribution_Min_Order_By>;
};

/** input type for inserting array relation for remote table "task_distribution" */
export type Task_Distribution_Arr_Rel_Insert_Input = {
  data: Array<Task_Distribution_Insert_Input>;
  on_conflict?: Maybe<Task_Distribution_On_Conflict>;
};

/** Boolean expression to filter rows from the table "task_distribution". All fields are combined with a logical 'AND'. */
export type Task_Distribution_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Task_Distribution_Bool_Exp>>>;
  _not?: Maybe<Task_Distribution_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Task_Distribution_Bool_Exp>>>;
  annotations?: Maybe<Annotations_Bool_Exp>;
  document?: Maybe<Documents_Bool_Exp>;
  document_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_approved?: Maybe<Boolean_Comparison_Exp>;
  is_confirmed?: Maybe<Boolean_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "task_distribution" */
export enum Task_Distribution_Constraint {
  /** unique or primary key constraint */
  TaskDistributionPkey = 'task_distribution_pkey',
  /** unique or primary key constraint */
  TaskDistributionUserIdDocumentIdKey = 'task_distribution_user_id_document_id_key'
}

/** input type for inserting data into table "task_distribution" */
export type Task_Distribution_Insert_Input = {
  annotations?: Maybe<Annotations_Arr_Rel_Insert_Input>;
  document?: Maybe<Documents_Obj_Rel_Insert_Input>;
  document_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  is_approved?: Maybe<Scalars['Boolean']>;
  is_confirmed?: Maybe<Scalars['Boolean']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Task_Distribution_Max_Fields = {
  __typename?: 'task_distribution_max_fields';
  document_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "task_distribution" */
export type Task_Distribution_Max_Order_By = {
  document_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Task_Distribution_Min_Fields = {
  __typename?: 'task_distribution_min_fields';
  document_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "task_distribution" */
export type Task_Distribution_Min_Order_By = {
  document_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "task_distribution" */
export type Task_Distribution_Mutation_Response = {
  __typename?: 'task_distribution_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Task_Distribution>;
};

/** input type for inserting object relation for remote table "task_distribution" */
export type Task_Distribution_Obj_Rel_Insert_Input = {
  data: Task_Distribution_Insert_Input;
  on_conflict?: Maybe<Task_Distribution_On_Conflict>;
};

/** on conflict condition type for table "task_distribution" */
export type Task_Distribution_On_Conflict = {
  constraint: Task_Distribution_Constraint;
  update_columns: Array<Task_Distribution_Update_Column>;
  where?: Maybe<Task_Distribution_Bool_Exp>;
};

/** ordering options when selecting data from "task_distribution" */
export type Task_Distribution_Order_By = {
  annotations_aggregate?: Maybe<Annotations_Aggregate_Order_By>;
  document?: Maybe<Documents_Order_By>;
  document_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_approved?: Maybe<Order_By>;
  is_confirmed?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "task_distribution" */
export type Task_Distribution_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "task_distribution" */
export enum Task_Distribution_Select_Column {
  /** column name */
  DocumentId = 'document_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsApproved = 'is_approved',
  /** column name */
  IsConfirmed = 'is_confirmed',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "task_distribution" */
export type Task_Distribution_Set_Input = {
  document_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  is_approved?: Maybe<Scalars['Boolean']>;
  is_confirmed?: Maybe<Scalars['Boolean']>;
  user_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "task_distribution" */
export enum Task_Distribution_Update_Column {
  /** column name */
  DocumentId = 'document_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsApproved = 'is_approved',
  /** column name */
  IsConfirmed = 'is_confirmed',
  /** column name */
  UserId = 'user_id'
}


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  annotations: Array<Annotations>;
  /** An aggregated array relationship */
  annotations_aggregate: Annotations_Aggregate;
  auth0_id: Scalars['String'];
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  last_seen?: Maybe<Scalars['timestamptz']>;
  name: Scalars['String'];
  /** An array relationship */
  project_contributors: Array<Project_Contributors>;
  /** An aggregated array relationship */
  project_contributors_aggregate: Project_Contributors_Aggregate;
  /** An array relationship */
  project_notifications: Array<Project_Notifications>;
  /** An aggregated array relationship */
  project_notifications_aggregate: Project_Notifications_Aggregate;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregated array relationship */
  projects_aggregate: Projects_Aggregate;
  /** An array relationship */
  task_distributions: Array<Task_Distribution>;
  /** An aggregated array relationship */
  task_distributions_aggregate: Task_Distribution_Aggregate;
};


/** columns and relationships of "users" */
export type UsersAnnotationsArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersAnnotations_AggregateArgs = {
  distinct_on?: Maybe<Array<Annotations_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Annotations_Order_By>>;
  where?: Maybe<Annotations_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProject_ContributorsArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProject_Contributors_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Contributors_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Contributors_Order_By>>;
  where?: Maybe<Project_Contributors_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProject_NotificationsArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProject_Notifications_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Notifications_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Notifications_Order_By>>;
  where?: Maybe<Project_Notifications_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTask_DistributionsArgs = {
  distinct_on?: Maybe<Array<Task_Distribution_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Task_Distribution_Order_By>>;
  where?: Maybe<Task_Distribution_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTask_Distributions_AggregateArgs = {
  distinct_on?: Maybe<Array<Task_Distribution_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Task_Distribution_Order_By>>;
  where?: Maybe<Task_Distribution_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  annotations?: Maybe<Annotations_Bool_Exp>;
  auth0_id?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  last_seen?: Maybe<Timestamptz_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  project_contributors?: Maybe<Project_Contributors_Bool_Exp>;
  project_notifications?: Maybe<Project_Notifications_Bool_Exp>;
  projects?: Maybe<Projects_Bool_Exp>;
  task_distributions?: Maybe<Task_Distribution_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UserAuth0IdKey = 'user_auth0_id_key',
  /** unique or primary key constraint */
  UserIdKey = 'user_id_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  annotations?: Maybe<Annotations_Arr_Rel_Insert_Input>;
  auth0_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  project_contributors?: Maybe<Project_Contributors_Arr_Rel_Insert_Input>;
  project_notifications?: Maybe<Project_Notifications_Arr_Rel_Insert_Input>;
  projects?: Maybe<Projects_Arr_Rel_Insert_Input>;
  task_distributions?: Maybe<Task_Distribution_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  auth0_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  auth0_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  auth0_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  auth0_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  annotations_aggregate?: Maybe<Annotations_Aggregate_Order_By>;
  auth0_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  project_contributors_aggregate?: Maybe<Project_Contributors_Aggregate_Order_By>;
  project_notifications_aggregate?: Maybe<Project_Notifications_Aggregate_Order_By>;
  projects_aggregate?: Maybe<Projects_Aggregate_Order_By>;
  task_distributions_aggregate?: Maybe<Task_Distribution_Aggregate_Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Auth0Id = 'auth0_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  auth0_id?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Auth0Id = 'auth0_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Name = 'name'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type QueryProjectByIdQueryVariables = Exact<{
  projectsId: Scalars['uuid'];
}>;


export type QueryProjectByIdQuery = (
  { __typename?: 'query_root' }
  & { projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & ProjectFragment
  )> }
);

export type QueryProjectObjectsQueryVariables = Exact<{
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  where?: Maybe<Projects_Bool_Exp>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
}>;


export type QueryProjectObjectsQuery = (
  { __typename?: 'query_root' }
  & { projects: Array<(
    { __typename?: 'projects' }
    & ProjectFragment
  )> }
);

export type SubscribeToProjectByIdSubscriptionVariables = Exact<{
  projectsId: Scalars['uuid'];
}>;


export type SubscribeToProjectByIdSubscription = (
  { __typename?: 'subscription_root' }
  & { projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & ProjectFragment
  )> }
);

export type SubscribeToProjectObjectsSubscriptionVariables = Exact<{
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  where?: Maybe<Projects_Bool_Exp>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
}>;


export type SubscribeToProjectObjectsSubscription = (
  { __typename?: 'subscription_root' }
  & { projects: Array<(
    { __typename?: 'projects' }
    & ProjectFragment
  )> }
);

export type InsertProjectMutationVariables = Exact<{
  objects: Array<Projects_Insert_Input>;
}>;


export type InsertProjectMutation = (
  { __typename?: 'mutation_root' }
  & { insert_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'projects' }
      & ProjectFragment
    )> }
  )> }
);

export type InsertProjectWithOnConflictMutationVariables = Exact<{
  objects: Array<Projects_Insert_Input>;
  onConflict?: Maybe<Projects_On_Conflict>;
}>;


export type InsertProjectWithOnConflictMutation = (
  { __typename?: 'mutation_root' }
  & { insert_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'projects' }
      & ProjectFragment
    )> }
  )> }
);

export type UpdateProjectByIdMutationVariables = Exact<{
  id?: Maybe<Scalars['uuid']>;
  set?: Maybe<Projects_Set_Input>;
}>;


export type UpdateProjectByIdMutation = (
  { __typename?: 'mutation_root' }
  & { update_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'projects' }
      & ProjectFragment
    )> }
  )> }
);

export type UpdateProjectMutationVariables = Exact<{
  set?: Maybe<Projects_Set_Input>;
  where: Projects_Bool_Exp;
}>;


export type UpdateProjectMutation = (
  { __typename?: 'mutation_root' }
  & { update_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'projects' }
      & ProjectFragment
    )> }
  )> }
);

export type RemoveProjectsModelByIdMutationVariables = Exact<{
  id?: Maybe<Scalars['uuid']>;
}>;


export type RemoveProjectsModelByIdMutation = (
  { __typename?: 'mutation_root' }
  & { delete_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
  )> }
);

export type RemoveProjectsModelMutationVariables = Exact<{
  where: Projects_Bool_Exp;
}>;


export type RemoveProjectsModelMutation = (
  { __typename?: 'mutation_root' }
  & { delete_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
  )> }
);

export type QueryProjectExploreByIdQueryVariables = Exact<{
  projectsId: Scalars['uuid'];
}>;


export type QueryProjectExploreByIdQuery = (
  { __typename?: 'query_root' }
  & { projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & ProjectExploreFragment
  )> }
);

export type QueryProjectExploreObjectsQueryVariables = Exact<{
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  where?: Maybe<Projects_Bool_Exp>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
}>;


export type QueryProjectExploreObjectsQuery = (
  { __typename?: 'query_root' }
  & { projects: Array<(
    { __typename?: 'projects' }
    & ProjectExploreFragment
  )> }
);

export type SubscribeToProjectExploreByIdSubscriptionVariables = Exact<{
  projectsId: Scalars['uuid'];
}>;


export type SubscribeToProjectExploreByIdSubscription = (
  { __typename?: 'subscription_root' }
  & { projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & ProjectExploreFragment
  )> }
);

export type SubscribeToProjectExploreObjectsSubscriptionVariables = Exact<{
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  where?: Maybe<Projects_Bool_Exp>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
}>;


export type SubscribeToProjectExploreObjectsSubscription = (
  { __typename?: 'subscription_root' }
  & { projects: Array<(
    { __typename?: 'projects' }
    & ProjectExploreFragment
  )> }
);

export type InsertProjectExploreMutationVariables = Exact<{
  objects: Array<Projects_Insert_Input>;
}>;


export type InsertProjectExploreMutation = (
  { __typename?: 'mutation_root' }
  & { insert_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'projects' }
      & ProjectExploreFragment
    )> }
  )> }
);

export type InsertProjectExploreWithOnConflictMutationVariables = Exact<{
  objects: Array<Projects_Insert_Input>;
  onConflict?: Maybe<Projects_On_Conflict>;
}>;


export type InsertProjectExploreWithOnConflictMutation = (
  { __typename?: 'mutation_root' }
  & { insert_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'projects' }
      & ProjectExploreFragment
    )> }
  )> }
);

export type UpdateProjectExploreByIdMutationVariables = Exact<{
  id?: Maybe<Scalars['uuid']>;
  set?: Maybe<Projects_Set_Input>;
}>;


export type UpdateProjectExploreByIdMutation = (
  { __typename?: 'mutation_root' }
  & { update_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'projects' }
      & ProjectExploreFragment
    )> }
  )> }
);

export type UpdateProjectExploreMutationVariables = Exact<{
  set?: Maybe<Projects_Set_Input>;
  where: Projects_Bool_Exp;
}>;


export type UpdateProjectExploreMutation = (
  { __typename?: 'mutation_root' }
  & { update_projects?: Maybe<(
    { __typename?: 'projects_mutation_response' }
    & Pick<Projects_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'projects' }
      & ProjectExploreFragment
    )> }
  )> }
);

export type ProjectFragment = (
  { __typename?: 'projects' }
  & Pick<Projects, 'id' | 'name' | 'description' | 'project_type' | 'annotator_per_example' | 'collaborative_annotation' | 'randomize_document_order' | 'updated_at' | 'guideline' | 'is_public'>
);

export type ProjectExploreFragment = (
  { __typename?: 'projects' }
  & { project_notifications: Array<(
    { __typename?: 'project_notifications' }
    & Pick<Project_Notifications, 'addition_data' | 'created_at' | 'id' | 'notification_type' | 'sender_id'>
  )>, project_contributors_aggregate: (
    { __typename?: 'project_contributors_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'project_contributors_aggregate_fields' }
      & Pick<Project_Contributors_Aggregate_Fields, 'count'>
    )> }
  ), labels_aggregate: (
    { __typename?: 'labels_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'labels_aggregate_fields' }
      & Pick<Labels_Aggregate_Fields, 'count'>
    )> }
  ), documents_aggregate: (
    { __typename?: 'documents_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'documents_aggregate_fields' }
      & Pick<Documents_Aggregate_Fields, 'count'>
    )>, nodes: Array<(
      { __typename?: 'documents' }
      & { task_distributions: Array<(
        { __typename?: 'task_distribution' }
        & Pick<Task_Distribution, 'is_approved'>
      )> }
    )> }
  ) }
  & ProjectFragment
);

export type LabelFragment = (
  { __typename?: 'labels' }
  & Pick<Labels, 'id' | 'text' | 'hotkey' | 'color' | 'created_at'>
);

export type AnnotationFragment = (
  { __typename?: 'annotations' }
  & Pick<Annotations, 'data' | 'id' | 'is_submit' | 'manual' | 'document_id' | 'label_id' | 'user_id'>
  & { document: (
    { __typename?: 'documents' }
    & Pick<Documents, 'id' | 'text'>
  ), label?: Maybe<(
    { __typename?: 'labels' }
    & LabelFragment
  )>, user: (
    { __typename?: 'users' }
    & Pick<Users, 'id' | 'auth0_id' | 'name'>
  ) }
);

export type TaskDistributionFragment = (
  { __typename?: 'task_distribution' }
  & Pick<Task_Distribution, 'id' | 'is_confirmed' | 'is_approved' | 'document_id'>
  & { document: (
    { __typename?: 'documents' }
    & Pick<Documents, 'text'>
  ) }
);

export type DocumentAnnotationFragment = (
  { __typename?: 'documents' }
  & Pick<Documents, 'id' | 'meta' | 'text' | 'created_at'>
);

export type DocumentFragment = (
  { __typename?: 'documents' }
  & Pick<Documents, 'id' | 'meta' | 'text' | 'created_at'>
);

export type ProjectNotificationFragment = (
  { __typename?: 'project_notifications' }
  & Pick<Project_Notifications, 'addition_data' | 'created_at' | 'id' | 'is_read' | 'notification_type' | 'sender_id'>
  & { project: (
    { __typename?: 'projects' }
    & Pick<Projects, 'id' | 'name'>
  ), user: (
    { __typename?: 'users' }
    & Pick<Users, 'auth0_id' | 'id' | 'name'>
  ) }
);

export type ProjectOldFragment = (
  { __typename?: 'projects' }
  & Pick<Projects, 'id' | 'name' | 'description' | 'project_type' | 'annotator_per_example' | 'collaborative_annotation' | 'randomize_document_order' | 'updated_at' | 'created_at' | 'guideline' | 'is_public'>
  & { user: (
    { __typename?: 'users' }
    & Pick<Users, 'id' | 'name' | 'auth0_id'>
  ), project_contributors: Array<(
    { __typename?: 'project_contributors' }
    & Pick<Project_Contributors, 'role_type'>
    & { user: (
      { __typename?: 'users' }
      & Pick<Users, 'id' | 'name' | 'auth0_id'>
    ) }
  )> }
);

export type ProjectStatisticsFragment = (
  { __typename?: 'projects' }
  & { project_contributors_aggregate: (
    { __typename?: 'project_contributors_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'project_contributors_aggregate_fields' }
      & Pick<Project_Contributors_Aggregate_Fields, 'count'>
    )> }
  ), labels_aggregate: (
    { __typename?: 'labels_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'labels_aggregate_fields' }
      & Pick<Labels_Aggregate_Fields, 'count'>
    )> }
  ), documents_aggregate: (
    { __typename?: 'documents_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'documents_aggregate_fields' }
      & Pick<Documents_Aggregate_Fields, 'count'>
    )>, nodes: Array<(
      { __typename?: 'documents' }
      & { task_distributions: Array<(
        { __typename?: 'task_distribution' }
        & Pick<Task_Distribution, 'is_approved'>
      )> }
    )> }
  ) }
);

export type ContributorByNameOrIdFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'id' | 'auth0_id' | 'name'>
);

export type ProjectContributorFragment = (
  { __typename?: 'project_contributors' }
  & Pick<Project_Contributors, 'id' | 'role_type' | 'created_at'>
  & { user: (
    { __typename?: 'users' }
    & Pick<Users, 'id' | 'auth0_id' | 'name'>
  ) }
);

export type AnnotationsQueryVariables = Exact<{
  document_id: Scalars['uuid'];
  user_id?: Maybe<Scalars['uuid']>;
  is_approved?: Maybe<Scalars['Boolean']>;
}>;


export type AnnotationsQuery = (
  { __typename?: 'query_root' }
  & { annotations: Array<(
    { __typename?: 'annotations' }
    & AnnotationFragment
  )> }
);

export type AnnotationsAggregateQueryVariables = Exact<{
  project_id: Scalars['uuid'];
  user_id?: Maybe<Scalars['uuid']>;
}>;


export type AnnotationsAggregateQuery = (
  { __typename?: 'query_root' }
  & { annotations_aggregate: (
    { __typename?: 'annotations_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'annotations_aggregate_fields' }
      & Pick<Annotations_Aggregate_Fields, 'count'>
    )>, nodes: Array<(
      { __typename?: 'annotations' }
      & Pick<Annotations, 'document_id'>
    )> }
  ) }
);

export type DeleteAnnotationsMutationVariables = Exact<{
  ids: Array<Scalars['uuid']>;
}>;


export type DeleteAnnotationsMutation = (
  { __typename?: 'mutation_root' }
  & { delete_annotations?: Maybe<(
    { __typename?: 'annotations_mutation_response' }
    & { returning: Array<(
      { __typename?: 'annotations' }
      & AnnotationFragment
    )> }
  )> }
);

export type DocumentsAnnotationQueryVariables = Exact<{
  project_id: Scalars['uuid'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['uuid']>;
}>;


export type DocumentsAnnotationQuery = (
  { __typename?: 'query_root' }
  & { task_distribution: Array<(
    { __typename?: 'task_distribution' }
    & TaskDistributionFragment
  )>, documents: Array<(
    { __typename?: 'documents' }
    & DocumentAnnotationFragment
  )> }
);

export type InsertAnnotationsMutationVariables = Exact<{
  annotations: Array<Annotations_Insert_Input>;
}>;


export type InsertAnnotationsMutation = (
  { __typename?: 'mutation_root' }
  & { insert_annotations?: Maybe<(
    { __typename?: 'annotations_mutation_response' }
    & { returning: Array<(
      { __typename?: 'annotations' }
      & AnnotationFragment
    )> }
  )> }
);

export type SaveAnnotationsMutationVariables = Exact<{
  annotations: Array<Annotations_Insert_Input>;
  ids: Array<Scalars['uuid']>;
}>;


export type SaveAnnotationsMutation = (
  { __typename?: 'mutation_root' }
  & { insert_annotations?: Maybe<(
    { __typename?: 'annotations_mutation_response' }
    & { returning: Array<(
      { __typename?: 'annotations' }
      & AnnotationFragment
    )> }
  )>, delete_annotations?: Maybe<(
    { __typename?: 'annotations_mutation_response' }
    & { returning: Array<(
      { __typename?: 'annotations' }
      & AnnotationFragment
    )> }
  )> }
);

export type SetApproveTaskMutationVariables = Exact<{
  id: Scalars['uuid'];
  is_approved: Scalars['Boolean'];
}>;


export type SetApproveTaskMutation = (
  { __typename?: 'mutation_root' }
  & { update_task_distribution_by_pk?: Maybe<(
    { __typename?: 'task_distribution' }
    & TaskDistributionFragment
  )> }
);

export type SetConfirmTaskMutationVariables = Exact<{
  id: Scalars['uuid'];
  is_confirmed: Scalars['Boolean'];
}>;


export type SetConfirmTaskMutation = (
  { __typename?: 'mutation_root' }
  & { update_task_distribution_by_pk?: Maybe<(
    { __typename?: 'task_distribution' }
    & TaskDistributionFragment
  )> }
);

export type UpdateAnnotationMutationVariables = Exact<{
  id: Scalars['uuid'];
  changes?: Maybe<Annotations_Set_Input>;
}>;


export type UpdateAnnotationMutation = (
  { __typename?: 'mutation_root' }
  & { update_annotations_by_pk?: Maybe<(
    { __typename?: 'annotations' }
    & AnnotationFragment
  )> }
);

export type DeleteDocumentMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteDocumentMutation = (
  { __typename?: 'mutation_root' }
  & { delete_documents_by_pk?: Maybe<(
    { __typename?: 'documents' }
    & DocumentFragment
  )> }
);

export type DocumentsQueryVariables = Exact<{
  project_id: Scalars['uuid'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type DocumentsQuery = (
  { __typename?: 'query_root' }
  & { documents: Array<(
    { __typename?: 'documents' }
    & DocumentFragment
  )>, documents_aggregate: (
    { __typename?: 'documents_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'documents_aggregate_fields' }
      & Pick<Documents_Aggregate_Fields, 'count'>
    )> }
  ) }
);

export type FileUploadMutationVariables = Exact<{
  name: Scalars['String'];
  type: Scalars['String'];
  base64str: Scalars['String'];
}>;


export type FileUploadMutation = (
  { __typename?: 'mutation_root' }
  & { fileUpload?: Maybe<(
    { __typename?: 'fileOutput' }
    & Pick<FileOutput, 'file_path'>
  )> }
);

export type InsertDocumentsMutationVariables = Exact<{
  documents: Array<Documents_Insert_Input>;
}>;


export type InsertDocumentsMutation = (
  { __typename?: 'mutation_root' }
  & { insert_documents?: Maybe<(
    { __typename?: 'documents_mutation_response' }
    & { returning: Array<(
      { __typename?: 'documents' }
      & DocumentFragment
    )> }
  )> }
);

export type UpdateDocumentMutationVariables = Exact<{
  id: Scalars['uuid'];
  changes?: Maybe<Documents_Set_Input>;
}>;


export type UpdateDocumentMutation = (
  { __typename?: 'mutation_root' }
  & { update_documents_by_pk?: Maybe<(
    { __typename?: 'documents' }
    & DocumentFragment
  )> }
);

export type DocumentsDownloadQueryVariables = Exact<{
  project_id: Scalars['uuid'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['uuid']>;
  is_approved?: Maybe<Scalars['Boolean']>;
}>;


export type DocumentsDownloadQuery = (
  { __typename?: 'query_root' }
  & { documents_aggregate: (
    { __typename?: 'documents_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'documents_aggregate_fields' }
      & Pick<Documents_Aggregate_Fields, 'count'>
    )> }
  ), documents: Array<(
    { __typename?: 'documents' }
    & { task_distributions: Array<(
      { __typename?: 'task_distribution' }
      & TaskDistributionFragment
    )>, annotations: Array<(
      { __typename?: 'annotations' }
      & AnnotationFragment
    )> }
    & DocumentAnnotationFragment
  )> }
);

export type DeleteLabelMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteLabelMutation = (
  { __typename?: 'mutation_root' }
  & { delete_labels_by_pk?: Maybe<(
    { __typename?: 'labels' }
    & LabelFragment
  )> }
);

export type InsertLabelMutationVariables = Exact<{
  text: Scalars['String'];
  color: Scalars['String'];
  hotkey: Scalars['String'];
  project_id: Scalars['uuid'];
}>;


export type InsertLabelMutation = (
  { __typename?: 'mutation_root' }
  & { insert_labels_one?: Maybe<(
    { __typename?: 'labels' }
    & LabelFragment
  )> }
);

export type LabelsQueryVariables = Exact<{
  project_id: Scalars['uuid'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type LabelsQuery = (
  { __typename?: 'query_root' }
  & { labels: Array<(
    { __typename?: 'labels' }
    & LabelFragment
  )>, labels_aggregate: (
    { __typename?: 'labels_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'labels_aggregate_fields' }
      & Pick<Labels_Aggregate_Fields, 'count'>
    )> }
  ) }
);

export type UpdateLabelMutationVariables = Exact<{
  id: Scalars['uuid'];
  changes?: Maybe<Labels_Set_Input>;
}>;


export type UpdateLabelMutation = (
  { __typename?: 'mutation_root' }
  & { update_labels_by_pk?: Maybe<(
    { __typename?: 'labels' }
    & LabelFragment
  )> }
);

export type ContributorRequestMutationVariables = Exact<{
  project_id: Scalars['uuid'];
  addition_data: Scalars['jsonb'];
}>;


export type ContributorRequestMutation = (
  { __typename?: 'mutation_root' }
  & { insert_project_notifications_one?: Maybe<(
    { __typename?: 'project_notifications' }
    & Pick<Project_Notifications, 'addition_data' | 'created_at' | 'id' | 'notification_type' | 'sender_id'>
  )> }
);

export type MarkAsReadNotificationMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type MarkAsReadNotificationMutation = (
  { __typename?: 'mutation_root' }
  & { update_project_notifications_by_pk?: Maybe<(
    { __typename?: 'project_notifications' }
    & Pick<Project_Notifications, 'addition_data' | 'id' | 'is_read'>
  )> }
);

export type ProjectNotificationsQueryVariables = Exact<{
  project_id: Scalars['uuid'];
}>;


export type ProjectNotificationsQuery = (
  { __typename?: 'query_root' }
  & { project_notifications: Array<(
    { __typename?: 'project_notifications' }
    & ProjectNotificationFragment
  )> }
);

export type ExploreProjectsQueryVariables = Exact<{
  name_or_description?: Maybe<Scalars['String']>;
  project_types?: Maybe<Array<Project_Types_Enum>>;
  auth0_id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type ExploreProjectsQuery = (
  { __typename?: 'query_root' }
  & { projects_aggregate: (
    { __typename?: 'projects_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'projects_aggregate_fields' }
      & Pick<Projects_Aggregate_Fields, 'count'>
    )> }
  ), projects: Array<(
    { __typename?: 'projects' }
    & { project_notifications: Array<(
      { __typename?: 'project_notifications' }
      & Pick<Project_Notifications, 'addition_data' | 'created_at' | 'id' | 'notification_type' | 'sender_id'>
    )> }
    & ProjectOldFragment
    & ProjectStatisticsFragment
  )> }
);

export type MyProjectsQueryVariables = Exact<{
  name_or_description?: Maybe<Scalars['String']>;
  project_types?: Maybe<Array<Project_Types_Enum>>;
  auth0_id: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type MyProjectsQuery = (
  { __typename?: 'query_root' }
  & { projects_aggregate: (
    { __typename?: 'projects_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'projects_aggregate_fields' }
      & Pick<Projects_Aggregate_Fields, 'count'>
    )> }
  ), projects: Array<(
    { __typename?: 'projects' }
    & ProjectOldFragment
    & ProjectStatisticsFragment
  )> }
);

export type MyProjectsAggregateQueryVariables = Exact<{
  auth0_id: Scalars['String'];
}>;


export type MyProjectsAggregateQuery = (
  { __typename?: 'query_root' }
  & { projects_aggregate: (
    { __typename?: 'projects_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'projects_aggregate_fields' }
      & Pick<Projects_Aggregate_Fields, 'count'>
    )> }
  ) }
);

export type ProjectDashboardQueryVariables = Exact<{
  project_id: Scalars['uuid'];
}>;


export type ProjectDashboardQuery = (
  { __typename?: 'query_root' }
  & { labels_aggregate: (
    { __typename?: 'labels_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'labels_aggregate_fields' }
      & Pick<Labels_Aggregate_Fields, 'count'>
    )>, nodes: Array<(
      { __typename?: 'labels' }
      & Pick<Labels, 'id' | 'text' | 'color'>
      & { annotations_aggregate: (
        { __typename?: 'annotations_aggregate' }
        & { aggregate?: Maybe<(
          { __typename?: 'annotations_aggregate_fields' }
          & Pick<Annotations_Aggregate_Fields, 'count'>
        )> }
      ) }
    )> }
  ), documents_aggregate: (
    { __typename?: 'documents_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'documents_aggregate_fields' }
      & Pick<Documents_Aggregate_Fields, 'count'>
    )>, nodes: Array<(
      { __typename?: 'documents' }
      & Pick<Documents, 'text'>
      & { annotations_aggregate: (
        { __typename?: 'annotations_aggregate' }
        & { aggregate?: Maybe<(
          { __typename?: 'annotations_aggregate_fields' }
          & Pick<Annotations_Aggregate_Fields, 'count'>
        )> }
      ) }
    )> }
  ), project_contributors_aggregate: (
    { __typename?: 'project_contributors_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'project_contributors_aggregate_fields' }
      & Pick<Project_Contributors_Aggregate_Fields, 'count'>
    )>, nodes: Array<(
      { __typename?: 'project_contributors' }
      & { user: (
        { __typename?: 'users' }
        & Pick<Users, 'name'>
        & { annotations_aggregate: (
          { __typename?: 'annotations_aggregate' }
          & { aggregate?: Maybe<(
            { __typename?: 'annotations_aggregate_fields' }
            & Pick<Annotations_Aggregate_Fields, 'count'>
          )>, nodes: Array<(
            { __typename?: 'annotations' }
            & { document: (
              { __typename?: 'documents' }
              & Pick<Documents, 'project_id'>
            ) }
          )> }
        ) }
      ) }
    )> }
  ) }
);

export type ProjectsByPkQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ProjectsByPkQuery = (
  { __typename?: 'query_root' }
  & { projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & ProjectOldFragment
  )> }
);

export type RoleProjectsQueryVariables = Exact<{
  name_or_description?: Maybe<Scalars['String']>;
  project_types?: Maybe<Array<Project_Types_Enum>>;
  auth0_id: Scalars['String'];
  role_type: Role_Types_Enum;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type RoleProjectsQuery = (
  { __typename?: 'query_root' }
  & { projects_aggregate: (
    { __typename?: 'projects_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'projects_aggregate_fields' }
      & Pick<Projects_Aggregate_Fields, 'count'>
    )> }
  ), projects: Array<(
    { __typename?: 'projects' }
    & ProjectOldFragment
    & ProjectStatisticsFragment
  )> }
);

export type UpdateProjectsMutationVariables = Exact<{
  id: Scalars['uuid'];
  change?: Maybe<Projects_Set_Input>;
}>;


export type UpdateProjectsMutation = (
  { __typename?: 'mutation_root' }
  & { update_projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & ProjectOldFragment
  )> }
);

export type ContributorsByNameOrIdQueryVariables = Exact<{
  user_id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  project_id: Scalars['uuid'];
}>;


export type ContributorsByNameOrIdQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & ContributorByNameOrIdFragment
  )> }
);

export type DeleteProjectContributorsMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteProjectContributorsMutation = (
  { __typename?: 'mutation_root' }
  & { delete_project_contributors_by_pk?: Maybe<(
    { __typename?: 'project_contributors' }
    & ProjectContributorFragment
  )> }
);

export type InsertProjectContributorsMutationVariables = Exact<{
  project_id: Scalars['uuid'];
  role_type?: Maybe<Role_Types_Enum>;
  user_id?: Maybe<Scalars['uuid']>;
}>;


export type InsertProjectContributorsMutation = (
  { __typename?: 'mutation_root' }
  & { insert_project_contributors?: Maybe<(
    { __typename?: 'project_contributors_mutation_response' }
    & { returning: Array<(
      { __typename?: 'project_contributors' }
      & ProjectContributorFragment
    )> }
  )> }
);

export type ProjectContributorsQueryVariables = Exact<{
  project_id: Scalars['uuid'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type ProjectContributorsQuery = (
  { __typename?: 'query_root' }
  & { project_contributors: Array<(
    { __typename?: 'project_contributors' }
    & ProjectContributorFragment
  )>, project_contributors_aggregate: (
    { __typename?: 'project_contributors_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'project_contributors_aggregate_fields' }
      & Pick<Project_Contributors_Aggregate_Fields, 'count'>
    )> }
  ) }
);

export type ProjectContributorsAggregateQueryVariables = Exact<{
  project_id: Scalars['uuid'];
}>;


export type ProjectContributorsAggregateQuery = (
  { __typename?: 'query_root' }
  & { project_contributors_aggregate: (
    { __typename?: 'project_contributors_aggregate' }
    & { aggregate?: Maybe<(
      { __typename?: 'project_contributors_aggregate_fields' }
      & Pick<Project_Contributors_Aggregate_Fields, 'count'>
    )> }
  ) }
);

export type TaskDistributionAggregateQueryVariables = Exact<{
  project_id: Scalars['uuid'];
}>;


export type TaskDistributionAggregateQuery = (
  { __typename?: 'query_root' }
  & { project_contributors: Array<(
    { __typename?: 'project_contributors' }
    & { user: (
      { __typename?: 'users' }
      & Pick<Users, 'id'>
      & { task_distributions_aggregate: (
        { __typename?: 'task_distribution_aggregate' }
        & { aggregate?: Maybe<(
          { __typename?: 'task_distribution_aggregate_fields' }
          & Pick<Task_Distribution_Aggregate_Fields, 'count'>
        )> }
      ) }
    ) }
  )> }
);

export const ProjectFragmentDoc = gql`
    fragment Project on projects {
  id
  name
  description
  project_type
  annotator_per_example
  collaborative_annotation
  randomize_document_order
  updated_at
  guideline
  is_public
}
    `;
export const ProjectExploreFragmentDoc = gql`
    fragment ProjectExplore on projects {
  ...Project
  project_notifications {
    addition_data
    created_at
    id
    notification_type
    sender_id
  }
  project_contributors_aggregate {
    aggregate {
      count
    }
  }
  labels_aggregate {
    aggregate {
      count
    }
  }
  documents_aggregate {
    aggregate {
      count
    }
    nodes {
      task_distributions {
        is_approved
      }
    }
  }
}
    ${ProjectFragmentDoc}`;
export const LabelFragmentDoc = gql`
    fragment Label on labels {
  id
  text
  hotkey
  color
  created_at
}
    `;
export const AnnotationFragmentDoc = gql`
    fragment Annotation on annotations {
  data
  id
  is_submit
  manual
  document_id
  document {
    id
    text
  }
  label_id
  label {
    ...Label
  }
  user_id
  user {
    id
    auth0_id
    name
  }
}
    ${LabelFragmentDoc}`;
export const TaskDistributionFragmentDoc = gql`
    fragment TaskDistribution on task_distribution {
  id
  is_confirmed
  is_approved
  document_id
  document {
    text
  }
}
    `;
export const DocumentAnnotationFragmentDoc = gql`
    fragment DocumentAnnotation on documents {
  id
  meta
  text
  created_at
}
    `;
export const DocumentFragmentDoc = gql`
    fragment Document on documents {
  id
  meta
  text
  created_at
}
    `;
export const ProjectNotificationFragmentDoc = gql`
    fragment ProjectNotification on project_notifications {
  addition_data
  created_at
  id
  is_read
  notification_type
  sender_id
  project {
    id
    name
  }
  user {
    auth0_id
    id
    name
  }
}
    `;
export const ProjectOldFragmentDoc = gql`
    fragment ProjectOld on projects {
  id
  name
  description
  project_type
  annotator_per_example
  collaborative_annotation
  randomize_document_order
  updated_at
  created_at
  guideline
  is_public
  user {
    id
    name
    auth0_id
  }
  project_contributors {
    role_type
    user {
      id
      name
      auth0_id
    }
  }
}
    `;
export const ProjectStatisticsFragmentDoc = gql`
    fragment ProjectStatistics on projects {
  project_contributors_aggregate {
    aggregate {
      count
    }
  }
  labels_aggregate {
    aggregate {
      count
    }
  }
  documents_aggregate {
    aggregate {
      count
    }
    nodes {
      task_distributions {
        is_approved
      }
    }
  }
}
    `;
export const ContributorByNameOrIdFragmentDoc = gql`
    fragment ContributorByNameOrId on users {
  id
  auth0_id
  name
}
    `;
export const ProjectContributorFragmentDoc = gql`
    fragment ProjectContributor on project_contributors {
  id
  user {
    id
    auth0_id
    name
  }
  role_type
  created_at
}
    `;
export const QueryProjectByIdDocument = gql`
    query queryProjectById($projectsId: uuid!) {
  projects_by_pk(id: $projectsId) {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;
export type QueryProjectByIdQueryResult = ApolloReactCommon.QueryResult<QueryProjectByIdQuery, QueryProjectByIdQueryVariables>;
export const QueryProjectObjectsDocument = gql`
    query queryProjectObjects($distinct_on: [projects_select_column!], $where: projects_bool_exp, $limit: Int, $offset: Int, $order_by: [projects_order_by!]) {
  projects(distinct_on: $distinct_on, where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;
export type QueryProjectObjectsQueryResult = ApolloReactCommon.QueryResult<QueryProjectObjectsQuery, QueryProjectObjectsQueryVariables>;
export const SubscribeToProjectByIdDocument = gql`
    subscription subscribeToProjectById($projectsId: uuid!) {
  projects_by_pk(id: $projectsId) {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;
export type SubscribeToProjectByIdSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubscribeToProjectByIdSubscription>;
export const SubscribeToProjectObjectsDocument = gql`
    subscription subscribeToProjectObjects($distinct_on: [projects_select_column!], $where: projects_bool_exp, $limit: Int, $offset: Int, $order_by: [projects_order_by!]) {
  projects(distinct_on: $distinct_on, where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
    ...Project
  }
}
    ${ProjectFragmentDoc}`;
export type SubscribeToProjectObjectsSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubscribeToProjectObjectsSubscription>;
export const InsertProjectDocument = gql`
    mutation insertProject($objects: [projects_insert_input!]!) {
  insert_projects(objects: $objects) {
    affected_rows
    returning {
      ...Project
    }
  }
}
    ${ProjectFragmentDoc}`;
export type InsertProjectMutationFn = ApolloReactCommon.MutationFunction<InsertProjectMutation, InsertProjectMutationVariables>;
export type InsertProjectMutationResult = ApolloReactCommon.MutationResult<InsertProjectMutation>;
export type InsertProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertProjectMutation, InsertProjectMutationVariables>;
export const InsertProjectWithOnConflictDocument = gql`
    mutation insertProjectWithOnConflict($objects: [projects_insert_input!]!, $onConflict: projects_on_conflict) {
  insert_projects(objects: $objects, on_conflict: $onConflict) {
    affected_rows
    returning {
      ...Project
    }
  }
}
    ${ProjectFragmentDoc}`;
export type InsertProjectWithOnConflictMutationFn = ApolloReactCommon.MutationFunction<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables>;
export type InsertProjectWithOnConflictMutationResult = ApolloReactCommon.MutationResult<InsertProjectWithOnConflictMutation>;
export type InsertProjectWithOnConflictMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertProjectWithOnConflictMutation, InsertProjectWithOnConflictMutationVariables>;
export const UpdateProjectByIdDocument = gql`
    mutation updateProjectById($id: uuid, $set: projects_set_input) {
  update_projects(_set: $set, where: {id: {_eq: $id}}) {
    affected_rows
    returning {
      ...Project
    }
  }
}
    ${ProjectFragmentDoc}`;
export type UpdateProjectByIdMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>;
export type UpdateProjectByIdMutationResult = ApolloReactCommon.MutationResult<UpdateProjectByIdMutation>;
export type UpdateProjectByIdMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectByIdMutation, UpdateProjectByIdMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($set: projects_set_input, $where: projects_bool_exp!) {
  update_projects(_set: $set, where: $where) {
    affected_rows
    returning {
      ...Project
    }
  }
}
    ${ProjectFragmentDoc}`;
export type UpdateProjectMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;
export type UpdateProjectMutationResult = ApolloReactCommon.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const RemoveProjectsModelByIdDocument = gql`
    mutation removeProjectsModelById($id: uuid) {
  delete_projects(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
    `;
export type RemoveProjectsModelByIdMutationFn = ApolloReactCommon.MutationFunction<RemoveProjectsModelByIdMutation, RemoveProjectsModelByIdMutationVariables>;
export type RemoveProjectsModelByIdMutationResult = ApolloReactCommon.MutationResult<RemoveProjectsModelByIdMutation>;
export type RemoveProjectsModelByIdMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveProjectsModelByIdMutation, RemoveProjectsModelByIdMutationVariables>;
export const RemoveProjectsModelDocument = gql`
    mutation removeProjectsModel($where: projects_bool_exp!) {
  delete_projects(where: $where) {
    affected_rows
  }
}
    `;
export type RemoveProjectsModelMutationFn = ApolloReactCommon.MutationFunction<RemoveProjectsModelMutation, RemoveProjectsModelMutationVariables>;
export type RemoveProjectsModelMutationResult = ApolloReactCommon.MutationResult<RemoveProjectsModelMutation>;
export type RemoveProjectsModelMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveProjectsModelMutation, RemoveProjectsModelMutationVariables>;
export const QueryProjectExploreByIdDocument = gql`
    query queryProjectExploreById($projectsId: uuid!) {
  projects_by_pk(id: $projectsId) {
    ...ProjectExplore
  }
}
    ${ProjectExploreFragmentDoc}`;
export type QueryProjectExploreByIdQueryResult = ApolloReactCommon.QueryResult<QueryProjectExploreByIdQuery, QueryProjectExploreByIdQueryVariables>;
export const QueryProjectExploreObjectsDocument = gql`
    query queryProjectExploreObjects($distinct_on: [projects_select_column!], $where: projects_bool_exp, $limit: Int, $offset: Int, $order_by: [projects_order_by!]) {
  projects(distinct_on: $distinct_on, where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
    ...ProjectExplore
  }
}
    ${ProjectExploreFragmentDoc}`;
export type QueryProjectExploreObjectsQueryResult = ApolloReactCommon.QueryResult<QueryProjectExploreObjectsQuery, QueryProjectExploreObjectsQueryVariables>;
export const SubscribeToProjectExploreByIdDocument = gql`
    subscription subscribeToProjectExploreById($projectsId: uuid!) {
  projects_by_pk(id: $projectsId) {
    ...ProjectExplore
  }
}
    ${ProjectExploreFragmentDoc}`;
export type SubscribeToProjectExploreByIdSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubscribeToProjectExploreByIdSubscription>;
export const SubscribeToProjectExploreObjectsDocument = gql`
    subscription subscribeToProjectExploreObjects($distinct_on: [projects_select_column!], $where: projects_bool_exp, $limit: Int, $offset: Int, $order_by: [projects_order_by!]) {
  projects(distinct_on: $distinct_on, where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
    ...ProjectExplore
  }
}
    ${ProjectExploreFragmentDoc}`;
export type SubscribeToProjectExploreObjectsSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubscribeToProjectExploreObjectsSubscription>;
export const InsertProjectExploreDocument = gql`
    mutation insertProjectExplore($objects: [projects_insert_input!]!) {
  insert_projects(objects: $objects) {
    affected_rows
    returning {
      ...ProjectExplore
    }
  }
}
    ${ProjectExploreFragmentDoc}`;
export type InsertProjectExploreMutationFn = ApolloReactCommon.MutationFunction<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>;
export type InsertProjectExploreMutationResult = ApolloReactCommon.MutationResult<InsertProjectExploreMutation>;
export type InsertProjectExploreMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertProjectExploreMutation, InsertProjectExploreMutationVariables>;
export const InsertProjectExploreWithOnConflictDocument = gql`
    mutation insertProjectExploreWithOnConflict($objects: [projects_insert_input!]!, $onConflict: projects_on_conflict) {
  insert_projects(objects: $objects, on_conflict: $onConflict) {
    affected_rows
    returning {
      ...ProjectExplore
    }
  }
}
    ${ProjectExploreFragmentDoc}`;
export type InsertProjectExploreWithOnConflictMutationFn = ApolloReactCommon.MutationFunction<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables>;
export type InsertProjectExploreWithOnConflictMutationResult = ApolloReactCommon.MutationResult<InsertProjectExploreWithOnConflictMutation>;
export type InsertProjectExploreWithOnConflictMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertProjectExploreWithOnConflictMutation, InsertProjectExploreWithOnConflictMutationVariables>;
export const UpdateProjectExploreByIdDocument = gql`
    mutation updateProjectExploreById($id: uuid, $set: projects_set_input) {
  update_projects(_set: $set, where: {id: {_eq: $id}}) {
    affected_rows
    returning {
      ...ProjectExplore
    }
  }
}
    ${ProjectExploreFragmentDoc}`;
export type UpdateProjectExploreByIdMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables>;
export type UpdateProjectExploreByIdMutationResult = ApolloReactCommon.MutationResult<UpdateProjectExploreByIdMutation>;
export type UpdateProjectExploreByIdMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectExploreByIdMutation, UpdateProjectExploreByIdMutationVariables>;
export const UpdateProjectExploreDocument = gql`
    mutation updateProjectExplore($set: projects_set_input, $where: projects_bool_exp!) {
  update_projects(_set: $set, where: $where) {
    affected_rows
    returning {
      ...ProjectExplore
    }
  }
}
    ${ProjectExploreFragmentDoc}`;
export type UpdateProjectExploreMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectExploreMutation, UpdateProjectExploreMutationVariables>;
export type UpdateProjectExploreMutationResult = ApolloReactCommon.MutationResult<UpdateProjectExploreMutation>;
export type UpdateProjectExploreMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectExploreMutation, UpdateProjectExploreMutationVariables>;
export const AnnotationsDocument = gql`
    query Annotations($document_id: uuid!, $user_id: uuid, $is_approved: Boolean) {
  annotations(where: {document_id: {_eq: $document_id}, user_id: {_eq: $user_id}, task_distribution: {is_approved: {_eq: $is_approved}}}) {
    ...Annotation
  }
}
    ${AnnotationFragmentDoc}`;
export type AnnotationsQueryResult = ApolloReactCommon.QueryResult<AnnotationsQuery, AnnotationsQueryVariables>;
export const AnnotationsAggregateDocument = gql`
    query AnnotationsAggregate($project_id: uuid!, $user_id: uuid) {
  annotations_aggregate(where: {document: {project_id: {_eq: $project_id}}, user_id: {_eq: $user_id}}, distinct_on: [document_id]) {
    aggregate {
      count
    }
    nodes {
      document_id
    }
  }
}
    `;
export type AnnotationsAggregateQueryResult = ApolloReactCommon.QueryResult<AnnotationsAggregateQuery, AnnotationsAggregateQueryVariables>;
export const DeleteAnnotationsDocument = gql`
    mutation DeleteAnnotations($ids: [uuid!]!) {
  delete_annotations(where: {id: {_in: $ids}}) {
    returning {
      ...Annotation
    }
  }
}
    ${AnnotationFragmentDoc}`;
export type DeleteAnnotationsMutationFn = ApolloReactCommon.MutationFunction<DeleteAnnotationsMutation, DeleteAnnotationsMutationVariables>;
export type DeleteAnnotationsMutationResult = ApolloReactCommon.MutationResult<DeleteAnnotationsMutation>;
export type DeleteAnnotationsMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteAnnotationsMutation, DeleteAnnotationsMutationVariables>;
export const DocumentsAnnotationDocument = gql`
    query DocumentsAnnotation($project_id: uuid!, $limit: Int, $offset: Int, $user_id: uuid) {
  task_distribution(where: {document: {project_id: {_eq: $project_id}}, user_id: {_eq: $user_id}}) {
    ...TaskDistribution
  }
  documents(where: {project_id: {_eq: $project_id}, task_distributions: {user_id: {_eq: $user_id}}}, limit: $limit, offset: $offset, order_by: {created_at: desc}) {
    ...DocumentAnnotation
  }
}
    ${TaskDistributionFragmentDoc}
${DocumentAnnotationFragmentDoc}`;
export type DocumentsAnnotationQueryResult = ApolloReactCommon.QueryResult<DocumentsAnnotationQuery, DocumentsAnnotationQueryVariables>;
export const InsertAnnotationsDocument = gql`
    mutation InsertAnnotations($annotations: [annotations_insert_input!]!) {
  insert_annotations(objects: $annotations) {
    returning {
      ...Annotation
    }
  }
}
    ${AnnotationFragmentDoc}`;
export type InsertAnnotationsMutationFn = ApolloReactCommon.MutationFunction<InsertAnnotationsMutation, InsertAnnotationsMutationVariables>;
export type InsertAnnotationsMutationResult = ApolloReactCommon.MutationResult<InsertAnnotationsMutation>;
export type InsertAnnotationsMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertAnnotationsMutation, InsertAnnotationsMutationVariables>;
export const SaveAnnotationsDocument = gql`
    mutation SaveAnnotations($annotations: [annotations_insert_input!]!, $ids: [uuid!]!) {
  insert_annotations(objects: $annotations) {
    returning {
      ...Annotation
    }
  }
  delete_annotations(where: {id: {_in: $ids}}) {
    returning {
      ...Annotation
    }
  }
}
    ${AnnotationFragmentDoc}`;
export type SaveAnnotationsMutationFn = ApolloReactCommon.MutationFunction<SaveAnnotationsMutation, SaveAnnotationsMutationVariables>;
export type SaveAnnotationsMutationResult = ApolloReactCommon.MutationResult<SaveAnnotationsMutation>;
export type SaveAnnotationsMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveAnnotationsMutation, SaveAnnotationsMutationVariables>;
export const SetApproveTaskDocument = gql`
    mutation SetApproveTask($id: uuid!, $is_approved: Boolean!) {
  update_task_distribution_by_pk(pk_columns: {id: $id}, _set: {is_approved: $is_approved}) {
    ...TaskDistribution
  }
}
    ${TaskDistributionFragmentDoc}`;
export type SetApproveTaskMutationFn = ApolloReactCommon.MutationFunction<SetApproveTaskMutation, SetApproveTaskMutationVariables>;
export type SetApproveTaskMutationResult = ApolloReactCommon.MutationResult<SetApproveTaskMutation>;
export type SetApproveTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<SetApproveTaskMutation, SetApproveTaskMutationVariables>;
export const SetConfirmTaskDocument = gql`
    mutation SetConfirmTask($id: uuid!, $is_confirmed: Boolean!) {
  update_task_distribution_by_pk(pk_columns: {id: $id}, _set: {is_confirmed: $is_confirmed}) {
    ...TaskDistribution
  }
}
    ${TaskDistributionFragmentDoc}`;
export type SetConfirmTaskMutationFn = ApolloReactCommon.MutationFunction<SetConfirmTaskMutation, SetConfirmTaskMutationVariables>;
export type SetConfirmTaskMutationResult = ApolloReactCommon.MutationResult<SetConfirmTaskMutation>;
export type SetConfirmTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<SetConfirmTaskMutation, SetConfirmTaskMutationVariables>;
export const UpdateAnnotationDocument = gql`
    mutation UpdateAnnotation($id: uuid!, $changes: annotations_set_input) {
  update_annotations_by_pk(pk_columns: {id: $id}, _set: $changes) {
    ...Annotation
  }
}
    ${AnnotationFragmentDoc}`;
export type UpdateAnnotationMutationFn = ApolloReactCommon.MutationFunction<UpdateAnnotationMutation, UpdateAnnotationMutationVariables>;
export type UpdateAnnotationMutationResult = ApolloReactCommon.MutationResult<UpdateAnnotationMutation>;
export type UpdateAnnotationMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateAnnotationMutation, UpdateAnnotationMutationVariables>;
export const DeleteDocumentDocument = gql`
    mutation DeleteDocument($id: uuid!) {
  delete_documents_by_pk(id: $id) {
    ...Document
  }
}
    ${DocumentFragmentDoc}`;
export type DeleteDocumentMutationFn = ApolloReactCommon.MutationFunction<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export type DeleteDocumentMutationResult = ApolloReactCommon.MutationResult<DeleteDocumentMutation>;
export type DeleteDocumentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export const DocumentsDocument = gql`
    query Documents($project_id: uuid!, $limit: Int, $offset: Int) {
  documents(where: {project_id: {_eq: $project_id}}, limit: $limit, offset: $offset, order_by: {created_at: desc}) {
    ...Document
  }
  documents_aggregate(where: {project_id: {_eq: $project_id}}) {
    aggregate {
      count
    }
  }
}
    ${DocumentFragmentDoc}`;
export type DocumentsQueryResult = ApolloReactCommon.QueryResult<DocumentsQuery, DocumentsQueryVariables>;
export const FileUploadDocument = gql`
    mutation FileUpload($name: String!, $type: String!, $base64str: String!) {
  fileUpload(name: $name, type: $type, base64str: $base64str) {
    file_path
  }
}
    `;
export type FileUploadMutationFn = ApolloReactCommon.MutationFunction<FileUploadMutation, FileUploadMutationVariables>;
export type FileUploadMutationResult = ApolloReactCommon.MutationResult<FileUploadMutation>;
export type FileUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<FileUploadMutation, FileUploadMutationVariables>;
export const InsertDocumentsDocument = gql`
    mutation InsertDocuments($documents: [documents_insert_input!]!) {
  insert_documents(objects: $documents) {
    returning {
      ...Document
    }
  }
}
    ${DocumentFragmentDoc}`;
export type InsertDocumentsMutationFn = ApolloReactCommon.MutationFunction<InsertDocumentsMutation, InsertDocumentsMutationVariables>;
export type InsertDocumentsMutationResult = ApolloReactCommon.MutationResult<InsertDocumentsMutation>;
export type InsertDocumentsMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertDocumentsMutation, InsertDocumentsMutationVariables>;
export const UpdateDocumentDocument = gql`
    mutation UpdateDocument($id: uuid!, $changes: documents_set_input) {
  update_documents_by_pk(pk_columns: {id: $id}, _set: $changes) {
    ...Document
  }
}
    ${DocumentFragmentDoc}`;
export type UpdateDocumentMutationFn = ApolloReactCommon.MutationFunction<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export type UpdateDocumentMutationResult = ApolloReactCommon.MutationResult<UpdateDocumentMutation>;
export type UpdateDocumentMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export const DocumentsDownloadDocument = gql`
    query DocumentsDownload($project_id: uuid!, $limit: Int, $offset: Int, $user_id: uuid, $is_approved: Boolean) {
  documents_aggregate(where: {project_id: {_eq: $project_id}}, order_by: {created_at: desc}) {
    aggregate {
      count
    }
  }
  documents(where: {project_id: {_eq: $project_id}, task_distributions: {user_id: {_eq: $user_id}}}, limit: $limit, offset: $offset, order_by: {created_at: desc}) {
    ...DocumentAnnotation
    task_distributions(where: {user_id: {_eq: $user_id}, is_approved: {_eq: $is_approved}}) {
      ...TaskDistribution
    }
    annotations(where: {user_id: {_eq: $user_id}, task_distribution: {is_approved: {_eq: $is_approved}}}) {
      ...Annotation
    }
  }
}
    ${DocumentAnnotationFragmentDoc}
${TaskDistributionFragmentDoc}
${AnnotationFragmentDoc}`;
export type DocumentsDownloadQueryResult = ApolloReactCommon.QueryResult<DocumentsDownloadQuery, DocumentsDownloadQueryVariables>;
export const DeleteLabelDocument = gql`
    mutation DeleteLabel($id: uuid!) {
  delete_labels_by_pk(id: $id) {
    ...Label
  }
}
    ${LabelFragmentDoc}`;
export type DeleteLabelMutationFn = ApolloReactCommon.MutationFunction<DeleteLabelMutation, DeleteLabelMutationVariables>;
export type DeleteLabelMutationResult = ApolloReactCommon.MutationResult<DeleteLabelMutation>;
export type DeleteLabelMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteLabelMutation, DeleteLabelMutationVariables>;
export const InsertLabelDocument = gql`
    mutation InsertLabel($text: String!, $color: String!, $hotkey: String!, $project_id: uuid!) {
  insert_labels_one(object: {text: $text, color: $color, hotkey: $hotkey, project_id: $project_id}) {
    ...Label
  }
}
    ${LabelFragmentDoc}`;
export type InsertLabelMutationFn = ApolloReactCommon.MutationFunction<InsertLabelMutation, InsertLabelMutationVariables>;
export type InsertLabelMutationResult = ApolloReactCommon.MutationResult<InsertLabelMutation>;
export type InsertLabelMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertLabelMutation, InsertLabelMutationVariables>;
export const LabelsDocument = gql`
    query Labels($project_id: uuid!, $limit: Int, $offset: Int) {
  labels(where: {project_id: {_eq: $project_id}}, limit: $limit, offset: $offset, order_by: {created_at: desc}) {
    ...Label
  }
  labels_aggregate(where: {project_id: {_eq: $project_id}}) {
    aggregate {
      count
    }
  }
}
    ${LabelFragmentDoc}`;
export type LabelsQueryResult = ApolloReactCommon.QueryResult<LabelsQuery, LabelsQueryVariables>;
export const UpdateLabelDocument = gql`
    mutation UpdateLabel($id: uuid!, $changes: labels_set_input) {
  update_labels_by_pk(pk_columns: {id: $id}, _set: $changes) {
    ...Label
  }
}
    ${LabelFragmentDoc}`;
export type UpdateLabelMutationFn = ApolloReactCommon.MutationFunction<UpdateLabelMutation, UpdateLabelMutationVariables>;
export type UpdateLabelMutationResult = ApolloReactCommon.MutationResult<UpdateLabelMutation>;
export type UpdateLabelMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLabelMutation, UpdateLabelMutationVariables>;
export const ContributorRequestDocument = gql`
    mutation ContributorRequest($project_id: uuid!, $addition_data: jsonb!) {
  insert_project_notifications_one(object: {notification_type: contributor_request, target_id: $project_id, addition_data: $addition_data}) {
    addition_data
    created_at
    id
    notification_type
    sender_id
  }
}
    `;
export type ContributorRequestMutationFn = ApolloReactCommon.MutationFunction<ContributorRequestMutation, ContributorRequestMutationVariables>;
export type ContributorRequestMutationResult = ApolloReactCommon.MutationResult<ContributorRequestMutation>;
export type ContributorRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<ContributorRequestMutation, ContributorRequestMutationVariables>;
export const MarkAsReadNotificationDocument = gql`
    mutation MarkAsReadNotification($id: uuid!) {
  update_project_notifications_by_pk(pk_columns: {id: $id}, _set: {is_read: true}) {
    addition_data
    id
    is_read
  }
}
    `;
export type MarkAsReadNotificationMutationFn = ApolloReactCommon.MutationFunction<MarkAsReadNotificationMutation, MarkAsReadNotificationMutationVariables>;
export type MarkAsReadNotificationMutationResult = ApolloReactCommon.MutationResult<MarkAsReadNotificationMutation>;
export type MarkAsReadNotificationMutationOptions = ApolloReactCommon.BaseMutationOptions<MarkAsReadNotificationMutation, MarkAsReadNotificationMutationVariables>;
export const ProjectNotificationsDocument = gql`
    query ProjectNotifications($project_id: uuid!) {
  project_notifications(where: {target_id: {_eq: $project_id}, is_read: {_eq: false}, notification_type: {_eq: contributor_request}}) {
    ...ProjectNotification
  }
}
    ${ProjectNotificationFragmentDoc}`;
export type ProjectNotificationsQueryResult = ApolloReactCommon.QueryResult<ProjectNotificationsQuery, ProjectNotificationsQueryVariables>;
export const ExploreProjectsDocument = gql`
    query ExploreProjects($name_or_description: String, $project_types: [project_types_enum!], $auth0_id: String!, $offset: Int, $limit: Int) {
  projects_aggregate(where: {_and: [{_or: [{name: {_ilike: $name_or_description}}, {description: {_ilike: $name_or_description}}]}, {project_type: {_in: $project_types}}, {is_public: {_eq: true}}, {_not: {project_contributors: {user: {auth0_id: {_eq: $auth0_id}}}}}]}) {
    aggregate {
      count
    }
  }
  projects(limit: $limit, offset: $offset, order_by: {updated_at: desc}, where: {_and: [{_or: [{name: {_ilike: $name_or_description}}, {description: {_ilike: $name_or_description}}]}, {project_type: {_in: $project_types}}, {is_public: {_eq: true}}, {_not: {project_contributors: {user: {auth0_id: {_eq: $auth0_id}}}}}]}) {
    ...ProjectOld
    project_notifications {
      addition_data
      created_at
      id
      notification_type
      sender_id
    }
    ...ProjectStatistics
  }
}
    ${ProjectOldFragmentDoc}
${ProjectStatisticsFragmentDoc}`;
export type ExploreProjectsQueryResult = ApolloReactCommon.QueryResult<ExploreProjectsQuery, ExploreProjectsQueryVariables>;
export const MyProjectsDocument = gql`
    query MyProjects($name_or_description: String, $project_types: [project_types_enum!], $auth0_id: String!, $offset: Int, $limit: Int) {
  projects_aggregate(where: {_and: [{_or: [{name: {_ilike: $name_or_description}}, {description: {_ilike: $name_or_description}}]}, {project_type: {_in: $project_types}}, {user: {auth0_id: {_eq: $auth0_id}}}]}) {
    aggregate {
      count
    }
  }
  projects(limit: $limit, offset: $offset, order_by: {updated_at: desc}, where: {_and: [{_or: [{name: {_ilike: $name_or_description}}, {description: {_ilike: $name_or_description}}]}, {project_type: {_in: $project_types}}, {user: {auth0_id: {_eq: $auth0_id}}}]}) {
    ...ProjectOld
    ...ProjectStatistics
  }
}
    ${ProjectOldFragmentDoc}
${ProjectStatisticsFragmentDoc}`;
export type MyProjectsQueryResult = ApolloReactCommon.QueryResult<MyProjectsQuery, MyProjectsQueryVariables>;
export const MyProjectsAggregateDocument = gql`
    query MyProjectsAggregate($auth0_id: String!) {
  projects_aggregate(where: {user: {auth0_id: {_eq: $auth0_id}}}) {
    aggregate {
      count
    }
  }
}
    `;
export type MyProjectsAggregateQueryResult = ApolloReactCommon.QueryResult<MyProjectsAggregateQuery, MyProjectsAggregateQueryVariables>;
export const ProjectDashboardDocument = gql`
    query ProjectDashboard($project_id: uuid!) {
  labels_aggregate(where: {project_id: {_eq: $project_id}}) {
    aggregate {
      count
    }
    nodes {
      id
      text
      color
      annotations_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  documents_aggregate(where: {project_id: {_eq: $project_id}}) {
    aggregate {
      count
    }
    nodes {
      text
      annotations_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  project_contributors_aggregate(where: {project_id: {_eq: $project_id}, role_type: {_eq: annotator}}) @connection(key: "project_contributors_aggregate", filter: ["project_id"]) {
    aggregate {
      count
    }
    nodes {
      user {
        name
        annotations_aggregate(where: {document: {project_id: {_eq: $project_id}}}) {
          aggregate {
            count
          }
          nodes {
            document {
              project_id
            }
          }
        }
      }
    }
  }
}
    `;
export type ProjectDashboardQueryResult = ApolloReactCommon.QueryResult<ProjectDashboardQuery, ProjectDashboardQueryVariables>;
export const ProjectsByPkDocument = gql`
    query ProjectsByPk($id: uuid!) {
  projects_by_pk(id: $id) {
    ...ProjectOld
  }
}
    ${ProjectOldFragmentDoc}`;
export type ProjectsByPkQueryResult = ApolloReactCommon.QueryResult<ProjectsByPkQuery, ProjectsByPkQueryVariables>;
export const RoleProjectsDocument = gql`
    query RoleProjects($name_or_description: String, $project_types: [project_types_enum!], $auth0_id: String!, $role_type: role_types_enum!, $offset: Int, $limit: Int) {
  projects_aggregate(where: {_and: [{_or: [{name: {_ilike: $name_or_description}}, {description: {_ilike: $name_or_description}}]}, {project_type: {_in: $project_types}}, {project_contributors: {role_type: {_eq: $role_type}, user: {auth0_id: {_eq: $auth0_id}}}}]}) {
    aggregate {
      count
    }
  }
  projects(limit: $limit, offset: $offset, order_by: {updated_at: desc}, where: {_and: [{_or: [{name: {_ilike: $name_or_description}}, {description: {_ilike: $name_or_description}}]}, {project_type: {_in: $project_types}}, {project_contributors: {role_type: {_eq: $role_type}, user: {auth0_id: {_eq: $auth0_id}}}}]}) {
    ...ProjectOld
    ...ProjectStatistics
  }
}
    ${ProjectOldFragmentDoc}
${ProjectStatisticsFragmentDoc}`;
export type RoleProjectsQueryResult = ApolloReactCommon.QueryResult<RoleProjectsQuery, RoleProjectsQueryVariables>;
export const UpdateProjectsDocument = gql`
    mutation UpdateProjects($id: uuid!, $change: projects_set_input) {
  update_projects_by_pk(pk_columns: {id: $id}, _set: $change) {
    ...ProjectOld
  }
}
    ${ProjectOldFragmentDoc}`;
export type UpdateProjectsMutationFn = ApolloReactCommon.MutationFunction<UpdateProjectsMutation, UpdateProjectsMutationVariables>;
export type UpdateProjectsMutationResult = ApolloReactCommon.MutationResult<UpdateProjectsMutation>;
export type UpdateProjectsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateProjectsMutation, UpdateProjectsMutationVariables>;
export const ContributorsByNameOrIdDocument = gql`
    query ContributorsByNameOrId($user_id: uuid, $name: String, $project_id: uuid!) {
  users(where: {_not: {project_contributors: {project_id: {_eq: $project_id}}}, _and: [{id: {_eq: $user_id}}, {name: {_like: $name}}]}) {
    ...ContributorByNameOrId
  }
}
    ${ContributorByNameOrIdFragmentDoc}`;
export type ContributorsByNameOrIdQueryResult = ApolloReactCommon.QueryResult<ContributorsByNameOrIdQuery, ContributorsByNameOrIdQueryVariables>;
export const DeleteProjectContributorsDocument = gql`
    mutation DeleteProjectContributors($id: uuid!) {
  delete_project_contributors_by_pk(id: $id) {
    ...ProjectContributor
  }
}
    ${ProjectContributorFragmentDoc}`;
export type DeleteProjectContributorsMutationFn = ApolloReactCommon.MutationFunction<DeleteProjectContributorsMutation, DeleteProjectContributorsMutationVariables>;
export type DeleteProjectContributorsMutationResult = ApolloReactCommon.MutationResult<DeleteProjectContributorsMutation>;
export type DeleteProjectContributorsMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteProjectContributorsMutation, DeleteProjectContributorsMutationVariables>;
export const InsertProjectContributorsDocument = gql`
    mutation InsertProjectContributors($project_id: uuid!, $role_type: role_types_enum, $user_id: uuid) {
  insert_project_contributors(objects: {project_id: $project_id, role_type: $role_type, user_id: $user_id}) {
    returning {
      ...ProjectContributor
    }
  }
}
    ${ProjectContributorFragmentDoc}`;
export type InsertProjectContributorsMutationFn = ApolloReactCommon.MutationFunction<InsertProjectContributorsMutation, InsertProjectContributorsMutationVariables>;
export type InsertProjectContributorsMutationResult = ApolloReactCommon.MutationResult<InsertProjectContributorsMutation>;
export type InsertProjectContributorsMutationOptions = ApolloReactCommon.BaseMutationOptions<InsertProjectContributorsMutation, InsertProjectContributorsMutationVariables>;
export const ProjectContributorsDocument = gql`
    query ProjectContributors($project_id: uuid!, $limit: Int, $offset: Int) {
  project_contributors(where: {project_id: {_eq: $project_id}}, limit: $limit, offset: $offset, order_by: {created_at: desc}) {
    ...ProjectContributor
  }
  project_contributors_aggregate(where: {project_id: {_eq: $project_id}}) @connection(key: "project_contributors_aggregate", filter: ["project_id"]) {
    aggregate {
      count
    }
  }
}
    ${ProjectContributorFragmentDoc}`;
export type ProjectContributorsQueryResult = ApolloReactCommon.QueryResult<ProjectContributorsQuery, ProjectContributorsQueryVariables>;
export const ProjectContributorsAggregateDocument = gql`
    query ProjectContributorsAggregate($project_id: uuid!) {
  project_contributors_aggregate(where: {project_id: {_eq: $project_id}}) {
    aggregate {
      count
    }
  }
}
    `;
export type ProjectContributorsAggregateQueryResult = ApolloReactCommon.QueryResult<ProjectContributorsAggregateQuery, ProjectContributorsAggregateQueryVariables>;
export const TaskDistributionAggregateDocument = gql`
    query TaskDistributionAggregate($project_id: uuid!) {
  project_contributors(where: {project_id: {_eq: $project_id}, role_type: {_eq: annotator}}, order_by: {user: {task_distributions_aggregate: {count: asc}}}) {
    user {
      id
      task_distributions_aggregate(where: {document: {project_id: {_eq: $project_id}}}) {
        aggregate {
          count
        }
      }
    }
  }
}
    `;
export type TaskDistributionAggregateQueryResult = ApolloReactCommon.QueryResult<TaskDistributionAggregateQuery, TaskDistributionAggregateQueryVariables>;