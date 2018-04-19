import React, { Fragment } from 'react';
import Card from './Card';
import {
  Button,
  Grid,
  List,
  Typography,
} from 'material-ui';
import { ListItem } from 'material-ui/List';

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
              <ListItem key={card.id} dense>
                <Card key={index + 1} card={card} />
                <Button
                  size="small"
                  color="secondary"
                  onClick={() =>
                    this.props.removeFromDeck(card)
                  }>
                  Remove
                </Button>
              </ListItem>
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
