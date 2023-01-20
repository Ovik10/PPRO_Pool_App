import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container} from '@mui/system';
import Button from '@mui/material-next/Button';

export default function Account() {
  const[login, setLogin]=useState("")
  const[password, setPassword]=useState("")
  const[email, setEmail]=useState("")

  return (
    <Container>
      <h1>Register</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Login" variant="standard"  fullWidth value={login} onChange={(e)=>setLogin(e.target.value)}/>
      <TextField id="standard-basic" label="Password" variant="standard" fullWidth value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <TextField id="standard-basic" label="E-mail" variant="standard" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </Box>
    <Button variant="contained">Contained</Button>
    </Container>
  );
}
