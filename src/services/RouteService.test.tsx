import 'jest-enzyme';
import { RouteService } from './RouteService';

let accumulator = 0;

const mockUUID = jest.fn((): string => String(accumulator += 1));

it('add new marker', () => {
  const mockUpdateComponent = jest.fn();
  accumulator = 0;
  const routeService = new RouteService();

  routeService.updateComponent = mockUpdateComponent;
  routeService.uuidV4 = mockUUID;
  routeService.onAddPoint('Test Marker', { lat: 0, lng: 0 });
  expect(routeService.markers.length).toBeGreaterThan(0);
  expect(mockUpdateComponent).toHaveBeenCalledTimes(1);
  expect(routeService).toMatchSnapshot();
});

it('remove marker', () => {
  const mockUpdateComponent = jest.fn();
  const routeService = new RouteService();
  accumulator = 0;

  routeService.updateComponent = mockUpdateComponent;
  routeService.uuidV4 = mockUUID;

  routeService.onAddPoint('Test Marker', { lat: 0, lng: 0 });
  routeService.onAddPoint('Test Marker', { lat: 0, lng: 0 });
  routeService.onAddPoint('Test Marker', { lat: 0, lng: 0 });

  const lastMarkerId = routeService.markers[2].id;

  routeService.onPointDelete(lastMarkerId);

  const isMarkerExist = !!routeService.markers.find(
    marker => marker.id === lastMarkerId
  );

  expect(isMarkerExist).toEqual(false);
  expect(routeService.markers.length).toEqual(2);
  expect(mockUpdateComponent).toHaveBeenCalledTimes(4);
  expect(routeService).toMatchSnapshot();
});

it('change marker position when dragging', () => {
  const mockUpdateComponent = jest.fn();
  const newPointPosition = {
    lat: 15,
    lng: 15,
  };
  accumulator = 0;
  const routeService = new RouteService();
  routeService.updateComponent = mockUpdateComponent;
  routeService.uuidV4 = mockUUID;

  routeService.onAddPoint('Test Marker', { lat: 0, lng: 0 });
  const marker = routeService.markers[0];

  routeService.onDrag({ ...newPointPosition }, marker.id);

  expect(routeService.markers.length).toBeGreaterThan(0);
  expect(routeService.markers[0].position).toEqual(newPointPosition);
  expect(mockUpdateComponent).toHaveBeenCalledTimes(2);
  expect(routeService).toMatchSnapshot();
});

it('swap markers in list', () => {
  const mockUpdateComponent = jest.fn();
  accumulator = 0;
  const routeService = new RouteService();
  routeService.updateComponent = mockUpdateComponent;
  routeService.uuidV4 = mockUUID;

  routeService.onAddPoint('Test Marker 1', { lat: 0, lng: 0 });
  routeService.onAddPoint('Test Marker 2', { lat: 0, lng: 0 });
  routeService.onAddPoint('Test Marker 3', { lat: 0, lng: 0 });
  const lastMarkerId = routeService.markers[2].id;
  const firstMarkerId = routeService.markers[0].id;

  routeService.swapPoints(firstMarkerId, lastMarkerId);

  expect(routeService.markers[0].id).toEqual(lastMarkerId);
  expect(routeService.markers[2].id).toEqual(firstMarkerId);
  expect(routeService.markers.length).toEqual(3);
  expect(mockUpdateComponent).toHaveBeenCalledTimes(4);
  expect(routeService).toMatchSnapshot();
});

it('toggle markers babble', () => {
  const mockUpdateComponent = jest.fn();
  const routeService = new RouteService();
  routeService.updateComponent = mockUpdateComponent;
  accumulator = 0;
  routeService.uuidV4 = mockUUID;

  routeService.onAddPoint('Test Marker 1', { lat: 0, lng: 0 });
  const firstMarker = routeService.markers[0];

  expect(firstMarker.showInfoBox).toEqual(false);
  routeService.onToggleInfoBox(firstMarker.id);
  expect(firstMarker.showInfoBox).toEqual(true);

  expect(routeService.markers.length).toEqual(1);
  expect(mockUpdateComponent).toHaveBeenCalledTimes(2);
  expect(routeService).toMatchSnapshot();
});

it('test rendering JSX.Element', () => {
  const mockUpdateComponent = jest.fn();
  const routeService = new RouteService();
  class Point {
    /** The X coordinate */
    x: number;
    /** The Y coordinate */
    y: number;
    /** A point on a two-dimensional plane. */
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    /** Compares two Points */
    equals(other: Point): boolean {
      return false;
    }
    /** Returns a string representation of this Point. */
    toString(): string {
      return '';
    }
  }

  const google = {
    maps: {
      Point
    },
  }

  global.window.google = google;

  routeService.updateComponent = mockUpdateComponent;
  routeService.uuidV4 = mockUUID;
  accumulator = 0;
  routeService.onAddPoint('Test Marker 1', { lat: 0, lng: 0 });
  routeService.onAddPoint('Test Marker 2', { lat: 0, lng: 0 });
  routeService.onAddPoint('Test Marker 3', { lat: 0, lng: 0 });

  const renderedElements = routeService.render();

  const markersCount = renderedElements.filter(element => {
    return element.type.name === 'Marker'
  }).length;
  const polylineCount = renderedElements.filter(element => {
    return element.type.name === 'Polyline'
  }).length;

  expect(routeService.markers.length).toEqual(3);
  expect(markersCount).toEqual(3);
  expect(polylineCount).toEqual(1);
  expect(mockUpdateComponent).toHaveBeenCalledTimes(3);
  expect(routeService).toMatchSnapshot();
});

