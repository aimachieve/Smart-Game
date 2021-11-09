import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';
import WinnersAndPayout from './WinnersAndPayout.js';
import Games from './Games.js';
import Description from './Description.js'

const Landing = ({ isAuthenticated }) => {
  console.log("isAuthenticated:", isAuthenticated)

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <Grid container spacing={2}>
            <Grid item container xs={12} md={12} mt={10}>
              {/* Winners and Total Payout */}
              <WinnersAndPayout />

              {/* Description */}
              <Description />
            </Grid>

            {/* Games */}
            <Games />
          </Grid>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
