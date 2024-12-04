import React from 'react'
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
import AllParticipantsPage from './pages/AllParticipantsPage/AllParticipantsPage'
import DetailsParticipantsPage from './pages/DetailsParticipantsPage/DetailsParticipantsPage'
import UpdateParticipantsPage from './pages/UpdateParticipantsPage/UpdateParticipantsPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

function App() {
  return (
    <>
    <AuthProvider>
      <Router>
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
            <Route path='/dashboard/partecipanti' 
              element={
              <PrivateRoute>
                <AllParticipantsPage/>
              </PrivateRoute>}
            />
            <Route path='/dashboard/partecipanti/:id' 
              element={
              <PrivateRoute>
                <DetailsParticipantsPage/>
              </PrivateRoute>}
            />
            <Route path='/dashboard/partecipanti/:id/modifica' 
              element={
              <PrivateRoute>
                <UpdateParticipantsPage/>
              </PrivateRoute>}
            />
          </Routes>
      </Router>
    </AuthProvider>
    </>
  )
}

export default App
