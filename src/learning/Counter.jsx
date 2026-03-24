import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: "20px", background: "#f0f0f0" }}>
      <h2>Counting</h2>
      <p>The number now is {count}</p>
      <button onClick={() => setCount(count + 1)}>1 plus</button>
      <button onClick={() => setCount(count - 1)}>1 minus</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
