import React from 'react'
import CourseDetails from '../../components/CourseDetails/CourseDetails'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'

function CourseDetailsPage() {
    const id = useParams()
  return (
    <div className='container-fluid gx-0'>
      <Header/>
      <CourseDetails courseId={id}/>
    </div>
  )
}

export default CourseDetailsPage