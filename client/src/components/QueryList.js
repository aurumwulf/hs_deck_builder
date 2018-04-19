import React, { Fragment } from 'react';
import Card from './Card';
import { Grid, List, Typography } from 'material-ui';

class QueryList extends React.Component {
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

  displayQueryList = () => {
    const { results, toggleDeck } = this.props;

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
              <Card
                key={index + 1}
                card={result}
                toggleDeck={toggleDeck}
                addToDeck={this.addToDeck}
                removeFromDeck={this.removeFromDeck}
              />
            );
          })}
        </List>
      </Grid>
    );
  };

  render() {
    const { results, toggleQuery } = this.props;
    return (
      <Fragment>
        {results.length === 0 && toggleQuery === true
          ? this.displayNotFound()
          : this.displayQueryList()}
      </Fragment>
    );
  }
}

export default QueryList;
