import { Label, PdfLabelingAnnotation } from '@/types'
import { useBoolean } from '@umijs/hooks'
import React, { useCallback, useMemo, useState } from 'react'
import LabelList from './LabelList'
import { DraftAnnoState } from '@/contexts/atoms/annotation'
import { useDraftAnno } from '@/hooks/useDraftAnno'
import {
  EuiText,
  EuiIcon,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiTitle,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiButton,
  EuiListGroup,
  EuiListGroupItem,
  EuiPanel,
  EuiButtonIcon,
  EuiCode,
  EuiSpacer,
} from '@elastic/eui'
import { useRecoilValue } from 'recoil'
import { labelState } from '@/contexts/atoms/annotation'

const PdfLabelingProject: React.FC = () => {
  const labelList = useRecoilValue(labelState)

  // const [selectedLabel, setSelectedLabel] = useSelectedLabel()
  const [selectedLabel, setSelectedLabel] = useState<Label>()

  const { state, setFalse, setTrue } = useBoolean(false)

  // const handleDeleteAnno = useCallback(
  //   (annoId: string) => {
  //     if (annoId) {
  //       removeAnnotations({ ids: [annoId] })
  //     }
  //   },
  //   [removeAnnotations],
  // )

  const handleChooseLabel = useCallback((label: Label) => {
    setSelectedLabel(label)
    setTrue()
  }, [])

  const { presentAnno } = useDraftAnno()

  const annoByLabel = useMemo<DraftAnnoState>(() => {
    return presentAnno.filter((val) => val.label_id === selectedLabel?.id)
  }, [presentAnno, selectedLabel])

  return (
    <>
      <LabelList
        labelList={labelList}
        onChooseLabel={handleChooseLabel}
        selectedList={[`${selectedLabel?.id}`]}
      />
      {state && (
        <EuiFlyout onClose={setFalse} size="s">
          <EuiFlyoutHeader hasBorder aria-labelledby={'Annotation List'}>
            <EuiTitle>
              <h2 id={'Annotation List'}>Annotation List</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            {annoByLabel.map((item) => {
              const { contents, pageNumber } = (item as PdfLabelingAnnotation).data

              return (
                <EuiPanel key={item.id}>
                  {contents.text && (
                    <EuiPanel paddingSize="s">
                      <EuiText>
                        {contents.text.length > 90
                          ? `${contents.text.slice(0, 90).trim()}…`
                          : `${contents.text}`}
                      </EuiText>
                    </EuiPanel>
                  )}
                  {contents.image && (
                    <EuiPanel>
                      <img src={contents.image} alt="Screenshot" />
                    </EuiPanel>
                  )}
                  <EuiSpacer size="xs" />
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <EuiCode>Page {pageNumber + 1}</EuiCode>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiButtonIcon
                        iconType="cross"
                        // disabled={item.is_submit}
                      />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              )
            })}
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty iconType="cross" onClick={setFalse} flush="left">
                  Close
                </EuiButtonEmpty>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </EuiFlyout>
      )}
    </>
  )
}

export default PdfLabelingProject
