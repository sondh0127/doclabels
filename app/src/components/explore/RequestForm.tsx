import {
  ExploreProjectsDocument,
  ExploreProjectsQuery,
  useContributorRequestMutation,
} from '@/generated/graphql'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import { ProjectWithStatistics } from '@/types'
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSuperSelect,
} from '@elastic/eui'
import produce from 'immer'
import React, { Fragment, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ProjectsVariables } from './ProjectList'
import { QueryProjectExploreObjectsQueryVariables } from '@/autogen'

interface FormValue {
  role: 'annotator' | 'annotation_approver'
}

type RequestVariables = QueryProjectExploreObjectsQueryVariables

interface RequestFormProps {
  project: ProjectWithStatistics
  onClose: () => void
  variables: RequestVariables
}

const RequestForm: React.FC<RequestFormProps> = ({ project, onClose, variables }) => {
  const { control, handleSubmit, errors, watch } = useForm<FormValue>({ mode: 'all' })

  const [request, { loading }] = useContributorRequestMutation({
    update: (cache, { data }) => {
      // cache.modify({
      //   fields: {
      //     project_notifications: (existingProject) => {
      //       const next = produce(existingProject, (draftState) => {
      //         if (draftState?.projects) {
      //           const idx = draftState?.projects.findIndex((item) => item.id === project.id)
      //           draftState?.projects[idx].project_notifications.push(
      //             data.insert_project_notifications_one!,
      //           )
      //         }
      //       })
      //       return next
      //     },
      //   },
      // })
      // if (data) {
      //   const getExisting = cache.readQuery<ExploreProjectsQuery>({
      //     query: ExploreProjectsDocument,
      //     variables: variables,
      //   })
      //   const next = produce(getExisting, (draftState) => {
      //     if (draftState?.projects) {
      //       const idx = draftState?.projects.findIndex((item) => item.id === project.id)
      //       draftState?.projects[idx].project_notifications.push(
      //         data.insert_project_notifications_one!,
      //       )
      //     }
      //   })
      //   cache.writeQuery<ExploreProjectsQuery>({
      //     query: ExploreProjectsDocument,
      //     variables: variables,
      //     data: next!,
      //   })
      // }
    },
  })

  const { success, error } = useGlobalToasts()

  const [isModalVisible, setIsModalVisible] = useState(true)

  const closeModal = () => {
    setIsModalVisible(false)
    onClose()
  }

  const _onSubmit = async () => {
    const data = watch()
    try {
      await request({
        variables: {
          project_id: project.id,
          addition_data: { role_type: data.role },
        },
      })
      closeModal()
      success({ title: 'Request successfully!' })
    } catch (err) {
      error({ title: 'Something wrong.' })
      closeModal()
    }
  }

  const ROLE_LABELS = {
    annotator: 'Annotator',
    annotation_approver: 'Annotation Approver',
  }

  let modal

  if (isModalVisible) {
    modal = (
      <EuiOverlayMask>
        <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Join Project</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <EuiFormRow label="Role" isInvalid={Boolean(errors.role)} error={errors.role?.message}>
              <Controller
                control={control}
                name="role"
                rules={{
                  required: {
                    value: true,
                    message: 'Please choose a role',
                  },
                }}
                render={({ onChange, value, onBlur }) => (
                  <EuiSuperSelect
                    valueOfSelected={value}
                    isInvalid={Boolean(errors.role)}
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
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>

            <EuiButton
              onClick={() => _onSubmit()}
              fill={false}
              isLoading={loading}
              disabled={loading || Object.keys(errors).length > 0}
            >
              Submit
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>
    )
  }
  return <Fragment>{modal}</Fragment>
}

export default React.memo(RequestForm)
