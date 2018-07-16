import { shallow, mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { MarkerWrapper } from './MarkerWrapper';

it('renders without crashing', () => {
  const name: string = 'MarkerName';
  const id: string = 'uuid';
  const onPointDelete = jest.fn();
  const onDragEnter = jest.fn();
  const onDragStart = jest.fn();

  const wrapper = shallow(
    <MarkerWrapper
      id={ id }
      name={ name }
      onPointDelete={ onPointDelete }
      onDragEnter={ onDragEnter }
      onDragStart={ onDragStart }
    />
  );

  expect(wrapper).toMatchSnapshot();
});

it('call onPointDelete if delete button was clicked ' , () => {
  const name: string = 'MarkerName';
  const id: string = 'uuid';
  const onPointDelete = jest.fn();
  const onDragEnter = jest.fn();
  const onDragStart = jest.fn();

  const wrapper = shallow(
    <MarkerWrapper
      id={ id }
      name={ name }
      onPointDelete={ onPointDelete }
      onDragEnter={ onDragEnter }
      onDragStart={ onDragStart }
    />
  );
  const button = wrapper.find('svg');
  button.simulate('click');
  expect(onPointDelete).toBeCalled()
  expect(wrapper).toMatchSnapshot();
});

it('call onDragStart when dragging started ' , () => {
  const name: string = 'MarkerName';
  const id: string = 'uuid';
  const onPointDelete = jest.fn();
  const onDragEnter = jest.fn();
  const onDragStart = jest.fn();

  const wrapper = shallow(
    <MarkerWrapper
      id={ id }
      name={ name }
      onPointDelete={ onPointDelete }
      onDragEnter={ onDragEnter }
      onDragStart={ onDragStart }
    />
  );
  const markerContainer = wrapper.find('div').first();
  markerContainer.simulate('dragStart');
  expect(onDragStart).toBeCalled()
  expect(wrapper).toMatchSnapshot();
});


it('call onDragEnter when element was overlapped ' , () => {
  const name: string = 'MarkerName';
  const id: string = 'uuid';
  const onPointDelete = jest.fn();
  const onDragEnter = jest.fn();
  const onDragStart = jest.fn();

  const wrapper = shallow(
    <MarkerWrapper
      id={ id }
      name={ name }
      onPointDelete={ onPointDelete }
      onDragEnter={ onDragEnter }
      onDragStart={ onDragStart }
    />
  );

  const markerContainer = wrapper.find('div').first();
  markerContainer.simulate('dragEnter');
  expect(onDragEnter).toBeCalled()
  expect(wrapper).toMatchSnapshot();
});
