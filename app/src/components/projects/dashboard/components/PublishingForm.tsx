import { currentProjectState } from '@/contexts/atoms/currentProject'
import { useUpdateProjectsMutation } from '@/generated/graphql'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import { getConstraintError } from '@/utils/utils'
import {
  EuiButton,
  EuiButtonEmpty,
  EuiDatePicker,
  EuiDatePickerRange,
  EuiFieldNumber,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSpacer,
} from '@elastic/eui'
import { useMap } from '@umijs/hooks'
import moment, { Moment } from 'moment'
import React, { Fragment, useCallback, useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { useImmer } from 'use-immer'
import styles from '../dashboard.module.scss'
import { Statistics } from '../DashboardHeader'

const dateFormat = 'YYYY/MM/DD'

interface Check {
  task: number
  date: Moment
}

interface FormValues {
  published_date: Moment
  due_date?: Moment
}

interface PublishingFormProps {
  statistics: Statistics
}

const PublishingForm: React.FC<PublishingFormProps> = (props) => {
  const currentProject = useRecoilValue(currentProjectState)

  const { control, handleSubmit, errors, watch, trigger } = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      published_date: moment(),
      due_date: undefined,
    },
  })

  const watchDueDate = watch('due_date')

  const [map, { set, remove, reset, get }] = useMap<string, Check>([])

  useEffect(() => {
    ;[...Array.from(map)].forEach(([key, item]) => {
      if (watchDueDate && item.date.isAfter(watchDueDate as Moment)) {
        remove(key)
      }
    })
  }, [watchDueDate, map])

  const getDisabledDate = useCallback(
    (date: Moment): boolean => {
      const start = moment()
      const end = watch('due_date') as Moment

      if (!end) {
        return date.isBefore(start.add(1, 'day'), 'date')
      } else {
        return !date.isBetween(start, end, 'date')
      }
    },
    [watch],
  )

  const [update, { loading }] = useUpdateProjectsMutation()

  const { error, success } = useGlobalToasts()

  const handlePublishProject = useCallback(
    async ({ due_date, published_date }: FormValues) => {
      const publishedData: {
        published_date: string
        due_date?: string
        check_dates: Array<{ date: string; task: number }>
      } = {
        published_date: published_date.toISOString(true),
        due_date: due_date?.endOf('date').toISOString(true),
        check_dates: Array.from(map).map(([key, value]) => ({
          date: value.date.endOf('date').toISOString(true),
          task: value.task,
        })),
      }

      try {
        update({
          variables: {
            id: currentProject?.id,
            change: {
              is_public: true,
              ...publishedData,
            },
          },
        })
        success({ title: 'Successfully published project!' })
      } catch (err) {
        const constraint = getConstraintError(err.message)
        const ConstraintToFieldMap: Record<string, string> = {
          labels_project_id_text_key: 'text',
        }
        const fieldError = {
          name: ConstraintToFieldMap[constraint],
          // errors: [formatMessage({ id: `constraint.${constraint}` })],
        }
        // form.setFields([fieldError])
        error({ title: 'Can not publish this project. Missing data' })
      }
    },
    [currentProject, map],
  )

  const [ghostCheck, setGhostCheck] = useImmer<Check>({
    date: null,
    task: 1,
  })

  const resetGhost = useCallback(() => {
    setGhostCheck((draft) => {
      draft.date = null
      draft.task = 1
    })
  }, [])

  const noMoreTaskUpdate = useMemo(() => {
    const total = Array.from(map).reduce((prev, [key, curr]) => prev + Number(curr.task), 0)
    return props.statistics.documents < total + ghostCheck.task
  }, [map, props.statistics.documents, ghostCheck.task])

  const noMoreTask = useMemo(() => {
    const total = Array.from(map).reduce((prev, [key, curr]) => prev + Number(curr.task), 0)
    return props.statistics.documents <= total
  }, [map, props.statistics.documents])

  const onSelect = useCallback((date: Moment, task: number) => {
    setGhostCheck((draft) => {
      draft.date = date
      draft.task = task
    })
  }, [])

  const _onSubmitGhost = useCallback(() => {
    const canSubmit = ghostCheck.date && !noMoreTask
    if (canSubmit) {
      const temp = ghostCheck
      resetGhost()
      set(temp.date.format(dateFormat), temp)
    }
  }, [ghostCheck, noMoreTask])

  return (
    <Fragment>
      <EuiForm component="form" onSubmit={handleSubmit(handlePublishProject)}>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFormRow
              label="Published date  ---  Due date"
              isInvalid={Boolean(errors.published_date)}
              // error={errors.published_date?.message}
            >
              <EuiDatePickerRange
                startDateControl={
                  <Controller
                    control={control}
                    name="published_date"
                    rules={{
                      required: {
                        value: true,
                        message: 'Published date required',
                      },
                    }}
                    render={({ onChange, value, onBlur }) => (
                      <EuiDatePicker
                        dateFormat={dateFormat}
                        onBlur={onBlur}
                        selected={value}
                        onChange={onChange}
                        startDate={watch('published_date') as Moment}
                        endDate={watch('due_date') as Moment}
                        // isInvalid={this.state.startDate > this.state.endDate}
                        aria-label="Published date"
                        minDate={moment().subtract(0, 'days')}
                      />
                    )}
                  />
                }
                endDateControl={
                  <Controller
                    control={control}
                    name="due_date"
                    render={({ onChange, value, onBlur }) => (
                      <EuiDatePicker
                        dateFormat={dateFormat}
                        selected={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        startDate={watch('published_date') as Moment}
                        endDate={watch('due_date') as Moment}
                        minDate={moment().subtract(0, 'days')}
                        isInvalid={value && watch('published_date') > watch('due_date')}
                        aria-label="Due date"
                        onClear={() => onChange(null)}
                      />
                    )}
                  />
                }
              />
            </EuiFormRow>

            <EuiSpacer size="s" />
            <EuiButton
              type="submit"
              fill={false}
              isLoading={loading}
              disabled={loading || Object.keys(errors).length > 0}
            >
              Submit
            </EuiButton>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiFormRow label="Check point">
              <EuiDatePicker
                dateFormat={dateFormat}
                inline
                startDate={watch('published_date') as Moment}
                endDate={watch('due_date') as Moment}
                // isInvalid={this.state.startDate > this.state.endDate}
                shadow={true}
                aria-label="Check point date"
                minDate={moment(watch('published_date') as Moment).add(1, 'days')}
                maxDate={
                  watch('due_date') && moment(watch('due_date') as Moment).subtract(0, 'days')
                }
                dayClassName={(date) => {
                  let clsName: string
                  const checkPoint = get(date.format(dateFormat))
                  if (checkPoint) {
                    clsName = styles.publishingCheckPoint
                  }

                  return clsName
                }}
                onSelect={(date) => {
                  const checkPoint = get(date.format(dateFormat))
                  if (checkPoint) {
                    onSelect(date, checkPoint.task)
                  } else {
                    onSelect(date, 1)
                  }
                }}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
      {ghostCheck.date && (
        <EuiOverlayMask>
          <EuiModal onClose={resetGhost} initialFocus="[name=popswitch]">
            <EuiModalHeader>
              <EuiModalHeaderTitle>Set number of task</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiFormRow
                label="Task number"
                isInvalid={noMoreTaskUpdate}
                error={noMoreTaskUpdate && 'Invalid! Exceed project task'}
              >
                <EuiFieldNumber
                  isInvalid={noMoreTaskUpdate}
                  value={ghostCheck.task}
                  onChange={(e) => {
                    e.persist()
                    if (e.target) {
                      setGhostCheck((draft) => {
                        draft.task = Number(e.target.value)
                      })
                    }
                  }}
                  min={1}
                />
              </EuiFormRow>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty onClick={resetGhost}>Cancel</EuiButtonEmpty>
              <EuiButton
                onClick={() => _onSubmitGhost()}
                fill={false}
                isLoading={loading}
                disabled={loading || Object.keys(errors).length > 0}
              >
                Submit
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      )}
    </Fragment>
  )
}

export default React.memo(PublishingForm)
