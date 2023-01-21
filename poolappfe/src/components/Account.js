import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container} from '@mui/system';

export default function Account() {
  
  const[login, setLogin]=useState("")
  const[password, setPassword]=useState("")
  const[email, setEmail]=useState("")
  const[accounts, setAccounts]=useState([])
  
  const handleClick=(e)=>{
    e.preventDefault()
    const account={login, password, email}
    console.log(account)
    fetch("http://localhost:8080/account/add",{mode: 'no-cors', method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(account)}).then(()=>{console.log("new Account has been added")})
  }

  useEffect(()=>{
    fetch("http://localhost:8080/account/getAll", {mode: 'no-cors'}).then(res=>res.json()).then((result)=>{setAccounts(result);
})},[])

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
    <button variant="outlined" onClick={handleClick}>Register</button>
    <h1>Accounts</h1>
    {accounts.map(account=>(<p key={account.id}>Id:{account.id}Login:{account.login}Email:{account.email}</p>))}
    </Container>

    
  );
}
