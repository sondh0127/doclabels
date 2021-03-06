import { labelState } from '@/contexts/atoms/annotation'
import { useMergeAnno } from '@/hooks/useMergeAnno'
import { DraftSeq2seqAnnotation, Label } from '@/types'
import {
  EuiAccordion,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiListGroup,
  EuiListGroupItem,
  EuiSpacer,
  EuiText,
  EuiBadge,
  EuiIcon,
} from '@elastic/eui'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'

const Seq2seqProject: React.FC = () => {
  const { mergeAnnoSeq2seq } = useMergeAnno()
  const labels = useRecoilValue(labelState)
  const [selectedOptions, setSelectedOptions] = useState<Array<EuiComboBoxOptionOption<Label>>>([])

  const labelOptions = useMemo<Array<EuiComboBoxOptionOption<Label>>>(() => {
    return (labels || []).map((item) => ({
      value: item,
      label: `${item.text}`,
      color: `${item.color}`,
    }))
  }, [labels])

  const filterAnno = useMemo<Record<string, DraftSeq2seqAnnotation[]>>(() => {
    if (selectedOptions.length > 0) {
      return Object.fromEntries(
        Object.entries(mergeAnnoSeq2seq).filter(([id, anno]) => {
          return selectedOptions.some((item) => item.value?.id === id)
        }),
      )
    }
    return mergeAnnoSeq2seq
  }, [mergeAnnoSeq2seq, selectedOptions])

  const getLabelText = useCallback(
    (id: string): Label => {
      return labels.find((item) => item.id === id)!
    },
    [labels],
  )

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
                buttonContent={
                  <EuiBadge color={getLabelText(key).color}>{getLabelText(key).text}</EuiBadge>
                }
                paddingSize="s"
              >
                <EuiListGroup flush={true} bordered={true}>
                  {value.map((item) => {
                    return (
                      <EuiListGroupItem
                        key={item.id}
                        // onClick={() => handleOnClick(item)}
                        label={item.data.text}
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

export default Seq2seqProject
