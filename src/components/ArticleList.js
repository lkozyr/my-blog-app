import React from 'react';

import './article-list.css';
import ArticleExcerpt from'./ArticleExcerpt';
import SearchField from './SearchField';

class ArticleList extends React.Component {


    componentDidMount(){
        this.props.getArticleList(this.props.searchQuery);
    }

    componentDidUpdate(prevProps){
        if (prevProps.searchQuery !== this.props.searchQuery){
            this.props.getArticleList(this.props.searchQuery);
        }
    }

    deleteArticle = (articleId) => {
        this.props.deleteArticle(articleId, this.props.user);
    }


    render(){

        if (!this.props.articleList){
            return null;
        }
        if (this.props.articleList.length === 0 && this.props.searchQuery.length > 0){
            return (
                <div className="article-list">
                    <SearchField 
                        searchQuery={this.props.searchQuery}
                        setSearchQuery={this.props.setSearchQuery}/>

                    <div className="sorry">Sorry, no blog posts found.</div>
                </div>
            );
        }
        return (
            <div className="article-list">
                <SearchField 
                    searchQuery={this.props.searchQuery}
                    setSearchQuery={this.props.setSearchQuery}/>

                <ul>
                {
                    this.props.articleList.map((item, i) => 
                        <ArticleExcerpt 
                            key={'article'+i}
                            article={item}
                            deleteArticle={this.deleteArticle}
                            isUserAdmin={this.props.user && this.props.user.isAdmin}/>
                    )
                }
                </ul>
                
            </div>
        ); 
    }
}

export default ArticleList;