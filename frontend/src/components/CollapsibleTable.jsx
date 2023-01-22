import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function CollapsibleTable() {
  const [projects, setProjects] = useState([]);
  const userId = localStorage.getItem("userId");
  const memberType = localStorage.getItem("memberType");
  const navigate=useNavigate()

  useEffect(() => {
    axios
    .get(`http://localhost:5001/api/projects/${userId}`)
    .then((res) => {
      setProjects(res.data.data);
      console.log("Projects:", projects);
    })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Repository</TableCell>
            <TableCell align="right">See Bugs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell component="th" scope="row">
                {project.id}
              </TableCell>
              <TableCell align="right">{project.name}</TableCell>
              <TableCell align="right">{project.description}</TableCell>
              <TableCell align="right">{project.repository}</TableCell>
              <TableCell align="right"><Button onClick={()=>{navigate('/allBugs');localStorage.setItem("selectedBugProjId", JSON.stringify(project.id));}}>See Bugs</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CollapsibleTable
