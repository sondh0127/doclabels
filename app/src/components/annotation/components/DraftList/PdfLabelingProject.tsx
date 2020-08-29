import { labelState, selectedAnnotationState } from '@/contexts/atoms/annotation'
import { Label, DraftPdfLabelingAnnotation } from '@/types'
import {
  EuiAccordion,
  EuiListGroup,
  EuiListGroupItem,
  EuiText,
  EuiSpacer,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiBadge,
  EuiComboBoxOptionOption,
  EuiFormRow,
  EuiComboBox,
  EuiIcon,
} from '@elastic/eui'
import React, { Fragment, useMemo, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useMergeAnno } from '@/hooks/useMergeAnno'

const PdfLabelingProject: React.FC = () => {
  const { mergeAnnoPdfLabeling } = useMergeAnno()
  const labels = useRecoilValue(labelState)
  const [selectedOptions, setSelectedOptions] = useState<Array<EuiComboBoxOptionOption<Label>>>([])

  const labelMap = useMemo(
    () =>
      labels.reduce((prev, curr) => {
        prev[curr.id] = curr
        return prev
      }, {} as Record<string, Label>),
    [labels],
  )
  const setSelectedAnnotation = useSetRecoilState(selectedAnnotationState)

  const handleOnClick = (item: DraftPdfLabelingAnnotation) => {
    setSelectedAnnotation(item)
  }

  const annoByLabel = useMemo(() => {
    return mergeAnnoPdfLabeling
      .flatMap((item) => item)
      .reduce((result, currentValue) => {
        ;(result[currentValue.label_id] = result[currentValue.label_id] || []).push(currentValue)
        return result
      }, {} as Record<string, DraftPdfLabelingAnnotation[]>)
  }, [mergeAnnoPdfLabeling])

  const labelOptions = useMemo<Array<EuiComboBoxOptionOption<Label>>>(() => {
    return (labels || []).map((item) => ({
      value: item,
      label: `${item.text}`,
      color: `${item.color}`,
    }))
  }, [labels])

  const filterAnno = useMemo<Record<string, DraftPdfLabelingAnnotation[]>>(() => {
    if (selectedOptions.length > 0) {
      return Object.fromEntries(
        Object.entries(annoByLabel).filter(([id, anno]) => {
          return selectedOptions.some((item) => item.value?.id === id)
        }),
      )
    }
    return annoByLabel
  }, [annoByLabel, selectedOptions])

  return (
    <Fragment>
      <EuiHorizontalRule margin="m" />
      <EuiFlexItem style={{ height: 300 }}>
        <EuiText textAlign="center">Annotation List</EuiText>
        <EuiSpacer size="s" />
        <EuiFormRow label="Filter" compressed>
          <EuiComboBox
            compressed
            placeholder="Select label"
            options={labelOptions}
            selectedOptions={selectedOptions}
            onChange={setSelectedOptions}
          />
        </EuiFormRow>
        <EuiSpacer size="m" />
        <div className="eui-yScroll">
          {(Object.entries(filterAnno) || []).map(([key, value]) => {
            return (
              <EuiAccordion
                key={key}
                id={`accordion-${key}`}
                arrowDisplay="right"
                buttonContent={
                  <EuiBadge color={labelMap[key].color}>{labelMap[key].text}</EuiBadge>
                }
                paddingSize="s"
                initialIsOpen={true}
              >
                <EuiListGroup flush={true} bordered={true}>
                  {value.map((item) => {
                    return (
                      <EuiListGroupItem
                        key={item.id}
                        onClick={() => handleOnClick(item)}
                        label={item.data.contents.text}
                      />
                    )
                  })}
                </EuiListGroup>
              </EuiAccordion>
            )
          })}
          {Object.entries(filterAnno).length === 0 && (
            <EuiText color="subdued" textAlign="center">
              <EuiIcon size="original" type="editorStrike" />
              No annotation
            </EuiText>
          )}
        </div>
      </EuiFlexItem>
    </Fragment>
  )
}

export default PdfLabelingProject
