import { currentProjectState } from '@/contexts/atoms/currentProject'
import { NOTIFICATION_TYPES } from '@/constants'
import {
  useInsertProjectContributorsMutation,
  useMarkAsReadNotificationMutation,
  useProjectNotificationsQuery,
} from '@/generated/graphql'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import { ProjectNotification } from '@/types'
import {
  EuiButtonIcon,
  EuiCode,
  EuiComment,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiListGroup,
  EuiPanel,
  EuiText,
  EuiButton,
} from '@elastic/eui'
import moment from 'moment'
import React, { Fragment, useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'
import RoleBadge from './role-badge'

interface UserRequestList {
  onSubmit: () => void
}

const UserRequestList: React.FC<UserRequestList> = (props) => {
  const currentProject = useRecoilValue(currentProjectState)

  const { data, loading, refetch } = useProjectNotificationsQuery({
    variables: {
      project_id: currentProject?.id,
    },
  })

  const [mark, { loading: loadingMark, data: dataMark }] = useMarkAsReadNotificationMutation()

  const [hoverItem, setHoverItem] = useState<number | undefined>(undefined)

  const onMark = useCallback(
    async (id: string) => {
      await mark({ variables: { id } })
    },
    [mark, currentProject?.id],
  )

  const handleReject = async ({ id }: ProjectNotification) => {
    await onMark(id)
  }

  const [insertContributor, { loading: insertLoading }] = useInsertProjectContributorsMutation()
  const { success, error } = useGlobalToasts()

  const handleResolve = async (notification: ProjectNotification) => {
    if (currentProject) {
      try {
        await onMark(notification.id)
        await insertContributor({
          variables: {
            project_id: currentProject?.id,
            user_id: notification.sender_id,
            role_type: notification.addition_data.role_type,
          },
        })
        props.onSubmit()
        success({ title: 'Successfully add user to project' })
      } catch (err) {
        error({ title: 'Something wrong! Try again!' })
      }
    }
  }

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <EuiPanel betaBadgeLabel={'Contribution requests'}>
      <EuiListGroup
        bordered={true}
        maxWidth="none"
        flush={data?.project_notifications.length === 0}
      >
        <EuiFlexGroup direction="column" gutterSize="xs">
          <EuiFlexItem>
            <EuiButton iconType="refresh" onClick={() => refetch()} fullWidth={false}>
              Refetch
            </EuiButton>
          </EuiFlexItem>
          {(data?.project_notifications || []).map((item) => (
            <EuiFlexItem key={item.id}>
              <EuiComment
                username={item.user.name}
                event={
                  <EuiText>
                    {NOTIFICATION_TYPES[item.notification_type]}{' '}
                    <RoleBadge role={item.addition_data.role_type} /> at
                  </EuiText>
                }
                actions={
                  <EuiFlexGroup gutterSize="s">
                    <EuiFlexItem>
                      <EuiButtonIcon
                        aria-label="Resolve"
                        iconType="check"
                        size="m"
                        color="success"
                        onClick={() => handleResolve(item)}
                      />
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiButtonIcon
                        aria-label="Reject"
                        iconType="cross"
                        size="m"
                        color="danger"
                        onClick={() => handleReject(item)}
                      />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                }
                timestamp={<EuiCode>{moment(item.created_at).format('YYYY-MM-DD')}</EuiCode>}
              />
            </EuiFlexItem>
          ))}
          {data?.project_notifications.length === 0 && (
            <EuiEmptyPrompt
              iconType="editorStrike"
              title={<span>No user request</span>}
              titleSize="xxs"
            />
          )}
        </EuiFlexGroup>
      </EuiListGroup>
    </EuiPanel>
  )
}
export default React.memo(UserRequestList)
