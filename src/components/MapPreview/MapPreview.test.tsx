import { shallow, mount, render } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';
import { MapPreview } from './MapPreview';

it('renders without crashing', () => {
  const wrapper = mount(
    <MapPreview
      googleMapURL={ 'google.api' }
      defaultCenter={{
        lat: 37.666030368995685,
        lng: -116.02545749206541,
      }}
      defaultZoom={ 15 }
      loadingElement={ <div style={{ height: '100%' }} /> }
      containerElement={
        <div className="route-manager__map__wrapper"/>
      }
      mapElement={ <div style={{ height: '100%' }} /> }
      mountMap={ this.mapRef }
    />
  );

  expect(wrapper).toMatchSnapshot();
});
