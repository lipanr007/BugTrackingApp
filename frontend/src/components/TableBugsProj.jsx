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

export default function AllBugsProj() {
  const [data, setData] = useState([]);
  const navigate=useNavigate()
  let selectedBugProjId = localStorage.getItem("selectedBugProjId"); 

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/allBugs/${selectedBugProjId}`)
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
            <TableCell align="right">Severity</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.bugId}>
              <TableCell component="th" scope="row">
                {row.bugId}
              </TableCell>
              <TableCell align="right">{row.severity}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.link}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
