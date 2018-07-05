import * as React from 'react';
import { Component } from 'react';
import { BaseInput } from '../BaseInput/BaseInput';
import './RouteManager.css'

import { GoogleMap } from "react-google-maps"
import { RouteService } from '../../services/RouteService';
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
  routeService: RouteService,
}

export class RouteManager extends Component<IRouteManagerProps, IRouteManagerState> {
  public state = {

    apiParams: {
      key: 'AIzaSyDSnQhXn5WfyBi68hCgx5qA4pmApKkN8Jc',
      libs: 'geometry,drawing,places',
      version: '3.exp',
    },

    routeService: new RouteService(),
  }

  private mapRef: React.RefObject<GoogleMap> = React.createRef();

  public componentDidMount() {
    const { routeService } = this.state;
    routeService.mapRef = this.mapRef;
    routeService.updateComponent = () => this.forceUpdate();
  }

  public render() {
    const { routeService } = this.state;
    const { key, libs, version } = this.state.apiParams;

    const url = `https://maps.googleapis.com/maps/api/js?key=${
      key }&v=${ version }&libraries=${ libs }`;

    return (
      <div className="route-manager__container">
        <div className="route-manager__controls">
          <BaseInput
            placeholder="Enter name for new routes point..."
            onAddPoint={ routeService.onAddPoint }
          />
          <MarkerList
            routeMarkers={ routeService.markers }
            onPointDelete={ routeService.onPointDelete }
            swapPoints={ routeService.swapPoints }
          />
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
            { routeService.render() }
          </MapPreview>
        </div>
      </div>
    );
  }
}
