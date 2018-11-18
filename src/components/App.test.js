import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it ('Renders <App /> component properly', () => {
    const app = shallow(<App />);

    expect(app).toHaveLength(1);

    expect(Object.keys(app.props())).toContain('className');
    expect(Object.keys(app.props())).toContain('children');

    expect(app.props()['className']).toBe('app');
    expect(app.props()['children'].length).toBe(2);
  })
  
})

