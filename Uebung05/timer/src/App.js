import React from 'react';
import Timer from './Timer';
import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  return(
    <>
    <AppBar position = "sticky">
      <Toolbar>
        <Typography variant='h3'>Counter</Typography>
      </Toolbar>
    </AppBar>

    <Timer />

    </>
  )
}

export default App;

