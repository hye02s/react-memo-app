import { useState } from "react"
import Counter from "./Counter"
import Timer from "./Timer"
import UserList from "./UserList"
import InputFocus from "./InputFocus"
import CounterUseRef from "./Counter-useRef"
import FocusMemo from "./FocusMemo"

function App() {
  const [showTimer, setShowTimer] = useState(false)

  return (
    <div>
      <h1>Hello World!</h1>
      <hr />
      <Counter />
      {showTimer && <Timer />}
      <button onClick={() => setShowTimer(!showTimer)}>Toggle Timer</button>
      <hr />
      <UserList />
      <InputFocus />
      <CounterUseRef />
      <FocusMemo />
    </div>
  )
}

export default App
