import { useState, useEffect } from "react"

export function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ marginTop: "20px", color: "blue" }}>
      <h3>⏱ Automatic timer: {seconds} seconds elapsed</h3>
    </div>
  )
}
