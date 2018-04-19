import React from 'react';
import axios from 'axios';
import QueryList from './QueryList';
import DeckList from './DeckList';
import { Grid, TextField } from 'material-ui';

class Dashboard extends React.Component {
  state = {
    collection: [],
    filter: [],
    deck: [],
    results: [],
    query: '',
    toggleQuery: false,
    toggleDeck: false,
  };

  componentDidMount() {
    axios.get('/api/query/').then((res) => {
      this.setState({ collection: res.data });
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.queryCollection();
    this.setState({ query: '', toggleQuery: true });
  };

  queryCollection = () => {
    const { collection, query } = this.state;
    let results = [];
    collection.map((card) => {
      card.name.toLowerCase().includes(query.toLowerCase())
        ? results.push(card)
        : null;
    });
    results.sort((a, b) => {
      return a.cost - b.cost;
    });
    this.setState({ results: results });
  };

  addToDeck = (card) => {
    const { deck } = this.state;
    const newDeck = [...deck, card];
    newDeck.sort((a, b) => {
      return a.cost - b.cost;
    });
    this.setState({ deck: newDeck });
  };

  removeFromDeck = (card) => {
    const { deck } = this.state;
    let newDeck = [...deck];
    newDeck = newDeck.filter((c) => {
      return c.name !== card.name;
    });
    this.setState({ deck: newDeck });
  };

  render() {
    const {
      deck,
      toggleDeck,
      results,
      toggleQuery,
    } = this.state;
    return (
      <div style={container}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={searchBar}
            fullWidth
            autoComplete="off"
            name="query"
            placeholder="(e.g. Ice Block, Jade Idol, Shudderwock, and etc.)"
            label="Search through the Innkeeper's Hearthstone collection..."
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
        <Grid container spacing={24}>
          <QueryList
            results={results}
            toggleQuery={toggleQuery}
            toggleDeck={toggleDeck}
          />
          <DeckList deck={deck} toggleDeck={toggleDeck} />
        </Grid>
      </div>
    );
  }
}

const container = {
  padding: '0 20px 0 20px',
};

const searchBar = {
  margin: '20px 0 20px 0',
};

export default Dashboard;
