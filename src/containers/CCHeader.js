
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import Header from '../components/Header'; 

import { userLogin, userLogout, checkLogin, isUserAdmin } from '../firebase/firebaseAPI';


const mapStateToProps = (state) => {
    return {
        user:           state.user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLoginClick: async () => {
            const user = await userLogin();
            dispatch(actions.userLogin(user));

            const isAdmin = await isUserAdmin(user);
            dispatch(actions.setAdminPriviledge(isAdmin))
        },
        handleLogoutClick: async () => {
            const nouser = await userLogout();
            dispatch(actions.userLogout(nouser))
        }, 
        checkUserLogin: () => {
            checkLogin( async(loggedUser) => {
                if (loggedUser) {
                    dispatch(actions.userLogin(loggedUser))

                    const isAdmin = await isUserAdmin(loggedUser);
                    dispatch(actions.setAdminPriviledge(isAdmin))
                } 
                else{
                    const nouser = await userLogout();
                    dispatch(actions.userLogout(nouser))
                }
            });
        },
    }
}

const CCHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);


export default CCHeader;