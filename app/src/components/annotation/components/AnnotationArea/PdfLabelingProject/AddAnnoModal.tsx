import { Label } from '@/types'
import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSuperSelect,
  EuiOverlayMask,
  EuiButtonEmpty,
  EuiModalFooter,
  EuiButton,
} from '@elastic/eui'
import React, { Fragment, useCallback } from 'react'
import { getContrastYIQ } from '@/utils/utils'

interface AddAnnoModalProps {
  visible: boolean
  onCancel: () => void
  labelList: Label[]
  onConfirm: (label: Label) => void
}

const AddAnnoModal: React.FC<AddAnnoModalProps> = ({ visible, onCancel, labelList, onConfirm }) => {
  const handleChange = useCallback(
    (value: string | string[]) => {
      const label = labelList.find((item) => item.id === value)
      if (label && onConfirm) {
        onConfirm(label)
      }
    },
    [labelList, onConfirm],
  )

  return (
    <Fragment>
      {visible && (
        <EuiOverlayMask>
          <EuiModal onClose={onCancel}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Add annotation</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiSuperSelect
                options={labelList.map((label) => {
                  return {
                    value: label.id,
                    inputDisplay: (
                      <EuiButton
                        size="s"
                        style={{
                          borderColor: label.color,
                          backgroundColor: label.color,
                          color: getContrastYIQ(label.color),
                        }}
                      >
                        {label.text}
                      </EuiButton>
                    ),
                  }
                })}
                onChange={handleChange}
                placeholder="Select a label"
              ></EuiSuperSelect>
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButtonEmpty onClick={onCancel}>Cancel</EuiButtonEmpty>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      )}
    </Fragment>
  )
}
export default AddAnnoModal
