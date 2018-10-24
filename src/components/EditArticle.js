import React from 'react';
import './edit-article.css';

import { Link } from 'react-router-dom';

import { titleToURL } from '../helpers';

import RichTextEditor from 'react-rte';


class EditArticle extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            rteValue: RichTextEditor.createValueFromString(decodeURI(this.props.articleDetails && this.props.articleDetails.text), 'html'),
            articleId: this.props.articleDetails && this.props.articleDetails.articleId,
            title: this.props.articleDetails && this.props.articleDetails.title,
            tags: this.props.articleDetails && this.props.articleDetails.tags,
            dataEdited: false,
            showCancelConfirmPopup: false,
        };
    }

    onTitleChange = (e) => {
        this.setState({
            title: e.target.value,
            articleId: titleToURL(e.target.value),
            dataEdited: true,
        });
    } 

    onRTETextChange = (value) => {
        this.setState({ 
            rteValue: value,
            dataEdited: true, 
        });
    }

    onTagsChange = (e) => {
        this.setState({
            tags: e.target.value,
            dataEdited: true,
        });
    }

    handleSaveArticleClick = (e) => {
        e.preventDefault();

        const updatedArticle = {
            date: this.props.articleDetails.date,
            text: encodeURI(this.state.rteValue.toString('html')),
            id: this.state.articleId, 
            title: this.state.title,
            tags: this.state.tags,
        };
        this.props.editArticle(this.props.articleDetails.id, updatedArticle, this.props.user);
    }

    handleCancelClick = (e) => {
        e.preventDefault();
        if (this.state.dataEdited){
            this.setState({ showCancelConfirmPopup: true });
        }
        else{
            this.props.switchToReadMode(this.state.articleId);
        }
    }
    noCancelClick = (e) => {
        this.setState({ showCancelConfirmPopup: false });
    }

    yesCancelClick = (e) => {
        this.setState({ 
            showCancelConfirmPopup: false,
            dataEdited: false,
         });
        this.props.switchToReadMode(this.state.articleId);
    }

    componentDidUpdate(prevProps){
        if (this.props.articleDetails && prevProps.articleDetails &&
            this.props.articleDetails.articleId !== prevProps.articleDetails.articleId){
                const value = RichTextEditor.createValueFromString(decodeURI(this.props.articleDetails.text), 'html');
                this.setState({ 
                    title: this.props.articleDetails.title,
                    rteValue: value,
                    tags: this.props.articleDetails.tags,
                    id: this.props.articleDetails.id,
                    articleId: this.props.articleDetails.articleId,
                });
            }
    }
   
    componentDidMount(){
        if (this.props.articleDetails && this.props.articleDetails.id){
            const value = RichTextEditor.createValueFromString(decodeURI(this.props.articleDetails.text), 'html');
            this.setState({ 
                title: this.props.articleDetails.title,
                rteValue: value,
                tags: this.props.articleDetails.tags,
                id: this.props.articleDetails.id,
                articleId: this.props.articleDetails.articleId,
            });
            
            return;
        }
        
    }

    render() {
        if (this.props.user && !this.props.user.isAdmin){
            return (
                <div className="edit-article-form">
                    <div className="sorry">
                        You cannot edit articles in this blog.&nbsp;
                        <Link to="/">Home</Link>
                    </div>
                </div>
            );
        }

        if (!this.props.articleDetails) return (<div className="edit-article"></div>)
       
            return (
                <React.Fragment>
                    <Link className="home-btn" to="/"> Home </Link>
                    <form 
                        className="edit-article" 
                        onSubmit={this.handleSaveArticleClick}
                        ref={this.editArticleFormRef}>
                        <div>
                            <label htmlFor="titleInput">Title: </label>
                            <input 
                                value={this.state.title}
                                onChange={this.onTitleChange}
                                className="title-input" 
                                type="text" 
                                id="titleInput" 
                                tabIndex="1" />
                        </div>

                        <div>
                        <label htmlFor="textInput">Text: </label>
                            <RichTextEditor
                                id="textInput"
                                className="text-input"
                                value={this.state.rteValue}
                                onChange={this.onRTETextChange}
                                tabIndex="2" />
                        </div>
                        
                        <div>
                            <label htmlFor="tagsInput">Tags: </label>
                            <input 
                                className="tags-input" 
                                type="text" 
                                id="tagsInput" 
                                tabIndex="3"
                                value={this.state.tags}
                                onChange={this.onTagsChange}/>
                        </div>

                        <div>
                            <input type="checkbox" id="enableChk" tabIndex="4"/>
                            <label htmlFor="enableChk">Publish this article </label>
                        </div>

                        <div className="form-buttons">
                            <button 
                                className="danger" 
                                type="button" 
                                onClick={this.handleCancelClick}
                                tabIndex="6">Cancel</button>
                            <button type="submit" tabIndex="5">Submit</button>
                        </div>

                        <div className="edit-result">
                        {
                            this.props.editArticleResult === null
                                ? null
                                : <div className={'article-save-result result' + this.props.editArticleResult }>
                                    {
                                        this.props.editArticleResult === 0
                                        ? 'Article successfully updated.'
                                        : 'Error ocurred while updating the article. Please try again.'
                                    }
                                </div>
                        }
                        </div>

                        <div className="confirm-cancel-wrapper">
                            {
                                this.state.showCancelConfirmPopup
                                ?
                                <div className="confirm-cancel">
                                    <p>Do you want to cancel all the changes made?</p>
                                    <div className="form-buttons">
                                        <button type="button" onClick={this.noCancelClick}>No</button>
                                        <button type="button" onClick={this.yesCancelClick}>Yes</button>
                                    </div>
                                </div>
                                : 
                                    null
                            }
                        </div>
                    
                    </form>
                </React.Fragment>
            );
    }
}

export default EditArticle;