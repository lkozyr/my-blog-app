import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './read-article.css';
import { Link } from 'react-router-dom';

import { 
    dateStampToDate,
    generateRandomIndexesSet 
} from '../helpers';
import Tags from './Tags';
import editIcon from '../assets/img/edit.svg';
import AddCommentForm from './AddCommentForm';
import PreviousNextNav from './PreviousNextNav';
import RandomArticleSuggestions from './RandomArticleSuggestions';


class ReadArticle extends React.Component{

    constructor (props) {
        super(props);

        this.state = {
            prev: null,
            next: null,
            randomArticleIndexes: [],
        }; 
    }
    
    componentDidUpdate(prevProps) {

        if (this.props.match.path.replace('/','') === 'edit'){
            return;
        }

        const prevArticleId = prevProps.location.pathname.replace('/read/', '');
        const articleId = this.props.location.pathname.replace('/read/', '');

        if ((this.props.articleList && this.props.articleList.length > 0 
            && !((this.state.prev && this.state.prev.title) || (this.state.next && this.state.next.title)) )
            || (prevProps.location.pathname !== this.props.location.pathname)
            || (prevArticleId !== articleId)){
                const index = this.props.articleList.findIndex(a => a.articleId === articleId);

                const randomIndexes = generateRandomIndexesSet(this.props.articleList.length - 1, undefined, index);
                if(randomIndexes.length > 0){
                    this.setState({ randomArticleIndexes: randomIndexes });
                }

                let next = null, 
                    prev = null;
                switch (index){
                    case 0: 
                        if (index + 1 < this.props.articleList.length){
                            prev = { 
                                title: this.props.articleList[index+1].title,
                                url: this.props.articleList[index+1].articleId,
                            };
                        }
                        break;

                    case this.props.articleList.length - 1: 
                        if (index - 1 >= 0){
                            next = {
                                title: this.props.articleList[index-1].title,
                                url: this.props.articleList[index-1].articleId,
                            }
                        }
                        break;
                        
                    default:
                        if (index + 1 < this.props.articleList.length){
                            prev = { 
                                title: this.props.articleList[index+1].title,
                                url: this.props.articleList[index+1].articleId,
                            };
                        }
                        if (index - 1 >= 0){
                            next = {
                                title: this.props.articleList[index-1].title,
                                url: this.props.articleList[index-1].articleId,
                            }
                        }
                        break;
                }
                if (this.state.prev !== prev){
                    this.setState({ prev });
                }
                if (this.state.next !== next){
                    this.setState({ next });
                }

            ReactDOM.findDOMNode(this).scrollIntoView( {behavior: "smooth", block: "start"} );
        }
    }

    componentDidMount(){
        ReactDOM.findDOMNode(this).scrollIntoView( {behavior: "smooth", block: "start"} );
    }


    render(){
        if (!this.props.articleDetails) return (<div className="article-details"></div>)
        
        const homeURL = this.props.searchQuery.length > 0 
                        ? `/search?q=${this.props.searchQuery}`
                        : '/';
        return (
            <React.Fragment>
                <div className="article-details">
                    <Link className="home-btn" to={homeURL}> Home </Link>
                    <h2>
                        {this.props.articleDetails.title} 
                        {
                            this.props.user && this.props.user.isAdmin 
                            ? 
                                <Link to={`/edit/${this.props.articleDetails.articleId}`}> 
                                    <img 
                                        title="Edit article"
                                        className="edit-icon" 
                                        src={editIcon} 
                                        alt="Edit article" />
                                </Link>
                            : null
                        }
                        </h2>
                    <p className="date">{dateStampToDate(this.props.articleDetails.date)}</p>
                    <p className="text"
                       dangerouslySetInnerHTML={{__html: decodeURI(this.props.articleDetails.text) }}
                    ></p>
                    <Tags tags={this.props.articleDetails.tags} />
                </div>

                <PreviousNextNav 
                    previous={this.state.prev}
                    next={this.state.next}/>

                <RandomArticleSuggestions
                    articleList={this.props.articleList}
                    randomArticleIndexes={this.state.randomArticleIndexes} />

                { 
                    this.props.user
                    ?
                        <AddCommentForm 
                            articleId={this.props.location.pathname.replace('/read/', '')}
                            userEmail={this.props.user.email}
                            addComment={this.props.addComment}
                            addCommentResult={this.props.addCommentResult}/>
                    :   <div className="article-details">
                            Please&nbsp;
                            <button onClick={this.props.handleLoginClick}>Login</button>
                            &nbsp;to add your comment.
                        </div>
                }

                <div className="article-details">
                    Comments: { this.props.articleComments && this.props.articleComments.length}
                </div>
                <div className="article-comments"> 
                    <ul>
                    {
                        this.props.articleComments && this.props.articleComments.map((comment, i) => 
                            <li key={'comment' + i}>
                                <div className="comment-header">
                                    <img src={comment.photoURL} alt={comment.displayName} />
                                    <address>
                                        <span title={comment.userEmail}>{comment.displayName}</span>
                                    </address>
                                    <time 
                                        className="date"
                                        dateTime={(new Date(comment.date || 1539362391983)).toISOString()}>
                                            {dateStampToDate(comment.date)}
                                    </time>
                                    
                                </div>
                                <div className="comment-body">
                                    <p className="comment">{comment.text}</p>
                                </div>
                            </li>)
                        }
                    </ul>
                </div>
            </React.Fragment>
        ); 
    }
}

ReadArticle.propTypes = {
    addComment:             PropTypes.func.isRequired,
    addCommentResult:       PropTypes.number,
    articleComments:        PropTypes.array,
    articleDetails:         PropTypes.object,
    articleList:            PropTypes.array,
    handleLoginClick:       PropTypes.func.isRequired,
    location:               PropTypes.object,
    match:                  PropTypes.object,
    searchQuery:            PropTypes.string,
    user:                   PropTypes.object,
}

export default ReadArticle;