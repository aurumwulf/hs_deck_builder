import React, { Fragment } from 'react';
import { Grid, Typography } from 'material-ui';

class Statistics extends React.Component {
  state = { totalDust: 0 };

  calculateTotalDust = () => {
    const { deck } = this.props;
    let totalDust = 0;

    deck.map((card) => {
      switch (card.rarity) {
        case 'COMMON':
          totalDust += 40;
          break;
        case 'RARE':
          totalDust += 100;
          break;
        case 'EPIC':
          totalDust += 400;
          break;
        case 'LEGENDARY':
          totalDust += 1600;
          break;
        default:
          null;
      }
    });

    this.setState({ totalDust: totalDust });
  };

  displayStatistics = () => {
    const { deck } = this.props;
    const { totalDust } = this.state;

    return (
      <Grid item xs={6} sm={3}>
        {deck.length !== 0 ? (
          <Fragment>
            <Typography variant="button" align="center">
              Statistics
            </Typography>
            <hr />
            <Typography variant="button" align="left">
              {`Total Dust required to craft Deck: ${totalDust}`}
            </Typography>
          </Fragment>
        ) : null}
      </Grid>
    );
  };

  render() {
    return <Fragment>{this.displayStatistics()}</Fragment>;
  }
}

export default Statistics;
