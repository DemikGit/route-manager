import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { RouteManager } from '../RouteManager/RouteManager';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('have RouteManager component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toContainReact(<RouteManager />);
  expect(wrapper).toMatchSnapshot();
});
