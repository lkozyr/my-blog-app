/*
    Shows Amount of likes for specific article. If clickable, allows to add (or remove) user's like 
    to the article.
*/
import React from 'react';
import PropTypes from 'prop-types';
import likeImage from '../assets/img/like.svg';
import likedImage from '../assets/img/liked.svg';
import './likes.css';

class Likes extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            hasUserLiked: false,
        }
    }

    hasUserLiked = (arr) => {
        if (!(arr && this.props.user)) return false;
        return arr.includes(this.props.user.email);
    }

    likeClicked = () => {
        if (!(this.props.isClickable && this.props.user)) return;

        const likes = this.props.likes;
        if (!likes){
            const newLikes = Array.of(this.props.user.email);
            this.props.likeArticle(newLikes.join(','));
            this.setState({ hasUserLiked: true });
            return;
        }
        if(!likes.includes(this.props.user.email)){
            likes.push(this.props.user.email);
            this.props.likeArticle(likes.join(','));
            this.setState({ hasUserLiked: true });
        }
        else {
            const newLikes = likes.filter(item => item !== this.props.user.email);
            this.props.likeArticle(newLikes.join(','));
            this.setState({ hasUserLiked: false });
        }
    }

    imageToggle = (e) => {
        if (!(this.props.isClickable && this.props.user)) return;

        if ((this.state.hasUserLiked && e.type === 'mouseenter') ||
           (!this.state.hasUserLiked && e.type === 'mouseleave')){
            e.target.src = likeImage;
            return;
        }
        if ((this.state.hasUserLiked && e.type === 'mouseleave') ||
           (!this.state.hasUserLiked && e.type === 'mouseenter')){
            e.target.src = likedImage;
            return;
        }
    }

    componentDidMount(){
        const likes = this.props.likes;
        const hasUserLiked = this.hasUserLiked(likes);
        this.setState({ hasUserLiked });
    }

    componentDidUpdate(prevProps){
        if (this.props.likes !== prevProps.likes){
            const likes = this.props.likes;
            const hasUserLiked = this.hasUserLiked(likes);
            this.setState({ hasUserLiked });
        }
    }

    render() {
        const likes = this.props.likes;
        let imgStyle = {};
        if (this.props.user && this.props.isClickable){
            imgStyle = {
                cursor: 'pointer',
            };
        }

        return (
            <div className={
                `likes 
                ${
                    this.state.hasUserLiked
                    ? 'liked'
                    : 'not-liked'
                }
                `
                } 
                title={
                    this.props.isClickable
                    ?
                        this.state.hasUserLiked
                        ?   'You liked'
                        :   'Like'
                    : null
                } >
                <img 
                    src={
                        this.state.hasUserLiked
                        ?   likedImage
                        :   likeImage
                    } 
                    alt={
                        this.state.hasUserLiked
                        ?   'You liked'
                        :   'Like'
                    }
                    style={imgStyle}
                    onMouseEnter={this.imageToggle} 
                    onMouseLeave={this.imageToggle}
                    onClick={this.likeClicked} />
                <span> {(likes && likes.length) || 0 } </span>
            </div>
        )
        
    }
}

Likes.propTypes = {
    likes:        PropTypes.array,
    likeArticle:  PropTypes.func,
    user:         PropTypes.object,
}
  
export default Likes;
