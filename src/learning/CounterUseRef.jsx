import { useState, useRef } from "react"

export function CounterUseRef() {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  const increaseState = () => {
    setCount(count + 1)
  }

  const increaseRef = () => {
    countRef.current = countRef.current + 1
    console.log("Ref value:", countRef.current)
    alert("Ref value is now " + countRef.current + "! But the UI won't update.")
  }

  return (
    <div style={{ padding: "20px", border: "1px solid blue", margin: "10px" }}>
      <h3>🔢 State Count: {count}</h3>
      <h3>🤫 Check Ref value in the console (F12) or alert.</h3>
      <button onClick={increaseState}>Increase State (Updates UI)</button>
      <button onClick={increaseRef}>Increase Ref (Does not update UI)</button>
    </div>
  )
}
