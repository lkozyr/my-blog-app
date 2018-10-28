import React from 'react';
import './search-field.css';
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


    handleSearchStart = (e) => {
        e.preventDefault();
        this.props.setSearchQuery(this.state.searchInput);
    }

    render(){
        return (
            <form className="search-field" onSubmit={this.handleSearchStart}>
                <div>Search:</div>
                <div className="search-form">
                    <input 
                        type="text" 
                        value={this.state.searchInput} 
                        onChange={this.handleSearchInputChange}/>
                    <button type="submit"><img src={searchIcon} alt="search" /></button>
                </div>
            </form>
        ); 
    } 
}


export default SearchField;