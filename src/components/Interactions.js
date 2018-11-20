/*
    Wrapper component for user interactions with the specific article, such as likes and comments.
    Used in ArticleExcerpt: shows Amount of likes and amount of comments, read-only.
    Used in ReadArticle: shows Amount of likes and amount of comments, clickable.
*/
import React from 'react';
import PropTypes from 'prop-types';
import Likes from './Likes';
import Comments from './Comments';
import './css/interactions.css';

const Interactions = (props) => {

    return (
        <div className="interactions">
            <Likes 
                likes={props.likes}
                user={props.user}
                isClickable={props.isClickable}
                likeArticle={props.likeArticle}/>

            <Comments 
                count={props.count} 
                isClickable={props.isClickable}
                user={props.user} 
                addCommentAction={props.addCommentAction}/>
        </div>
    )

}

Interactions.propTypes = {
    addCommentAction:   PropTypes.func,
    count:              PropTypes.number,
    isClickable:        PropTypes.bool,
    likes:              PropTypes.array,
    likeArticle:        PropTypes.func,
    user:               PropTypes.object,
}
  
export default Interactions;
