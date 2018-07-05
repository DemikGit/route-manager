import * as React from 'react';
import { Component } from 'react';

import { IMarker } from '../../services/RouteService';

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

  public renderMarkers = () => {
    const { routeMarkers, onPointDelete } = this.props;

    return routeMarkers.map(( marker: IMarker ) => {
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

  public render() {
    const { routeMarkers } = this.props;

    return (
      routeMarkers.length > 0 && (
        <div className="marker-list__container">
          { this.renderMarkers() }
        </div>
      )
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
