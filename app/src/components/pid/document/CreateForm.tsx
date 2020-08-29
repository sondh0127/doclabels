import { currentProjectState } from '@/contexts/atoms/currentProject'
import {
  Documents_Insert_Input,
  useInsertDocumentsMutation,
  Task_Distribution_Insert_Input,
  useTaskDistributionAggregateQuery,
} from '@/generated/graphql'
import { EuiTabbedContent, EuiIcon } from '@elastic/eui'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import PasteTextForm from './components/PasteTextForm'
import UploadForm from './components/UploadForm'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'

import { getConstraintError } from '@/utils/utils'

export interface CreateFormProps {
  onSubmit: () => void
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const currentProject = useRecoilValue(currentProjectState)
  const { success, error } = useGlobalToasts()
  const [taskDistributions, setTaskDistributions] = useState<
    Array<{ user_id: string; task_num: number }>
  >([])

  console.log(`taskDistributions`, taskDistributions)
  const { data, refetch } = useTaskDistributionAggregateQuery({
    variables: {
      project_id: currentProject?.id,
    },
  })

  const [insertDoc, { loading }] = useInsertDocumentsMutation()

  useEffect(() => {
    setTaskDistributions(
      data?.project_contributors.map((item) => {
        return {
          user_id: item.user.id!,
          task_num: item.user.task_distributions_aggregate.aggregate?.count!,
        }
      }) || [],
    )
  }, [data])

  const getDistributedData = (): Array<Pick<Task_Distribution_Insert_Input, 'user_id'>> => {
    let data: Array<Pick<Task_Distribution_Insert_Input, 'user_id'>> = []
    if (currentProject && currentProject.collaborative_annotation) {
      data = taskDistributions.slice(0, currentProject.annotator_per_example).map((item) => {
        return {
          user_id: item.user_id,
        }
      })
    } else {
      data = taskDistributions.map((item) => {
        return {
          user_id: item.user_id,
        }
      })
    }
    return data
  }

  const handleAddDocument = useCallback(
    async (docs: Pick<Documents_Insert_Input, 'text' | 'meta' | 'task_distributions'>[]) => {
      if (currentProject) {
        try {
          const documents = docs.map((item) => {
            return {
              ...item,
              project_id: currentProject.id,
              task_distributions: {
                data: getDistributedData(),
              },
            }
          })

          await insertDoc({ variables: { documents } })
          success({ title: `Document has been added successfully!` })
          props.onSubmit()
          refetch()
        } catch (err) {
          const constraint = getConstraintError(err.message)

          const ConstraintMessage: Record<string, string> = {
            documents_project_id_text_key:
              'These documents are duplicates (the existing documents were not replaced)',
          }

          let description = 'You cannot add document after publishing!'
          if (constraint === 'documents_project_id_text_key') {
            description = ConstraintMessage[constraint]
          }
          refetch()

          error({
            title: `Failed to add document`,
            text: <p>{description}</p>,
          })
        }
      }
    },
    [currentProject, props.onSubmit, taskDistributions],
  )

  const tabs = [
    {
      id: 'paste--id',
      name: (
        <span>
          <EuiIcon type="visText" />
          &nbsp;Paste text
        </span>
      ),
      content: <PasteTextForm onSubmitDocument={handleAddDocument} loading={loading} />,
    },
    {
      id: 'upload--id',
      name: (
        <span>
          <EuiIcon type="importAction" />
          &nbsp;Upload file
        </span>
      ),
      content: <UploadForm onSubmitDocument={handleAddDocument} loading={loading} />,
    },
  ]

  return (
    <>
      <EuiTabbedContent tabs={tabs} initialSelectedTab={tabs[0]} autoFocus="selected" />
    </>
  )
}

export default CreateForm
