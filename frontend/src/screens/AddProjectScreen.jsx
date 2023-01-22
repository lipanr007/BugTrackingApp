import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Button from '@mui/material/Button'
import Box from '@mui/joy/Box'
import Typography from '@mui/material/Typography'
import Input from '@mui/joy/Input'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import ToggleButton from '@mui/material/ToggleButton'
import CheckIcon from '@mui/icons-material/Check'
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
//let usrId = localStorage.getItem('userId')

function AddProjectsScreen() {
  const navigate = useNavigate()
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectRepository, setProjectRepository] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    axios.post('http://localhost:5001/api/newProject', {
    name: projectName,
    description: projectDescription,
    repository: projectRepository
}).then((response) => {
  if (response.status === 200 || response.status === 201) {
     navigate('/addMembers')
     localStorage.setItem('projectId', response.data.id)
  } else {
     console.log("error creating project")
  }
}).catch((error) => {
   console.log(error)
});
  }
  return (
    <div>
      <Header />
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a Project
        </Typography>
        <form
          id="modal-modal-description"
          sx={{ mt: 2 }}
          onSubmit={handleSubmit}
        >
          <Typography sx={{ mt: 2 }}>Name of the project:</Typography>
          <Input
            placeholder="name"
            required
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Typography sx={{ mt: 2 }}>Description:</Typography>
          <Input
            placeholder="project description"
            required
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <Typography sx={{ mt: 2 }}>Repository:</Typography>
          <Input
            placeholder="repo link"
            required
            sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
            value={projectRepository}
            onChange={(e) => setProjectRepository(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Create Project
          </Button>
        </form>
      </Box>
    </div>
  )
}
export default AddProjectsScreen
