
export const USER_LOGIN     = 'USER_LOGIN';
export const USER_LOGOUT    = 'USER_LOGOUT';
export const SET_ADMIN_PRIVILEDGES = 'SET_ADMIN_PRIVILEDGES';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const GET_ARTICLE_LIST = 'GET_ARTICLE_LIST';
export const ADD_ARTICLE_RESULT = 'ADD_ARTICLE_RESULT';

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

export const setSearchQuery = (searchQuery) => ({
    type:           SET_SEARCH_QUERY,
    searchQuery
});

export const getArticleList = (articleList) => ({
    type:           GET_ARTICLE_LIST,
    articleList,
});

export const addArticle = (addResult) => ({
    type:           ADD_ARTICLE_RESULT,
    addResult,
});
