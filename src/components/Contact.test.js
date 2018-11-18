import React from 'react';
import Contact from './Contact';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<Contact />', () => {
    it('Renders <Contact /> component properly', () => {
        const contact = shallow(<Contact />);

        expect(contact.find('.contact').children().length).toEqual(2);
        expect(contact.find('.contact h2').text()).toBe('Contact me');

        const fbLink = contact.find('.contact ul').childAt(0).childAt(0).prop('href');
        expect(fbLink).toBe('https://www.facebook.com/');

        const twLink = contact.find('.contact ul').childAt(1).childAt(0).prop('href');
        expect(twLink).toBe('https://twitter.com/');

        const ghLink = contact.find('.contact ul').childAt(2).childAt(0).prop('href');
        expect(ghLink).toBe('https://github.com/');

        const emLink = contact.find('.contact ul').childAt(3).childAt(0).prop('href');
        expect(emLink).toBe('mailto:me@me.me');
    });
});