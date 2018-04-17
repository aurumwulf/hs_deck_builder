import React from 'react';
import axios from 'axios';
import { Paper, TextField } from 'material-ui';

class Query extends React.Component {
  state = { cards: [] };

  componentDidMount() {
    axios.get('/api/query/').then((res) => {
      this.setState({ cards: res.data });
    });
  }

  render() {
    return (
      <div style={container}>
        <TextField
          style={searchBar}
          autoFocus
          fullWidth
          placeholder="(e.g. Leper Gnome, Grim Patron, Vicious Fledgling, etc.)"
          id="search"
          type="search"
          label="Search through the Innkeeper's Hearthstone collection..."
        />
      </div>
    );
  }
}

const searchBar = {
  margin: '20px 0 20px 0',
};

const container = {
  padding: '0 20px 0 20px',
};

export default Query;
