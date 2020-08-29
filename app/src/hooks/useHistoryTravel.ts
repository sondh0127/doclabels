import produce, { castDraft, Draft } from 'immer'
import { Dispatch, useCallback, useEffect, useReducer } from 'react'

const UNDO = Symbol('UNDO')
const REDO = Symbol('REDO')
const RESET = Symbol('RESET')
const INIT = Symbol('INIT')

type Action = typeof UNDO | typeof REDO | typeof RESET | typeof INIT

interface TimeLine<T> {
  past: T[]
  present: T
  future: T[]
}

export interface TimeTravel<TState, TAction> {
  state: TState
  timeline: TimeLine<TState>
  dispatch: Dispatch<typeof UNDO | typeof REDO | typeof RESET | TAction>
  doUndo: () => void
  doRedo: () => void
  doReset: () => void
}

export const useHistoryTravel = <TState, TAction>(
  reducer: (present: Draft<TState>, action: TAction) => void,
  initialState: TState,
): TimeTravel<TState, TAction> => {
  const timeline = {
    past: [],
    present: initialState,
    future: [],
  }

  const _addNewPresent = useCallback((timeline: TimeLine<TState>, newPresent: TState) => {
    return produce(timeline, (draft) => {
      draft.past.push(draft.present)
      draft.present = castDraft(newPresent)
      draft.future = []
    })
  }, [])

  const _doUndo = useCallback((timeline: TimeLine<TState>) => {
    return produce(timeline, (draft) => {
      const newPresent = draft.past.pop()
      if (!newPresent) return
      draft.future.unshift(draft.present)
      draft.present = newPresent
    })
  }, [])

  const _doRedo = useCallback((timeline: TimeLine<TState>) => {
    return produce(timeline, (draft) => {
      const newPresent = draft.future.shift()
      if (!newPresent) return
      draft.past.push(draft.present)
      draft.present = newPresent
    })
  }, [])

  const _doReset = useCallback((timeline: TimeLine<TState>) => {
    return produce(timeline, (draft) => {
      const newPresent = draft.past.shift()
      if (!newPresent) return
      draft.future = [...draft.past, draft.present, ...draft.future]
      draft.present = newPresent
      draft.past = []
    })
  }, [])

  const proxiedReducer = useCallback(
    (tl: TimeLine<TState>, action: Action | TAction): TimeLine<TState> => {
      if (action === UNDO) return _doUndo(tl)
      if (action === REDO) return _doRedo(tl)
      if (action === RESET) return _doReset(tl)
      if (action === INIT)
        return {
          past: [],
          present: initialState,
          future: [],
        }
      // else
      const newState = produce(tl.present, (draft) => reducer(draft, action))
      return _addNewPresent(tl, newState)
    },
    [initialState],
  )

  const [_timeline, _dispatch] = useReducer(proxiedReducer, timeline)

  useEffect(() => {
    _dispatch(INIT)
  }, [initialState])

  return {
    state: _timeline.present,
    timeline: _timeline,
    dispatch: _dispatch,
    doUndo: () => _dispatch(UNDO),
    doRedo: () => _dispatch(REDO),
    doReset: () => _dispatch(RESET),
  }
}
