import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Grid, Stack, Typography, Button, TextField } from '@mui/material';
import { withStyles } from '@material-ui/styles';

import Settings from './Settings'
import { makeStyles } from '@material-ui/core';

const Flip = ({ isAuthenticated }) => {
	console.log("isAuthenticated:", isAuthenticated)
	const [bet, setBet] = useState(0.05)
	const handleChange = (event) => {
		setBet(event.target.value)
	}

	const setMinValue = () => {
		setBet(0.05)
	}

	const MinButton = () => (
		<Button
			onClick={setMinValue}
			sx={{
				backgroundColor: 'rgba(255, 255, 255, 0.3)',
				ml: 3
			}}
		>
			Min
		</Button>
	);

	const HeadColor = withStyles({
		root: {
			fontSize: '20px !important',
			textAlign: 'center',
			background:
				"-webkit-linear-gradient(#ffda6f 15%, #e2a139 60%, #a44e01 80%)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent"
		}
	})(Typography);

	const TailColor = withStyles({
		root: {
			fontSize: '20px !important',
			textAlign: 'center',
			background:
				"-webkit-linear-gradient(#a44e01 15%, #e2a139 60%, #ffda6f 80%)",
			WebkitBackgroundClip: "text",
			WebkitTextFillColor: "transparent"
		}
	})(Typography);

	const useStyles = makeStyles({
		root: {
			"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
				borderColor: "white"
			},
			"& .MuiOutlinedInput-input": {
				color: "white"
			},
			width: '400px'
		}
	})

	const classes = useStyles()


	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='container'>
					<Box sx={{
						background: 'rgba(255, 255, 255, 0.2)',
						borderRadius: '10px',
						height: '600px',
						width: '100%'
					}}
					>
						{/* Rules and Audio settings */}
						<Settings />

						{/* Game Logic */}
						<Grid container spacing={2}>
							{/* Set Coin Head or Tail */}
							<Grid item container sx={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
								<Stack spacing={10} direction="row" mt={10}>
									<Stack>
										<Button sx={{
											borderRadius: '12px',
											background: 'linear-gradient(rgb(255, 230, 105) 15%, rgb(255, 140, 100) 46%, rgb(255, 100, 100) 67%)'
										}}>
											<Stack sx={{
												borderRadius: '10px',
												background: 'rgba(255, 255, 255, 0.2)',
												padding: '20px 25px',
											}}>
												<img src="/assets/coin_head.png" alt=".." style={{ height: '65px' }} />
												<HeadColor> HEADs </HeadColor>
												<HeadColor> 1.8x </HeadColor>
											</Stack>
										</Button>
									</Stack>
									<Stack>
										<img src="/assets/coin_head.png" alt=".." style={{ height: '190px' }} />
									</Stack>
									<Stack>
										<Button sx={{
											borderRadius: '12px',
											background: 'linear-gradient(rgb(21, 241, 178) 15%, rgb(32, 226, 184) 46%, rgb(62, 186, 199) 60%, rgb(110, 123, 223) 100%, rgb(149, 71, 243) 100%)'
										}}>
											<Stack sx={{
												borderRadius: '10px',
												background: 'rgba(255, 255, 255, 0.2)',
												padding: '20px 25px',
											}}>
												<img src="/assets/coin_tail.png" alt=".." style={{ height: '65px' }} />
												<TailColor> TAILS </TailColor>
												<TailColor> 1.8x </TailColor>
											</Stack>
										</Button>
									</Stack>
								</Stack>
							</Grid>

							{/* Set Bet Amount */}
							<Grid item container sx={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
								<Stack>
									<Typography sx={{ color: '#fff', mb: 2 }}>Bet Amount</Typography>
									<TextField
										id="bet-amount"
										type="number"
										value={bet}
										className={classes.root}
										onChange={handleChange}
										InputProps={{ endAdornment: <MinButton /> }}
									/>
								</Stack>
							</Grid>

							{/* Connect Wallet and Start Betting */}
							<Grid item container sx={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
								<Button variant="contained" size="large" sx={{
									width: '300px',
									height: 54,
									mt: 3,
									borderRadius: '10px',
									fontWight: 'bold',
									background: 'linear-gradient(90deg , #dc2424 15%, #4a569d 80%)'
								}}> CONNECT </Button>
							</Grid>
						</Grid>
					</Box>
				</div>
			</div>
		</section>
	);
};

Flip.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Flip);
