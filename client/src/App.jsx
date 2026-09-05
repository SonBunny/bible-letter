import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import CreateLetter from "./pages/CreateLetter"
import ViewLetter from "./pages/ViewLetter"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/create" element={<CreateLetter />} />
      <Route path="/letter/:id" element={<ViewLetter />} />
    </Routes>
  )
}

export default App