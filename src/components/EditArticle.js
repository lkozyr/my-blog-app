import React from 'react';
import PropTypes from 'prop-types';
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
        this.fixImagesWidthInRTE();
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

    // images in RTE should have width = 100% of RTE width
    // with current RTE realization, image has its original width,
    // which is often larger than RTE width
    fixImagesWidthInRTE = () => {
        const rtEditor = document.querySelector('.DraftEditor-root');
        const editorWidth = rtEditor.getBoundingClientRect().width;

        const images = Array.from(document.querySelectorAll('span.ImageSpan__root___RoAqL'));
        images.map(im => {
            const w = im.getBoundingClientRect().width;

            if (w > editorWidth){
                const h = im.getBoundingClientRect().height;

                const newW = Math.floor(editorWidth * 0.95);
                const newH = Math.floor(h * newW / w);

                const bgIm = im.style.backgroundImage;

                im.setAttribute('style', `
                    background-image:${bgIm}; 
                    background-size: contain !important;
                    height: ${newH}px !important;
                    width: ${newW}px; !important`);
            }
            return im;
        });
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

            this.fixImagesWidthInRTE();
            return;
        }
        
    }

    render() {
        const homeURL = this.props.searchQuery.length > 0 
                        ? `/search?q=${this.props.searchQuery}`
                        : '/';

        if (!(this.props.user && this.props.user.isAdmin)){
            return (
                <div className="edit-article-form">
                    <div className="sorry">
                        You cannot edit articles in this blog.&nbsp;
                        <Link className="home-btn" to={homeURL}>Home</Link>
                    </div>
                </div>
            );
        }

        if (!this.props.articleDetails) return (<div className="edit-article"></div>)
       
            return (
                <React.Fragment>
                    <form 
                        onMouseEnter={this.fixImagesWidthInRTE}                           
                        className="edit-article" 
                        onSubmit={this.handleSaveArticleClick}
                        ref={this.editArticleFormRef}>
                        <Link className="home-btn" to={homeURL}> Home </Link>
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

EditArticle.propTypes = {
    articleDetails:         PropTypes.object,
    editArticle:            PropTypes.func.isRequired,
    editArticleResult:      PropTypes.number,
    location:               PropTypes.object,
    searchQuery:            PropTypes.string,
    switchToReadMode:       PropTypes.func,
    user:                   PropTypes.object,
}

export default EditArticle;