import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Box } from '@mui/material';

const Dice = ({ isAuthenticated }) => {
	console.log("isAuthenticated:", isAuthenticated)

	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='container'>
					{/* <Grid container spacing={2}>
          </Grid> */}
					<Box sx={{
							background: 'rgba(255, 255, 255, 0.1)',
							borderRadius: '10px',
							height: '600px',
							width: '100%'
						}}
					>
					</Box>
				</div>
			</div>
		</section>
	);
};

Dice.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Dice);
