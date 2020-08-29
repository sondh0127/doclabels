import { globalAnnoToastListState } from '@/contexts/atoms/annotation'
import { EuiGlobalToastList, htmlIdGenerator } from '@elastic/eui'
import { Toast } from '@elastic/eui/src/components/toast/global_toast_list'
import React, { useCallback } from 'react'
import { useRecoilCallback, useRecoilValue } from 'recoil'

export const useGlobalToasts = () => {
  const success = useRecoilCallback(
    ({ snapshot, set }) => async (toast: Omit<Toast, 'id' | 'color'>) => {
      const toasts = await snapshot.getPromise(globalAnnoToastListState)
      set(globalAnnoToastListState, [
        ...toasts,
        {
          id: htmlIdGenerator('success')(),
          color: 'success',
          iconType: 'check',
          ...toast,
        },
      ])
    },
  )

  const error = useRecoilCallback(
    ({ snapshot, set }) => async (toast: Omit<Toast, 'id' | 'color'>) => {
      const toasts = await snapshot.getPromise(globalAnnoToastListState)
      set(globalAnnoToastListState, [
        ...toasts,
        {
          id: htmlIdGenerator('error')(),
          color: 'danger',
          iconType: 'alert',
          ...toast,
        },
      ])
    },
    [],
  )

  const reset = useRecoilCallback(
    ({ set }) => async () => {
      set(globalAnnoToastListState, [])
    },
    [],
  )

  return {
    reset,
    success,
    error,
  }
}

export const useToastsComponent = () => {
  const toasts = useRecoilValue(globalAnnoToastListState)
  const { reset } = useGlobalToasts()

  const ToastList = useCallback(() => {
    return (
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={() => {
          reset()
        }}
        toastLifeTimeMs={3000}
      />
    )
  }, [reset, toasts])

  return ToastList
}
