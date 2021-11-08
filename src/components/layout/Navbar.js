import React, { Fragment, useState, useEffect  } from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, logout } from '../../actions/auth';

import Button from '@material-ui/core/Button';
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
    const {address} = await getCurrentWalletConnected();
    setWallet(address);
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
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

  if (isAuthenticated) {
    return <Redirect to="/play" />;
  }

  const authLinks = (
    <ul>
      <li>
        <Link to="/play">Play</Link>
      </li>
      <li>
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
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
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
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
        <Link to='/'>
          <img src="/logo.png" alt="logo" style={{width: '50px', height: '50px'}} />
        </Link>
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
