import React, { useMemo } from 'react'
import { Project } from '@/types'
import Link from 'next/link'
import PublishingForm from './components/PublishingForm'
import { Statistics } from './DashboardHeader'
import {
  EuiCallOut,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiPanel,
  EuiTextColor,
  EuiLink,
} from '@elastic/eui'
import { useSetRecoilState } from 'recoil'
import { currentProjectPageState } from '@/contexts/atoms/currentProject'

interface UnPublishedContentProps {
  currentProject: Project
  statistics: Statistics
}

const UnPublishedContent: React.FC<UnPublishedContentProps> = ({ currentProject, statistics }) => {
  const showGuideAlert = useMemo(() => !currentProject.guideline, [currentProject])

  const showLabelAlert = useMemo(() => !statistics.labels, [statistics])
  const showDocAlert = useMemo(() => !statistics.documents, [statistics])
  const showContributorAlert = useMemo(() => !statistics.contributors, [statistics])

  const showPublishForm =
    !showLabelAlert && !showGuideAlert && !showContributorAlert && !showDocAlert
  const setCurrentProjectPage = useSetRecoilState(currentProjectPageState)

  return (
    <EuiFlexGroup direction="column">
      <EuiFlexItem>
        {!showPublishForm && (
          <EuiText>
            <p>Please set up config of your project before publishing</p>
          </EuiText>
        )}
        {showPublishForm && (
          <EuiCallOut title="Ready for publishing" color="success" iconType="help"></EuiCallOut>
        )}
      </EuiFlexItem>
      {showLabelAlert && (
        <EuiFlexItem>
          <EuiCallOut title="Define the label for tasks" color="warning" iconType="indexPatternApp">
            {/* <Link href="/projects/[pid]/label" as={`/projects/${currentProject?.id}/label`}> */}
            <EuiLink onClick={() => setCurrentProjectPage('label')}>Go to Labels</EuiLink>
            {/* </Link> */}
          </EuiCallOut>
        </EuiFlexItem>
      )}
      {showGuideAlert && (
        <EuiFlexItem>
          <EuiCallOut
            title="Add guide line for better annotation process"
            color="warning"
            iconType="canvasApp"
          >
            <EuiLink onClick={() => setCurrentProjectPage('guide')}>Go to Guideline</EuiLink>
          </EuiCallOut>
        </EuiFlexItem>
      )}
      {showContributorAlert && (
        <EuiFlexItem>
          <EuiCallOut title="Manage your team" color="warning" iconType="usersRolesApp">
            <EuiLink onClick={() => setCurrentProjectPage('contributor')}>Add contributor</EuiLink>
          </EuiCallOut>
        </EuiFlexItem>
      )}
      {showDocAlert && (
        <EuiFlexItem>
          <EuiCallOut title="Add the documents data" color="warning" iconType="notebookApp">
            {/* <Link href="/projects/[pid]/document" as={`/projects/${currentProject?.id}/document`}> */}
            <EuiLink onClick={() => setCurrentProjectPage('document')}>Go to Documents</EuiLink>
            {/* </Link> */}
          </EuiCallOut>
        </EuiFlexItem>
      )}

      {showPublishForm && (
        <EuiFlexItem>
          <EuiCallOut title="Create check point before publish" color="warning" iconType="help" />
          <EuiSpacer size="m" />
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiPanel>
                <EuiText size="xs">
                  <h3>Project summary</h3>
                </EuiText>
                <EuiSpacer size="s" />
                <EuiText>
                  <span>
                    Number of task:{' '}
                    <EuiTextColor color="secondary">{statistics.documents}</EuiTextColor>
                  </span>
                </EuiText>
                <EuiSpacer size="s" />
                <EuiText>
                  <span>
                    Number of label:{' '}
                    <EuiTextColor color="secondary">{statistics.labels}</EuiTextColor>
                  </span>
                </EuiText>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
              <PublishingForm statistics={statistics} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  )
}

export default UnPublishedContent
