import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

import LogoImage from '../assets/img/logo.svg';
import User from './User'; 


const Header = (props) => {
    return (
        <header className="app-header">
            <div className="app-logo">
                <Link to="/">
                    <img className="logo" src={LogoImage} alt="my-blog-app" />
                </Link>
                <h1>my-blog-app</h1>
            </div>
            <User 
                user={props.user}
                checkUserLogin={props.checkUserLogin}
                handleLoginClick={props.handleLoginClick}
                handleLogoutClick={props.handleLogoutClick}/>

        </header>
    ); 
}

export default Header;