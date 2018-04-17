import React from 'react';
import axios from 'axios';
import { TextField } from 'material-ui';

class Query extends React.Component {
  state = { cards: [], query: '' };

  componentDidMount() {
    axios.get('/api/query/').then((res) => {
      this.setState({ cards: res.data });
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ query: '' });
  };

  render() {
    return (
      <div style={container}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={searchBar}
            autoFocus
            fullWidth
            name="query"
            placeholder="(e.g. Grim Patron, Ultimate Infestation, Shudderwock and etc.)"
            label="Search through the Innkeeper's Hearthstone collection..."
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
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
