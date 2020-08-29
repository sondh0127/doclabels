import React, { useState } from 'react'
import { EuiPopover, EuiFlexGroup, EuiText, EuiButtonIcon } from '@elastic/eui'
import { PdfJs } from '@/components/pdf-annotation'

interface AnnotationPopoverProps {
  style: React.CSSProperties
  onConfirm: () => void
  content: React.ReactElement
  data: Record<string, any>
  handleRemoveAnno: (id: string) => void
}

const AnnotationPopover: React.FC<AnnotationPopoverProps> = ({
  style,
  onConfirm,
  content,
  data,
  handleRemoveAnno,
}) => {
  const [isPopoverOpen, setPopover] = useState(false)
  const anno = data as PdfJs.Annotation

  return (
    <EuiPopover
      isOpen={isPopoverOpen}
      closePopover={() => setPopover(false)}
      anchorPosition="upCenter"
      button={<div onClick={() => setPopover(true)}>{content}</div>}
      style={style}
      panelPaddingSize="s"
      display="block"
    >
      <EuiFlexGroup justifyContent="spaceAround" alignItems="center" gutterSize="xs">
        <EuiText style={{ color: `rgb(${anno.color})` }}>{anno && anno.label?.text}</EuiText>
        <EuiButtonIcon
          color="danger"
          iconType="cross"
          size="m"
          onClick={() => {
            onConfirm()
            handleRemoveAnno(anno.id)
          }}
        />
      </EuiFlexGroup>
    </EuiPopover>
  )
}

export default AnnotationPopover
