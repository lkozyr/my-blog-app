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
    constructor(props){
        super(props);

        this.state = {
            showConnectionStatePopup: false,
        };
    }

    componentDidMount(){
        window.setTimeout(() => {
            this.props.checkConnection();
        }, 3000);
    }

    componentDidUpdate(prevProps){
        if (prevProps.connectionState !== null && this.props.connectionState !== null &&
            !this.state.showConnectionStatePopup){
            this.setState({ showConnectionStatePopup: true });
        }
        else if (prevProps.connectionState === null && this.props.connectionState !== null &&
            this.state.showConnectionStatePopup){
            this.setState({ showConnectionStatePopup: false });
        }
        if (!prevProps.connectionState && this.props.connectionState){
            const thisComponent = ReactDOM.findDOMNode(this); 
            if (!thisComponent) {
                return;
            }
            const className = thisComponent.className;
            if (className.indexOf('conn-ok') > -1){
                window.setTimeout(() => {
                    thisComponent.className = 'connection-state conn-ok conn-ok-hidden';
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
        /* Since connectionState can be true or false I check whether it exactly equals true or
            false. Checking 'if (!connectionState)' will not work properly as null value will be
            also be treated as falsy value, this is not what we need. */
        if (this.props.connectionState === false && this.state.showConnectionStatePopup){
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
        else if (this.props.connectionState === true && this.state.showConnectionStatePopup) {
            return (
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
        else
            return (<div className="conn-state conn-ok"></div>);
    }
    
}

ConnectionState.propTypes = {
    checkConnection: PropTypes.func,
    connectionState: PropTypes.bool,
}

export default ConnectionState;