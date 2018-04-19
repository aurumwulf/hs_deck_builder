import React, { Fragment } from 'react';
import { Button, Popover } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';

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

  render() {
    const { anchorEl } = this.state;
    const open = !!anchorEl;
    const { card } = this.props;
    const id = card.dbfId;

    return (
      <Fragment>
        <ListItemText
          onMouseOver={this.handlePopoverOpen}
          onMouseOut={this.handlePopoverClose}
          primary={`[${card.cost}] ${card.name}`}
        />
        <Popover
          style={popover}
          open={open}
          anchorEl={anchorEl}
          onClose={this.handlePopoverClose}
          elevation={0}>
          <img
            style={image}
            src={`https://raw.githubusercontent.com/schmich/hearthstone-card-images/master/rel/${id}.png`}
            alt={card.flavor}
            width="286"
            height="395"
          />
        </Popover>
      </Fragment>
    );
  }
}

const popover = {
  pointerEvents: 'none',
  left: '340px',
};

const image = {
  background: 'rgba(0,0,0,0)',
  marginTop: '20px',
  marginBottom: '120px',
};

export default Card;
