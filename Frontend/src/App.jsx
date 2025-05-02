import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login.jsx'
import SignUpPage from './pages/Signup.jsx'
import Preference from './pages/Preference.jsx'
import MyBlogs from './pages/MyBlogs.jsx'
import CreateBlog from './pages/CreateBlog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import ViewBlog from './pages/ViewBlog.jsx'
import ProfileSettings from './pages/Profile.jsx'
import { AuthProvider } from './api/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PublicRoute from './components/PublicRoute.jsx'


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path='/signup' element={<PublicRoute><SignUpPage /></PublicRoute>} />
          <Route path='/preferencesection' element={<PrivateRoute><Preference /></PrivateRoute>} />
          <Route path='/myblogs' element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
          <Route path='/createblog' element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
          <Route path='/editblog/:id' element={<PrivateRoute><EditBlog /></PrivateRoute>} />
          <Route path='/blog/:id' element={<ViewBlog />} />
          <Route path='/profile' element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>

  )
}

export default App