import ProjectBadge from '@/components/project-badge'
import { currentProjectState } from '@/contexts/atoms/currentProject'
import {
  useProjectContributorsAggregateQuery,
  useUpdateProjectsMutation,
} from '@/generated/graphql'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import { getConstraintError } from '@/utils/utils'
import {
  EuiButton,
  EuiCode,
  EuiConfirmModal,
  EuiFieldNumber,
  EuiFieldText,
  EuiFlexGroup,
  EuiForm,
  EuiFormFieldset,
  EuiFormRow,
  EuiHorizontalRule,
  EuiLoadingSpinner,
  EuiOverlayMask,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiSpacer,
  EuiSwitch,
  EuiText,
  EuiTextArea,
} from '@elastic/eui'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

interface FormValues {
  name: string
  description: string
  annotator_per_example: number
  collaborative_annotation: boolean
}

const Setting: React.FC = () => {
  const router = useRouter()
  const currentProject = useRecoilValue(currentProjectState)

  const { data } = useProjectContributorsAggregateQuery({
    variables: { project_id: currentProject?.id },
  })

  const { control, errors, handleSubmit, watch, setError } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      name: currentProject?.name,
      description: currentProject?.description,
      annotator_per_example: currentProject?.annotator_per_example,
      collaborative_annotation: currentProject?.collaborative_annotation,
    },
  })

  const { success, error } = useGlobalToasts()

  const [updateProject, { loading }] = useUpdateProjectsMutation()

  const [nameValue, setNameValue] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)

  const confirmDelete = useCallback(async () => {
    if (currentProject) {
      try {
        const res = await updateProject({
          variables: {
            id: currentProject?.id,
            change: { is_deleted: true },
          },
        })
        if (res.data?.update_projects_by_pk) {
          router.replace('/dashboard')
          setDeleteModal(false)
        } else {
          error({ title: 'Something wrong!' })
        }
      } catch (err) {
        error({ title: 'Something wrong!' })
      }
    }
    return
  }, [currentProject?.id])

  const _onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        await updateProject({
          variables: {
            id: currentProject?.id,
            change: values,
          },
        })
        success({ title: `Updated successfully!` })
      } catch (err) {
        const constraint = getConstraintError(err.message)
        console.log(`_onSubmit -> constraint`, constraint)

        const ConstraintToFieldMap: Record<string, keyof FormValues> = {
          projects_name_key: 'name',
        }

        const ConstraintMessage: Record<string, string> = {
          projects_name_key: 'Project name is exist. Try other.',
        }

        setError(ConstraintToFieldMap[constraint], {
          type: 'validate',
          message: ConstraintMessage[constraint],
        })

        error({
          title: `Failed to update project`,
          text: <p>Check your form for errors </p>,
        })
      }
    },
    [currentProject?.id],
  )

  const isSameName = useMemo(() => nameValue === currentProject?.name, [
    currentProject?.name,
    nameValue,
  ])

  const maxTask = useMemo<number>(() => {
    const projectContributors = data?.project_contributors_aggregate.aggregate?.count

    return projectContributors || 1
  }, [data?.project_contributors_aggregate?.aggregate?.count])

  return (
    <>
      <Head>
        <title>Project Settings</title>
        Not allow change distribution after publish
      </Head>
      <EuiPageBody component="div">
        <EuiPageHeader>
          <EuiText size="s">
            <h1>Settings</h1>
          </EuiText>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentHeader>
            <EuiText size="xs">
              <h2>Project settings</h2>
            </EuiText>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            {currentProject && (
              <EuiForm component="form" onSubmit={handleSubmit(_onSubmit)}>
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
                      max: {
                        value: 100,
                        message: 'The project name must less than 100 character',
                      },
                    }}
                    as={<EuiFieldText isInvalid={Boolean(errors.name)} />}
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
                <EuiFormRow label="Project type">
                  <ProjectBadge projectType={currentProject.project_type} />
                </EuiFormRow>
                <EuiSpacer />

                <EuiText size="xs">
                  <h4>Task Distribution</h4>
                </EuiText>

                <EuiSpacer />

                <Controller
                  name="collaborative_annotation"
                  control={control}
                  render={({ onChange, onBlur, value }) => (
                    <EuiFormFieldset legend={{ children: 'Collaborative annotation' }}>
                      <EuiSwitch
                        label="Enable collaborative"
                        checked={!!value}
                        onChange={(e) => {
                          onChange(e.target.checked)
                        }}
                        onBlur={onBlur}
                      />
                    </EuiFormFieldset>
                  )}
                />
                <EuiSpacer />

                <EuiFormRow
                  label="Annotator per example (<= number of annotator)"
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
                        max={maxTask}
                        disabled={!watch('collaborative_annotation')}
                      />
                    )}
                  />
                </EuiFormRow>

                <EuiSpacer />

                <EuiButton
                  type="submit"
                  fill={false}
                  isLoading={loading}
                  disabled={loading || Object.keys(errors).length > 0}
                >
                  Submit
                </EuiButton>
              </EuiForm>
            )}
          </EuiPageContentBody>

          <EuiHorizontalRule size="full" />

          <EuiPageContentHeader>
            <EuiText size="xs">
              <h2>Privacy Settings</h2>
            </EuiText>
            <EuiText size="xs" color="subdued">
              <strong>Your project is public</strong>
            </EuiText>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiButton
              fullWidth
              onClick={() => {
                console.log(`Make project private`)
              }}
            >
              Make project private
            </EuiButton>
          </EuiPageContentBody>

          <EuiHorizontalRule size="full" />
          <EuiPageContentHeader>
            <EuiText size="xs">
              <h2>Delete this Project</h2>
            </EuiText>
            <EuiText size="xs" color="danger">
              <strong>
                CAUTION: this willl delete this project entirely, along with all its documents and
                annotations.
              </strong>
            </EuiText>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiButton color="danger" fullWidth onClick={() => setDeleteModal(true)}>
              Delete Project
            </EuiButton>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>

      {deleteModal && (
        <EuiOverlayMask>
          <EuiConfirmModal
            title={<span>Are you sure to delete project</span>}
            onCancel={() => setDeleteModal(false)}
            onConfirm={() => confirmDelete()}
            confirmButtonText="Yes, do it"
            buttonColor="danger"
            defaultFocusedButton="confirm"
            maxWidth={500}
            confirmButtonDisabled={!loading && !isSameName}
          >
            {loading && (
              <EuiFlexGroup justifyContent="center">
                <EuiLoadingSpinner size="xl" />
              </EuiFlexGroup>
            )}
            {!loading && (
              <Fragment>
                <EuiText>
                  Please enter the project name: <EuiCode>{currentProject?.name}</EuiCode>
                  to confirm delete this project.
                </EuiText>
                <EuiSpacer size="s" />
                <EuiFieldText
                  fullWidth
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  isInvalid={!isSameName}
                />
              </Fragment>
            )}
          </EuiConfirmModal>
        </EuiOverlayMask>
      )}
    </>
  )
}

export default Setting
