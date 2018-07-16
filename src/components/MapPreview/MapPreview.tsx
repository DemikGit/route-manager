import * as React from 'react';
import { Component } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps"
import './MapPreview.css'


export interface IMapPreviewProps {
  children?: React.ReactNode,
  mountMap: React.RefObject<GoogleMap>,
  defaultCenter: {
    lat: number,
    lng: number,
  }
  defaultZoom: number,
}

class MapPreviewComponent extends Component<IMapPreviewProps, object> {
  public render() {

    const {
      mountMap,
      children,
      defaultCenter,
      defaultZoom,
    } = this.props;

    return (
      <GoogleMap
        defaultZoom={ defaultZoom }
        ref={ mountMap }
        mapTypeId={ google.maps.MapTypeId.HYBRID }
        defaultCenter={ defaultCenter }
      >
        { children && children }
      </GoogleMap>
    );
  }
}

export const MapPreview = withScriptjs(
  withGoogleMap (
    MapPreviewComponent
  )
);
