
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import ArticleList from '../components/ArticleList'; 

import { getArticles, deleteArticle } from '../firebase/firebaseAPI';

const mapStateToProps = (state) => {
    return {
        user:           state.user,
        searchQuery:    state.searchQuery, 
        articleList:    state.articleList,
    };
}


const asyncGetArticlesActionCreator = (searchQuery) => {
    return (dispatch) => {
        getArticles(searchQuery, dispatch, actions.getArticleList);
    }
}

const asyncDeleteArticleActionCreator = (articleId) => {
    return (dispatch) => {
        deleteArticle(articleId, dispatch, actions.deleteArticle);
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList: (searchQuery) => dispatch(asyncGetArticlesActionCreator(searchQuery) ),

        setSearchQuery: (query) => {
            console.log('CCHEader: query:', query);
            dispatch(actions.setSearchQuery(query))
        },
        
        deleteArticle: (articleId, user) => {
            if (user.isAdmin){
                dispatch(asyncDeleteArticleActionCreator(articleId) )
            }
        },
    }
}

const CCArticleList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList);


export default CCArticleList;