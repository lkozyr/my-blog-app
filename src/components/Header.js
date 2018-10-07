import React from 'react';
import './header.css';

import LogoImage from '../assets/img/logo.svg';
import User from './User'; 


const Header = (props) => {
    return (
        <header className="app-header">
            <div className="app-logo">
                <img className="logo" src={LogoImage} alt="my-blog-app" />
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