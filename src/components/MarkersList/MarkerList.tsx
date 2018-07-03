import * as React from 'react';
import { Component } from 'react';
import { IMarker } from '../../classes/RMRoute';

import { MarkerWrapper } from '../MarkerWrapper/MarkerWrapper';
import './MarkerList.css';


export interface IMarkerListProps {
  routeMarkers: IMarker[],
}

export class MarkerList extends Component<IMarkerListProps, object> {
  public render() {
    return (
      <div className="marker-list__container">
        {
          this.props.routeMarkers.map(( marker , index ) => {
            return (
              <div
                key={ index.toString() }
                className="marker-list__marker"
              >
                <MarkerWrapper name={ marker.name } />
              </div>
            );
          })
        }
      </div>
    );
  }
}
