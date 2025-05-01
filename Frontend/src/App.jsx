import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/Login.jsx'
import SignUpPage from './components/Signup.jsx'
import Preference from './pages/Preference.jsx'
import MyBlogs from './pages/MyBlogs.jsx'
import CreateBlog from './pages/CreateBlog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import ViewBlog from './pages/ViewBlog.jsx'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/preferencesection' element={<Preference/>}/>
        <Route path='/myblogs' element={<MyBlogs/>}/>
        <Route path='/createblog' element={<CreateBlog/>}/>
        <Route path='/editblog/:id' element={<EditBlog/>}/>
        <Route path='/blog/:id' element={<ViewBlog/>}/>
      </Routes>
    </Router>
  )
}

export default App