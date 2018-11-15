import React from 'react';
import PropTypes from 'prop-types';
import ReadArticle from './ReadArticle'; 
import EditArticle from './EditArticle';


class ArticleDetails extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            mode: '',   // 'read' or 'edit'

        };
    }

    componentDidMount(){

        // 1. get mode from the URL:
        const mode = this.props.match.path.replace('/','');
        this.setState({ mode }); 

        // 2. read articleId from the URL:
        const articleId = this.props.location.pathname.replace(`/${mode}/`, '');

        // 3. get article info
        this.props.getOneArticleDetails(articleId);

        // 4. if we're not in 'edit' mode, get article comments:
        if (mode === 'read'){
            this.props.getArticleComments(articleId);
        }

        // 5. get articleList if it's missing
        if (!(this.props.articleList && this.props.articleList.length > 0)){
            this.props.getArticleList(this.props.searchQuery);
        }
    }


    componentDidUpdate(prevProps){

        // 1. set mode
        const mode = this.props.match.path.replace('/','');
        if ((this.props.match.path === '/read' || this.props.match.path === '/edit')
            && this.state.mode !== mode){
                this.setState({ mode }); 
            }

        if (prevProps.location.pathname !== this.props.location.pathname){
            const prevArticleId = prevProps.location.pathname.replace(`/${this.state.mode}/`, '');
            const articleId = this.props.location.pathname.replace(`/${mode}/`, '');
            if (prevArticleId !== articleId){

                // 2. get article details
                this.props.getOneArticleDetails(articleId);

                // 3. if we're not in 'edit' mode, get article comments
                if (this.state.mode === 'read'){
                    this.props.getArticleComments(articleId);
                }
            }
        }

        if ((this.props.articleDetails && !prevProps.articleDetails ) ||
            (this.props.articleDetails && prevProps.articleDetails && 
             this.props.articleDetails.id !== prevProps.articleDetails.id)){

            if (this.state.mode === 'read'){ 
                this.props.getArticleLikes(this.props.articleDetails.id);
            }
        }

        // get articleList if it's missing
        if (!(this.props.articleList && this.props.articleList.length > 0)){
            this.props.getArticleList(this.props.searchQuery);
        }

        // if editArticleResult has been changed, show edit result and switch to read mode:
        if (prevProps.editArticleResult !== this.props.editArticleResult &&
            this.props.editArticleResult === 0){
                const articleId = this.props.location.pathname.replace(`/${this.state.mode}/`, '');
                const thisComponent = this;

                window.setTimeout(function(){
                    thisComponent.setState({ mode: 'read'});
                    thisComponent.props.history.push(`/read/${articleId}`);
                    thisComponent.props.getOneArticleDetails(articleId);
                }, 1500
            );
        }
    }

    switchToReadMode = (articleId) => {
        this.setState({ mode: 'read'});
        this.props.history.push(`/read/${articleId}`);
    }


    render(){
        if (this.state.mode === 'read'){
            return (
                <ReadArticle 
                    addComment={this.props.addComment}
                    addCommentResult={this.props.addCommentResult}
                    articleComments={this.props.articleComments}
                    articleDetails={this.props.articleDetails}
                    articleLikes={this.props.articleLikes}
                    articleList={this.props.articleList}
                    handleLoginClick={this.props.handleLoginClick} 
                    likeArticle={this.props.likeArticle}
                    location={this.props.location}
                    match={this.props.match}
                    searchQuery={this.props.searchQuery}
                    user={this.props.user} />
            )
        }
        if (this.state.mode === 'edit'){
            return (
                <EditArticle
                    articleDetails={this.props.articleDetails}
                    editArticle={this.props.editArticle}
                    editArticleResult={this.props.editArticleResult}
                    location={this.props.location}
                    searchQuery={this.props.searchQuery}
                    switchToReadMode={this.switchToReadMode}
                    user={this.props.user} />
            )
        }

        else{
            return( <div> Smth went wrong </div>);
        }
    }
}

ArticleDetails.propTypes = {
    addComment:             PropTypes.func.isRequired,
    addCommentResult:       PropTypes.number,
    articleComments:        PropTypes.array,
    articleDetails:         PropTypes.object,
    articleLikes:           PropTypes.array,
    articleList:            PropTypes.array,
    editArticle:            PropTypes.func.isRequired,
    editArticleResult:      PropTypes.number,
    getOneArticleDetails:   PropTypes.func.isRequired,
    getArticleComments:     PropTypes.func.isRequired,
    getArticleList:         PropTypes.func.isRequired,
    handleLoginClick:       PropTypes.func.isRequired,
    history:                PropTypes.object,
    likeArticle:            PropTypes.func.isRequired,
    location:               PropTypes.object,
    match:                  PropTypes.object,
    searchQuery:            PropTypes.string,
    switchToReadMode:       PropTypes.func,
    user:                   PropTypes.object,
}

export default ArticleDetails;

