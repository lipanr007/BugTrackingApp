import React, { useEffect } from 'react'
import TableYarina from '../components/DynamicTable'
import Header from '../components/Header'
import { NavLink, useLocation } from 'react-router-dom'
import Button from '@mui/joy/Button'

function AllProjectsScreen() {
  return (
    <div>
      <Header />
      <TableYarina />
      <NavLink to="/addProject">
        <Button>Create Project</Button>
      </NavLink>
    </div>
  )
}

export default AllProjectsScreen
