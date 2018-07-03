import * as React from 'react';
import { Component } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps"
import './MapPreview.css'


export interface IMapPreviewProps {
  isMarkerShown: boolean,
  children: React.ReactNode[],
  mountMap: React.RefObject<GoogleMap>,
  defaultCenter: {
    lat: number,
    lng: number,
  }
}

class MapPreviewComponent extends Component<IMapPreviewProps, object> {
  public render() {

    const { mountMap, isMarkerShown, children, defaultCenter } = this.props;

    return (
      <GoogleMap
        defaultZoom={8}
        ref={ mountMap }
        defaultCenter={ defaultCenter }
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
