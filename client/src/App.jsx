import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/home'
import Filter from './pages/Filter/filter'
import Event from './pages/Event/event'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/filter/:category' element={<Filter/>}  />
        <Route path='/event' element={<Event/>} />
      </Routes>
    </Router>
  )
}

export default App
