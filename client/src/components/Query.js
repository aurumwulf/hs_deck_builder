import React from 'react';
import axios from 'axios';
import { TextField, Typography } from 'material-ui';
import Card, {
  CardActions,
  CardContent,
} from 'material-ui/Card';

class Query extends React.Component {
  state = { cards: [], results: [], query: '' };

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
    this.setState({ query: '' });
  };

  queryCards = () => {
    const { cards, query } = this.state;
    let results = [];
    cards.map((card) => {
      card.name
        .toLowerCase()
        .includes(query.toLowerCase())
        ? results.push(card)
        : null;
    });
    this.setState({ results: results });
  };

  displayResults = () => {
    const { results } = this.state;
    return results.map((result, index) => {
      return (
        <Card key={index + 1}>
          {/* <CardMedia /> */}
          <CardContent>
            <Typography
              gutterBottom
              variant="headline"
              component="h2">
              {result.name}
            </Typography>
            <Typography component="p">
              {result.flavor}
            </Typography>
          </CardContent>
          <CardActions />
        </Card>
      );
    });
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
            placeholder="(e.g. Alexstrasza, Grim Patron, Kazakus, and etc.)"
            label="Search through the Innkeeper's Hearthstone collection..."
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
        {this.displayResults()}
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
