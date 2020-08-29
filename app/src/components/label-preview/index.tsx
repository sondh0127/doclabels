import React from 'react'
import { Label } from '@/types'
import { EuiBadge, isColorDark, hexToRgb } from '@elastic/eui'

interface LabelPreviewProps {
  label: Label
  onClick?: () => void
  selected?: boolean
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ label: { color, hotkey, text }, onClick }) => {
  return (
    <EuiBadge
      color={color}
      onClick={
        onClick ||
        (() => {
          return
        })
      }
      onClickAriaLabel="Label preview with color"
      iconOnClick={() => {
        return
      }}
      iconOnClickAriaLabel="Label preview icon"
    >
      {isColorDark(...hexToRgb(color)) ? (
        <div style={{ color: 'white' }}>{text}</div>
      ) : (
        <div style={{ color: 'black' }}>{text}</div>
      )}
    </EuiBadge>
  )
}

export default LabelPreview
