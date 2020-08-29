import { DraftTextClassificationAnnotation, Label } from '@/types'
import { getRandomUUID } from '@/utils/utils'
import React, { useCallback, useMemo } from 'react'
import LabelList from './LabelList'
import { useDraftAnno } from '@/hooks/useDraftAnno'
import { useRecoilValue } from 'recoil'
import { labelState } from '@/contexts/atoms/annotation'

const TextClassificationProject: React.FC = () => {
  const labelList = useRecoilValue(labelState)

  const { presentAnno, removeAnno, addAnno } = useDraftAnno()

  const handleChooseLabel = useCallback(
    (label: Label) => {
      const anno = presentAnno.find((val) => val.label_id === label.id)
      if (anno) {
        removeAnno(anno.id)
      } else {
        addAnno({
          id: getRandomUUID(),
          label_id: label.id,
          data: { label_text: label.text, type: 'TextClassificationAnnotation' },
          label: label,
        })
      }
    },
    [addAnno, presentAnno, removeAnno],
  )

  const selectedList = useMemo(
    () => (presentAnno as DraftTextClassificationAnnotation[]).map((val) => `${val.label_id}`),
    [presentAnno],
  )

  return (
    <LabelList
      labelList={labelList}
      onChooseLabel={handleChooseLabel}
      selectedList={selectedList}
    />
  )
}

export default TextClassificationProject
