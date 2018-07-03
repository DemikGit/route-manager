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
      key: 'AIzaSyDSnQhXn5WfyBi68hCgx5qA4pmApKkN8Jc',
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
          <MarkerList routeMarkers={ route.markers } onPointDelete={ route.onPointDelete } />
        </div>
        <div className="route-manager__map">
          <MapPreview
            googleMapURL={ url }
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
          >
            { route.render() }
          </MapPreview>
        </div>
      </div>
    );
  }
}
