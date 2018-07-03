import * as React from 'react';
import { Component } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps"
import './MapPreview.css'


export interface IMapPreviewProps {
  isMarkerShown: boolean,
  children: JSX.Element[],
  mountMap: React.RefObject<GoogleMap>,
}

class MapPreviewComponent extends Component<IMapPreviewProps, object> {
  public render() {

    const { mountMap, isMarkerShown, children } = this.props;

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        ref={ mountMap }
      >
        {
          isMarkerShown && children
        }
      </GoogleMap>
    );
  }
}

export const MapPreview = withScriptjs(
  withGoogleMap (
    MapPreviewComponent
  )
);
