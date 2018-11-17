
export const USER_LOGIN             = 'USER_LOGIN';
export const USER_LOGOUT            = 'USER_LOGOUT';
export const SET_ADMIN_PRIVILEDGES  = 'SET_ADMIN_PRIVILEDGES';
export const SET_SEARCH_QUERY       = 'SET_SEARCH_QUERY';
export const GET_ARTICLE_LIST       = 'GET_ARTICLE_LIST';
export const ADD_ARTICLE_RESULT     = 'ADD_ARTICLE_RESULT';
export const DELETE_ARTICLE_RESULT  = 'DELETE_ARTICLE_RESULT';
export const GET_ARTICLE_DETAILS    = 'GET_ARTICLE_DETAILS';
export const GET_ARTICLE_COMMENTS   = 'GET_ARTICLE_COMMENTS';
export const ADD_COMMENT_RESULT     = 'ADD_COMMENT_RESULT';
export const EDIT_ARTICLE_RESULT    = 'EDIT_ARTICLE_RESULT';
export const GET_ARTICLE_LIKES      = 'GET_ARTICLE_LIKES';
export const LIKE_ARTICLE           = 'LIKE_ARTICLE';
export const SET_CONNECTION_STATE   = 'SET_CONNECTION_STATE';

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

export const deleteArticle = (deleteResult) => ({
    type:           DELETE_ARTICLE_RESULT,
    deleteResult,
});

export const getArticleDetails = (article) => ({
    type:           GET_ARTICLE_DETAILS,
    articleDetails: article,
});

export const getArticleComments = (articleComments) => ({
    type:           GET_ARTICLE_COMMENTS,
    articleComments,
});

export const addArticleComment = (addResult) => ({
    type:           ADD_COMMENT_RESULT,
    addResult,
});

export const editArticle = (editResult) => ({
    type:           EDIT_ARTICLE_RESULT,
    editResult,
});

export const getArticleLikes = (likes) => ({
    type:           GET_ARTICLE_LIKES,
    articleLikes:   likes,
});

export const likeArticle = (likesStr) => ({
    type:           LIKE_ARTICLE,
    likesStr,
});

export const setConnectionStatus = (connectionState) => ({
    type:           SET_CONNECTION_STATE,
    connectionState,
});
