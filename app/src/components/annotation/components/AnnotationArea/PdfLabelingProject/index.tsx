import { selectedLabelState, labelState, currentDocState } from '@/contexts/atoms/annotation'
import { useDraftAnno } from '@/hooks/useDraftAnno'
import { DraftPdfLabelingAnnotation, Label } from '@/types'
import { getRandomUUID } from '@/utils/utils'
import { EuiButtonEmpty, EuiPopover } from '@elastic/eui'
// import Viewer, { Contents, PdfJs, RenderPageProps, Worker } from '@phuocng/react-pdf-viewer'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import AnnotationPopover from '../components/AnnotationPopover'
import Viewer, {
  Contents,
  PdfJs,
  RenderPageProps,
  Worker,
  defaultLayout,
  Layout,
  ToolbarSlot,
} from '@/components/pdf-annotation'
import AddAnnoModal from './AddAnnoModal'
import { useMergeAnno } from '@/hooks/useMergeAnno'

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : []
}

const renderPage = (props: RenderPageProps) => {
  return (
    <>
      {props.canvasLayer.children}
      {props.textLayer.children}
      {props.annotationLayer.children}
    </>
  )
}

const PdfLabelingProject: React.FC = () => {
  const labelList = useRecoilValue(labelState)
  const currentDoc = useRecoilValue(currentDocState)

  const setSelectedLabel = useSetRecoilState(selectedLabelState)
  const isDisabled = useMemo(() => false, [])

  // const addHighlight = (highlight: any, label: any) => {
  //   const payload = {
  //     ...highlight,
  //     label: label.id,
  //   }
  //   funcRef.current(payload)
  // }

  // const scrollViewerTo = React.useRef<any>(null)

  // const scrollToHighlightFromHash = () => {
  //   if (annoList) {
  //     const anno = annoList.find((val) => val.id === selectedAnno?.id)
  //     if (anno) scrollViewerTo.current(anno)
  //   }
  // }

  // useEffect(() => {
  //   if (selectedAnno && annoList) {
  //     scrollToHighlightFromHash()
  //   }
  // }, [selectedAnno])

  const [numPages, setNumPages] = useState(0)
  const [visible, setVisible] = useState(false)
  const [newAnno, setNewAnno] = useState<{
    position: PdfJs.Annotation
    contents: Contents
    pageNumber: number
  }>()

  const handleCancel = () => {
    setVisible(false)
    setNewAnno(undefined)
  }
  const hideTipAndSelectionRef = useRef<(() => void) | null>(null)

  const handleNewAnnotation = useCallback(
    (
      position: PdfJs.Annotation,
      contents: Contents,
      pageNumber: number,
      hideTipAndSelection: () => void,
    ) => {
      const { color, ...newPosition } = position
      setNewAnno({ position: { ...newPosition }, contents, pageNumber })
      setVisible(true)
      if (hideTipAndSelection) {
        hideTipAndSelectionRef.current = hideTipAndSelection
      }
    },
    [],
  )

  const { addAnno, removeAnno } = useDraftAnno()
  const { mergeAnnoPdfLabeling } = useMergeAnno()

  const handleConfirm = useCallback(
    (label: Label) => {
      if (newAnno) {
        const newDraftAnno: DraftPdfLabelingAnnotation = {
          id: getRandomUUID(),
          label_id: label.id,
          label: label,
          data: {
            ...newAnno,
            type: 'PdfLabelingAnnotation',
            label_text: label.text,
          },
        }
        addAnno(newDraftAnno)

        if (hideTipAndSelectionRef.current) {
          hideTipAndSelectionRef.current()
        }
        setSelectedLabel(label)
        setVisible(false)
      }
    },
    [newAnno],
  )

  const annotations = useMemo<PdfJs.Annotation[][]>(() => {
    return mergeAnnoPdfLabeling.map((item) => {
      return item.map((ele) => {
        return {
          ...ele.data.position,
          id: ele.data.position.id,
          color: new Uint8ClampedArray(hexToRgb(ele.label?.color!)),
          label: ele.label!,
        }
      })
    })
  }, [mergeAnnoPdfLabeling])

  const handleRemoveAnno = (annoId: string) => {
    const id = mergeAnnoPdfLabeling
      .flatMap((item) => item)
      .find((item) => (item as DraftPdfLabelingAnnotation).data.position.id === annoId)?.id
    if (id) {
      removeAnno(id)
    } else {
      console.log('error')
    }
  }
  const renderToolbar = (toolbarSlot: ToolbarSlot): React.ReactElement => {
    return (
      <div className={`viewer-toolbar`}>
        <div className={`viewer-toolbar-left`}>
          <div className={`viewer-toolbar-item`}>{toolbarSlot.toggleSidebarButton}</div>
          <div className={`viewer-toolbar-item`}>{toolbarSlot.searchPopover}</div>
        </div>
        <div className={`viewer-toolbar-center`}>
          <div className={`viewer-toolbar-item`}>{toolbarSlot.previousPageButton}</div>
          <div className={`viewer-toolbar-item`}>
            {toolbarSlot.currentPageInput} / {toolbarSlot.numPages}
          </div>
          <div className={`viewer-toolbar-item`}>{toolbarSlot.nextPageButton}</div>
          <div className={`viewer-toolbar-item`}>{toolbarSlot.zoomOutButton}</div>
          <div className={`viewer-toolbar-item`}>{toolbarSlot.zoomPopover}</div>
          <div className={`viewer-toolbar-item`}>{toolbarSlot.zoomInButton}</div>
        </div>
        <div className={`viewer-toolbar-right`}>
          <div className={`viewer-toolbar-item`}>{toolbarSlot.fullScreenButton}</div>
          <div className={`viewer-toolbar-item`}>{toolbarSlot.moreActionsPopover}</div>
        </div>
      </div>
    )
  }

  const layout: Layout = (isSidebarOpened, container, main, toolbar, sidebar) => {
    return defaultLayout(isSidebarOpened, container, main, toolbar(renderToolbar), sidebar)
  }

  if (currentDoc && currentDoc.text) {
    return (
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
        <div className="content">
          <Viewer
            layout={layout}
            fileUrl={currentDoc.text}
            defaultScale={1.5}
            renderPage={renderPage}
            onDocumentLoad={(doc) => {
              setNumPages(doc.numPages)
            }}
            annotationValue={annotations}
            onNewAnnotation={handleNewAnnotation}
            SelectionPopover={({ content, onConfirm, style }) => {
              return (
                <EuiPopover
                  button={content}
                  isOpen={true}
                  closePopover={() => null}
                  anchorPosition="upCenter"
                  style={style}
                  panelPaddingSize="none"
                >
                  <EuiButtonEmpty size="s" onClick={onConfirm} iconType="listAdd">
                    Add annotation
                  </EuiButtonEmpty>
                </EuiPopover>
              )
            }}
            AnnotationPopover={({ content, onConfirm, data, style }) => {
              return (
                <AnnotationPopover
                  content={content}
                  onConfirm={onConfirm}
                  data={data}
                  style={style}
                  handleRemoveAnno={handleRemoveAnno}
                />
              )
            }}
          />
          <AddAnnoModal
            visible={visible}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            labelList={labelList}
          />
        </div>
        <style jsx>{`
          .content {
            position: relative;
            height: calc(100% + 48px);
            margin: -24px;
          }

          .content :global(.viewer-layout-container) {
            border: none;
          }
        `}</style>
      </Worker>
    )
  }

  return null
}

export default PdfLabelingProject
