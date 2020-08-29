import { PROJECT_TYPE_LABLE } from '@/constants'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import { getConstraintError } from '@/utils/utils'
import {
  EuiButton,
  EuiFieldNumber,
  EuiFieldText,
  EuiForm,
  EuiFormFieldset,
  EuiFormRow,
  EuiSpacer,
  EuiSuperSelect,
  EuiSwitch,
  EuiTextArea,
} from '@elastic/eui'
import Router from 'next/router'
import React, { Fragment, useReducer } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { GQLHooks } from '@/autogen/hasura/react'
import { Project_Types_Enum } from '@/autogen'

interface FormValues {
  name: string
  description: string
  project_type: string
  annotator_per_example?: number
  randomize_document_order: boolean
  collaborative_annotation: boolean
  guideline: string
}

const AddProjectForm: React.FC = () => {
  const { control, errors, formState, setError, handleSubmit, watch } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      name: '',
      description: '',
      project_type: '',
      annotator_per_example: 1,
      randomize_document_order: false,
      collaborative_annotation: false,
      guideline: '',
    },
  })

  const [insert] = GQLHooks.Fragments.Project.useInsert()
  const { success, error } = useGlobalToasts()

  const onSubmit = async (values: FormValues) => {
    const payload = {
      annotator_per_example: 1,
      ...values,
      project_type: values.project_type as Project_Types_Enum,
      randomize_document_order: false,
      guideline: '',
    }
    try {
      const res = await insert({ projects: payload })

      success({ title: 'Created successfully' })
      Router.push(`/projects/[pid]`, `/projects/${res.project.id}`)
    } catch (err) {
      const constraint = getConstraintError(err.message)

      const ConstraintToFieldMap: Record<string, keyof FormValues> = {
        projects_name_key: 'name',
        project_name_length: 'name',
      }

      const ConstraintMessage: Record<string, string> = {
        projects_name_key: 'Project name is exist. Try other.',
        project_name_length: 'Project name must be less than or equal to 50 characters',
      }

      setError(ConstraintToFieldMap[constraint], {
        type: 'validate',
        message: ConstraintMessage[constraint],
      })
      error({
        title: 'Oops, there was an error',
        text: <p>Check your form for errors!</p>,
      })
    }
  }

  return (
    <Fragment>
      <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
        <EuiFormRow
          label="Project name"
          isInvalid={Boolean(errors.name)}
          error={errors.name?.message}
        >
          <Controller
            control={control}
            name="name"
            rules={{
              required: {
                value: true,
                message: 'Please enter project name',
              },
              maxLength: {
                value: 50,
                message: 'Project name must be less than or equal to 50 characters',
              },
            }}
            render={({ onChange, value, onBlur }) => (
              <EuiFieldText
                isInvalid={Boolean(errors.name)}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Description"
          isInvalid={Boolean(errors.description)}
          error={errors.description?.message}
        >
          <Controller
            control={control}
            name="description"
            rules={{
              required: {
                value: true,
                message: 'Please enter the project description',
              },
            }}
            render={({ onChange, value, onBlur }) => (
              <EuiTextArea
                isInvalid={Boolean(errors.description)}
                placeholder="Describe your project"
                onBlur={onBlur}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Project type"
          isInvalid={Boolean(errors.project_type)}
          error={errors.project_type?.message}
        >
          <Controller
            control={control}
            name="project_type"
            rules={{
              required: {
                value: true,
                message: 'Please select the project type',
              },
            }}
            render={({ onChange, value, onBlur }) => (
              <EuiSuperSelect
                valueOfSelected={value}
                isInvalid={Boolean(errors.project_type)}
                onBlur={onBlur}
                onChange={onChange}
                options={Object.entries(PROJECT_TYPE_LABLE).map(([key, value]) => {
                  return {
                    value: key,
                    inputDisplay: value,
                  }
                })}
              />
            )}
          />
        </EuiFormRow>
        <EuiSpacer />

        <EuiFormFieldset legend={{ children: 'Collaborative annotation ' }}>
          <Controller
            name="collaborative_annotation"
            control={control}
            render={({ onChange, onBlur, value }) => (
              <EuiSwitch
                label="Enable collaborative"
                checked={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </EuiFormFieldset>

        <EuiSpacer />

        {watch('collaborative_annotation') && (
          <Fragment>
            <EuiFormRow
              label="Annotator per example"
              isInvalid={Boolean(errors.annotator_per_example)}
              error={errors.annotator_per_example?.message}
            >
              <Controller
                control={control}
                name="annotator_per_example"
                rules={{
                  required: {
                    value: true,
                    message: 'Please input a number',
                  },
                }}
                render={({ onChange, value, onBlur }) => (
                  <EuiFieldNumber
                    isInvalid={Boolean(errors.annotator_per_example)}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    min={1}
                  />
                )}
              />
            </EuiFormRow>
            <EuiSpacer />
          </Fragment>
        )}

        <EuiButton type="submit" fill={false} disabled={!formState.isValid}>
          Submit
        </EuiButton>
      </EuiForm>
    </Fragment>
  )
}

export default AddProjectForm
