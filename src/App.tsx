import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import Classification from "./pages/Classification"
import SeparableDataClassification from "./pages/SeparableDataClassification"

function App() {
  return (
    <main className="main-content">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/classification/separable"
            element={<SeparableDataClassification />}
          />
          <Route path="/classification" element={<Classification />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
