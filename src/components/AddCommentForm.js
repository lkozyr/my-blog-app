import React from 'react';
import PropTypes from 'prop-types';
import './css/add-comment-form.css';


class AddCommentForm extends React.Component{
    constructor (props){
        super(props);

        this.commentInputRef = React.createRef();

        this.state = {
            buttonsEnabled: false,
        };
    }

    commentTextChanged = (e) => {
        const buttonsEnabled = !( 
            this.commentInputRef.current && this.commentInputRef.current.value.trim().length === 0
        );
        this.setState({ buttonsEnabled });
    }

    handleAddComment = async (e) => {
        e.preventDefault();

        const date = Date.now();
        const text = this.commentInputRef.current.value;
        const articleId = this.props.articleId;
        const userEmail = this.props.userEmail;

        this.props.addComment({ date, text, articleId, userEmail });
    }

    handleClearComment = () => {

        this.commentInputRef.current.value = '';
        this.commentTextChanged();
    }

    componentDidUpdate(prevProps){
        if (prevProps && this.props 
            && this.props.addCommentResult === 0
            && prevProps.addCommentResult === null){

            this.commentInputRef.current.value = '';
            this.commentTextChanged();
        }
    }

    render(){
        return (
            <form className="add-comment-form" onSubmit={this.handleAddComment}>
                Add your comment:
                <textarea 
                    ref={this.commentInputRef} 
                    tabIndex="1"
                    onChange={this.commentTextChanged} />
                <div className="form-buttons">
                    <button 
                        className="danger" 
                        type="button" 
                        onClick={this.handleClearComment}
                        tabIndex="3"
                        disabled={!this.state.buttonsEnabled}>
                            Clear
                        </button>

                    <button 
                        type="submit" 
                        tabIndex="2" 
                        disabled={!this.state.buttonsEnabled}>
                            Submit
                        </button>
                </div>
                {
                   this.props.addCommentResult === null
                    ? null
                    : <div className={'comment-save-result result' + this.props.addCommentResult }>
                        {
                            this.props.addCommentResult === 0
                            ? 'Comment successfully added.'
                            : 'Error ocurred while adding the comment. Please try again.'
                        }
                    </div>
                }
                
            </form>
        ); 
    }
}

AddCommentForm.propTypes = {
    addComment:         PropTypes.func.isRequired,
    addCommentResult:   PropTypes.number,
    articleId:          PropTypes.string.isRequired,
    userEmail:          PropTypes.string.isRequired,
}

export default AddCommentForm;