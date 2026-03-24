import { createContext, useContext } from "react"

export const MemoContext = createContext()

export function useMemos() {
  const context = useContext(MemoContext)
  if (!context) {
    throw new Error("useMemos must be used within a MemoProvider")
  }
  return context
}
