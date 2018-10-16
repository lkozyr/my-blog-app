import React from 'react';
import ReactDOM from 'react-dom';
import './read-article.css';
import { Link } from 'react-router-dom';

import { dateStampToDate } from '../helpers';


class ReadArticle extends React.Component{
    
    componentDidUpdate(prevProps) {

        if ((this.props.articleList && this.props.articleList.length > 0 )
            || (prevProps.location.pathname !== this.props.location.pathname)){

            ReactDOM.findDOMNode(this).scrollIntoView( {behavior: "smooth", block: "start"} );
        }
    }

    componentDidMount(){
        ReactDOM.findDOMNode(this).scrollIntoView( {behavior: "smooth", block: "start"} );
    }


    render(){
        if (!this.props.articleDetails) return (<div className="article-details"></div>)
        
        return (
            <React.Fragment>
                <div className="article-details">
                    <Link to="/"> Home </Link>
                    <h2>
                        {this.props.articleDetails.title} 
                    </h2>
                    <p className="date">{dateStampToDate(this.props.articleDetails.date)}</p>
                    <p className="text"
                       dangerouslySetInnerHTML={{__html: decodeURI(this.props.articleDetails.text) }}
                    ></p>
                    <p className="tags">{this.props.articleDetails.tags}</p>
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