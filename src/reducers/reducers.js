import * as actions from '../actions/actions';

const defaultState = { 
    user:               null,
};

const reducer = (state = defaultState, action) => {

    let user = null;
    if (state.user){
        user = Object.assign({}, state.user);
    }

    switch (action.type){
       
        case actions.USER_LOGIN: 
            const { uid: userId, displayName, email, photoURL, isAdmin } = action;
            return { 
                user: { uid: userId, displayName, email, photoURL, isAdmin },
            };
        
        case actions.USER_LOGOUT: 
            const nouser = action.user;
            return { 
                user: nouser, 
            };

        case actions.SET_ADMIN_PRIVILEDGES:
            const isAdminUser = action.isAdmin;
            user.isAdmin = isAdminUser;
            return { 
                user, 
            };

        default:
            return state;
    }
}

export default reducer;