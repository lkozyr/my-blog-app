import React from 'react';
import Footer from './Footer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<Footer />', () => {
    it('Renders <Footer /> component properly', () => {
        const footer = shallow(<Footer />);

        expect(footer.find('footer').length).toBe(1);
        expect(footer.children.length).toBe(1);
    });
});