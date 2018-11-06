import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './random-article-suggestions.css';

const RandomArticleSuggestions = (props) => {
    if (!(props.articleList && props.articleList.length > 0 && props.randomArticleIndexes.length > 0)){
        return null;
    }
    return (
        <nav className="random-article-suggestions">
            <h3>Worth reading:</h3>
            {
                props.randomArticleIndexes.map((index, i) => 
                    (<div className="random-article" key={`suggestion_${i}`}>
                        <Link to={`/read/${props.articleList[index].articleId}`}>
                            {props.articleList[index].title}
                        </Link>
                    </div>)
                )
            }
            
        </nav>
    ); 
}

RandomArticleSuggestions.propTypes = {
    articleList:            PropTypes.array,
    randomArticleIndexes:   PropTypes.array,
}

export default RandomArticleSuggestions;