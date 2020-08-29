import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { Label } from '@/types'

import rangy from 'rangy'
import 'rangy/lib/rangy-classapplier'
import 'rangy/lib/rangy-textrange'
import 'rangy/lib/rangy-highlighter'

interface Offset {
  start: number
  end: number
}
export interface State extends Offset {
  text: string
}

type TDom = HTMLElement | Document

type Arg = TDom | (() => TDom) | null

const initOffset: Offset = {
  start: NaN,
  end: NaN,
}

const initState: State = {
  text: '',
  ...initOffset,
}

function useTextSelection<T extends TDom = TDom>(): [State, MutableRefObject<T>]
function useTextSelection<T extends TDom = TDom>(arg: Arg): [State]
function useTextSelection<T extends TDom = TDom>(
  ...args: [Arg] | []
): [State, MutableRefObject<T>?] {
  const hasPassedInArg = args.length === 1
  const arg = useRef(args[0])
  const ref = useRef<T>()
  const [state, setState] = useState(initState)

  const stateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    const passedInArg = typeof arg.current === 'function' ? arg.current() : arg.current
    const target = hasPassedInArg ? passedInArg : ref.current

    if (!target) {
      return () => null
    }
    // @ts-ignore
    rangy.init()

    const mouseupHandler = () => {
      const sel = rangy.getSelection()
      // @ts-ignore
      sel.expand('word', {
        trim: true,
      })
      const container = document.getElementById('container-rangy')

      const range = sel.getRangeAt(0)
      if (range && container) {
        const text = range.toString()
        if (text) {
          const { start, end } = range.toCharacterRange(container)
          setState({ ...state, text, start, end })
        }
      }
      sel.removeAllRanges()
    }

    const mousedownHandler = () => {
      if (!rangy.getSelection) return
      if (stateRef.current.text) {
        setState({ ...initState })
      }
      const sel = rangy.getSelection()
      if (!sel) return
      sel.removeAllRanges()
    }

    target.addEventListener('mouseup', mouseupHandler)

    target.addEventListener('mousedown', mousedownHandler)

    return () => {
      target.removeEventListener('mouseup', mouseupHandler)
      target.removeEventListener('mousedown', mousedownHandler)
    }
  }, [ref.current, typeof arg.current === 'function' ? undefined : arg.current])

  if (hasPassedInArg) {
    return [state]
  }

  return [state, ref as MutableRefObject<T>]
}

export default useTextSelection

export interface Highlight {
  type: 'Highlight'
  id: string
  start: number
  end: number
  text: string
  label: Label
  children: Highlight[]
}

export interface Text {
  type: 'Text'
  text: string
}

export type SplitText = Text | Highlight
