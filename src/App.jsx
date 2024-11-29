import { React, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage/Homepage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import Dashboard from './pages/Dashboard/Dashboard'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import CreateCoursePage from './pages/CreateCoursePage/CreateCoursePage'
import ShowCoursesPage from './pages/ShowCoursesPage/ShowCoursesPage'
import CourseDetailsPage from './pages/CourseDetailsPage/CourseDetailsPage'
import UpdateCoursePage from './pages/UpdateCoursePage/UpdateCoursePage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/accesso' element={<LoginPage/>}/>
          <Route path='/registrazione' element={<RegisterPage/>}/>
          <Route path='/dashboard' 
            element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>}
          />
          <Route path='/dashboard/crea-corso' 
            element={
            <PrivateRoute>
              <CreateCoursePage/>
            </PrivateRoute>}
          />
          <Route path='/dashboard/corsi' 
            element={
            <PrivateRoute>
              <ShowCoursesPage/>
            </PrivateRoute>}
          />
          <Route path='/dashboard/corsi/:id' 
            element={
            <PrivateRoute>
              <CourseDetailsPage/>
            </PrivateRoute>}
          />
          <Route path='/dashboard/corsi/:id/modifica' 
            element={
            <PrivateRoute>
              <UpdateCoursePage/>
            </PrivateRoute>}
          />
        </Routes>
      </AuthProvider>
    </Router>
    </>
  )
}

export default App
