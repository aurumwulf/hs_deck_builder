import React, { Fragment } from 'react';
import Card from './Card';
import { Grid, List, Typography } from 'material-ui';

class DeckList extends React.Component {
  displayDeckList = () => {
    const { deck, toggleDeck } = this.props;
    return (
      <Fragment>
        {deck.length !== 0 ? (
          <Typography variant="button" align="center">
            Decklist
          </Typography>
        ) : null}
        <List>
          {deck.map((card, index) => {
            return (
              <Card
                key={index + 1}
                card={card}
                toggleDeck={toggleDeck}
                addToDeck={this.addToDeck}
                removeFromDeck={this.removeFromDeck}
              />
            );
          })}
        </List>
      </Fragment>
    );
  };

  render() {
    return (
      <Grid item xs={6} sm={3}>
        {this.displayDeckList()}
      </Grid>
    );
  }
}

export default DeckList;
