import { useState, useRef, useEffect } from "react"

function FocusMemo() {
  const [memos, setMemos] = useState(() => {
    const saved = localStorage.getItem("my-memos")
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState("")
  const [editingIndex, setEditingIndex] = useState("")
  const [editValue, setEditValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const inputRef = useRef(null)
  const totalCountRef = useRef(0)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    localStorage.setItem("my-memos", JSON.stringify(memos))
  }, [memos])

  const handleAddMemo = () => {
    if (inputValue.trim() === "") return
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    setMemos([...memos, { text: inputValue, time: now }])
    setInputValue("")
    inputRef.current.focus()
    totalCountRef.current = totalCountRef.current + 1
    console.log("Cumulative creations: ", totalCountRef.current)
  }

  const handleDelete = (indexToDelete) => {
    const newMemos = memos.filter((_, index) => index !== indexToDelete)
    setMemos(newMemos)
  }

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all memos?")) {
      setMemos([])
    }
  }

  const startEdit = (index) => {
    setEditingIndex(index)
    setEditValue(memos[index].text)
  }

  const saveEdit = (index) => {
    const updateMemos = [...memos]
    updateMemos[index].text = editValue
    setMemos(updateMemos)
    setEditingIndex(null)
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
      <h2 style={{ textAlign: "center" }}>📝 Editable Notepad</h2>

      {/* Search Input */}
      <input
        type="text"
        style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
        placeholder="🔍 Search..."
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
          placeholder="Enter a new memo"
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
        {filteredMemos.map((memo, index) => (
          <li
            key={index}
            style={{
              marginBottom: "10px",
              listStyle: "none",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          >
            {editingIndex === index ? (
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  style={{ flex: 1 }}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => setEditingIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div>{memo.text}</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>
                    {memo.time}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => startEdit(index)}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
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

export default FocusMemo
