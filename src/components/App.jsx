import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Counter } from "../learning/Counter"
import { Timer } from "../learning/Timer"
import { UserList } from "../learning/UserList"
import { InputFocus } from "../learning/InputFocus"
import { CounterUseRef } from "../learning/CounterUseRef"
import { FocusMemo } from "./FocusMemo"
import { MemoDetail } from "./MemoDetail"
import { MemoProvider } from "../context/MemoProvider"

function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🏠 Home</h1>
      <p>Welcome to the journey of becoming a React Master!</p>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/counter">🔢 Counter</Link>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/timer">⏱ Timer</Link>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/userlist">👥 User List</Link>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/inputfocus">🔍 Input Focus</Link>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/counteruseref">🤫 Counter useRef</Link>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/focusmemo">📝 Notepad</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export function App() {
  return (
    <MemoProvider>
      <BrowserRouter>
        <nav
          style={{
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#333",
            color: "white",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              marginLeft: "10px",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          |
          <Link
            to="/counter"
            style={{
              color: "white",
              marginLeft: "10px",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Counter
          </Link>
          |
          <Link
            to="/timer"
            style={{
              color: "white",
              marginLeft: "10px",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Timer
          </Link>
          |
          <Link
            to="/userlist"
            style={{
              color: "white",
              marginLeft: "10px",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            User List
          </Link>
          |
          <Link
            to="/inputfocus"
            style={{
              color: "white",
              marginLeft: "10px",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Input Focus
          </Link>
          |
          <Link
            to="/counteruseref"
            style={{
              color: "white",
              marginLeft: "10px",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Counter useRef
          </Link>
          |
          <Link
            to="/focusmemo"
            style={{
              color: "white",
              marginLeft: "10px",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Focus Memo
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/inputfocus" element={<InputFocus />} />
          <Route path="/counteruseref" element={<CounterUseRef />} />
          <Route path="/focusmemo" element={<FocusMemo />} />
          <Route path="/focusmemo/:id" element={<MemoDetail />} />
        </Routes>
      </BrowserRouter>
    </MemoProvider>
  )
}
