import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, logout } from '../../actions/auth';

import { Box, Button, Typography } from '@material-ui/core';
import {
  connectWallet,
  getCurrentWalletConnected
} from "../../utils/interact.js";
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';


const Navbar = ({ auth: { isAuthenticated }, login, logout }) => {
  console.log(isAuthenticated)
  //State variables
  const [walletAddress, setWallet] = useState("");

  useEffect(async () => { //TODO: implement
    const { address } = await getCurrentWalletConnected();
    setWallet(address);
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setWallet(walletResponse.address);

    addWalletListener();

    // if (walletResponse.success) {
    //   login(walletResponse.address);
    // }
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

  const authLinks = (
    <ul>
      <Button variant="text" style={{
        color: 'white',
        marginRight: '3px',
        fontSize: '86',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255, 255, 255, 0.15)'
      }}>
        Games
      </Button>
      <Button onClick={connectWalletPressed} variant="text" style={{
        color: 'white',
        marginRight: '3px',
        fontSize: '86',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255, 255, 255, 0.15)'
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
    </ul>
  );

  const guestLinks = (
    <ul>
      {walletAddress.length > 0 ?
        <Button variant="text" style={{
          color: 'white',
          marginRight: '3px',
          fontSize: '86',
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular'
        }}>
          Games
        </Button> :
        <Button variant="text" style={{
          color: 'white',
          marginRight: '3px',
          fontSize: '86',
          fontWeight: 'bold',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular',
          width: '152.6px'
        }}>
          Games
        </Button>
      }
      <Button onClick={connectWalletPressed} variant="text" style={{
        color: 'white',
        marginRight: '3px',
        fontSize: '86',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular',
        width: {}
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
    </ul>
  );

  return (
    <nav className="navbar">
      <Link to='/'>
        <img src="/assets/logo.png" alt="logo" style={{ width: '40px', height: '20px' }} />
      </Link>
      <Typography style={{ color: '#ffffff', fontSize: '34px', fontWeight: 'bold', fontFamily: 'Helvetica-Bold,AdobeInvisFont,MyriadPro-Regular' }}>
        Smart Games
      </Typography>
      <Typography style={{ color: '#ffffff', fontSize: '16px', marginTop: '10px', fontFamily: 'ErasITC-Light,AdobeInvisFont,MyriadPro-Regular' }}>
        Provable fair games that is entirely based on smart contract with low 1% transaction fees, no sign ups & deposits.
      </Typography>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, logout })(Navbar);
