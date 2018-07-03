import * as React from 'react';
import { Component } from 'react';
import { BaseInput } from '../BaseInput/BaseInput';
import './RouteManager.css'

import { GoogleMap } from "react-google-maps"
import { RMRoute } from '../../classes/RMRoute';
import { MapPreview } from '../MapPreview/MapPreview';
import { MarkerList } from '../MarkersList/MarkerList';

export interface IRouteManagerProps {
  text: string,
}
export interface IRouteManagerState {
  apiParams: {
    key: string,
    libs: string,
    version: string,
  },
  route: RMRoute,
}

export class RouteManager extends Component<IRouteManagerProps, IRouteManagerState> {
  public state = {

    apiParams: {
      key: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg',
      libs: 'geometry,drawing,places',
      version: '3.exp',
    },

    route: new RMRoute(),
  }

  private mapRef: React.RefObject<GoogleMap> = React.createRef();

  public componentDidMount() {
    const { route } = this.state;
    route.mapRef = this.mapRef;
    route.updateComponent = () => this.forceUpdate();
  }

  public render() {
    const { route } = this.state;
    const { key, libs, version } = this.state.apiParams;

    const url = `https://maps.googleapis.com/maps/api/js?key=${
      key }&v=${ version }&libraries=${ libs }`;

    return (
      <div className="route-manager__container">
        <div className="route-manager__controls">
          <BaseInput text="kek" onAddPoint={ route.onAddPoint } />
          <MarkerList routeMarkers={ route.markers } />
        </div>
        <div className="route-manager__map">
          <MapPreview
            googleMapURL={ url }
            defaultCenter={{ lat: -34.397, lng: 145.644 }}
            loadingElement={ <div style={{ height: '100%' }} /> }
            containerElement={
              <div style={{ width: '100%', height: '50%' }} />
            }
            mapElement={ <div style={{ height: '100%' }} /> }
            isMarkerShown={ true }
            mountMap={ this.mapRef }
          >
            { route.render() }
          </MapPreview>
        </div>
      </div>
    );
  }
}
