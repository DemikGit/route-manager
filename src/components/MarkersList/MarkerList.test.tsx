import { shallow, mount } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { MarkerList } from './MarkerList';
import { IMarker } from '../../services/RouteService';

const testMarkers: IMarker[] = [
  {
    draggable: true,
    id: 'uuid',
    name: 'Test Marker',
    onDrag: (event: google.maps.MouseEvent, id: string) => {
      this.onDrag(event, id);
    },
    position: {
      lat: 0,
      lng: 0,
    },
    showInfoBox: false,
  }
];

it('renders without crashing', () => {

  const onPointDelete = jest.fn();
  const swapPoints = jest.fn();

  const wrapper = shallow(
    <MarkerList
      routeMarkers={ testMarkers }
      onPointDelete={ onPointDelete }
      swapPoints={ swapPoints }
    />
  );

  expect(wrapper).toMatchSnapshot();
});


it('change srcId if onDragStart was called', () => {
  const onPointDelete = jest.fn();
  const swapPoints = jest.fn();
  const testId = 'uuid';

  const wrapper = shallow(
    <MarkerList
      routeMarkers={ testMarkers }
      onPointDelete={ onPointDelete }
      swapPoints={ swapPoints }
    />
  );

  wrapper.instance().onDragStart(testId);

  expect(wrapper.instance().state.srcId).toEqual(testId);
  expect(wrapper).toMatchSnapshot();
});

it('call swapPoint if onDragEnter was called', () => {
  const onPointDelete = jest.fn();
  const swapPoints = jest.fn();
  const testId = 'uuid';

  const wrapper = shallow(
    <MarkerList
      routeMarkers={ testMarkers }
      onPointDelete={ onPointDelete }
      swapPoints={ swapPoints }
    />
  );

  wrapper.instance().onDragEnter(testId);

  expect(swapPoints).toBeCalled();
  expect(wrapper).toMatchSnapshot();
});
