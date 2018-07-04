import * as React from 'react';
import { Component } from 'react';
import { IMarker } from '../../classes/RMRoute';

import { MarkerWrapper } from '../MarkerWrapper/MarkerWrapper';
import './MarkerList.css';


export interface IMarkerListProps {
  routeMarkers: IMarker[],
  onPointDelete: (id: string) => void,
}

export class MarkerList extends Component<IMarkerListProps, object> {
  public render() {
    const { routeMarkers, onPointDelete } = this.props;

    return (
      <div className="marker-list__container">
        {
          routeMarkers.map(( marker: IMarker ) => {
            const extendetDelete = () => {
              onPointDelete(marker.id);
            }
            return (
              <div
                key={ marker.id }
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
