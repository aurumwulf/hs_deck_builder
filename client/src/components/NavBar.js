import React from 'react';
import { AppBar, Toolbar, Typography } from 'material-ui';

const Navbar = () => {
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

export default Navbar;
