import * as React from 'react';
import { Component } from 'react';
import { BaseInput } from '../BaseInput/BaseInput';
import './RouteManager.css'

import { GoogleMap, Marker, Polyline } from "react-google-maps"
import { MapPreview } from '../MapPreview/MapPreview';
import { MarkerList } from '../MarkersList/MarkerList';

export interface IRouteManagerProps {
  text: string,
}

export interface IMarker {
  draggable: boolean,
  onDrag: (event:any, index: number) => void,
  position: {
    lat: number,
    lng: number,
  }
}

export interface IRouteManagerState {
  apiParams: {
    key: string,
    libs: string,
    version: string,
  },
  markers: IMarker[],
}

export class RouteManager extends Component<IRouteManagerProps, IRouteManagerState> {
  public state = {

    apiParams: {
      key: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg',
      libs: 'geometry,drawing,places',
      version: '3.exp',
    },

    markers: [
      {
        draggable: true,
        onDrag: (event: google.maps.MouseEvent, index: number) => {
          this.onDrag(event, index)
        },
        position: {
          lat: -34,
          lng: 146.644,
        },
      },
      {
        draggable: true,
        onDrag: (event: google.maps.MouseEvent, index: number) => {
          this.onDrag(event, index)
        },
        position: {
          lat: -35,
          lng: 145.644,
        },
      },
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
            defaultCenter={{ lat: -34.397, lng: 145.644 }}
            loadingElement={ <div style={{ height: '100%' }} /> }
            containerElement={
              <div style={{ width: '100%', height: '50%' }} />
            }
            mapElement={ <div style={{ height: '100%' }} /> }
            isMarkerShown={ true }
            mountMap={ this.mapRef }
          >
            {
              this.renderMarkers()
            }
            {
              this.renderPolyline()
            }
          </MapPreview>
        </div>
      </div>
    );
  }

  private renderMarkers = () => {
    const markers: JSX.Element[] = [];

    this.state.markers.forEach((marker, index) => {
      const { onDrag, draggable, position } = marker;
      const extendedDrag = ( event: google.maps.MouseEvent) => {
        onDrag(event, index);
      };
      markers.push(
        <Marker
          key={ index.toString() }
          onDrag={ extendedDrag }
          draggable={ draggable }
          position={ position }
        />
      );
    })

    return markers;
  }

  private renderPolyline = () => {
    const path: google.maps.LatLngLiteral[] = [];

    this.state.markers.forEach((marker) => {
      path.push(marker.position);
    })

    return <Polyline path={ path } />;
  }

  private onAddPoint = () => {
    if (this.mapRef.current) {
      const { lat: centerLat, lng: centerLng } = this.mapRef.current.getCenter();

      this.setState((state: IRouteManagerState) => {
        const newMarkers: IMarker[] = state.markers;

        newMarkers.push({
          draggable: true,
          onDrag: (event: google.maps.MouseEvent, index: number) => {
            this.onDrag(event, index)
          },
          position: {
            lat: centerLat(),
            lng: centerLng(),
          },
        })

        return {
          markers: newMarkers,
        };
      });
    }
  }

  private onDrag = (event: google.maps.MouseEvent, index: number): void => {
    const { lat, lng } = event.latLng;

    this.setState((state: IRouteManagerState) => {
      const newMarkers: IMarker[] = state.markers;

      newMarkers[index].position = { lat: lat() , lng: lng() };

      return {
        markers: newMarkers,
      };
    });

  }

}
