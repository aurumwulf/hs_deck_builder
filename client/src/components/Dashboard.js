import React from 'react';
import axios from 'axios';
import QueryList from './QueryList';
import DeckList from './DeckList';
import { Grid, TextField } from 'material-ui';
import Statistics from './Statistics';

class Dashboard extends React.Component {
  state = {
    collection: [],
    filter: [],
    deck: [],
    results: [],
    query: '',
    totalDust: 0,
    toggleQuery: false,
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
    if (this.checkCardsInDeck(card) === 2) {
      return alert('Cannot add more than 2.');
    } else {
      let newTotal = this.addToTotal(card);
      newDeck.sort((a, b) => {
        return a.cost - b.cost;
      });
      this.setState({ deck: newDeck, totalDust: newTotal });
    }
  };

  checkCardsInDeck = (card) => {
    let count = 0;
    const { deck } = this.state;
    deck.map((c) => {
      c.id === card.id ? (count += 1) : null;
    });
    return count;
  };

  removeFromDeck = (card) => {
    const { deck } = this.state;
    let newDeck = [...deck];
    let newTotal = this.removeFromTotal(card);
    newDeck = newDeck.filter((c) => {
      return c.name !== card.name;
    });
    this.setState({ deck: newDeck, totalDust: newTotal });
  };

  addToTotal = (card) => {
    const { totalDust } = this.state;
    let newTotal = totalDust;
    switch (card.rarity) {
      case 'COMMON':
        return (newTotal += 40);
      case 'RARE':
        return (newTotal += 100);
      case 'EPIC':
        return (newTotal += 400);
      case 'LEGENDARY':
        return (newTotal += 1600);
      default:
        return newTotal;
    }
  };

  removeFromTotal = (card) => {
    const { totalDust } = this.state;
    let newTotal = totalDust;
    switch (card.rarity) {
      case 'COMMON':
        return (newTotal -= 40);
      case 'RARE':
        return (newTotal -= 100);
      case 'EPIC':
        return (newTotal -= 400);
      case 'LEGENDARY':
        return (newTotal -= 1600);
      default:
        return newTotal;
    }
  };

  render() {
    const { deck, results, toggleQuery, totalDust } = this.state;
    return (
      <div style={container}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={searchBar}
            fullWidth
            autoComplete="off"
            name="query"
            placeholder="(e.g. Grim Patron, Jade Idol, Shudderwock, and etc.)"
            label="Search through the Innkeeper's Hearthstone collection..."
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
        <Grid container spacing={24}>
          <QueryList
            results={results}
            toggleQuery={toggleQuery}
            addToDeck={this.addToDeck}
          />
          <DeckList deck={deck} removeFromDeck={this.removeFromDeck} />
          <Grid item xs={6} sm={3} />
          <Statistics deck={deck} totalDust={totalDust} />
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
