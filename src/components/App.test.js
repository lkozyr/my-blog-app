import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it ('Renders <App /> component properly', () => {
    const component = shallow(<App />);

    expect(component).toHaveLength(1);

    expect(Object.keys(component.props())).toContain('className');
    expect(Object.keys(component.props())).toContain('children');

    expect(component.props()['className']).toBe('app');
    expect(component.props()['children'].length).toBe(3);
  })
  
})

