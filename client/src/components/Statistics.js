import React, { Fragment } from 'react';
import { Grid, Typography } from 'material-ui';

class Statistics extends React.Component {
  displayStatistics = () => {
    const { deck } = this.props;

    return (
      <Grid item xs={12} sm={6}>
        {deck.length !== 0 ? (
          <Fragment>
            <Typography variant="button" align="center">
              Statistics
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
