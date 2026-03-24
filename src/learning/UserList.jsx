import { useState, useEffect } from "react"

export function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [trigger, setTrigger] = useState(0)

  // Function executed when the button is clicked
  const handleRefresh = () => {
    setLoading(true) // Start loading when clicked (key to preventing errors!)
    setError(null)
    setTrigger((prev) => prev + 1) // Change trigger to wake up useEffect
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data.")
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false) // Only stop loading once data fetching is complete.
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [trigger]) // fetch runs only when trigger changes.

  // 1. UI for error state
  if (error) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <p>Error: {error}</p>
        <button onClick={handleRefresh}>Try again</button>
      </div>
    )
  }

  // 2. UI for loading state
  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading user information...</h2>
  }

  // 3. UI for successful data output
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleRefresh} style={{ marginBottom: "10px" }}>
        Refresh
      </button>
      <ul
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        {users.map((user) => (
          <li key={user.id} style={{ listStyle: "none", padding: "5px 0" }}>
            ✅ {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}
