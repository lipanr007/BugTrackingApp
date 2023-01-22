import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Button from '@mui/material/Button'
import Box from '@mui/joy/Box'
import Typography from '@mui/material/Typography'
import Input from '@mui/joy/Input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
let currentProjectId = JSON.parse(localStorage.getItem('selectedProjectId'));


function AddBugScreen() {
  const navigate = useNavigate()
  const [bugSeverity, setBugSeverity] = useState('')
  const [bugDescription, setBugDescription] = useState('')
  const [bugLink, setBugLink] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
        let currentProjectId = JSON.parse(localStorage.getItem('selectedProjectId'));
        console.log(currentProjectId);
        console.log(typeof(currentProjectId));
        axios
            .post('http://localhost:5001/api/newBug', {
                severity: bugSeverity,
                description: bugDescription,
                link: bugLink,
                status: "UNRESOLVED",
                projectId: currentProjectId
            })
            .then(() => {
                navigate("/Testing_Projects")
            })
            .catch((error) => {
                console.log(error)
            })
    } catch (error) {
        console.error('Error while retrieving selectedProjectId from localStorage:', error)
    }
}

  return (
    <div>
      <Header />
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a Bug
        </Typography>
        <form
          id="modal-modal-description"
          sx={{ mt: 2 }}
          onSubmit={handleSubmit}
        >
          <Typography sx={{ mt: 2 }}>Bug Severity:</Typography>
          <Input
            placeholder="severity of the bug"
            required
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
            value={bugSeverity}
            onChange={(e) => setBugSeverity(e.target.value)}
          />
          <Typography sx={{ mt: 2 }}>Bug Description:</Typography>
          <Input
            placeholder="description"
            required
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
          />
          <Typography sx={{ mt: 2 }}>Link to issue:</Typography>
          <Input
            placeholder="Please provide a link to the issue!"
            required
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
            value={bugLink}
            onChange={(e) => setBugLink(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </div>
  )
}
export default AddBugScreen
