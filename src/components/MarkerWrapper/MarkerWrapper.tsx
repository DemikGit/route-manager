import * as React from 'react';
import { Component } from 'react';
import './MarkerWrapper.css'


export interface IMarkerWrapperProps {
  name: string,
  onPointDelete: () => void,
}

export class MarkerWrapper extends Component<IMarkerWrapperProps, object> {
  public render() {
    const { name, onPointDelete } = this.props;
    return (
      <div
        className="marker-wrapper__container"
        onClick={ onPointDelete }
      >
        <div
          title={ name }
          className="marker-wrapper__name"
        >
          { name }
        </div>
      </div>
    );
  }
}
