import { Highlight } from '@/hooks/useTextSelection'
import { EuiButtonIcon, EuiPopover, EuiText } from '@elastic/eui'
import React from 'react'

interface MarkPopoverProps {
  hightlight: Highlight
  onRemove: (id: string) => void
  onClick: (id?: string) => void
  selectedId?: string
}

const MarkPopover: React.FC<MarkPopoverProps> = ({
  hightlight,
  onRemove,
  children,
  onClick,
  selectedId,
}) => {
  return (
    <EuiPopover
      key={`${hightlight.start}-${hightlight.end}`}
      button={
        <span
          style={{
            // outline: `1px solid ${hightlight.label.color}59`,
            borderColor: `${hightlight.label.color}59`,
            backgroundColor: `${hightlight.label.color}26`,
            color: hightlight.label.color,
            padding: `1px 0px 1px 0px`,
            boxShadow: `-1px 0px 0.5px 0px ${hightlight.label.color}59, 1px 0px 0.5px 0px ${hightlight.label.color}59`,
            cursor: 'pointer',
            userSelect: 'none',
          }}
          data-start={hightlight.start}
          data-end={hightlight.end}
          onClick={(e) => {
            e.stopPropagation()
            onClick(hightlight.id)
          }}
        >
          {children}
        </span>
      }
      isOpen={selectedId === hightlight.id}
      closePopover={() => onClick(undefined)}
      panelPaddingSize="none"
      withTitle
      ownFocus
      hasArrow={false}
      anchorPosition="downCenter"
      style={{ verticalAlign: 'unset' }}
    >
      <span style={{ display: 'flex', justifyContent: 'center' }}>
        <EuiText style={{ color: hightlight.label.color, marginRight: 2 }}>
          {hightlight.label.text}
        </EuiText>
        <EuiButtonIcon
          aria-label="Remove Mark"
          title="Remove"
          iconType="cross"
          onClick={() => onRemove(hightlight.id)}
          color="danger"
        />
      </span>
    </EuiPopover>
  )
}

export default MarkPopover
