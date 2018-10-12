
import { connect } from 'react-redux';

import AddArticleForm from '../components/AddArticleForm'; 

import * as actions from '../actions/actions';

import { addArticle } from '../firebase/firebaseAPI';

const mapStateToProps = (state) => {
    return {
        user:               state.user,
        addArticleResult:   state.addArticleResult,
    };
}

const asyncAddArticleActionCreator = (article) => {
    return (dispatch) => {
        addArticle(article, dispatch, actions.addArticle);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addArticle: (article, user) => {
            if (user.isAdmin){
                dispatch(asyncAddArticleActionCreator(article));
            }
        }
        
    }
}

const CCNewArticle = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddArticleForm);

export default CCNewArticle;