import { useCallback } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { MemoContext } from "../hooks/useMemos"

export function MemoProvider({ children }) {
  const [memos, setMemos] = useLocalStorage("my-memos", [])

  const addMemo = useCallback(
    (text) => {
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
      const newMemo = {
        id: Date.now(),
        text,
        time: now,
      }
      setMemos((prevMemos) => [...prevMemos, newMemo])
    },
    [setMemos],
  )

  const deleteMemo = useCallback(
    (idToDelete) => {
      setMemos((prevMemos) => prevMemos.filter((memo) => memo.id !== idToDelete))
    },
    [setMemos],
  )

  const clearMemos = useCallback(() => {
    setMemos([])
  }, [setMemos])

  const editMemo = useCallback(
    (idToEdit, newText) => {
      setMemos((prevMemos) =>
        prevMemos.map((memo) =>
          memo.id === idToEdit ? { ...memo, text: newText } : memo,
        ),
      )
    },
    [setMemos],
  )

  return (
    <MemoContext.Provider
      value={{ memos, addMemo, deleteMemo, clearMemos, editMemo }}
    >
      {children}
    </MemoContext.Provider>
  )
}
