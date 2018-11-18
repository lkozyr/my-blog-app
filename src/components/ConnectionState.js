/*
Component showing tiny error message on the top of the screen if 
the connection to Firebase server is lost. Once connection is restored, 
message text is changed and after 4 seconds it disappears.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './css/connection-state.css';

import connectionOkImage from '../assets/img/connection_ok.svg';
import connectionLostImage from '../assets/img/connection_lost.svg';

class ConnectionState extends React.Component {

    componentDidMount(){
        this.props.checkConnection();
    }

    componentDidUpdate(prevProps){
        if (!prevProps.connectionState && this.props.connectionState){
            const className = ReactDOM.findDOMNode(this).className;
            if (className.indexOf('conn-ok') > -1){
                window.setTimeout(() => {
                    ReactDOM.findDOMNode(this).className = 'connection-state conn-ok conn-ok-hidden';
                }, 2500);
            }
        }
    }

    closeConnectionStatePopup = () => {
        const className = ReactDOM.findDOMNode(this).className;
        if (className.indexOf('hidden') === -1 && className.indexOf('conn-lost') > -1){
            ReactDOM.findDOMNode(this).className = 'connection-state conn-lost conn-hidden';
        }
        
    }

    render(){
        if (!this.props.connectionState){
            return(
                <div className="connection-state conn-lost">
                    <img 
                        src={connectionLostImage} 
                        alt="Connection error" 
                        title="We are experiencing problems connecting to the server."/>
                    <span>We are experiencing problems connecting to the server. </span>
                    <button onClick={this.closeConnectionStatePopup} title="Close">&times;</button>
                </div>
            );
        }
        else return (
            <div className="connection-state conn-ok">
                <img 
                    src={connectionOkImage} 
                    alt="Connection resumed!" 
                    title="Connection resumed!"/>
                <span>Connection resumed!</span>
                <button onClick={this.closeConnectionStatePopup} title="Close">&times;</button>
            </div>
        );
    }
    
}

ConnectionState.propTypes = {
    checkConnection: PropTypes.func,
    connectionState: PropTypes.bool,
}

export default ConnectionState;