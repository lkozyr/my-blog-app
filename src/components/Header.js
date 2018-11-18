import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './css/header.css';

import LogoImage from '../assets/img/logo.svg';
import User from './User'; 


const Header = (props) => {
    return (
        <header className="app-header">
            <div className="app-logo">
                <Link to="/" className="app-logo-link">
                    <img className="logo" src={LogoImage} alt="my-blog-app" />
                </Link>
                <Link className="app-title" to="/"><h1>my-blog-app</h1></Link>
                <div className="app-nav-links">
                    <Link to="/about"><h3>About me</h3></Link>
                    <Link to="/contact"><h3>Contact</h3></Link>
                </div>
            </div>
            <User 
                user={props.user}
                checkUserLogin={props.checkUserLogin}
                handleLoginClick={props.handleLoginClick}
                handleLogoutClick={props.handleLogoutClick}/>

        </header>
    ); 
}

Header.propTypes = {
    checkUserLogin:     PropTypes.func.isRequired,
    handleLoginClick:   PropTypes.func.isRequired,
    handleLogoutClick:  PropTypes.func.isRequired,
    user:               PropTypes.object,
}

export default Header;