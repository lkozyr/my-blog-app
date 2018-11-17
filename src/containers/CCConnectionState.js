
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import ConnectionState from '../components/ConnectionState'; 

import { isOnline } from '../firebase/firebaseAPI';

const mapStateToProps = (state) => {
    return {
        connectionState: state.connectionState,
    };
}

const asyncSetConnectionStateActionCreator = (searchQuery) => {
    return (dispatch) => {
        isOnline(dispatch, actions.setConnectionStatus);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkConnection: () => dispatch (asyncSetConnectionStateActionCreator() ),
    }
}

const CConnectionState = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectionState);


export default CConnectionState;