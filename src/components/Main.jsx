import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

function Main() {
  const [text, setText] = useState('');  //the text from the search box
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const url = 'https://jsonplaceholder.typicode.com/users';
        const response = await fetch(url);
        if (!response.ok) {   //check if the response ok
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initialize filteredUsers with all users
      } catch (error) {
        console.error('ERROR:', error); // Log error to console
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) => //filter the user according to the searchbox
      user.name.toLowerCase().includes(text.toLowerCase()) ||
      user.email.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [users, text]);

  return (
    <div className="main">
     <br/>
      <TextField id="filled-basic" label="search" variant="filled" onChange={(event) => setText(event.target.value)} />
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="heads" >
              <TableCell align="center" className="tc">name</TableCell>
              <TableCell align="center" className="TC">email@</TableCell>
              <TableCell align="center" className="TC">company-name</TableCell>
              <TableCell align="center" className="TC">posts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.company.name}</TableCell>
                <TableCell align="center"><Link to={`/${user.name}/${user.id}/Posts`}>show posts</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Main;
