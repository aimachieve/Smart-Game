import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';

import { Box, Grid, Stack, Typography, Button, TextField, Slider } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Settings from './Settings'
import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import {
	connectWallet,
	getCurrentWalletConnected
} from "../../../utils/interact.js";


const Flip = ({ isAuthenticated, login }) => {
	console.log("isAuthenticated:", isAuthenticated)

	//State variables
	const [walletAddress, setWallet] = useState("");
	const [betAmount, setBetAmount] = useState(0.05)
	const [isWin, setIsWin] = useState("")

	useEffect(() => {
		async function fetchData() {
			// You can await here
			const { address } = await getCurrentWalletConnected();
			setWallet(address);
			// ...
		}
		fetchData();
	}, []);

	// Connect Wallet
	const connectWalletPressed = async () => { //TODO: implement
		const walletResponse = await connectWallet();
		setWallet(walletResponse.address);

		addWalletListener();

		if (walletResponse.success) {
			login(walletResponse.address);
		}
	};
	function addWalletListener() {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", (accounts) => {
				if (accounts.length > 0) {
					setWallet(accounts[0]);
				} else {
					setWallet("");
				}
			});
		} else {
			// setStatus(
			//   <p>
			//     {" "}
			//     🦊{" "}
			//     <a href={`https://metamask.io/download.html`}>
			//       You must install Metamask, a virtual Ethereum wallet, in your
			//       browser.
			//     </a>
			//   </p>
			// );
		}
	}

	// Set Bet Amount
	const handleChange = (event) => {
		setBetAmount(event.target.value)
	}

	// Set Bet Min Value
	const setMinValue = () => {
		setBetAmount(0.05)
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

	// Set TextField's Color
	const useStyles = makeStyles({
		root: {
			"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
				// border: 'solid 2px white'
				borderRadius: '10px',
			},
			"& .MuiOutlinedInput-input": {
				color: "white",
				fontWight: "bold",
				borderRadius: '10px',
				background: 'linear-gradient(90deg, rgb(29, 39, 50), rgb(29, 39, 50))',
				opacity: 0.9
			},
		},
		slider: {
			"& .MuiSlider-root": {
				color: 'rgb(129, 71, 218)',
				height: '12px'
			},
			"& .MuiSlider-thumb": {
				width: '30px',
				height: '30px'
			}
		}
	})
	const classes = useStyles()

	const CustomizedSlider = styled(Slider)`
		color: rgb(129, 71, 218);
		height: 12px;
		:hover {
			color: rgb(86, 71, 218);
		}
	`;

	// onClick Bet Button
	const startBet = () => {
		alert('started bet')
	}

	//Start Rendering 
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
							{/* Showing Win & Multiplier & Win Chance */}
							<Grid item container xs={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
								<Stack spacing={2} direction="row" justifyContent="space-around" alignItems="center">
									<Stack>
										<Typography sx={{ color: '#fff', mb: 2, }}>Roll Over to Win</Typography>
										<TextField
											id="bet-amount"
											value={betAmount}
											className={classes.root}
											onChange={handleChange}
											InputProps={{ readOnly: true, endAdornment: <SyncAltIcon /> }}
										/>
									</Stack>
									<Stack>
										<Typography sx={{ color: '#fff', mb: 2, }}>Multiplier</Typography>
										<TextField
											id="bet-amount"
											value={betAmount}
											className={classes.root}
											onChange={handleChange}
											InputProps={{ readOnly: true, endAdornment: <UnfoldMoreIcon /> }}
										/>
									</Stack>
									<Stack>
										<Typography sx={{ color: '#fff', mb: 2, }}>Win Chance</Typography>
										<TextField
											id="bet-amount"
											value={betAmount}
											className={classes.root}
											onChange={handleChange}
											InputProps={{ readOnly: true, endAdornment: <UnfoldMoreIcon /> }}
										/>
									</Stack>
								</Stack>
							</Grid>

							{/* Roll Setting Slider */}

							<Grid item container xs={12} md={12} justifyContent="center">
								<Box sx={{ width: '74.5%', background: 'rgb(34, 41, 52)', borderRadius: '12px' }}>
									<Grid item xs={12} md={12} mt={3} style={{ display: 'flex', justifyContent: 'center' }}>
										<Stack direction="row" spacing={15} justifyContent="space-between" alignItems="center">
											{/* Button Roll Under */}
											<Button 
												variant="outlined"
												startIcon={<SwapVertIcon />}
												sx={{
													height: '40px',
													color: 'rgb(104, 213, 215)',
													border: '1px solid rgb(104, 213, 215)'
												}}
											>
												Roll under
											</Button>

											{/* Showing Selected Value */}
											<Button size="large" variant="contained" sx={{
												mt: 2,
												background: 'linear-gradient(153.84deg, rgba(21, 241, 178, 0.3) 8.53%, rgba(32, 226, 184, 0.3) 19.97%, rgba(62, 186, 199, 0.3) 42.01%, rgba(110, 123, 223, 0.3) 72.14%, rgba(149, 71, 243, 0.3) 94.85%)',
												borderRadius: '40px',
												width: '150px',
												padding: '10px'
											}}>
												<Box sx={{
													background: 'linear-gradient(153.84deg, rgb(21, 241, 178) 8.53%, rgb(32, 226, 184) 19.97%, rgb(62, 186, 199) 42.01%, rgb(110, 123, 223) 72.14%, rgb(149, 71, 243) 94.85%)',
													padding: '8px',
													width: '150px',
													borderRadius: '40px'
												}}>
													1234
												</Box>
											</Button>

											{/* Button Roll Upper */}
											<Button 
												variant="outlined"
												startIcon={<SwapVertIcon />}
												sx={{
													height: '40px',
													color: 'rgb(104, 213, 215)',
													border: '1px solid rgb(104, 213, 215)'
												}}
											>
												Roll Upper
											</Button>
										</Stack>
									</Grid>
									<Grid item xs={12} md={12} style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
										<CustomizedSlider
											className={classes.slider}
											size="large"
											defaultValue={5}
											aria-label="Small"
											valueLabelDisplay="auto" />
									</Grid>
								</Box>
							</Grid>

							{/* Set Bet Amount & Payout */}
							<Grid item container xs={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
								<Stack spacing={2} direction="row" justifyContent="space-evenly" alignItems="center">
									<Stack>
										<Typography sx={{ color: '#fff', width: '379px', mb: 2, }}>
											Bet Amount
										</Typography>
										<TextField
											id="bet-amount"
											type="number"
											value={betAmount}
											className={classes.root}
											onChange={handleChange}
											InputProps={{ endAdornment: <MinButton /> }}
										/>
									</Stack>
									<Stack>
										<Typography sx={{ color: '#fff', width: '379px', mb: 2 }}>
											Payout
										</Typography>
										<TextField
											id="bet-amount"
											type="number"
											value={betAmount}
											readonly
											InputProps={{ readOnly: true, endAdornment: "BNB" }}
											sx={{ border: 'solid 3px', borderRadius: '10px', fontColor: '#fff' }}
										/>
									</Stack>
								</Stack>
							</Grid>

							{/* Connect Wallet and Start Betting */}
							<Grid item container xs={12} md={12} style={{ display: 'flex', justifyContent: 'center' }}>
								{walletAddress.length > 0 || isAuthenticated ?
									<Button onClick={startBet} variant="contained" size="large" startIcon={<CasinoIcon />} sx={{
										width: '300px',
										height: 54,
										mt: 3,
										borderRadius: '10px',
										fontWight: 'bold',
										background: 'linear-gradient(95.32deg, rgb(129, 86, 218) 2.68%, rgb(89, 41, 137) 84.52%)',
										'&:hover': { background: 'linear-gradient(95.32deg,rgb(89, 41, 137)  2.68%, rgb(129, 86, 218) 84.52%)' },
									}}> ROLL DICE  </Button> :
									<Button variant="contained" size="large" onClick={connectWalletPressed} sx={{
										width: '300px',
										height: 54,
										mt: 3,
										borderRadius: '10px',
										fontWight: 'bold',
										// linear-gradient(90deg , #dc2424 15%, #4a569d 80%)
										background: 'linear-gradient(95.32deg, rgb(129, 86, 218) 2.68%, rgb(89, 41, 137) 84.52%)'
									}}> CONNECT </Button>
								}
							</Grid>
						</Grid>
					</Box>
				</div>
			</div>
		</section >
	);
};

Flip.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth
});

export default connect(mapStateToProps, { login })(Flip);
