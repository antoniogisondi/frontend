import React from 'react'
import Header from '../../components/Header/Header'
import GetAllParticipants from '../../components/GetAllParticipants/GetAllParticipants'
import './AllParticipantsPage.css'

function AllParticipantsPage() {
  return (
    <div className='container-fluid gx-0'>
      <Header/>
      <GetAllParticipants/>
    </div>
  )
}

export default AllParticipantsPage