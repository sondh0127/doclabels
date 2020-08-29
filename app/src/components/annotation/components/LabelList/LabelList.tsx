import { Label } from '@/types'
import { getContrastYIQ } from '@/utils/utils'
import {
  EuiButton,
  EuiSpacer,
  EuiText,
  EuiToolTip,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBadge,
} from '@elastic/eui'
import React, { useCallback, useMemo } from 'react'
import { GlobalHotKeys, GlobalHotKeysProps } from 'react-hotkeys'

const MAX_LEN = 9

interface LabelsProps {
  labelList: Label[]
  onChooseLabel: (label: Label) => void
  selectedList?: string[]
}

const LabelList: React.FC<LabelsProps> = React.memo(
  ({ labelList, onChooseLabel, selectedList }) => {
    const memoHotkey = useMemo(() => {
      const keyMap: GlobalHotKeysProps['keyMap'] = {}
      const handlers: GlobalHotKeysProps['handlers'] = {}
      labelList.forEach((label) => {
        keyMap[label.id] = label.hotkey
        handlers[label.id] = () => onChooseLabel(label)
      })
      return { keyMap, handlers }
    }, [labelList, onChooseLabel])

    const getLabelText = useCallback((text) => {
      const isLongText = text.length > MAX_LEN
      return isLongText ? `${text.slice(0, MAX_LEN)}...` : text
    }, [])

    const isGhost = (id: number): boolean => {
      if (selectedList) {
        return !selectedList.includes(`${id}`)
      }
      return true
    }

    return (
      <GlobalHotKeys allowChanges keyMap={memoHotkey.keyMap} handlers={memoHotkey.handlers}>
        <div>
          <EuiFlexGroup direction="column">
            {labelList &&
              labelList.map((label) => {
                const ghost = isGhost(label.id)
                return (
                  <EuiFlexItem key={label.id}>
                    <EuiFlexGroup alignItems="center" gutterSize="s">
                      <EuiFlexItem grow={false}>
                        <EuiCode style={{ marginRight: 4 }} color={label.color}>
                          {label.hotkey.toUpperCase()}
                        </EuiCode>
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <EuiButton
                          size="s"
                          style={{
                            borderColor: label.color,
                            backgroundColor: ghost ? '' : label.color,
                            color: ghost ? label.color : getContrastYIQ(label.color),
                          }}
                          onClick={() => onChooseLabel(label)}
                        >
                          {getLabelText(label.text)}
                        </EuiButton>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiFlexItem>
                )
              })}
          </EuiFlexGroup>
        </div>
      </GlobalHotKeys>
    )
  },
)

LabelList.displayName = 'LabelList'

export default LabelList
