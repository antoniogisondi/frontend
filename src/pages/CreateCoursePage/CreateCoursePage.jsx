import React from 'react'
import CreateCourse from '../../components/CreateCourse/CreateCourse'
import Header from '../../components/Header/Header'
import './CreateCoursePage.css'

function CreateCoursePage() {
    return (
        <div className='container-fluid gx-0'>
            <Header/>
            <CreateCourse/>
        </div>
    )
}

export default CreateCoursePage