import { currentDocState, selectedLabelState } from '@/contexts/atoms/annotation'
import { useDraftAnno } from '@/hooks/useDraftAnno'
import useTextSelection, { Highlight, SplitText, State, Text } from '@/hooks/useTextSelection'
import { DraftSequenceLabelingAnnotation } from '@/types'
import { getRandomUUID } from '@/utils/utils'
import { EuiFlexGroup, EuiFlexItem, EuiPanel, EuiSpacer, EuiText } from '@elastic/eui'
import { useUpdateEffect } from '@umijs/hooks'
import { sortBy } from 'lodash'
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import AnnoPagination from '../AnnoPagination'
import MarkPopover from './components/MarkPopover'
import { useMergeAnno } from '@/hooks/useMergeAnno'

const SequenceLabelingProject: React.FC = () => {
  const [selection, ref] = useTextSelection<HTMLDivElement>()
  const { addAnno, removeAnno } = useDraftAnno()
  const { mergeAnnoSequenceLabeling } = useMergeAnno()

  const selectedLabel = useRecoilValue(selectedLabelState)
  const currentDoc = useRecoilValue(currentDocState)

  const handleAdd = useCallback(
    (newSelection: State) => {
      console.log(`SequenceLabelingProject:React.FC -> newSelection`, newSelection)
      if (selectedLabel) {
        addAnno({
          id: getRandomUUID(),
          label: selectedLabel,
          label_id: selectedLabel.id,
          data: {
            type: 'SequenceLabelingAnnotation',
            start: newSelection.start,
            end: newSelection.end,
            text: newSelection.text,
            label_text: selectedLabel.text,
          },
        })
      }
    },
    [selectedLabel, addAnno],
  )

  useUpdateEffect(() => {
    if (selection.text) {
      handleAdd(selection)
    }
  }, [selection])

  // const handleEdit = useCallback(
  //   (id: string, label_id: string) => {
  //     // editAnnotation({ id, changes: { label_id } })
  //   },
  //   [editAnnotation],
  // )

  // {
  //   labelList &&
  //     labelList.map((item) => {
  //       if (item.id _!== mark.label.id) {
  //         return (
  //           <Menu.Item key={item.id}>
  //             <Button
  //               block
  //               size="small"
  //               style={{
  //                 borderColor: item.color,
  //                 color: item.color,
  //               }}
  //             >
  //               {item.text}
  //             </Button>
  //           </Menu.Item>
  //         )
  //       }
  //       return null
  //     })
  // }

  const normalizedPositions = useMemo<Highlight[]>(() => {
    const reducePositions = (positions: Highlight[]): Highlight[] => {
      return positions.reduce((prev, curr) => {
        const index = prev.findIndex((item) => item.start < curr.start && item.end >= curr.end)
        const swapItem = prev.find((item) => item.start === curr.start && item.end < curr.end)
        if (index !== -1) {
          prev[index].children.push(curr as Highlight)
          prev[index].children = reducePositions(prev[index].children)
        } else if (swapItem) {
          curr.children.push(swapItem)
          curr.children = reducePositions(curr.children)
          prev[prev.indexOf(swapItem)] = curr
        } else {
          prev.push(curr as Highlight)
        }
        return prev
      }, [] as Highlight[])
    }

    return reducePositions(
      sortBy(mergeAnnoSequenceLabeling, (item) => item.data.start).map((val) => ({
        type: 'Highlight',
        id: val.id,
        start: val.data.start,
        end: val.data.end,
        text: val.data.text,
        children: [],
        label: val.label!,
      })),
    )
  }, [mergeAnnoSequenceLabeling])

  const splitsText = useMemo<SplitText[]>(() => {
    const createSplits = (
      sourceText: string,
      positions: Highlight[],
      start = 0,
      end = sourceText.length,
    ): SplitText[] => {
      let lastEnd = start
      const splits: SplitText[] = []

      positions.forEach((highlightRange) => {
        if (highlightRange.start > lastEnd) {
          splits.push({
            type: 'Text',
            text: sourceText.slice(lastEnd, highlightRange.start),
          })
        }
        const highlighted: Highlight =
          highlightRange.children.length > 0
            ? ({
                ...highlightRange,
                children: createSplits(
                  sourceText,
                  highlightRange.children,
                  highlightRange.start,
                  highlightRange.end,
                ),
              } as Highlight)
            : {
                ...highlightRange,
              }
        splits.push(highlighted)
        lastEnd = highlightRange.end
      })

      const lastNotHighlighted: Text = {
        type: 'Text',
        text: sourceText.slice(lastEnd, end),
      }
      splits.push(lastNotHighlighted)

      return splits
    }
    if (normalizedPositions.length > 0 && currentDoc?.text) {
      return createSplits(currentDoc.text, normalizedPositions)
    }
    return [
      {
        type: 'Text',
        text: currentDoc?.text || '',
      },
    ]
  }, [currentDoc?.text, normalizedPositions])

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

  const handleRemove = useCallback(
    (id: string) => {
      removeAnno(id)
      setSelectedId(undefined)
    },
    [removeAnno],
  )

  const renderSplits = useCallback(
    (splitsText: SplitText[]) => {
      return splitsText.map((item, key) => {
        if (item.type === 'Text') {
          return <Fragment key={key}>{item.text}</Fragment>
        }
        return (
          <Fragment key={key}>
            <MarkPopover
              hightlight={item}
              onRemove={handleRemove}
              onClick={setSelectedId}
              selectedId={selectedId}
            >
              {item.children.length > 0 ? renderSplits(item.children) : item.text}
            </MarkPopover>
          </Fragment>
        )
      })
    },
    [selectedId],
  )

  return (
    <EuiFlexGroup direction="column" gutterSize="m">
      <EuiFlexItem>
        <AnnoPagination />
      </EuiFlexItem>
      {currentDoc && (
        <EuiFlexItem>
          <EuiPanel
            betaBadgeLabel={`Document Content`}
            paddingSize="l"
            style={{
              display: 'flex',
              minHeight: 128,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div ref={ref} style={{ fontSize: 18 }}>
              <EuiText id="container-rangy">{renderSplits(splitsText)}</EuiText>
            </div>
          </EuiPanel>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  )
}
export default SequenceLabelingProject
