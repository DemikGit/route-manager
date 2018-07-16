import { shallow, mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { RouteManager } from './RouteManager';

it('renders without crashing', () => {
  const wrapper = shallow(<RouteManager />);
  expect(wrapper).toMatchSnapshot();
});


it('call createNewPoint if Enter key pressed', () => {
  const wrapper = shallow(<RouteManager />);
  const createNewPointMock = jest.fn();
  const mockEvent = {
    nativeEvent: {
      key: 'Enter',
    }
  }
  const instance = wrapper.instance() as RouteManager;

  instance.createNewPoint = createNewPointMock
  instance.onKeyUp(mockEvent as React.KeyboardEvent<HTMLInputElement>) ;

  expect(createNewPointMock).toBeCalled();
  }
);

it('call addPoint if input value exist', () => {
  const wrapper = shallow(<RouteManager />);
  const addPointMock = jest.fn();
  const inputMock = (global.document as Document).createElement('input');
  const mockEvent = {
    nativeEvent: {
      key: 'Enter',
      target: inputMock,
    },
  }
  inputMock.value = 'data';
  const instance = wrapper.instance() as RouteManager;
  instance.addPoint = addPointMock;

  instance.onKeyUp(mockEvent);

  expect(addPointMock).toBeCalled();
  }
);
