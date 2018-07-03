import * as React from 'react';
import { Component } from 'react';
import { IMarker } from '../RouteManager/RouteManager';

import './MarkerList.css';


export interface IMarkerListProps {
  routeMarkers: IMarker[],
}

export class MarkerList extends Component<IMarkerListProps, object> {
  public render() {
    return (
      <div className="marker-list__container">
        { this.props.routeMarkers.map(( _ , index) => index ) }
      </div>
    );
  }
}
