import { currentProjectState } from '@/contexts/atoms/currentProject'
import { Documents_Insert_Input, useFileUploadMutation } from '@/generated/graphql'
import {
  EuiButton,
  EuiButtonGroup,
  EuiCodeBlock,
  EuiFilePicker,
  EuiForm,
  EuiFormFieldset,
  EuiSpacer,
} from '@elastic/eui'
// @ts-ignore
import csv2json from 'csvjson-csv2json'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import {
  FormatTypes,
  FORMAT_ACCEPTS,
  FORMAT_LABELS,
  GET_SAMPLE_TEXT,
  PROJECT_FILE_FORMAT,
  PROJECT_SAMPLE,
} from '@/constants/document'

interface FormValue {
  files: FileList | null
}

interface UploadFormProps {
  onSubmitDocument: (docs: Pick<Documents_Insert_Input, 'text' | 'meta'>[]) => Promise<void>
  loading: boolean
}

const UploadForm: React.FC<UploadFormProps> = ({ onSubmitDocument, loading }) => {
  const { control, reset, handleSubmit, watch, formState, trigger } = useForm<FormValue>({
    mode: 'all',
    defaultValues: {
      files: null,
    },
  })
  const [format, setFormat] = useState<FormatTypes>('json')

  const currentProject = useRecoilValue(currentProjectState)
  const [uploadFile, { loading: uploadLoading }] = useFileUploadMutation()

  const getBlockCodeFormat = useCallback(
    ($format: FormatTypes): React.ReactNode => {
      const projectType = currentProject?.project_type
      const sample = projectType && PROJECT_SAMPLE[projectType]
      if (!sample) {
        return null
      }
      const sampleText = GET_SAMPLE_TEXT[$format](sample)

      if (!sampleText) {
        return null
      }

      return (
        <EuiFormFieldset legend={{ children: 'Sample' }}>
          <EuiCodeBlock language="html" isCopyable fontSize="m" paddingSize="m">
            {sampleText}
          </EuiCodeBlock>
        </EuiFormFieldset>
      )
    },
    [currentProject?.project_type],
  )

  const onSubmit = useCallback(
    async ({ files }: FormValue) => {
      console.log(`files`, files)
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]

          let data: Array<{ text: string; labels: string[] }> = []
          let fileBase64: string
          const fileReader = new FileReader()
          fileReader.onerror = function () {
            console.log('Unable to parse file')
          }
          fileReader.onloadend = async () => {
            const docs = data.map((item) => ({ text: item.text }))
            await onSubmitDocument(docs)
          }
          switch (format) {
            case 'json':
              fileReader.onload = (event) => {
                const json = JSON.parse(event.target?.result as string)
                data = json
              }
              fileReader.readAsText(file)
              break
            case 'csv':
              fileReader.onload = (event) => {
                const json = csv2json(event.target?.result as string, {
                  parseNumbers: true,
                  parseJSON: true,
                })
                data = json
              }
              fileReader.readAsText(file)
              break
            case 'plain':
              fileReader.onload = (event) => {
                const header = `"text","labels"\n`
                const json = csv2json(header.concat(event.target?.result as string), {
                  parseNumbers: true,
                  parseJSON: true,
                })
                data = json
              }
              fileReader.readAsText(file)
              break
            case 'pdf':
              fileReader.onload = async (event) => {
                const base64str = btoa(event.target?.result as string)
                fileBase64 = base64str
              }
              fileReader.readAsBinaryString(file)

              fileReader.onloadend = async () => {
                const { data: fileData } = await uploadFile({
                  variables: {
                    name: file.name,
                    type: file.type,
                    base64str: fileBase64,
                  },
                })
                if (fileData?.fileUpload?.file_path) {
                  await onSubmitDocument([
                    {
                      text: fileData?.fileUpload?.file_path,
                    },
                  ])
                }
              }
              break

            default:
              break
          }
        }
      }

      reset()
    },
    [onSubmitDocument, format],
  )

  const formatOption = useMemo(
    () =>
      currentProject
        ? PROJECT_FILE_FORMAT[currentProject.project_type].map((key) => {
            return {
              id: `${key}`,
              label: FORMAT_LABELS[key],
            }
          })
        : [],
    [currentProject],
  )

  return (
    <Fragment>
      <EuiSpacer size="m" />
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <EuiFormFieldset legend={{ children: 'Format' }}>
          <EuiButtonGroup
            legend="Choose file format"
            options={formatOption}
            idSelected={format}
            color="primary"
            onChange={(id) => setFormat(id as FormatTypes)}
          />
        </EuiFormFieldset>

        <EuiSpacer size="m" />
        {getBlockCodeFormat(format)}
        <EuiSpacer size="m" />
        <EuiFormFieldset legend={{ children: 'Upload' }}>
          <Controller
            name="files"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Input required.',
              },
            }}
            render={({ onBlur, onChange }) => {
              return (
                <EuiFilePicker
                  multiple
                  initialPromptText="Select or drag and drop multiple files"
                  onChange={(files) => {
                    onChange(files)
                  }}
                  onBlur={onBlur}
                  display="default"
                  accept={FORMAT_ACCEPTS[format]}
                />
              )
            }}
          />
        </EuiFormFieldset>

        <EuiSpacer size="m" />
        <EuiButton
          type="submit"
          isLoading={loading}
          disabled={Boolean(!watch('files')?.length) || loading || !formState.isValid}
        >
          Submit
        </EuiButton>
      </EuiForm>
    </Fragment>
  )
}

export default UploadForm
