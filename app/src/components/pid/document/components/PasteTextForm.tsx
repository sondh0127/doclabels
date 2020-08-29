import { currentProjectState } from '@/contexts/atoms/currentProject'
import { Documents_Insert_Input, Project_Types_Enum } from '@/generated/graphql'
import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiSpacer,
  EuiTextArea,
  EuiForm,
} from '@elastic/eui'
import React, { Fragment, useCallback, useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

interface FormValue {
  data: Array<{ text: string }>
}

interface PasteTextFormProps {
  onSubmitDocument: (docs: Pick<Documents_Insert_Input, 'text' | 'meta'>[]) => Promise<void>
  loading: boolean
}

const isValidPdfUrl = (value: string): boolean => {
  const regex = RegExp(/^(https?:\/\/)?(www\.)?([\da-z\.-]+)\.([a-z\.]{2,6})[\/\w \.-]+?\.pdf$/)
  return regex.test(value)
}

const PasteTextForm: React.FC<PasteTextFormProps> = ({ onSubmitDocument, loading }) => {
  const currentProject = useRecoilValue(currentProjectState)
  const { control, handleSubmit, errors, watch, reset, setError, formState } = useForm<FormValue>({
    mode: 'all',
    defaultValues: {
      data: [{ text: '' }],
    },
  })

  const fieldArrayName = 'data'

  const { fields, append, remove } = useFieldArray<{ text: string }>({
    control,
    name: fieldArrayName,
  })

  useEffect(() => {
    const arr = watch('data')
    if (arr) {
      const lastData = arr[fields.length - 1 >= 0 ? fields.length - 1 : 0]
      if (lastData && lastData.text !== '') {
        append({ text: '' }, false)
      }
    }
  }, [watch])

  const onSubmit = useCallback(
    async (values: FormValue) => {
      const data = [...values.data].slice(0, values.data.length - 1)
      let hasError = false
      if (currentProject?.project_type === Project_Types_Enum.PdfLabelingProject) {
        data.forEach(({ text }, index) => {
          if (text && !isValidPdfUrl(text)) {
            setError(`data[${index}].text`, {
              type: 'pattern',
              message: 'This is not valid url for pdf.',
            })
            hasError = true
          }
        })
      }
      if (!hasError) {
        const docs = data.filter(({ text }) => text).map(({ text }) => ({ text }))
        if (docs.length > 0) {
          await onSubmitDocument(docs)
          reset()
        }
      }
    },
    [onSubmitDocument, currentProject?.project_type],
  )

  return (
    <Fragment>
      <EuiSpacer size="m" />
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <EuiFlexGroup key={index} alignItems="center">
            <EuiFlexItem>
              <EuiFormRow
                fullWidth
                isInvalid={Boolean(errors.data && errors.data[index])}
                error={errors.data && errors.data[index] && errors.data[index]?.text?.message}
              >
                <Controller
                  control={control}
                  name={`${fieldArrayName}[${index}].text`}
                  defaultValue={item.text}
                  render={({ onBlur, onChange, value }) => (
                    <EuiTextArea
                      isInvalid={Boolean(errors.data && errors.data[index])}
                      compressed
                      fullWidth
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
              </EuiFormRow>
            </EuiFlexItem>

            <EuiFlexItem grow={false} style={{ minWidth: 30 }}>
              {index !== fields.length - 1 && (
                <EuiButtonIcon
                  onClick={() => {
                    remove(index)
                  }}
                  color="subdued"
                  iconType="crossInACircleFilled"
                  aria-label="Remove"
                />
              )}
            </EuiFlexItem>
          </EuiFlexGroup>
        ))}
        <EuiSpacer size="m" />

        <EuiButton type="submit" disabled={loading || !formState.isValid} isLoading={loading}>
          Submit
        </EuiButton>
      </EuiForm>
    </Fragment>
  )
}

export default React.memo(PasteTextForm)
