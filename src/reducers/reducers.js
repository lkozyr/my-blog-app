import * as actions from '../actions/actions';

const defaultState = { 
    user:                   null,
    searchQuery:            '',
    articleList:            [],
    addArticleResult:       null,
    deleteArticleResult:    null,
    articleDetails:         null,
    articleComments:        null,
    articleLikes:           null,
    addCommentResult:       null,
    editArticleResult:      null,
};

const reducer = (state = defaultState, action) => {

    let user = null;
    if (state.user){
        user = Object.assign({}, state.user);
    }

    const searchQuery = state.searchQuery;
    const articleDetails = Object.assign({}, state.articleDetails);

    let articleList = [];
    if (state.articleList) {
        articleList = [...state.articleList];
    }

    let articleComments = [];
    if (state.articleComments) {
        articleComments = [...state.articleComments];
    }

    let articleLikes = [];
    if (state.articleLikes) {
        articleLikes = [...state.articleLikes];
    }

    const addArticleResult = state.addArticleResult;
    const deleteArticleResult = state.deleteArticleResult;
    const addCommentResult = state.addCommentResult;
    const editArticleResult = state.editArticleResult;

    switch (action.type){
       
        case actions.USER_LOGIN: 
            const { uid: userId, displayName, email, photoURL, isAdmin } = action;
            return { 
                user: { uid: userId, displayName, email, photoURL, isAdmin },
                searchQuery,
                articleList,
                addArticleResult,
                deleteArticleResult,
                articleDetails,
                articleComments,
                articleLikes,
                addCommentResult,
                editArticleResult,
            };
        
        case actions.USER_LOGOUT: 
            const nouser = action.user;
            return { 
                user: nouser, 
                searchQuery,
                articleList,
                addArticleResult,
                deleteArticleResult,
                articleDetails,
                articleComments,
                articleLikes,
                addCommentResult,
                editArticleResult,
            };

        case actions.SET_ADMIN_PRIVILEDGES:
            const isAdminUser = action.isAdmin;
            user.isAdmin = isAdminUser;
            return { 
                user, 
                searchQuery,
                articleList,
                addArticleResult,
                deleteArticleResult,
                articleDetails,
                articleComments,
                articleLikes,
                addCommentResult,
                editArticleResult,
            };

        case actions.SET_SEARCH_QUERY:
            const query = action.searchQuery;
            return { 
                user, 
                searchQuery: query,
                articleList,
                addArticleResult,
                deleteArticleResult,
                articleDetails,
                articleComments,
                articleLikes,
                addCommentResult,
                editArticleResult,
            };

        case actions.GET_ARTICLE_LIST:
            const articlesList = action.articleList;
            return { 
                user, 
                searchQuery,
                articleList: articlesList,
                addArticleResult,
                deleteArticleResult,
                articleDetails,
                articleComments,
                articleLikes,
                addCommentResult,
                editArticleResult,
            };

        case actions.ADD_ARTICLE_RESULT:
            const addResult = action.addResult;
            return { 
                user, 
                searchQuery,
                articleList,
                addArticleResult: addResult,
                deleteArticleResult,
                articleDetails,
                articleComments,
                articleLikes,
                addCommentResult,
                editArticleResult,
            };

        case actions.DELETE_ARTICLE_RESULT:
            const deleteResult = action.deleteResult;
            return { 
                user, 
                searchQuery,
                articleList,
                addArticleResult,
                deleteArticleResult: deleteResult,
                articleDetails,
                articleComments,
                articleLikes,
                addCommentResult,
                editArticleResult,
            };

        case actions.GET_ARTICLE_DETAILS:
            const artDetails = action.articleDetails;
            return { 
                user, 
                searchQuery,
                articleList: articlesList,
                addArticleResult,
                deleteArticleResult,
                articleDetails: artDetails,
                articleComments,
                articleLikes,
                addCommentResult,
                editArticleResult,
            };

        case actions.GET_ARTICLE_COMMENTS:
            const comments = action.articleComments;
            return { 
                user, 
                searchQuery,
                articleList,
                addArticleResult,
                deleteArticleResult,
                articleDetails,
                articleComments: comments,
                articleLikes,
                addCommentResult,
                editArticleResult,
            };
        
        case actions.ADD_COMMENT_RESULT:
            const result = action.addResult;
            return { 
                user, 
                searchQuery,
                articleList,
                addArticleResult,
                deleteArticleResult,
                articleDetails,
                articleComments,
                articleLikes,
                addCommentResult: result,
                editArticleResult,
            };

        case actions.EDIT_ARTICLE_RESULT:
            const editRes = action.editResult;
            return { 
                user, 
                searchQuery,
                articleList,
                addArticleResult,
                deleteArticleResult,
                articleDetails,
                articleComments,
                articleLikes,
                addCommentResult,
                editArticleResult: editRes,
            };

        case actions.GET_ARTICLE_LIKES:
            const likes = action.articleLikes;
            return { 
                user, 
                searchQuery,
                articleList,
                addArticleResult,
                deleteArticleResult,
                articleDetails,
                articleComments,
                articleLikes:   likes,
                addCommentResult,
                editArticleResult,
            };

        default:
            return state;
    }
}

export default reducer;