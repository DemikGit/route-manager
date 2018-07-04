import * as React from 'react';
import { GoogleMap, Marker, Polyline } from 'react-google-maps';


export interface IMarker {
  id: string,
  name: string,
  draggable: boolean,
  onDrag: (event: google.maps.MouseEvent, id: string) => void,
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
      id: '',
      name: '',
      onDrag: (event: google.maps.MouseEvent, id: string) => {
        this.onDrag(event, id);
      },
      position: {
        lat: 0,
        lng: 0,
      },
    };
  }

  public onDrag = (event: google.maps.MouseEvent, id: string): void => {
    const { lat, lng } = event.latLng;

    const markerTarget: IMarker | undefined =
      this._markers.find((point: IMarker) => {
        return point.id.includes(id);
    });

    if (markerTarget) {
      markerTarget.position = { lat: lat() , lng: lng() };
    }

    this._componentUpdate();
  }

  public onPointDelete = (id: string): void => {
    this._markers = this._markers.filter((point: IMarker) => {
      return !point.id.includes(id);
    });
    this._componentUpdate();
  }

  public onAddPoint = (name: string): void => {
    if (this._mapRef.current) {

      const {
        lat: centerLat,
        lng: centerLng,
      } = this._mapRef.current.getCenter();

      this._markers.push({
        ...this.defaultPoint,
        id: this.uuidV4(),
        name,
        position: { lat: centerLat(), lng: centerLng() },
      });

      this._componentUpdate();
    }
  }

  public render = (): JSX.Element[] => {
    return this.renderMarkers().concat(this.renderPolyline());
  }

  private renderMarkers = (): JSX.Element[] => {
    const markers: JSX.Element[] = [];

    this._markers.forEach((marker) => {
      const { onDrag, draggable, position, id } = marker;
      const extendedDrag = ( event: google.maps.MouseEvent) => {
        onDrag(event, id);
      };

      markers.push(
        <Marker
          key={ id }
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
          key={ this.uuidV4() }
          options={ this.polylineOptions }
          path={ path }
        />,
      ];
    }

    return [];
  }

  private uuidV4 = (): string => {
    // tslint:disable:no-bitwise
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    // tslint:enable:no-bitwise
  }

}
