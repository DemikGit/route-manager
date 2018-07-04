import * as React from 'react';
import { Component } from 'react';
import { IMarker } from '../../classes/RMRoute';

import { MarkerWrapper } from '../MarkerWrapper/MarkerWrapper';
import './MarkerList.css';


export interface IMarkerListProps {
  routeMarkers: IMarker[],
  onPointDelete: (id: string) => void,
  swapPoints: (srcId: string, targetId: string) => void,
}

export interface IMarkerListState {
  srcId: string,
}

export class MarkerList extends Component<IMarkerListProps, IMarkerListState> {

  public state = {
    srcId: '',
  }

  public render() {
    const { routeMarkers, onPointDelete } = this.props;

    return (
      <div className="marker-list__container">
        {
          routeMarkers.length > 0 && routeMarkers.map(( marker: IMarker ) => {
            const extendedOnDragEnter =
              (event: React.SyntheticEvent<HTMLDivElement>) => {
                this.onDragEnter(marker.id);
            }

            const extendedOnDragStart =
              (event: React.SyntheticEvent<HTMLDivElement>) => {
                if (event.nativeEvent instanceof DragEvent) {
                  event.nativeEvent.dataTransfer.setData('text/plain', 'data');
                }
                this.onDragStart(marker.id);
            }
            return (
              <div
                key={ marker.id }
                className="marker-list__marker"
              >
                <MarkerWrapper
                  onDragEnter={ extendedOnDragEnter }
                  onDragStart={ extendedOnDragStart }
                  id={ marker.id }
                  onPointDelete={ onPointDelete }
                  name={ marker.name }
                />
              </div>
            );
          })
        }
      </div>
    );
  }

  private onDragEnter = (targetId: string ) => {
    const { srcId } = this.state;
    this.props.swapPoints(srcId, targetId);
  }

  private onDragStart = (srcId: string) => {
    this.setState((state: IMarkerListState) => {
      return { srcId };
    });
  }
}
