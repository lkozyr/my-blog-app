import React from 'react';
import ReadArticle from './ReadArticle'; 


class ArticleDetails extends React.Component{

    
    componentDidMount(){

        // 1. read articleId from the URL:
        const articleId = this.props.location.pathname.replace('/read/', '');

        // 2. get article info
        this.props.getOneArticleDetails(articleId);
       
        // 3. get article comments
        this.props.getArticleComments(articleId);
    }


    componentDidUpdate(prevProps){

        if (prevProps.location.pathname !== this.props.location.pathname){

            const prevArticleId = prevProps.location.pathname.replace('/read/', '');
            const articleId = this.props.location.pathname.replace('/read/', '');
            if (prevArticleId !== articleId){
                this.props.getOneArticleDetails(articleId);
            }
        }
    }


    render(){
        
        return (
            <ReadArticle 
                articleComments={this.props.articleComments}
                location={this.props.location}
                match={this.props.match}
                articleDetails={this.props.articleDetails} />
        )
    }
}

export default ArticleDetails;

