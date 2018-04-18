import React from 'react';
import axios from 'axios';
import {
  Button,
  Grid,
  Paper,
  Popover,
  TextField,
  Typography,
} from 'material-ui';
import Card, { CardMedia } from 'material-ui/Card';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';

class Dashboard extends React.Component {
  state = {
    collection: [],
    filter: [],
    deck: [],
    results: [],
    query: '',
    toggleQuery: false,
    anchorEl: null,
    popperOpen: false,
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
    this.queryCards();
    this.setState({ query: '', toggleQuery: true });
  };

  handlePopoverOpen = (e) => {
    this.setState({ anchorEl: e.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  handlePopperOpen = () => {
    this.setState({ popperOpen: true });
  };

  handlePopperClose = () => {
    this.setState({ popperOpen: false });
  };

  queryCards = () => {
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
    const { results, anchorEl, popperOpen } = this.state;
    const open = !!anchorEl;

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
                  onMouseOver={this.handlePopoverOpen}
                  onMouseOut={this.handlePopoverClose}
                  primary={`
                  [${result.cost}] 
                  ${result.name}
                  `}
                />
                {/* <Popover
                  style={popover}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={this.handlePopoverClose}> */}
                <img
                  src={`https://raw.githubusercontent.com/schmich/hearthstone-card-images/master/rel/${
                    result.dbfId
                  }.png`}
                  width="286"
                  height="395"
                />
                {/* </Popover> */}
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

  removeFromDeck = (card) => {
    const { deck } = this.state;
    let newDeck = [...deck];
    newDeck = newDeck.filter((c) => {
      return c.name !== card.name;
    });
    this.setState({ deck: newDeck });
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

const popover = {
  pointerEvents: 'none',
};

export default Dashboard;
