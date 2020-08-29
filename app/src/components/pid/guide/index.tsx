import MarkdownEditor from '@/components/markdown-editor/MarkdownEditor'
import { currentProjectState } from '@/contexts/atoms/currentProject'
import { useUpdateProjectsMutation } from '@/generated/graphql'
import { useGlobalToasts } from '@/hooks/useGlobalToasts'
import {
  EuiButton,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiText,
  EuiSpacer,
} from '@elastic/eui'
import React, { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
const MOCK_DATA = `### Annotation Guidelines
------
*Define the rules of the team on what and how to annotate*

**You can use [markdown syntax] (https://commonmark.org/help/) or using shortcut in navigation bar**


----`

const Guide: React.FC = () => {
  const currentProject = useRecoilValue(currentProjectState)

  const [updateProject, { loading }] = useUpdateProjectsMutation()

  const [markdownSrc, setMarkdownSrc] = useState(MOCK_DATA)

  const { success, error } = useGlobalToasts()

  useEffect(() => {
    if (currentProject?.guideline) {
      setMarkdownSrc(currentProject.guideline)
    }
  }, [currentProject])

  const updateGuideLine = async () => {
    try {
      await updateProject({
        variables: { id: currentProject?.id, change: { guideline: markdownSrc } },
      })
      success({ title: 'Successfully updated guide line!' })
    } catch (err) {
      error({ title: 'Something wrong. Try again!' })
    }
  }

  const isDisabled = useMemo(() => {
    if (currentProject?.guideline) {
      return currentProject?.guideline === markdownSrc
    }
    return MOCK_DATA === markdownSrc
  }, [currentProject?.guideline, markdownSrc])

  return (
    <EuiPageBody>
      <EuiPageHeaderSection>
        <EuiTitle size="m">
          <h1>Guideline</h1>
        </EuiTitle>
        <EuiText>
          Please write specific instructions to other project contributors on the project concept,
          explain the meanings and options for each label, etc.
        </EuiText>
        <EuiSpacer />
      </EuiPageHeaderSection>
      <EuiPageContent>
        <EuiPageContentHeader>
          <EuiButton
            isLoading={loading}
            size="s"
            isDisabled={isDisabled}
            iconType="save"
            type="success"
            onClick={() => {
              updateGuideLine()
            }}
          >
            Save guideline
          </EuiButton>
        </EuiPageContentHeader>
        <EuiPageContentBody>
          <MarkdownEditor value={markdownSrc} onChange={setMarkdownSrc} />
        </EuiPageContentBody>
      </EuiPageContent>
    </EuiPageBody>
  )
}

export default Guide
