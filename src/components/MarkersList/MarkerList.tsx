import * as React from 'react';
import { Component } from 'react';
import { IMarker } from '../../classes/RMRoute';

import { MarkerWrapper } from '../MarkerWrapper/MarkerWrapper';
import './MarkerList.css';


export interface IMarkerListProps {
  routeMarkers: IMarker[],
  onPointDelete: (index: number) => void,
}

export class MarkerList extends Component<IMarkerListProps, object> {
  public render() {
    const { routeMarkers, onPointDelete } = this.props;

    return (
      <div className="marker-list__container">
        {
          routeMarkers.map(( marker , index ) => {
            const extendetDelete = () => {
              onPointDelete(index);
            }
            return (
              <div
                key={ index.toString() }
                className="marker-list__marker"
              >
                <MarkerWrapper
                  onPointDelete={ extendetDelete }
                  name={ marker.name }
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}
