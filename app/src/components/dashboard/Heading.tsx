import { useUser } from '@/hooks/useUser'
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiImage,
  EuiLoadingContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiText,
} from '@elastic/eui'
import React from 'react'
import styles from './dashboard.module.scss'
import { useMyProjectsAggregateQuery } from '@/generated/graphql'

interface HeadingProps {
  onButtonClick: () => void
}

const Heading: React.FC<HeadingProps> = ({ onButtonClick }) => {
  const { user, loading } = useUser()

  const { data } = useMyProjectsAggregateQuery({
    variables: {
      auth0_id: user?.sub!,
    },
  })

  return (
    <EuiPageContentHeader>
      <EuiPageContentHeaderSection>
        {loading && <EuiLoadingContent lines={3} />}
        {user && (
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiImage size="s" alt="User picture" url={user.picture || ''} />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText size="xs">
                <h2>{user.name}</h2>
              </EuiText>
              <EuiText className={styles.email}>
                <EuiIcon type="email" /> {user.email}
              </EuiText>
              <EuiText size="s">
                Number of project: {data?.projects_aggregate.aggregate?.count}
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        )}
      </EuiPageContentHeaderSection>
      <EuiPageContentHeaderSection>
        <EuiButton color="secondary" onClick={onButtonClick}>
          Create Project
        </EuiButton>
      </EuiPageContentHeaderSection>
    </EuiPageContentHeader>
  )
}

export default Heading
