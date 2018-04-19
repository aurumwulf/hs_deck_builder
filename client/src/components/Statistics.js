import React, { Fragment } from 'react';
import { Grid, Typography } from 'material-ui';

class Statistics extends React.Component {
  displayStatistics = () => {
    const { deck, totalDust } = this.props;

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
