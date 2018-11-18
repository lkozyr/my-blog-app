import React from 'react';
import Tags from './Tags';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<Tags />', () => {
    it('Renders <Tags /> component properly', () => {
        const tags = shallow(<Tags tags="zoo, elephant tiger"/>);

        expect(tags.children.length).toBe(1);
        
        expect(tags.find('ul').children().length).toBe(4);
        expect(tags.find('ul li:first-child').text()).toBe('Tags: ');
        expect(tags.find('ul').childAt(1).childAt(0).childAt(0).text()).toBe('zoo');
        expect(tags.find('ul').childAt(2).childAt(0).childAt(0).text()).toBe('elephant');
        expect(tags.find('ul').childAt(3).childAt(0).childAt(0).text()).toBe('tiger');
        expect(tags.find('ul').childAt(2).key()).toBe('tagelephant1');

        tags.setProps({ tags: 'red, green  yellow,white' });
        expect(tags.find('ul').children().length).toBe(5);
        expect(tags.find('ul li:first-child').text()).toBe('Tags: ');
        expect(tags.find('ul').childAt(2).childAt(0).childAt(0).text()).toBe('green');
        expect(tags.find('ul').childAt(3).childAt(0).childAt(0).text()).toBe('yellow');

    });
});