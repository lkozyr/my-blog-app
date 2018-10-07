
export const USER_LOGIN     = 'USER_LOGIN';
export const USER_LOGOUT    = 'USER_LOGOUT';
export const SET_ADMIN_PRIVILEDGES = 'SET_ADMIN_PRIVILEDGES';

export const userLogin = (user) => ({
    type:           USER_LOGIN,
    uid:            user.uid,
    displayName:    user.displayName,
    email:          user.email,
    photoURL:       user.photoURL,
    isAdmin:        false,  // always first set 'isAdmin' to false, then use specific method to check if admin       
});

export const userLogout = (user) => ({
    type:           USER_LOGOUT,
    user,
});

export const setAdminPriviledge = (isAdmin) => ({
    type:           SET_ADMIN_PRIVILEDGES,
    isAdmin,
});
