import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/Login.jsx'
import SignUpPage from './components/Signup.jsx'
import Preference from './pages/Preference.jsx'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/preferencesection' element={<Preference/>}/>
      </Routes>
    </Router>
  )
}

export default App