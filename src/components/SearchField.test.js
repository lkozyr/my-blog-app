import React from 'react';
import SearchField from './SearchField';
import Enzyme, { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<SearchField />', () => {
    it('Renders <SearchField /> component properly', () => {
        
        const searchQuery = 'blog';
        const setSearchQueryFn = () => {};

        const search = shallow(
        <SearchField 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQueryFn}/>
        );
        
        expect(search.find('form.search-field').exists()).toBe(true);
        expect(search.find('form.search-field').prop('onSubmit')).toBeTruthy();

        expect(search.find('input').exists()).toBe(true);
        expect(search.find('input').prop('type')).toEqual('text');
        expect(search.find('input').prop('value')).toEqual(searchQuery);

        expect(search.find('button').exists()).toBe(true);
        expect(search.find('button').prop('type')).toEqual('submit');

        const newSearchQuery = 'human';
        search.setProps({ 
            searchQuery: newSearchQuery,
            setSearchQuery: setSearchQueryFn
        });

        expect(search.find('input').prop('value')).toEqual(newSearchQuery);

    });

    it('Entering search string into a search input should trigger an update of state', () => {

        const searchQuery = 'blog';
        const newSearchQuery = 'cycling';
        const setSearchQueryFn = () => {};

        const search = shallow(
        <SearchField 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQueryFn}/>
        );

        search.find('input').simulate('change', { target: { value: newSearchQuery } });
        expect(search.find('input').prop('value')).toBe(newSearchQuery);
        expect(search.state('searchInput')).toBe(newSearchQuery);
    });

    it('User can submit search string by pressing search button', () => {

        const searchQuery = 'blog';
        const setSearchQueryFn = () => {};

        const handleSubmit = sinon.stub(SearchField.prototype, 'handleSearchStart').returns(true);

        const search = mount(
            <SearchField 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQueryFn}/>
            );

        const button = search.find('button');
        button.simulate('submit');

        expect(handleSubmit.calledOnce).toBe(true);

        const propsSearchQuery = handleSubmit.firstCall.thisValue.props.searchQuery;
        expect(propsSearchQuery).toEqual(searchQuery);

        sinon.restore();
    });

});

// console.log('pathname: ',global.window.location.pathname);