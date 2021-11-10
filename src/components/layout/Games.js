import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Typography, Stack, Button } from '@mui/material';

const Landing = ({ isAuthenticated }) => {
  return (
    <Grid item container xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography sx={{ fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular', fontSize: '34px', fontWeight: 'bold', width: '100%', mb: 2}}>
        Games
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={15}>
        <Stack spacing={1}>
          <img src="/assets/coin-flip-white.png" alt="smart-game" style={{height: '150px', width: '80%', justifyContent:'center'}} />
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular' }}>
            Smart Coin Flip
          </Typography>
          <Button size="small" href="/flip" sx={{padding: 0, backgroundColor: '#F4ADAB', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular', fontColor: '#B52F1B'}}> Play Now </Button>
        </Stack>
        <Stack spacing={1}>
          <img src="/assets/dice.png" alt="smart-game" style={{height: '150px',}} />
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular' }}>
            Smart Dice
          </Typography>
          <Button size="small" href="/dice" sx={{padding: 0, backgroundColor: '#F4ADAB', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular', fontColor: '#B52F1B'}}> Play Now </Button>
        </Stack>
        <Stack spacing={1}>
          <img src="/assets/raffle.png" alt="smart-game" style={{height: '150px',}} />
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular' }}>
            Smart Raffle
          </Typography>
          <Button size="small" sx={{padding: 0, backgroundColor: '#F4ADAB', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular', fontColor: '#B52F1B'}}> Play Now </Button>
        </Stack>
        <Stack spacing={1}>
          <img src="/assets/two-dice.png" alt="smart-game" style={{height: '150px',}} />
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular' }}>
            Smart Two Dice
          </Typography>
          <Button size="small" sx={{padding: 0, backgroundColor: '#F4ADAB', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular', fontColor: '#B52F1B'}}> Play Now </Button>
        </Stack>
        <Stack spacing={1}>
          <img src="/assets/roll.png" alt="smart-game" style={{height: '150px',}} />
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular' }}>
            Smart Roll 
          </Typography>
          <Button size="small" sx={{padding: 0, backgroundColor: '#F4ADAB', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular', fontColor: '#B52F1B', '&hover': {backgroundColor: '#000', color: '#fff'} }}> Play Now </Button>
        </Stack>
      </Stack>
    </Grid>
  )
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
