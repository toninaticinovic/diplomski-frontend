import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <main className="main-content">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/classification" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
