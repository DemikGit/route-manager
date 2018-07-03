import * as React from 'react';
import { Component } from 'react';
import './MarkerWrapper.css'


export interface IMarkerWrapperProps {
  text: string,
}

export class MarkerWrapper extends Component<IMarkerWrapperProps, object> {
  public render() {
    return (
      <div className="marker-wrapper__container"/>
    );
  }
}
