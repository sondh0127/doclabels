import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import {
  currentDocState,
  currentProjectState,
  versionIdState,
  downloadDocState,
  exportFormatState,
  DraftAnnoState,
} from '@/contexts/atoms/annotation'
import {
  DraftSeq2seqAnnotation,
  DraftTextClassificationAnnotation,
  DraftSequenceLabelingAnnotation,
  DraftPdfLabelingAnnotation,
} from '@/types'
import useDraftAnno from './useDraftAnno'
import { saveAs } from 'file-saver'
import { EXPORTED_FORMAT_TYPE } from '@/constants/document'
// @ts-ignore
import json2csv from 'csvjson-json2csv'
import { uniqWith } from 'lodash'

export const useMergeAnno = () => {
  const { presentAnno } = useDraftAnno()
  const currentDoc = useRecoilValue(currentDocState)
  const versionId = useRecoilValue(versionIdState)
  const currentProject = useRecoilValue(currentProjectState)
  const downloadDoc = useRecoilValue(downloadDocState)
  const exportFormat = useRecoilValue(exportFormatState)

  // TextClassification
  const getMergeAnnoTextClassification = useCallback((annoList: DraftAnnoState) => {
    const annoByLabel = annoList.reduce((prev, curr) => {
      ;(prev[curr.label_id] = prev[curr.label_id] || []).push(
        curr as DraftTextClassificationAnnotation,
      )
      return prev
    }, {} as Record<string, DraftTextClassificationAnnotation[]>)

    const annoByVersion = annoList.reduce((prev, curr) => {
      if (curr.user_id) {
        ;(prev[curr.user_id] = prev[curr.user_id] || []).push(
          curr as DraftTextClassificationAnnotation,
        )
      }
      return prev
    }, {} as Record<string, DraftTextClassificationAnnotation[]>)

    const mergedAnno = Object.entries(annoByLabel)
      .filter(([key, value]) => value.length >= Object.keys(annoByVersion).length / 2)
      .reduce((results, [key, value]) => {
        results[key] = annoByLabel[key]
        return results
      }, {} as Record<string, DraftTextClassificationAnnotation[]>)

    return mergedAnno
  }, [])

  const exportTextClassification = useCallback(() => {
    const exportData = {
      text: currentDoc?.text,
      labels: Object.values(getMergeAnnoTextClassification(presentAnno)).map(
        (item) => item[0].label?.text,
      ),
    }
    let formatedExportData = JSON.stringify(exportData, null, 2)

    if (exportFormat === 'csv') {
      formatedExportData = json2csv({
        ...exportData,
        labels: exportData.labels.join(', '),
      })
    }
    if (exportFormat === 'txt') {
      formatedExportData = json2csv({
        ...exportData,
        labels: exportData.labels.join(', '),
      })
        .split('\n')
        .splice(1)
        .join('\n')
    }

    const blob = new Blob([formatedExportData], {
      type: EXPORTED_FORMAT_TYPE[exportFormat],
    })
    saveAs(blob, `${currentProject?.name}-${currentDoc?.id}-${versionId}.${exportFormat}`)
  }, [getMergeAnnoTextClassification, presentAnno, exportFormat, versionId])

  const exportAllTextClassification = useCallback(() => {
    const exportData = downloadDoc.map((item) => {
      return {
        text: item.text,
        labels: Object.values(getMergeAnnoTextClassification(item.annotations)).map(
          (item) => item[0].label?.text,
        ),
      }
    })
    let formatedExportData = JSON.stringify(exportData, null, 2)
    if (exportFormat === 'csv') {
      formatedExportData = json2csv(
        exportData.map((item) => {
          return {
            ...item,
            labels: item.labels.join(', '),
          }
        }),
      )
    }
    if (exportFormat === 'txt') {
      formatedExportData = json2csv(
        exportData.map((item) => {
          return {
            ...item,
            labels: item.labels.join(', '),
          }
        }),
      )
        .split('\n')
        .splice(1)
        .join('\n')
    }
    const blob = new Blob([formatedExportData], { type: exportFormat })
    saveAs(blob, `${currentProject?.name}-${versionId}.${exportFormat}`)
  }, [downloadDoc, exportFormat, currentProject?.name, versionId, getMergeAnnoTextClassification])

  // Seq2seq
  const getMergeAnnoSeq2seq = useCallback((annoList: DraftAnnoState): Record<
    string,
    DraftSeq2seqAnnotation[]
  > => {
    const annoByLabel = annoList.reduce((prev, curr) => {
      ;(prev[curr.label_id] = prev[curr.label_id] || []).push(curr as DraftSeq2seqAnnotation)
      return prev
    }, {} as Record<string, DraftSeq2seqAnnotation[]>)

    const mergedAnno = Object.entries(annoByLabel).reduce((prev, [key, value]) => {
      const uniq = uniqWith(value, (a, b) => {
        return a.data.text === b.data.text
      })
      prev[key] = uniq
      return prev
    }, {} as Record<string, DraftSeq2seqAnnotation[]>)

    return mergedAnno
  }, [])

  const exportSeq2seq = useCallback(() => {
    const annoByLabel = Object.values(getMergeAnnoSeq2seq(presentAnno)).reduce((prev, curr) => {
      if (curr[0].label?.text) {
        prev[curr[0].label?.text] = curr.map((item) => item.data.text)
      }
      return prev
    }, {} as Record<string, string[]>)

    const exportData = {
      text: currentDoc?.text,
      ...annoByLabel,
    }
    let formatedExportData = JSON.stringify(exportData, null, 2)

    const annoByLabelText = Object.values(getMergeAnnoSeq2seq(presentAnno)).reduce((prev, curr) => {
      if (curr[0].label?.text) {
        prev[curr[0].label?.text] = curr.map((item) => item.data.text).join(', ')
      }
      return prev
    }, {} as Record<string, string>)
    if (exportFormat === 'csv') {
      formatedExportData = json2csv({
        ...exportData,
        ...annoByLabelText,
      })
    }
    if (exportFormat === 'txt') {
      formatedExportData = json2csv({
        ...exportData,
        ...annoByLabelText,
      })
        .split('\n')
        .splice(1)
        .join('\n')
    }

    const blob = new Blob([formatedExportData], {
      type: EXPORTED_FORMAT_TYPE[exportFormat],
    })
    saveAs(blob, `${currentProject?.name}-${currentDoc?.id}-${versionId}.${exportFormat}`)
  }, [
    getMergeAnnoSeq2seq,
    presentAnno,
    currentDoc?.text,
    currentDoc?.id,
    exportFormat,
    currentProject?.name,
    versionId,
  ])

  const exportAllSeq2seq = useCallback(() => {
    const exportData = downloadDoc.map((item) => {
      const annoByLabel = Object.values(getMergeAnnoSeq2seq(item.annotations)).reduce(
        (prev, curr) => {
          if (curr[0].label?.text) {
            prev[curr[0].label?.text] = curr.map((item) => item.data.text)
          }
          return prev
        },
        {} as Record<string, string[]>,
      )
      return {
        text: item.text,
        ...annoByLabel,
      }
    })
    let formatedExportData = JSON.stringify(exportData, null, 2)

    const exportDataText = downloadDoc.map((item) => {
      const annoByLabel = Object.values(getMergeAnnoSeq2seq(item.annotations)).reduce(
        (prev, curr) => {
          if (curr[0].label?.text) {
            prev[curr[0].label?.text] = curr.map((item) => item.data.text).join(', ')
          }
          return prev
        },
        {} as Record<string, string>,
      )
      return {
        text: item.text,
        ...annoByLabel,
      }
    })

    if (exportFormat === 'csv') {
      formatedExportData = json2csv(exportDataText)
    }
    if (exportFormat === 'txt') {
      formatedExportData = json2csv(exportDataText).split('\n').splice(1).join('\n')
    }
    const blob = new Blob([formatedExportData], { type: exportFormat })
    saveAs(blob, `${currentProject?.name}-${versionId}.${exportFormat}`)
  }, [downloadDoc, exportFormat, currentProject?.name, versionId, getMergeAnnoSeq2seq])

  // SequenceLabeling
  const getMergeAnnoSequenceLabeling = useCallback(
    (annoList: DraftAnnoState): DraftSequenceLabelingAnnotation[] => {
      const annoByOffset = annoList.reduce((prev, curr) => {
        if (curr.data.type === 'SequenceLabelingAnnotation') {
          const key = `${curr.data.start}-${curr.data.end}`
          ;(prev[key] = prev[key] || []).push(curr as DraftSequenceLabelingAnnotation)
        }
        return prev
      }, {} as Record<string, DraftSequenceLabelingAnnotation[]>)

      const mergedAnno = Object.values(annoByOffset).reduce((prev, value) => {
        if (value.length > 1) {
          let maxAnnoLabel: DraftSequenceLabelingAnnotation[] = []
          const annoByLabel = value.reduce((prevObj, currObj) => {
            ;(prevObj[currObj.label_id] = prevObj[currObj.label_id] || []).push(currObj)
            if (prevObj[currObj.label_id].length > maxAnnoLabel.length) {
              maxAnnoLabel = prevObj[currObj.label_id]
            }
            return prevObj
          }, {} as Record<string, DraftSequenceLabelingAnnotation[]>)

          prev.push(maxAnnoLabel[0])
        } else {
          prev.push(value[0])
        }
        return prev
      }, [] as DraftSequenceLabelingAnnotation[])

      return mergedAnno
    },
    [],
  )

  const exportSequenceLabeling = useCallback(() => {
    const annoByLabel = getMergeAnnoSequenceLabeling(presentAnno)
      .sort((a, b) => a.data.start - b.data.start)
      .reduce((prev, curr) => {
        const key = `${curr.data.start}-${curr.data.end}`
        prev[key] = {
          text: curr.data.text,
          label: curr.data.label_text,
        }
        return prev
      }, {} as Record<string, { text: string; label: string }>)

    const exportData = {
      text: currentDoc?.text,
      ...annoByLabel,
    }
    let formatedExportData = JSON.stringify(exportData, null, 2)

    const annoByLabelText = getMergeAnnoSequenceLabeling(presentAnno)
      .sort((a, b) => a.data.start - b.data.start)
      .reduce((prev, curr) => {
        const key = `${curr.data.start}-${curr.data.end}`
        prev[key] = `${curr.data.text}, ${curr.data.label_text}`

        return prev
      }, {} as Record<string, string>)
    if (exportFormat === 'csv') {
      formatedExportData = json2csv({
        ...exportData,
        ...annoByLabelText,
      })
    }
    if (exportFormat === 'txt') {
      formatedExportData = json2csv({
        ...exportData,
        ...annoByLabelText,
      })
        .split('\n')
        .splice(1)
        .join('\n')
    }

    const blob = new Blob([formatedExportData], {
      type: EXPORTED_FORMAT_TYPE[exportFormat],
    })
    saveAs(blob, `${currentProject?.name}-${currentDoc?.id}-${versionId}.${exportFormat}`)
  }, [
    getMergeAnnoSequenceLabeling,
    presentAnno,
    currentDoc?.text,
    currentDoc?.id,
    exportFormat,
    currentProject?.name,
    versionId,
  ])

  const exportAllSequenceLabeling = useCallback(() => {
    const exportData = downloadDoc.map((item) => {
      const annoByLabel = getMergeAnnoSequenceLabeling(item.annotations)
        .sort((a, b) => a.data.start - b.data.start)
        .reduce((prev, curr) => {
          const key = `${curr.data.start}-${curr.data.end}`
          prev[key] = {
            text: curr.data.text,
            label: curr.data.label_text,
          }
          return prev
        }, {} as Record<string, { text: string; label: string }>)
      return {
        text: item.text,
        ...annoByLabel,
      }
    })
    let formatedExportData = JSON.stringify(exportData, null, 2)

    const exportDataText = downloadDoc.map((item) => {
      const annoByLabel = getMergeAnnoSequenceLabeling(item.annotations)
        .sort((a, b) => a.data.start - b.data.start)
        .reduce((prev, curr) => {
          const key = `${curr.data.start}-${curr.data.end}`
          prev[key] = `${curr.data.text}, ${curr.data.label_text}`

          return prev
        }, {} as Record<string, string>)
      return {
        text: item.text,
        ...annoByLabel,
      }
    })

    if (exportFormat === 'csv') {
      formatedExportData = json2csv(exportDataText)
    }
    if (exportFormat === 'txt') {
      formatedExportData = json2csv(exportDataText).split('\n').splice(1).join('\n')
    }
    const blob = new Blob([formatedExportData], { type: exportFormat })
    saveAs(blob, `${currentProject?.name}-${versionId}.${exportFormat}`)
  }, [downloadDoc, exportFormat, currentProject?.name, versionId, getMergeAnnoSequenceLabeling])

  // PdfLabeling
  const getMergeAnnoPdfLabeling = useCallback(
    (annoList: DraftAnnoState): DraftPdfLabelingAnnotation[][] => {
      const isSame = (rectA: number[], rectB: number[]): boolean => {
        const threshold = 2
        return (
          Math.abs(rectA[0] - rectB[0]) < threshold &&
          Math.abs(rectA[1] - rectB[1]) < threshold &&
          Math.abs(rectA[2] - rectB[2]) < threshold &&
          Math.abs(rectA[3] - rectB[3]) < threshold
        )
      }

      const mergedAnno = annoList
        .reduce((result, curr) => {
          if (curr.data.type === 'PdfLabelingAnnotation') {
            ;(result[curr.data.pageNumber] = result[curr.data.pageNumber] || []).push(
              curr as DraftPdfLabelingAnnotation,
            )
          }
          return result
        }, [] as DraftPdfLabelingAnnotation[][])
        .map((item) => {
          return item
            .reduce((prev, curr) => {
              if (curr.data.contents.text) {
                const found = prev.find((array) => {
                  const item = array[0]
                  return item
                    ? item.data.contents.text?.trim() === curr.data.contents.text?.trim() &&
                        isSame(item.data.position.rect, curr.data.position.rect)
                    : false
                })
                if (found) {
                  const newFound = [...found, curr]
                  prev[prev.indexOf(found)] = newFound
                } else {
                  prev.push([curr])
                }
              }
              return prev
            }, [] as DraftPdfLabelingAnnotation[][])
            .reduce((prev, value) => {
              if (value.length > 1) {
                let maxAnnoLabel: DraftPdfLabelingAnnotation[] = []
                const annoByLabel = value.reduce((prevObj, currObj) => {
                  ;(prevObj[currObj.label_id] = prevObj[currObj.label_id] || []).push(currObj)
                  if (prevObj[currObj.label_id].length > maxAnnoLabel.length) {
                    maxAnnoLabel = prevObj[currObj.label_id]
                  }
                  return prevObj
                }, {} as Record<string, DraftPdfLabelingAnnotation[]>)

                prev.push(maxAnnoLabel[0])
              } else {
                prev.push(value[0])
              }
              return prev
            }, [] as DraftPdfLabelingAnnotation[])
        })

      return mergedAnno
    },
    [],
  )

  const exportPdfLabeling = useCallback(() => {
    const annoByLabel = getMergeAnnoPdfLabeling(presentAnno).map((item) => {
      return item.map((item) => {
        if (item.data.contents.text) {
          const { type, ...restData } = item.data
          return { ...restData }
        }
        return {}
      })
    }, [])

    const exportData = {
      text: currentDoc?.text,
      annotations: annoByLabel,
    }
    const formatedExportData = JSON.stringify(exportData, null, 2)

    const blob = new Blob([formatedExportData], {
      type: EXPORTED_FORMAT_TYPE[exportFormat],
    })
    saveAs(blob, `${currentProject?.name}-${currentDoc?.id}-${versionId}.${exportFormat}`)
  }, [
    getMergeAnnoPdfLabeling,
    presentAnno,
    currentDoc?.text,
    currentDoc?.id,
    exportFormat,
    currentProject?.name,
    versionId,
  ])

  const exportAllPdfLabeling = useCallback(() => {
    const exportData = downloadDoc.map((item) => {
      const annoByLabel = getMergeAnnoPdfLabeling(item.annotations).map((item) => {
        return item.map((item) => {
          if (item.data.contents.text) {
            const { type, ...restData } = item.data
            return { ...restData }
          }
          return {}
        })
      }, [])

      return {
        text: item.text,
        annotations: annoByLabel,
      }
    })
    const formatedExportData = JSON.stringify(exportData, null, 2)

    const blob = new Blob([formatedExportData], { type: exportFormat })
    saveAs(blob, `${currentProject?.name}-${versionId}.${exportFormat}`)
  }, [downloadDoc, exportFormat, currentProject?.name, versionId, getMergeAnnoPdfLabeling])

  return {
    mergeAnnoTextClassification: getMergeAnnoTextClassification(presentAnno),
    mergeAnnoSeq2seq: getMergeAnnoSeq2seq(presentAnno),
    mergeAnnoSequenceLabeling: getMergeAnnoSequenceLabeling(presentAnno),
    mergeAnnoPdfLabeling: getMergeAnnoPdfLabeling(presentAnno),
    exportTextClassification,
    exportAllTextClassification,
    exportSeq2seq,
    exportAllSeq2seq,
    exportSequenceLabeling,
    exportAllSequenceLabeling,
    exportPdfLabeling,
    exportAllPdfLabeling,
  }
}
