import * as actions from '../actions/actions';

const defaultState = { 
    user:                   null,
    searchQuery:            '',
    articleList:            [],
    addArticleResult:       null,
};

const reducer = (state = defaultState, action) => {

    let user = null;
    if (state.user){
        user = Object.assign({}, state.user);
    }

    const searchQuery = state.searchQuery;

    let articleList = [];
    if (state.articleList) {
        articleList = [...state.articleList];
    }

    const addArticleResult = state.addArticleResult;

    switch (action.type){
       
        case actions.USER_LOGIN: 
            const { uid: userId, displayName, email, photoURL, isAdmin } = action;
            return { 
                user: { uid: userId, displayName, email, photoURL, isAdmin },
                searchQuery,
                articleList,
                addArticleResult,
            };
        
        case actions.USER_LOGOUT: 
            const nouser = action.user;
            return { 
                user: nouser, 
                searchQuery,
                articleList,
                addArticleResult,
            };

        case actions.SET_ADMIN_PRIVILEDGES:
            const isAdminUser = action.isAdmin;
            user.isAdmin = isAdminUser;
            return { 
                user, 
                searchQuery,
                articleList,
                addArticleResult,
            };

        case actions.SET_SEARCH_QUERY:
            const query = action.searchQuery;
            return { 
                user, 
                searchQuery: query,
                articleList,
                addArticleResult,
            };

        case actions.GET_ARTICLE_LIST:
            const articlesList = action.articleList;
            return { 
                user, 
                searchQuery,
                articleList: articlesList,
                addArticleResult,
            };

        case actions.ADD_ARTICLE_RESULT:
            const addResult = action.addResult;
            return { 
                user, 
                searchQuery,
                articleList,
                addArticleResult: addResult,
            };

        default:
            return state;
    }
}

export default reducer;