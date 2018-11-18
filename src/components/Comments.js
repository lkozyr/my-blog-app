/*
    Shows Amount of comments for specific article. If clickable, scrolls page to AddCommentForm.
*/
import React from 'react';
import PropTypes from 'prop-types';
import commentImage from '../assets/img/comment.svg';
import commentedImage from '../assets/img/commented.svg';
import './css/comments.css';

class Comments extends React.Component {

    commentClicked = () => {
        if (!(this.props.isClickable && this.props.user)) return;
        this.props.addCommentAction();
    }

    imageToggle = (e) => {
        if (!(this.props.isClickable && this.props.user)) return;

        if (e.target.src.indexOf(commentImage) > -1){
            e.target.src = commentedImage;
            return;
        }
        if (e.target.src.indexOf(commentedImage) > -1){
            e.target.src = commentImage;
        }
    }

    render() {
        let imgStyle = {};
        if (this.props.user && this.props.isClickable){
            imgStyle = {
                cursor: 'pointer',
            };
        }
        return (
            <div 
                className="comments-info" 
                title={
                    this.props.isClickable
                    ?   'Add comment'
                    :   null
                }>
                <img 
                    src={commentImage} 
                    alt="Comments" 
                    style={imgStyle}
                    onMouseEnter={this.imageToggle} 
                    onMouseLeave={this.imageToggle} 
                    onClick={this.commentClicked}/>

                <span> { this.props.count || 0 } </span>
            </div>
        )
        
    }
}

Comments.propTypes = {
    addCommentAction:   PropTypes.func,
    count:              PropTypes.number,
    isClickable:        PropTypes.bool,
    user:               PropTypes.object,
}
  
export default Comments;