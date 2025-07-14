import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Header from './components/Header'

function App() {
  return (
    <div className="relative">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
