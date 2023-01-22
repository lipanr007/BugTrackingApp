import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DynamicTableBugs() {
  const [data, setData] = useState([]);
  const navigate=useNavigate()
  let userId=localStorage.getItem("userId");
  const handleClick = (id) => {
    localStorage.setItem("selectedProjectId", JSON.stringify(id));
    navigate('/addBug');
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/projects/${userId}/tst`)
      .then((res) => {
        setData(res.data.data);
        console.log("Result:", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Repository</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right"><Button onClick={() => handleClick(row.id)}>Add a Bug</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
