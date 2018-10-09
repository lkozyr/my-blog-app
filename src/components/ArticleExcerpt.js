import React from 'react';
import './article-excerpt.css';
import { dateStampToDate } from '../helpers';

const ArticleExcerpt = (props) => {

    return (
        <div className="article-excerpt">
            <li>
                <div className="h2-wrapper">
                    <h2> 
                        {props.article.title}
                    </h2>
                </div>
                <p className="date">{dateStampToDate(props.article.date)}</p>
                
                <p className="text">{
                    decodeURI(props.article.text.replace(/&nbsp;/g, " ")).replace(/<\/?[^>]+(>|$)/g, '').substring(0, 170)
                }...</p>
                
                <p className="tags">Tags: {props.article.tags}</p>

            </li>
        </div>
    ); 
}

export default ArticleExcerpt;