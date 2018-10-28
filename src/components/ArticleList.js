import React from 'react';

import './article-list.css';
import ArticleExcerpt from'./ArticleExcerpt';
import SearchField from './SearchField';

class ArticleList extends React.Component {

    componentDidMount(){
        this.props.getArticleList(this.props.searchQuery);
        if (this.props.location.pathname === '/search'){
            const url = new URL(window.location.href);
            const query = url.searchParams.get('q'); 
            this.props.setSearchQuery(query);
        }
        else{
            this.props.setSearchQuery('');
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.location.pathname !== prevProps.location.pathname){
            const location = this.props.location.pathname;
            if (location === '/'){
                this.props.setSearchQuery('');
                return;
            }
        }

        if (prevProps.searchQuery !== this.props.searchQuery){
            this.props.getArticleList(this.props.searchQuery);
            if (this.props.searchQuery.length > 0){
                this.props.history.push(`/search?q=${this.props.searchQuery}`);
            }
            else{
                this.props.history.push('/');
            }
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

                {
                    this.props.searchQuery.length > 0
                    ? <p className="total-found">
                        Articles found: {this.props.articleList.length}
                     </p>
                    : null
                }
                
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