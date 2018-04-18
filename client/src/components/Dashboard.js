import React from 'react';
import axios from 'axios';
import {
  Button,
  Grid,
  TextField,
  Typography,
} from 'material-ui';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';

class Dashboard extends React.Component {
  state = {
    cards: [],
    deck: [],
    results: [],
    query: '',
    toggleQuery: false,
  };

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
    this.queryCards();
    this.setState({ query: '', toggleQuery: true });
  };

  queryCards = () => {
    const { cards, query } = this.state;
    let results = [];
    cards.map((card) => {
      card.name.toLowerCase().includes(query.toLowerCase())
        ? results.push(card)
        : null;
    });
    results.sort((a, b) => {
      return a.cost - b.cost;
    });
    this.setState({ results: results });
  };

  displayNotFound = () => {
    return (
      <Grid item xs={12}>
        <Typography variant="button" align="center">
          V-07-TR-0N C0U7D N0T FIND THE CARD Y0U WERE
          700KING F0R. TRY AGAIN.
        </Typography>
      </Grid>
    );
  };

  displayResults = () => {
    const { results } = this.state;
    return (
      <Grid item xs={6} sm={3}>
        {results.length !== 0 ? (
          <Typography variant="button" align="center">
            Search Results
          </Typography>
        ) : null}
        <List>
          {results.map((result, index) => {
            return (
              <ListItem key={index + 1} dense>
                <ListItemText
                  primary={`
                    [${result.cost}] 
                    ${result.name}
                  `}
                />
                <Button
                  size="small"
                  color="primary"
                  onClick={() => this.addToDeck(result)}>
                  Add
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    );
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

  displayDecklist = () => {
    const { deck } = this.state;
    return (
      <Grid item xs={6} sm={3}>
        {deck.length !== 0 ? (
          <Typography variant="button" align="center">
            Decklist
          </Typography>
        ) : null}
        <List>
          {deck.map((card, index) => {
            return (
              <ListItem key={index + 1} dense>
                <ListItemText
                  primary={`
                    [${card.cost}] 
                    ${card.name}
                  `}
                />
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => this.removeFromDeck(card)}>
                  Remove
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    );
  };

  render() {
    const { results, toggleQuery } = this.state;
    return (
      <div style={container}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={searchBar}
            fullWidth
            autoComplete="off"
            name="query"
            placeholder="(e.g. Alexstrasza, Grim Patron, Jade Idol, and etc.)"
            label="Search through the Innkeeper's Hearthstone collection..."
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
        <Grid container spacing={24}>
          {results.length === 0 && toggleQuery === true
            ? this.displayNotFound()
            : this.displayResults()}
          {this.displayDecklist()}
        </Grid>
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

export default Dashboard;
