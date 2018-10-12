import React from 'react';
import { Link } from 'react-router-dom';

import './user.css';

class User extends React.Component {

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
                </div>
            );
        }
        return (
                <div className="user">
                    <div>
                        <img src={this.props.user.photoURL} alt={this.props.user.displayName} />
                        { this.props.user.isAdmin ? <span>ADMIN</span> : null }
                    </div>
                    <div>
                        <p className="username">{this.props.user.displayName}</p>
                        <p><button onClick={this.props.handleLogoutClick}>Logout</button></p>
                    </div>
                    
                    { this.props.user.isAdmin 
                        ? <Link to="/new" className="new-article"> New Article </Link> 
                        : null }
                </div> );
    }
}
  
export default User;