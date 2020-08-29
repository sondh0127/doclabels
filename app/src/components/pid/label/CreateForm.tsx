import { currentProjectState } from '@/contexts/atoms/currentProject'
import { useRecoilValue } from 'recoil'

import { InsertLabelMutationVariables, useInsertLabelMutation } from '@/generated/graphql'
import { getConstraintError } from '@/utils/utils'
import React, { Fragment, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiButton,
  EuiColorPicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSuperSelect,
  EuiSelect,
} from '@elastic/eui'

const shortKeys = '1234567890abcdefghijklmnopqrstuvwxyz'
const SHORT_KEYS = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'

interface CreateFormProps {
  onSubmit: () => void
}

interface FormValue {
  text: string
  hotkey: string
  color: string
}

const CreateForm: React.FC<CreateFormProps> = ({ onSubmit }) => {
  const currentProject = useRecoilValue(currentProjectState)
  const { control, reset, handleSubmit, formState, errors, setError } = useForm<FormValue>({
    mode: 'all',
    defaultValues: {
      text: '',
      hotkey: '1',
      color: '#E7664C',
    },
  })

  const { success, error } = useGlobalToasts()

  const [insertLabel, { loading }] = useInsertLabelMutation()

  const _onSubmit = useCallback(
    async (values: FormValue) => {
      try {
        await insertLabel({
          variables: {
            project_id: currentProject?.id,
            ...(values as Omit<InsertLabelMutationVariables, 'project_id'>),
          },
        })
        success({ title: `Label has been added successfully!` })
        reset()
        onSubmit()
      } catch (err) {
        const constraint = getConstraintError(err.message)

        const ConstraintToFieldMap: Record<string, keyof FormValue> = {
          labels_project_id_text_key: 'text',
          labels_project_id_hotkey_key: 'hotkey',
          labels_project_id_color_key: 'color',
        }

        const ConstraintMessage: Record<string, string> = {
          labels_project_id_text_key: 'Duplicated text',
          labels_project_id_hotkey_key: 'Duplicated hotkey',
          labels_project_id_color_key: 'Duplicated color',
        }

        setError(ConstraintToFieldMap[constraint], {
          type: 'validate',
          message: ConstraintMessage[constraint],
        })

        error({
          title: `Failed to add label`,
          text: <p>Check your form for errors </p>,
        })
      }
    },
    [currentProject?.id],
  )

  return (
    <Fragment>
      <EuiForm component="form" onSubmit={handleSubmit(_onSubmit)}>
        <EuiFlexGroup style={{ maxWidth: 600 }}>
          <EuiFlexItem grow={false} style={{ width: 210 }}>
            <EuiFormRow label="Text" isInvalid={Boolean(errors.text)} error={errors.text?.message}>
              <Controller
                control={control}
                name="text"
                rules={{
                  required: {
                    value: true,
                    message: 'Text required',
                  },
                }}
                render={({ onChange, value, onBlur }) => (
                  <EuiFieldText
                    isInvalid={Boolean(errors.text)}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ width: 210 }}>
            <EuiFormRow
              label="Hotkey"
              isInvalid={Boolean(errors.hotkey)}
              error={errors.hotkey?.message}
            >
              <Controller
                control={control}
                name="hotkey"
                rules={{
                  required: {
                    value: true,
                    message: 'Hotkey required',
                  },
                }}
                render={({ onChange, value, onBlur }) => (
                  <EuiSuperSelect
                    valueOfSelected={value}
                    isInvalid={Boolean(errors.hotkey)}
                    onBlur={onBlur}
                    onChange={onChange}
                    options={[...shortKeys.split('')].map((key) => {
                      return {
                        value: key,
                        inputDisplay: `${SHORT_KEYS[shortKeys.indexOf(key)]}`,
                      }
                    })}
                  />
                )}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow
              label="Color"
              isInvalid={Boolean(errors.color)}
              error={errors.color?.message}
            >
              <Controller
                control={control}
                name="color"
                rules={{
                  required: {
                    value: true,
                    message: 'Color required',
                  },
                }}
                render={({ onChange, value, onBlur }) => (
                  <EuiColorPicker
                    isInvalid={Boolean(errors.color)}
                    secondaryInputDisplay="top"
                    onChange={(text, output) => {
                      onChange(text)
                    }}
                    onBlur={onBlur}
                    color={value}
                  />
                )}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiFormRow hasEmptyLabelSpace display="center">
              <EuiButton
                type="submit"
                fill={false}
                isLoading={loading}
                disabled={loading || !formState.isValid}
              >
                Submit
              </EuiButton>
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
    </Fragment>
  )
}

export default React.memo(CreateForm)
