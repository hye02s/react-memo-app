import { useRef } from "react"

export function InputFocus() {
  const inputRef = useRef(null)

  const handleClick = () => {
    console.log("rendering")
    inputRef.current.focus()
    inputRef.current.style.backgroundColor = "yellow"
    inputRef.current.value = "Hello!"
  }

  return (
    <div
      style={{ padding: "20px", border: "1px dashed purple", margin: "10px" }}
    >
      <h3>🔍 Controlling Input with useRef</h3>
      <input ref={inputRef} type="text" placeholder="Cursor will go here" />
      <button onClick={handleClick}>Focus Input!</button>
    </div>
  )
}
