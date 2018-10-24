import React from 'react';
import ReactDOM from 'react-dom';
import './read-article.css';
import { Link } from 'react-router-dom';

import { 
    dateStampToDate,
    generateRandomIndexesSet 
} from '../helpers';
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
                
            console.log('ONE', prevArticleId, articleId);

                const index = this.props.articleList.findIndex(a => a.articleId === articleId);

                this.setState({
                    randomArticleIndexes: generateRandomIndexesSet(this.props.articleList.length - 1, undefined, index) 
                });

                switch (index){
                    case 0: 
                        this.setState({
                            next: null,
                            prev: { 
                                title: this.props.articleList[index+1].title,
                                url: this.props.articleList[index+1].articleId,
                            }
                        });
                        break;
                    case this.props.articleList.length - 1: 
                        this.setState({
                            next: { 
                                title: this.props.articleList[index-1].title,
                                url: this.props.articleList[index-1].articleId,
                            },
                            prev: null
                        });
                        break;
                    default:
                        this.setState({
                            next: { 
                                title: this.props.articleList[index-1].title,
                                url: this.props.articleList[index-1].articleId,
                            },
                            prev: { 
                                title: this.props.articleList[index+1].title,
                                url: this.props.articleList[index+1].articleId,
                            }
                        }
                    );
                }

            ReactDOM.findDOMNode(this).scrollIntoView( {behavior: "smooth", block: "start"} );
        }
    }

    componentDidMount(){
        ReactDOM.findDOMNode(this).scrollIntoView( {behavior: "smooth", block: "start"} );

        // if (this.props.articleList && this.props.articleList.length === 0){
        //     this.props.getArticleList(this.props.searchQuery);
        // }
    }


    render(){
        if (!this.props.articleDetails) return (<div className="article-details"></div>)
        
        return (
            <React.Fragment>
                <div className="article-details">
                    <Link className="home-btn" to="/"> Home </Link>
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
                    <p className="tags">{this.props.articleDetails.tags}</p>
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

export default ReadArticle;