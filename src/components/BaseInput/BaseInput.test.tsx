import { shallow, mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { BaseInput } from './BaseInput';

it('renders without crashing', () => {
  const onKeyUpMock = jest.fn();
  const wrapper = shallow(
    <BaseInput
      placeholder="Enter name for new routes point..."
      onKeyUp={ onKeyUpMock }
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('call onKeyUp when user types ' , () => {
  const onKeyUpMock = jest.fn().mockName('onAddPoint')

  const wrapper = shallow(
    <BaseInput
      placeholder="Enter name for new routes point..."
      onKeyUp={ onKeyUpMock }
    />
  );
  const input = wrapper.find('input');

  input.simulate('keyUp', {
    nativeEvent: {
      key: 'K',
    }
  })

  expect(onKeyUpMock).toBeCalled();
  expect(wrapper).toMatchSnapshot();
});
