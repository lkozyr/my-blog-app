import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './article-excerpt.css';
import { dateStampToDate } from '../helpers';
import Tags from './Tags';

const ArticleExcerpt = (props) => {

    const handleDeleteArticleClick = (e) => {
        props.deleteArticle(e.target.dataset['id']);

        const elementId = 'deleteChk' + props.article.articleId;
        document.getElementById(elementId).checked = false;
    }

    const handleCancelDeleteClick = (e) => {
        const elementId = e.target.dataset['elementid'];
        document.getElementById(elementId).checked = false;
    }

    return (
        <div className="article-excerpt">
            <li>
                <div className="h2-wrapper">
                    <h2> 
                        <Link to={'/read/' + props.article.articleId} >{props.article.title} 
                        </Link>

                        {
                            props.isUserAdmin 
                            ?
                                <React.Fragment>
                                    <label htmlFor={`deleteChk${props.article.articleId}`} title="Delete article">&times;</label>
                                    <input 
                                        id={`deleteChk${props.article.articleId}`}
                                        className="delete-checkbox"
                                        type="checkbox" />
                                    <div className="confirm-delete">
                                        <p>Are you sure you want to delete this article?</p>
                                        <p>Article Id: {props.article.articleId}</p>
                                        <div className="form-buttons">
                                            <button
                                                onClick={handleCancelDeleteClick}
                                                data-elementid={`deleteChk${props.article.articleId}`}>
                                                    Cancel
                                                </button>
                                            <button
                                                className="danger" 
                                                onClick={handleDeleteArticleClick}
                                                data-id={props.article.id}>Delete
                                            </button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            :   
                                null
                        }
                    </h2>
                    
                </div>
                <p className="date">{dateStampToDate(props.article.date)}</p>
                
                <p className="text">{
                    decodeURI(props.article.text.replace(/&nbsp;/g, " ")).replace(/<\/?[^>]+(>|$)/g, '').substring(0, 170)
                }...</p>
                
                <Tags tags={props.article.tags} />

            </li>
        </div>
    ); 
}

ArticleExcerpt.propTypes = {
    article:        PropTypes.object,
    deleteArticle:  PropTypes.func.isRequired,
    isUserAdmin:    PropTypes.bool,
}

export default ArticleExcerpt;