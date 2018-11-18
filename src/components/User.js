import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import hamburgerImage from '../assets/img/hamb.svg';

import './css/user.css';

class User extends React.Component {
    constructor(props){
        super();

        this.mobileNavTrigger = React.createRef();
    }

    closeMobileNav = () => {
        this.mobileNavTrigger.current.checked = false;
    }

    componentDidMount(){
        // check if user logged in on page refresh:
        this.props.checkUserLogin();
    }

    render() {

        if (!this.props.user){
            return (
                <div>
                    <p className="login-btn-only">
                        <button onClick={this.props.handleLoginClick}>Login</button>
                    </p>
                    <div className="login-nav">
                        <label htmlFor="noUserMobNavTrigger">
                            <img src={hamburgerImage} alt="Menu" />
                        </label>
                        <input 
                            type="checkbox" 
                            id="noUserMobNavTrigger"
                            className="mobileNavTrigger" 
                            ref={this.mobileNavTrigger} />
                        
                        <nav className="mobile-nav">
                            <ul className="mobile-actions">
                                <li>
                                    <button onClick={this.props.handleLoginClick}>Login</button>
                                </li>

                                <li onClick={this.closeMobileNav}>
                                    <Link to="/about">About me</Link>
                                </li>

                                <li onClick={this.closeMobileNav}>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                
                            </ul>
                        </nav>
                    </div>
                </div>
            );
        }
        return (
                <React.Fragment>
                <div className="user">
                    <div>
                        <label htmlFor="userMobNavTrigger">
                            <img src={this.props.user.photoURL} alt={this.props.user.displayName} />
                        { this.props.user.isAdmin ? <span>ADMIN</span> : null }
                        </label>
                    </div>
                    <div>
                        <p className="username">{this.props.user.displayName}</p>
                        <p><button onClick={this.props.handleLogoutClick}>Logout</button></p>
                    </div>
                    
                    { this.props.user.isAdmin 
                        ? <Link to="/new" className="new-article"> New Article </Link> 
                        : null 
                    }
                </div>

                <input 
                    type="checkbox" 
                    id="userMobNavTrigger"
                    className="mobileNavTrigger" 
                    ref={this.mobileNavTrigger} />
                <nav className="mobile-nav">
                    <ul className="mobile-actions">
                        <li>
                            <span className="mobile-username">{this.props.user.displayName}</span>
                            <button onClick={this.props.handleLogoutClick}>Logout</button>
                        </li>
                        
                        { this.props.user.isAdmin 
                            ? <li onClick={this.closeMobileNav}>
                                <Link to="/new">New Article</Link> 
                                </li>
                            : null 
                        }

                        <li onClick={this.closeMobileNav}>
                            <Link to="/about">About me</Link>
                        </li>

                        <li onClick={this.closeMobileNav}>
                            <Link to="/contact">Contact</Link>
                        </li>
                        
                    </ul>
                </nav> 
                </React.Fragment>
                );
    }
}

User.propTypes = {
    checkUserLogin:     PropTypes.func.isRequired,
    handleLoginClick:   PropTypes.func.isRequired,
    handleLogoutClick:  PropTypes.func.isRequired,
    user:               PropTypes.object,
}
  
export default User;