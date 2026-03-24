import { useParams, useNavigate } from "react-router-dom"
import { useMemos } from "../hooks/useMemos"

export function MemoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { memos } = useMemos()
  const memo = memos.find((m) => m.id === Number(id))

  if (!memo) {
    return <div style={{ padding: "20px" }}>⚠️ Memo Not Found!</div>
  }

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        margin: "20px",
      }}
    >
      <h2>📌 Memo Details</h2>
      <hr />
      <div style={{ marginTop: "15px" }}>
        <h3 style={{ color: "#333" }}>{memo.text}</h3>
        <p style={{ fontSize: "12px", color: "#888" }}>
          Created at: {memo.time}
        </p>
      </div>
      <button
        onClick={() => navigate(-1)}
        style={{ marginTop: "20px", cursor: "pointer", padding: "8px 16px" }}
      >
        Go Back
      </button>
    </div>
  )
}
