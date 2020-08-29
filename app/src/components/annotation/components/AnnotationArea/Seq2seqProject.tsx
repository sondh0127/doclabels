import { currentTaskState, labelState, selectedLabelState } from '@/contexts/atoms/annotation'
import { useDraftAnno } from '@/hooks/useDraftAnno'
import { useMergeAnno } from '@/hooks/useMergeAnno'
import { DraftSeq2seqAnnotation } from '@/types'
import { getContrastYIQ, getRandomUUID } from '@/utils/utils'
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiPanel,
  EuiText,
  EuiTextArea,
} from '@elastic/eui'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import AnnoPagination from '../AnnoPagination'

const Seq2seqProject: React.FC = React.memo(() => {
  const { addAnno, removeAnno, editAnno } = useDraftAnno()
  const { mergeAnnoSeq2seq } = useMergeAnno()

  const [annoText, setAnnoText] = useState('')
  const [editText, setEditText] = useState('')

  const [editedAnno, setEditedAnno] = useState<DraftSeq2seqAnnotation>()

  const handleEditing = (item: DraftSeq2seqAnnotation) => {
    setEditedAnno(item)
    setEditText(item.data.text)
  }

  const handleDoneEdit = () => {
    if (editedAnno && editText !== editedAnno.data.text) {
      editAnno({
        ...editedAnno,
        data: {
          type: 'Seq2seqAnnotation',
          text: editText,
        },
      })
    }
    setEditedAnno(undefined)
    setEditText('')
  }

  const [selectedLabel, setSelectedLabel] = useRecoilState(selectedLabelState)

  const handleAddAnno = useCallback(async () => {
    if (selectedLabel) {
      addAnno({
        id: getRandomUUID(),
        label: selectedLabel,
        label_id: selectedLabel.id,
        data: {
          type: 'Seq2seqAnnotation',
          text: annoText,
        },
      })
    }
    setAnnoText('')
  }, [selectedLabel, annoText])

  const handleRemoveAnno = useCallback(
    (id: string) => {
      removeAnno(id)
    },
    [removeAnno],
  )

  const dataSource = useMemo<DraftSeq2seqAnnotation[]>(() => {
    return mergeAnnoSeq2seq[selectedLabel?.id] || []
  }, [selectedLabel?.id, mergeAnnoSeq2seq])

  const currentTask = useRecoilValue(currentTaskState)
  const label = useRecoilValue(labelState)

  const isDisabledAnno = useMemo(() => !currentTask?.is_confirmed, [currentTask])

  return (
    <EuiFlexGroup direction="column" gutterSize="m">
      <EuiFlexItem>
        <AnnoPagination />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel betaBadgeLabel={`Labels`}>
          <EuiFlexGroup gutterSize="s">
            {label.map((item) => {
              const ghost = selectedLabel?.id !== item.id
              return (
                <EuiFlexItem
                  key={item.id}
                  style={{
                    padding: 4,
                    borderColor: item.color,
                    backgroundColor: ghost ? '' : item.color,
                    color: ghost ? item.color : getContrastYIQ(item.color),

                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedLabel(item)}
                >
                  <EuiText>{item.text}</EuiText>
                </EuiFlexItem>
              )
            })}
          </EuiFlexGroup>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiPanel
          style={{
            display: 'flex',
            minHeight: 128,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          betaBadgeLabel={`Document content`}
        >
          <EuiText color="subdued" style={{ fontSize: 18 }}>
            {currentTask?.document.text}
          </EuiText>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel betaBadgeLabel={`Translations`} paddingSize="l">
          {isDisabledAnno && (
            <Fragment>
              <EuiTextArea
                fullWidth
                compressed
                value={annoText}
                onChange={(e) => setAnnoText(e.target.value)}
                placeholder={`Translate to ${selectedLabel?.text}?`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddAnno()
                  }
                }}
              />

              <EuiHorizontalRule margin="m" />
            </Fragment>
          )}

          {/* LIST */}
          <EuiFlexGroup direction="column">
            {dataSource.map((item) => {
              return (
                <Fragment key={item.id}>
                  {item === editedAnno ? (
                    <EuiTextArea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => handleDoneEdit()}
                      onKeyDown={(e) => {
                        if (e.keyCode === 27) {
                          setEditedAnno(undefined)
                          setEditText('')
                        }
                        if (e.key === 'Enter') {
                          handleDoneEdit()
                        }
                      }}
                    />
                  ) : (
                    <EuiFlexItem>
                      <EuiFlexGroup key={item.id} alignItems="center" justifyContent="center">
                        <EuiFlexItem>
                          <EuiText>{item.data.text}</EuiText>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                          <EuiButtonIcon
                            onClick={() => handleRemoveAnno(item.id)}
                            iconType="cross"
                            aria-label="Remove"
                            color="danger"
                            iconSize="s"
                          >
                            {item.data.text}
                          </EuiButtonIcon>
                        </EuiFlexItem>
                      </EuiFlexGroup>
                    </EuiFlexItem>
                  )}
                </Fragment>
              )
            })}

            {dataSource.length === 0 && (
              <EuiFlexItem>
                <EuiText textAlign="center" color="subdued">
                  No translation
                </EuiText>
              </EuiFlexItem>
            )}
          </EuiFlexGroup>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
})

Seq2seqProject.whyDidYouRender = true
Seq2seqProject.displayName = 'Seq2seqProject'

export default Seq2seqProject
