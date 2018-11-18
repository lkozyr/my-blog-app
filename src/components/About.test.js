import React from 'react';
import About from './About';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<About />', () => {
    it('Renders <About /> component properly', () => {
        const about = shallow(<About />);

        expect(about.find('.about').length).toBe(1);
        expect(about.filter('.about').children().length).toBe(2);

        expect(about.find('.photo img').type()).toEqual('img');

        expect(about.find('.description').childAt(0).type()).toEqual('h2');
        expect(about.find('.description').childAt(1).type()).toEqual('h4');
        expect(about.find('.description').childAt(2).type()).toEqual('p');
    });
});