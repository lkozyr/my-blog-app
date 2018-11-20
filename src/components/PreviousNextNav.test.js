import React from 'react';
import { Link } from 'react-router-dom';
import PreviousNextNav from './PreviousNextNav';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<PreviousNextNav />', () => {
    it('Renders <PreviousNextNav /> component properly', () => {
        const prev = {
            title: 'green salad',
            url: 'green-salad-5Auvn'
        };
        const next = {
            title: 'yellow pages',
            url: 'yellow-pages-bUvc7'
        };

        /* Test with both Previous and Next links available: */
        const nav = shallow(
            <PreviousNextNav 
                previous={prev}
                next={next} />
        );
        
        expect(nav.find('nav.previous-next-nav').exists()).toBe(true);

        let totalLinks = nav.find('.nav-item').reduce((total, curr) => { 
            const amount = curr.find(Link).length;
            return total + amount }, 0);
        
        expect(totalLinks).toEqual(2);

        expect(nav.find('.nav-item').at(0).find(Link).prop('to')).toEqual('/read/green-salad-5Auvn');
        expect(nav.find('.nav-item').at(0).find(Link).childAt(0).text()).toEqual('← previous');

        expect(nav.find('.nav-item').at(1).find(Link).prop('to')).toEqual('/read/yellow-pages-bUvc7');
        expect(nav.find('.nav-item').at(1).find(Link).childAt(0).text()).toEqual('next  →');


        /* Test with just Previous link available: */
        nav.setProps({
            previous: prev,
            next: null
        });

        totalLinks = nav.find('.nav-item').reduce((total, curr) => { 
            const amount = curr.find(Link).length;
            return total + amount }, 0);
        
        expect(totalLinks).toEqual(1);

        expect(nav.find('.nav-item').at(0).find(Link).prop('to')).toEqual('/read/green-salad-5Auvn');
        expect(nav.find('.nav-item').at(0).find(Link).childAt(0).text()).toEqual('← previous');

        expect(nav.find('.nav-item').at(1).find(Link).length).toEqual(0);
    });
});