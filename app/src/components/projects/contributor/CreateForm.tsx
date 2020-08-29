import { currentProjectState } from '@/contexts/atoms/currentProject'
import { ROLE_LABELS } from '@/constants'
import {
  InsertProjectContributorsMutationVariables,
  useContributorsByNameOrIdLazyQuery,
  useInsertProjectContributorsMutation,
} from '@/generated/graphql'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import { getConstraintError } from '@/utils/utils'
import {
  EuiButton,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSuperSelect,
} from '@elastic/eui'
import { useDebounce, useUpdateEffect } from '@umijs/hooks'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

interface CreateFormProps {
  onSubmit: () => void
}

interface FormValue {
  user_id: string
  role_type: string
  color: string
}

const CreateForm: React.FC<CreateFormProps> = ({ onSubmit }) => {
  const currentProject = useRecoilValue(currentProjectState)
  const { control, reset, handleSubmit, formState, errors, setError } = useForm<FormValue>({
    mode: 'all',
    defaultValues: {
      user_id: '',
      role_type: '',
    },
  })

  const [textSearch, setTextSearch] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<EuiComboBoxOptionOption<string>[]>([])

  const debouncedText = useDebounce(textSearch, 700)

  const [fetchContributor, { data, loading: userLoading }] = useContributorsByNameOrIdLazyQuery({
    fetchPolicy: 'network-only',
  })

  const [insertContributor, { loading: insertLoading }] = useInsertProjectContributorsMutation()
  const { success, error } = useGlobalToasts()

  const _onSubmit = useCallback(
    async (values: FormValue) => {
      try {
        await insertContributor({
          variables: {
            project_id: currentProject?.id,
            ...(values as Omit<InsertProjectContributorsMutationVariables, 'project_id'>),
          },
        })
        success({ title: `Added successfully!` })
        onSubmit()
        reset()
        setSelectedOptions([])
      } catch (err) {
        const constraint = getConstraintError(err.message)

        const ConstraintToFieldMap: Record<string, keyof FormValue> = {
          // labels_project_id_text_key: 'text',
        }

        const ConstraintMessage: Record<string, string> = {
          // labels_project_id_text_key: 'Duplicated',
        }

        setError(ConstraintToFieldMap[constraint], {
          type: 'validate',
          message: ConstraintMessage[constraint],
        })

        error({
          title: `Failed to add contributor`,
          text: <p>Check your form for errors </p>,
        })
      }
    },
    [currentProject?.id],
  )

  useUpdateEffect(() => {
    fetchContributor({
      variables: {
        project_id: currentProject?.id,
        name: `%${debouncedText}%`,
      },
    })
  }, [debouncedText, currentProject])

  const onSearchChange = useCallback((searchValue) => {
    console.log(`onSearchChange -> searchValue`, searchValue)
    setTextSearch(searchValue)
  }, [])

  const comboBoxOptions = useMemo<EuiComboBoxOptionOption<string>[]>(() => {
    return (data?.users || [])
      .filter((item) => item.id !== currentProject?.user.id)
      .map((u) => ({
        value: u.id,
        label: u.name,
      }))
  }, [currentProject?.user?.id, data?.users])

  return (
    <Fragment>
      <EuiForm component="form" onSubmit={handleSubmit(_onSubmit)}>
        <EuiFlexGroup style={{ maxWidth: 600 }}>
          <EuiFlexItem grow={false} style={{ width: 210 }}>
            <EuiFormRow
              label="User"
              isInvalid={Boolean(errors.user_id)}
              error={errors.user_id?.message}
            >
              <Controller
                control={control}
                name="user_id"
                rules={{
                  required: {
                    value: true,
                    message: 'Please choose a user',
                  },
                }}
                render={({ onChange, value, onBlur }) => (
                  <EuiComboBox
                    isInvalid={Boolean(errors.user_id)}
                    placeholder="Input username"
                    async
                    onSearchChange={onSearchChange}
                    options={comboBoxOptions}
                    isLoading={userLoading}
                    selectedOptions={selectedOptions}
                    onChange={(options) => {
                      if (options[0]) {
                        onChange(options[0].value)
                        setSelectedOptions(options)
                      } else {
                        onChange('')
                        setSelectedOptions([])
                      }
                    }}
                    onBlur={onBlur}
                    singleSelection={{ asPlainText: true }}
                    isClearable={false}
                  />
                )}
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ width: 210 }}>
            <EuiFormRow
              label="Role"
              isInvalid={Boolean(errors.role_type)}
              error={errors.role_type?.message}
            >
              <Controller
                control={control}
                name="role_type"
                rules={{
                  required: {
                    value: true,
                    message: 'Please select user role!',
                  },
                }}
                render={({ onChange, value, onBlur }) => (
                  <EuiSuperSelect
                    valueOfSelected={value}
                    isInvalid={Boolean(errors.role_type)}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="Select a role"
                    options={Object.entries(ROLE_LABELS).map(([key, value]) => ({
                      value: key,
                      inputDisplay: value,
                    }))}
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
                isLoading={insertLoading}
                disabled={insertLoading || !formState.isValid}
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

export default CreateForm
