import React from 'react'
import ShowCourses from '../../components/ShowCourses/ShowCourses'
import Header from '../../components/Header/Header'
import './ShowCoursesPage.css'

function ShowCoursesPage() {
  return (
    <div className='container-fluid gx-0'>
      <Header/>
      <ShowCourses/>
    </div>
  )
}

export default ShowCoursesPage