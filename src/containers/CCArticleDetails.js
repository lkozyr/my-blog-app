
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import ArticleDetails from '../components/ArticleDetails'; 

import { 
    getArticles,
    getArticleDetails, 
    getArticleComments, 
     
} from '../firebase/firebaseAPI';

const mapStateToProps = (state) => {
    return {
        user:               state.user,
        searchQuery:        state.searchQuery, 
        articleList:        state.articleList,
        articleDetails:     state.articleDetails,
        articleComments:    state.articleComments,
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


const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList: (searchQuery) => dispatch(asyncGetArticlesActionCreator(searchQuery) ),

        getOneArticleDetails: (articleId) => dispatch(asyncDetailsActionCreator(articleId) ),

        getArticleComments: (articleId) => dispatch(asyncCommentsActionCreator(articleId) ),
    }
}

const CCArticleDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleDetails);


export default CCArticleDetails;