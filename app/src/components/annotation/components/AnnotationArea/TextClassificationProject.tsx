import { currentDocState } from '@/contexts/atoms/annotation'
import { useMergeAnno } from '@/hooks/useMergeAnno'
import { getContrastYIQ } from '@/utils/utils'
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiPanel, EuiText } from '@elastic/eui'
import React from 'react'
import { useRecoilValue } from 'recoil'
import AnnoPagination from '../AnnoPagination'

const TextClassificationProject: React.FC = () => {
  const currentDoc = useRecoilValue(currentDocState)

  const { mergeAnnoTextClassification } = useMergeAnno()

  return (
    <EuiFlexGroup direction="column" gutterSize="m">
      <EuiFlexItem>
        <AnnoPagination />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel betaBadgeLabel={`Labels`}>
          <EuiFlexGroup gutterSize="s">
            {Object.values(mergeAnnoTextClassification).map((item) => {
              const label = item[0].label
              return (
                label && (
                  <EuiFlexItem
                    key={label.id}
                    style={{
                      padding: 4,
                      backgroundColor: label.color,
                      color: getContrastYIQ(label.color),
                      textAlign: 'center',
                    }}
                  >
                    <EuiText>{label.text}</EuiText>
                  </EuiFlexItem>
                )
              )
            })}
            {Object.values(mergeAnnoTextClassification).length === 0 && (
              <EuiFlexItem>
                <EuiText
                  color="subdued"
                  style={{
                    lineHeight: '32px',
                  }}
                  textAlign="center"
                >
                  <EuiIcon size="l" type="editorStrike" />
                  No label
                </EuiText>
              </EuiFlexItem>
            )}
          </EuiFlexGroup>
        </EuiPanel>
      </EuiFlexItem>
      {currentDoc && (
        <EuiFlexItem>
          <EuiPanel paddingSize="l" betaBadgeLabel={`Document content`}>
            <EuiText
              textAlign="center"
              color="accent"
              style={{
                minHeight: 128,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h3>{currentDoc.text}</h3>
            </EuiText>
          </EuiPanel>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  )
}
export default TextClassificationProject
