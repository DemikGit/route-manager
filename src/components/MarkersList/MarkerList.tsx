import * as React from 'react';
import { Component } from 'react';
import './MarkerList.css'


export interface IMarkerListProps {
  routeMarkers: JSX.Element[],
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
