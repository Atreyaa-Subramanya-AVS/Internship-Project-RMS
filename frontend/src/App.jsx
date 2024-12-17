import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Nav from './Components/Nav/Nav'
import Footer from './Components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/nav' element={<Nav />} />
        <Route path='/nav' element={<Footer />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
