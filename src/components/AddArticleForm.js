import React from 'react';
import PropTypes from 'prop-types';
import './css/add-article-form.css';

import { Link } from 'react-router-dom';
import { titleToURL } from '../helpers';

import RichTextEditor from 'react-rte';

class AddArticleForm extends React.Component {

    constructor(props) {
        super(props); 

        this.newArticleFormRef = React.createRef();
        this.titleRef = React.createRef();
        this.tagsRef = React.createRef();
        this.publishRef = React.createRef();

        this.state = {
            value: RichTextEditor.createEmptyValue(),
            showCancelConfirmPopup: false,
        }
    }

    removeHTMLTags = (str) => {
        return str
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .trim();
    }

    checkIfChangesMade = () => {
        const text = 
            this.titleRef.current.value.trim() + 
            this.removeHTMLTags(this.state.value.toString('html')) + 
            this.tagsRef.current.value.trim();
        
        return text.length > 0;
    }


    onChange = (value) => {
        this.setState({
            value,
        });
    }

    handleAddArticleClick = (e) => {
        e.preventDefault();
        
        const date = Date.now();
        const title = this.titleRef.current.value.trim()
        const text = encodeURI(this.state.value.toString('html'));
        const id = titleToURL(title);
        const userEmail = this.props.user.email;
        const tags = this.tagsRef.current.value.trim();
        const isActive = this.publishRef.current.checked;

        this.props.addArticle({ date, title, text, id, userEmail, tags, isActive }, this.props.user);
    }

    handleCancelClick = (e) => {
        e.preventDefault();

        if (this.checkIfChangesMade()){
            this.setState({ showCancelConfirmPopup: true });
        }
        else{
            this.props.history.push('/');
        }
    }
    noCancelClick = (e) => {
        this.setState({ showCancelConfirmPopup: false });
    }

    yesCancelClick = (e) => {
        this.setState({ 
            showCancelConfirmPopup: false
         });
        this.props.history.push('/');
    }

    componentDidUpdate(prevProps){
        if (prevProps && this.props 
            && this.props.addArticleResult === 0
            && prevProps.addArticleResult === null){
            const component = this;
            window.setTimeout(function(thisComponent = component){
                thisComponent.newArticleFormRef.current.reset();
                thisComponent.setState({value: RichTextEditor.createEmptyValue()});
            }, 1000);
        }
    }

    render() {

        if (!(this.props.user && this.props.user.isAdmin)){
            return (
                <div className="add-article-form">
                    <div className="sorry">
                        You cannot add articles in this blog.&nbsp;
                        <Link className="home-btn" to="/">Home</Link>
                    </div>
                </div>
            );
        }
        if (this.props.user && this.props.user.isAdmin){
            return (
                <React.Fragment>
                    <form 
                        className="add-article" 
                        onSubmit={this.handleAddArticleClick}
                        ref={this.newArticleFormRef}>

                        <Link className="home-btn" to="/"> Home </Link>
                        
                        <div>
                            <label htmlFor="titleInput">Title: </label>
                            <input 
                                className="title-input" 
                                type="text" 
                                id="titleInput" 
                                tabIndex="1"
                                ref={this.titleRef}
                                onChange={this.fieldChanged} />
                        </div>

                        <div>
                        <label htmlFor="textInput">Text: </label>
                            <RichTextEditor
                                id="textInput"
                                className="text-input"
                                value={this.state.value}
                                onChange={this.onChange}
                                tabIndex="2" />
                        </div>
                        
                        <div>
                            <label htmlFor="tagsInput">Tags: </label>
                            <input 
                                className="tags-input" 
                                type="text" 
                                id="tagsInput" 
                                tabIndex="3" 
                                ref={this.tagsRef} />
                        </div>

                        <div>
                            <input 
                                type="checkbox" 
                                id="enableChk" 
                                tabIndex="4" 
                                ref={this.publishRef}/>
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

                        <div className="add-result">
                        {
                            this.props.addArticleResult === null
                                ? null
                                : <div className={'article-save-result result' + this.props.addArticleResult }>
                                    {
                                        this.props.addArticleResult === 0
                                        ? 'Article successfully added.'
                                        : 'Error ocurred while adding the article. Please try again.'
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
        else return null;
    }
}

AddArticleForm.propTypes = {
    addArticle:         PropTypes.func.isRequired,
    addArticleResult:   PropTypes.number,
    user:               PropTypes.object,
}

export default AddArticleForm;