export type Maybe<T> = T | null;

export type CheckAndRegisterUserOutput = {
  affected_rows: number;
};

export type AddResult = {
  sum?: Maybe<number>;
};

export type fileOutput = {
  file_path: string;
};

export type Mutation = {
  checkAndRegisterUser?: Maybe<CheckAndRegisterUserOutput>;
  fileUpload?: Maybe<fileOutput>;
};

export type checkAndRegisterUserArgs = {};

export type fileUploadArgs = {
  name: string;
  type: string;
  base64str: string;
};
