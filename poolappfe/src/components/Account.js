import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';

export default function Account() {

  return (
    <Container>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Login" variant="standard" />
      <TextField id="standard-basic" label="Password" variant="standard" />
      <TextField id="standard-basic" label="E-mail" variant="standard" />
      <TextField id="standard-basic" label="Credits" variant="standard" />
      <TextField id="standard-basic" label="IsTrainer" variant="standard" />
    </Box>
    </Container>
  );
}
