import React, { Fragment } from 'react';
import dust from '../images/dust.png';
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
              {`Dust required to craft Deck: ${totalDust} `}
              <img style={image} src={dust} />
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

const image = {
  width: '4%',
  height: '4%',
  marginTop: '5px',
  marginLeft: '5px',
};

export default Statistics;
