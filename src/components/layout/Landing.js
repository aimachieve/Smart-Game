import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { 
  connectWallet,
  getCurrentWalletConnected 
} from "../../utils/interact.js";
import { login } from '../../actions/auth';

const Landing = ({ isAuthenticated }) => {
	console.log("isAuthenticated:", isAuthenticated)
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(async () => { //TODO: implement
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);

    addWalletListener();

    if(walletResponse.success){
      login(walletResponse.address);
    }
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Click above button to play the game!");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the above button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }


  if (isAuthenticated) {
    return <Redirect to='/play' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Sword of Boojabaunga</h1>
          <p className='lead'>
            Welcome! To play the game, you shoul connect your wallet to this site.
          </p>
	      <Button variant="outlined" component="span"  onClick={connectWalletPressed} style={{
	        borderColor: 'white',
	        color: 'white'
	      }}>
	        {walletAddress.length > 0 ? (
	          "Connected: " +
	          String(walletAddress).substring(0, 6) +
	          "..." +
	          String(walletAddress).substring(38)
	        ) : (
	          <span>Connect Wallet</span>
	        )}
	      </Button>
	      <p id="status">
	      	{status}
	      </p>
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
