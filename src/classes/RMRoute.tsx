import * as React from 'react';
import { GoogleMap, Marker, Polyline } from 'react-google-maps';


export interface IMarker {
  name: string,
  draggable: boolean,
  onDrag: (event: google.maps.MouseEvent, index: number) => void,
  position: {
    lat: number,
    lng: number,
  }
}

export class RMRoute {
  /* tslint:disable variable-name*/
  private _markers: IMarker[];
  private _mapRef: React.RefObject<GoogleMap>;
  private _componentUpdate: () => void;
  /* tslint:enable variable-name */

  private defaultPoint: IMarker;
  private polylineOptions: {
      strokeColor: string,
      strokeOpacity: number,
      strokeWeight: number,
  };

  public set updateComponent(componentUpdate: () => void) {
    this._componentUpdate = componentUpdate;
  }

  public get markers() : IMarker[] {
    return this._markers;
  }

  public set mapRef(mapRef: React.RefObject<GoogleMap>) {
    this._mapRef = mapRef;
  }

  constructor() {
    this._markers = [];
    this.polylineOptions = {
      strokeColor: '#4bdded',
      strokeOpacity: 0.85,
      strokeWeight: 4,
    };
    this.defaultPoint = {
      draggable: true,
      name: '',
      onDrag: (event: google.maps.MouseEvent, index: number) => {
        this.onDrag(event, index)
      },
      position: {
        lat: 0,
        lng: 0,
      },
    };
  }

  public onDrag = (event: google.maps.MouseEvent, index: number): void => {
    const { lat, lng } = event.latLng;

    const newMarkers: IMarker[] = this._markers;
    newMarkers[index].position = { lat: lat() , lng: lng() };

    this._markers = newMarkers;
    this._componentUpdate();
  }

  public onAddPoint = (name: string): void => {
    if (this._mapRef.current) {

      const {
        lat: centerLat,
        lng: centerLng,
      } = this._mapRef.current.getCenter();

      const newMarkers: IMarker[] = this._markers;

      newMarkers.push({
        ...this.defaultPoint,
        name,
        position: { lat: centerLat(), lng: centerLng() },
      });

      this._markers = newMarkers;
      this._componentUpdate();
    }
  }

  public render = (): JSX.Element[] => {
    return this.renderMarkers().concat(this.renderPolyline());
  }

  private renderMarkers = (): JSX.Element[] => {
    const markers: JSX.Element[] = [];

    this._markers.forEach((marker, index) => {
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

  private renderPolyline = (): JSX.Element[] => {
    if (this._markers.length > 0) {
      const path: google.maps.LatLngLiteral[] = [];

      this._markers.forEach((marker: IMarker) => {
        path.push(marker.position);
      })

      return [
        <Polyline
          key="uniq_polyline"
          options={ this.polylineOptions }
          path={ path }
        />,
      ];
    }

    return [];
  }

}
