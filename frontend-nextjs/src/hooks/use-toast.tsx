"use client"

import type React from "react"

// Adapted from: https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/hooks/use-toast.ts
import { useState, useEffect, useCallback } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ToasterToast = ToastProps & {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  onDismiss?: () => void
  onUpdate?: () => void
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

const listeners: ((state: ToasterToast[]) => void)[] = []

let memoryState: ToasterToast[] = []

function dispatch(action: {
  type: (typeof actionTypes)[keyof typeof actionTypes]
  toast?: ToasterToast
  toastId?: string
}) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

interface Action {
  type: (typeof actionTypes)[keyof typeof actionTypes]
  toast?: ToasterToast
  toastId?: string
}

function reducer(state: ToasterToast[], action: Action): ToasterToast[] {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return [...state, { ...action.toast! }].slice(0, TOAST_LIMIT)

    case actionTypes.UPDATE_TOAST:
      return state.map((t) => (t.id === action.toastId ? { ...t, ...action.toast } : t))

    case actionTypes.DISMISS_TOAST:
      return state.map((t) => (t.id === action.toastId ? { ...t } : t))

    case actionTypes.REMOVE_TOAST:
      return state.filter((t) => t.id !== action.toastId)

    default:
      return state
  }
}

export function useToast() {
  const [state, setState] = useState<ToasterToast[]>(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  const toast = useCallback(({ ...props }: Omit<ToasterToast, "id">) => {
    const id = genId()

    const update = (props: ToasterToast) =>
      dispatch({
        type: actionTypes.UPDATE_TOAST,
        toast: props,
        toastId: id,
      })

    const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id })

    dispatch({
      type: actionTypes.ADD_TOAST,
      toast: {
        ...props,
        id,
        onDismiss: dismiss,
        onUpdate: () => update({ ...props, id }),
      },
    })

    setTimeout(() => {
      dispatch({ type: actionTypes.REMOVE_TOAST, toastId: id })
    }, TOAST_REMOVE_DELAY)

    return {
      id,
      dismiss,
      update,
    }
  }, [])

  return {
    toast,
    toasts: state,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  }
}

