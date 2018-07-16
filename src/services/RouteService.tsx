import * as React from 'react';
import { InfoWindow, Marker, Polyline } from 'react-google-maps';

export interface IMarker {
  id: string,
  name: string,
  draggable: boolean,
  showInfoBox: boolean,
  onDrag: (position: google.maps.LatLngLiteral, id: string) => void,
  position: google.maps.LatLngLiteral,
}

export class RouteService {
  /* tslint:disable variable-name*/
  private _markers: IMarker[];
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
      onDrag: (position: google.maps.LatLngLiteral, id: string) => {
        this.onDrag(position, id);
      },
      position: { lat: 0, lng: 0 },
      showInfoBox: false,
    };
  }

  public swapPoints = (srcId: string, targetId: string): void => {
    if(srcId !== targetId) {
      const newMarkers = this._markers;

      const srcMarkerIndex = this._markers.findIndex((marker: IMarker) => {
        return marker.id === srcId;
      });
      const srcMarker = this._markers[srcMarkerIndex];

      const targetMarkerIndex = this._markers.findIndex((marker: IMarker) => {
        return marker.id === targetId;
      });
      const targetMarker = this._markers[targetMarkerIndex];

      newMarkers[targetMarkerIndex] = srcMarker;
      newMarkers[srcMarkerIndex] = targetMarker;

      this._markers = newMarkers;
      this._componentUpdate();
    }
  }

  public onDrag = (position: google.maps.LatLngLiteral, id: string): void => {
    const markerTarget: IMarker | undefined =
      this._markers.find((point: IMarker) => {
        return point.id.includes(id);
    });

    if (markerTarget) {
      markerTarget.position = position;
    }

    this._componentUpdate();
  }

  public onPointDelete = (id: string): void => {
    this._markers = this._markers.filter((point: IMarker) => {
      return !point.id.includes(id);
    });

    this._componentUpdate();
  }

  public onToggleInfoBox = (id: string): void => {
    const targetMarker: IMarker | undefined = this._markers.find(
      (marker: IMarker): boolean => {
        return marker.id === id;
      }
    );

    if( targetMarker ) {
      targetMarker.showInfoBox = !targetMarker.showInfoBox;
    }

    this._componentUpdate();
  }

  public onAddPoint = (
    name: string,
    position: google.maps.LatLngLiteral
  ): void => {
    if (position && name) {
      this._markers.push({
        ...this.defaultPoint,
        id: this.uuidV4(),
        name,
        position,
      });
    }

    this._componentUpdate();
  }

  public render = (): JSX.Element[] => {
    return this.renderMarkers().concat(this.renderPolyline());
  }

  private renderMarkers = (): JSX.Element[] => {
    const markers: JSX.Element[] = [];

    this._markers.forEach((marker) => {
      const { onDrag, draggable, position, id } = marker;
      const extendedDrag = ( event: google.maps.MouseEvent) => {
        onDrag(event.latLng.toJSON(), id);
      };

      const extendedToggleInfoBox = ( ) => {
        this.onToggleInfoBox(id);
      };

      markers.push(
        <Marker
          key={ id }
          onClick={ extendedToggleInfoBox }
          onDrag={ extendedDrag }
          draggable={ draggable }
          position={ position }
          labelAnchor={ new google.maps.Point(0, 0) }
        >
          { marker.showInfoBox && (
            <InfoWindow
              onCloseClick={ extendedToggleInfoBox }
            >
              <div>
                {`  ${ marker.name }`}
              </div>
            </InfoWindow>
          )}
        </Marker>
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
