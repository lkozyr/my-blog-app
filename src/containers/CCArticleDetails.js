
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import ArticleDetails from '../components/ArticleDetails'; 

import { 
    getArticles,
    getArticleDetails, 
    getArticleComments, 
    addComment, 
    userLogin, 
    isUserAdmin, 
    editArticle,
     
} from '../firebase/firebaseAPI';

const mapStateToProps = (state) => {
    return {
        user:               state.user,
        searchQuery:        state.searchQuery, 
        articleList:        state.articleList,
        articleDetails:     state.articleDetails,
        articleComments:    state.articleComments,
        addCommentResult:   state.addCommentResult,
        editArticleResult:  state.editArticleResult,
    };
}

const asyncGetArticlesActionCreator = (searchQuery) => {
    return (dispatch) => {
        getArticles(searchQuery, dispatch, actions.getArticleList);
    }
}

const asyncCommentsActionCreator = (articleId) => { 
    return (dispatch) => {
        getArticleComments(articleId, dispatch, actions.getArticleComments);
    }
}

const asyncDetailsActionCreator = (articleId) => {
    return (dispatch) => {
        getArticleDetails(articleId, dispatch, actions.getArticleDetails);
    }
}

const asyncAddCommentActionCreator = (comment) => {
    return (dispatch) => {
        addComment(comment, dispatch, actions.addArticleComment);
    }
}

const asyncEditArticleActionCreator = (id, article) => {
    return (dispatch) => {
        editArticle(id, article, dispatch, actions.editArticle);
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList: (searchQuery) => dispatch(asyncGetArticlesActionCreator(searchQuery) ),

        getOneArticleDetails: (articleId) => dispatch(asyncDetailsActionCreator(articleId) ),

        getArticleComments: (articleId) => dispatch(asyncCommentsActionCreator(articleId) ),

        addComment: (comment) => dispatch(asyncAddCommentActionCreator(comment) ),

        // login button handler:
        // show login button instead of 'add comment form' if user haven't logged in yet
        handleLoginClick: async () => {
            const user = await userLogin();
            dispatch(actions.userLogin(user));

            const isAdmin = await isUserAdmin(user);
            dispatch(actions.setAdminPriviledge(isAdmin))
        },

        editArticle: (id, article, user) => {
            if (user.isAdmin){
                dispatch(asyncEditArticleActionCreator(id, article));
            }
        }
    }
}

const CCArticleDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleDetails);


export default CCArticleDetails;