import React from 'react'
import CourseDetails from '../../components/CourseDetails/CourseDetails'
import { useParams } from 'react-router-dom'

function CourseDetailsPage() {
    const id = useParams()
  return (
    <div>
        <CourseDetails courseId={id}/>
    </div>
  )
}

export default CourseDetailsPage