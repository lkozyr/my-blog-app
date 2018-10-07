import firebase, { auth, provider } from './firebaseInit.js';

export const userLogin = async() => {
    return auth.signInWithPopup(provider) 
        .then((result) => {
            return result.user;
        });
}

export const userLogout = () => {
    return auth.signOut()
        .then(() => {
            return null;
        });
}

// check if user logged in on page refresh
export const checkLogin = (func) => {
    return auth.onAuthStateChanged(func);
};

export const isUserAdmin = async (user) => {
    if (!user) {
        return false;
    }

    return firebase.database().ref('admin').once('value')
            .then(function(snapshot) {
                const adminValue = snapshot.val();
                if (adminValue === user.email){
                    return true;
                }
                return false;
            }
        );
}
