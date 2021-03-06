import { Label } from '@/types'
import React, { useCallback, useMemo, useEffect } from 'react'
import LabelList from './LabelList'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedLabelState } from '@/contexts/atoms/annotation'
import { labelState } from '@/contexts/atoms/annotation'

const Seq2seqProject: React.FC = () => {
  const [selectedLabel, setSelectedLabel] = useRecoilState(selectedLabelState)
  const labelList = useRecoilValue(labelState)

  const handleChooseLabel = useCallback(
    (label: Label) => {
      if (label.id !== selectedLabel?.id) {
        setSelectedLabel(label)
      }
    },
    [selectedLabel],
  )

  return (
    <LabelList
      labelList={labelList}
      onChooseLabel={handleChooseLabel}
      selectedList={[`${selectedLabel?.id}`]}
    />
  )
}

export default Seq2seqProject
