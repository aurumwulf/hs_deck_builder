import React from 'react';
import {
  Button,
  Grid,
  Popover,
  TextField,
  Typography,
} from 'material-ui';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';

class Card extends React.Component {
  state = {
    anchorEl: null,
    popperOpen: false,
  };

  handlePopoverOpen = (e) => {
    this.setState({ anchorEl: e.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  // addToDeck = (card) => {
  //   const { deck } = this.state;
  //   const newDeck = [...deck, card];
  //   newDeck.sort((a, b) => {
  //     return a.cost - b.cost;
  //   });
  //   this.setState({ deck: newDeck });
  // };

  render() {
    const { anchorEl, popperOpen } = this.state;
    const open = !!anchorEl;
    const { card } = this.props;
    const id = card.dbfId;

    return (
      <ListItem key={card.id} dense>
        <ListItemText
          onMouseOver={this.handlePopoverOpen}
          onMouseOut={this.handlePopoverClose}
          primary={`[${card.cost}] ${card.name}`}
        />
        <Popover
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
          onClose={this.handlePopoverClose}>
          <img
            src={`https://raw.githubusercontent.com/schmich/hearthstone-card-images/master/rel/${id}.png`}
            width="286"
            height="395"
          />
        </Popover>
        <Button size="small" color="primary">
          Add
        </Button>
      </ListItem>
    );
  }
}

const popover = {
  pointerEvents: 'none',
};

export default Card;
