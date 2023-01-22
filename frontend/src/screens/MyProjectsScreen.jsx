//TODO: ProjectSpecsPage
import React, { useEffect,useState } from 'react'
import Header from '../components/Header'
import { Typography } from '@mui/material'
import CollapsibleTable from '../components/CollapsibleTable'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function MyProjectsScreen() {
  return (
    <div>
      <Header />
      <CollapsibleTable />
    </div>
  )
}

export default MyProjectsScreen
