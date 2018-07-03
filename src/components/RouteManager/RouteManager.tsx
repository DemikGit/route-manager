import * as React from 'react';
import { Component } from 'react';
import { BaseInput } from '../BaseInput/BaseInput';
import './RouteManager.css'

import { GoogleMap, Marker } from "react-google-maps"
import { MapPreview } from '../MapPreview/MapPreview';
import { MarkerList } from '../MarkersList/MarkerList';


export interface IRouteManagerProps {
  text: string,
}

export class RouteManager extends Component<IRouteManagerProps, object> {

  public state = {
    apiParams: {
      key: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg',
      libs: 'geometry,drawing,places',
      version: '3.exp',
    },
    markers: [
      <Marker key="lol" position={{ lat: -33, lng: 150.644 }} />,
      <Marker key="kek" position={{ lat: -34, lng: 150.644 }} />,
    ],
  }

  private mapRef: React.RefObject<GoogleMap> = React.createRef();

  public render() {
    const { key, libs, version } = this.state.apiParams;
    const url = `https://maps.googleapis.com/maps/api/js?key=${
      key }&v=${ version }&libraries=${ libs }`;

    return (
      <div className="route-manager__container">
        <div className="route-manager__controls">
          <BaseInput text="kek" onAddPoint={ this.onAddPoint } />
          <MarkerList routeMarkers={ this.state.markers } />
        </div>
        <div className="route-manager__map">
          <MapPreview
            googleMapURL={ url }
            loadingElement={ <div style={{ height: '100%' }} /> }
            containerElement={
              <div style={{ width: '100%', height: '50%' }} />
            }
            mapElement={ <div style={{ height: '100%' }} /> }
            isMarkerShown={ true }
            mountMap={ this.mapRef }
          >
            { this.state.markers }
          </MapPreview>
        </div>
      </div>
    );
  }

  private onAddPoint = () => {
    if (this.mapRef.current) {
      const { lat: centerLat, lng: centerLng } = this.mapRef.current.getCenter();
      // tslint:disable-next-line:no-console
      console.log(centerLat(), centerLng());
    }
  }

}
