import React from 'react'
import Header from '../../components/Header/Header'
import ParticipantCourses from '../../components/ParticipantCourses/ParticipantCourses'
import './ParticipantCoursesPage.css'

function ParticipantCoursesPage() {
  return (
    <div className='container-fluid gx-0'>
        <Header/>
        <ParticipantCourses/>
    </div>
  )
}

export default ParticipantCoursesPage