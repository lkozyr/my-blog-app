import React from 'react';
import PropTypes from 'prop-types';
import './css/search-field.css';
import searchIcon from '../assets/img/search.svg';


class SearchField extends React.Component{

    constructor (props){
        super(props);
        this.state = {
            searchInput: props.searchQuery
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchQuery !== this.props.searchQuery){
            this.setState({ searchInput: this.props.searchQuery });
        }
    }

    handleSearchInputChange = (e) => {
        this.setState({ searchInput: e.target.value});
    }


    handleSearchStart(e){
        e.preventDefault();
        this.props.setSearchQuery(this.state.searchInput);
    }

    render(){
        return (
            <form className="search-field" onSubmit={this.handleSearchStart.bind(this)}>
                <div>Search:</div>
                <div className="search-form">
                    <input 
                        type="text" 
                        value={this.state.searchInput} 
                        onChange={this.handleSearchInputChange}
                        aria-label="Search"/>
                    <button type="submit"><img src={searchIcon} alt="search" /></button>
                </div>
            </form>
        ); 
    } 
}

SearchField.propTypes = {
    searchQuery:        PropTypes.string,
    setSearchQuery:     PropTypes.func.isRequired,
}

export default SearchField;