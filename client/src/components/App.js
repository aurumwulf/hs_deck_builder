import React from 'react';
import { indigo } from 'material-ui/colors';
import { AppBar, Toolbar, Typography } from 'material-ui';

const primary = indigo[500];

const App = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Hearthstone Deck Builder
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default App;
