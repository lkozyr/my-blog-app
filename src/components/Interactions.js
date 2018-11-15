/*
    Wrapper component for user interactions with the specific article, such as likes and comments.
    Used in ArticleExcerpt: shows Amount of likes and amount of comments, read-only.
    Used in ReadArticle: shows Amount of likes and amount of comments, clickable.
*/
import React from 'react';
import PropTypes from 'prop-types';
import Likes from './Likes';
import Comments from './Comments';
import './interactions.css';

class Interactions extends React.Component {

    likeArticle = (likesStr) => {
        this.props.likeArticle(likesStr);
    }

    render() {
        return (
            <div className="interactions">
            <Likes 
                likes={this.props.likes}
                user={this.props.user}
                isClickable={this.props.isClickable}
                likeArticle={this.props.likeArticle}/>

            <Comments 
                count={this.props.count} 
                isClickable={this.props.isClickable}
                user={this.props.user} 
                addCommentAction={this.props.addCommentAction}/>
        </div>
        )
      
    }
}

Interactions.propTypes = {
    count:          PropTypes.number,
    isClickable:    PropTypes.bool,
    likes:          PropTypes.array,
    likeArticle:    PropTypes.func,
    user:           PropTypes.object,
}
  
export default Interactions;
