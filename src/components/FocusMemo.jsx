import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useMemos } from "../hooks/useMemos"

export function FocusMemo() {
  const { memos, addMemo, deleteMemo, clearMemos, editMemo } = useMemos()

  const [inputValue, setInputValue] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const inputRef = useRef(null)
  const totalCountRef = useRef(0)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleAddMemo = () => {
    if (inputValue.trim() === "") return
    addMemo(inputValue)
    setInputValue("")
    inputRef.current.focus()
    totalCountRef.current = totalCountRef.current + 1
    console.log("Cumulative creations: ", totalCountRef.current)
  }

  const handleDelete = (idToDelete) => {
    deleteMemo(idToDelete)
  }

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all memos?")) {
      clearMemos()
    }
  }

  const startEdit = (memo) => {
    setEditingId(memo.id)
    setEditValue(memo.text)
  }

  const saveEdit = (id) => {
    editMemo(id, editValue)
    setEditingId(null)
  }

  const filteredMemos = memos.filter((memo) =>
    memo.text.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "450px",
        margin: "auto",
        border: "2px solid #333",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center" }}>📝 Smart Memo Pad (Refactored)</h2>

      {/* Search Input */}
      <input
        type="text"
        style={{ width: "96%", padding: "8px", marginBottom: "15px" }}
        placeholder="🔍 Search memos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Registration Input */}
      <div style={{ display: "flex", gap: "5px", marginBottom: "20px" }}>
        <input
          ref={inputRef}
          style={{ flex: 1, padding: "8px" }}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a new memo"
          onKeyDown={(e) => e.key === "Enter" && handleAddMemo()}
        />
        <button onClick={handleAddMemo}>Add</button>
      </div>

      <p>
        <small>Current memo count: {memos.length}</small>
      </p>
      <p>
        <small>(Cumulative creations are being logged in the console!)</small>
      </p>

      {memos.length > 0 && (
        <button
          onClick={handleClearAll}
          style={{
            width: "100%",
            marginBottom: "15px",
            padding: "5px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Clear All (Currently {memos.length})
        </button>
      )}

      <ul style={{ paddingLeft: "0px" }}>
        {filteredMemos.map((memo) => (
          <li
            key={memo.id}
            style={{
              listStyle: "none",
              padding: "12px",
              marginBottom: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              borderRadius: "5px",
            }}
          >
            {editingId === memo.id ? (
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  style={{ flex: 1 }}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(memo.id)}
                  autoFocus
                />
                <button onClick={() => saveEdit(memo.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <Link
                    to={`/focusmemo/${memo.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ fontWeight: "bold" }}>{memo.text}</div>
                    <div style={{ fontSize: "11px", color: "#999" }}>
                      {memo.time}
                    </div>
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() => startEdit(memo)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(memo.id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {filteredMemos.length === 0 && searchTerm && (
        <p style={{ textAlign: "center", color: "#888" }}>
          No search results found. 😅
        </p>
      )}
    </div>
  )
}
