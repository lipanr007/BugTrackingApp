import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Button from '@mui/material/Button'
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



function AddMembersToProject() {

  const navigate = useNavigate()
const [data, setData] = useState([])
const [selectedIndexes, setSelectedIndexes] = useState([])

useEffect(() => {
  axios
    .get('http://localhost:5001/api/users')
    .then((res) => {
      if (res.status === 200 && res.data) {
        if (Array.isArray(res.data)) {
          setData(res.data)
        } else {
          console.log('API did not return an array')
        }
      } else {
        console.log('Could not retrieve data from the API')
      }
    })
    .catch((error) => {
      console.log(error)
    })
}, [])

const handleSubmit = async (e) => {
  e.preventDefault()
  const projectId = localStorage.getItem('projectId')
  const selectedUsers = data.filter((user, index) => selectedIndexes.includes(index))
  if (selectedUsers.length > 0) {
      axios.post('http://localhost:5001/api/newPMs', {
          projectId: projectId,
          members: selectedUsers
      }).then((response) => {
          if (response.status === 200 || response.status === 201) {
              navigate('/home')
          } else {
              console.log("error adding members to project")
          }
      }).catch((error) => {
          console.log(error)
      });
  } else {
      console.log("please select at least one user to add to the project")
  }
}

  return (<div>
    <Header />
    <form onSubmit={handleSubmit}>
    <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <ToggleButton
                        value={index}
                        selected={selectedIndexes.includes(index)}
                        onChange={() => {
                          if (selectedIndexes.includes(index)) {
                            setSelectedIndexes(
                              selectedIndexes.filter((i) => i !== index)
                            )
                          } else {
                            setSelectedIndexes([...selectedIndexes, index])
                          }
                        }}
                      >
                        <CheckIcon />
                      </ToggleButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button type="submit" variant="contained" color="primary">
            Add Members
          </Button>
        </form>
  </div>)
  
}

export default AddMembersToProject
