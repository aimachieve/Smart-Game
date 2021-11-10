import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import StorageIcon from '@mui/icons-material/Storage';

const Setting = ({ isAuthenticated }) => {
  console.log("isAuthenticated:", isAuthenticated)
  const [mute, setMute] = useState(true)

  const setAudio = () => {
    console.log(mute)
    setMute(!mute)
    console.log(mute)
  }

  return (
    <Grid container spacing={2}>
      <Grid container xs={12} md={12} mt={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={setAudio} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', mr: 3 }}>
          <StorageIcon />
        </IconButton>
        <IconButton onClick={setAudio} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', mr: 3 }}>
          {mute ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
};

Setting.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Setting);
