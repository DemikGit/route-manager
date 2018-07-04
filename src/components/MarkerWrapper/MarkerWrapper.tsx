import * as React from 'react';
import { Component } from 'react';
import './MarkerWrapper.css'


export interface IMarkerWrapperProps {
  name: string,
  id: string,
  onPointDelete: (id: string) => void,
  onDragEnter: (event: React.SyntheticEvent<HTMLDivElement> ) => void,
  onDragStart: (event: React.SyntheticEvent<HTMLDivElement> ) => void,
}

export class MarkerWrapper extends Component<IMarkerWrapperProps, object> {
  public render() {
    const { name, onPointDelete, id, onDragEnter, onDragStart } = this.props;
    const onDelete = () => { onPointDelete(id) };
    return (
      <div
        className="marker-wrapper__container"
        onDragEnter={ onDragEnter }
        onDragStart={ onDragStart }
        draggable={ true }
      >
        <div
          title={ name }
          className="marker-wrapper__name"
        >
          { name }
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0" y="0" width="200px" height="200px"
          version="1.1" viewBox="0 0 200 200"
          onClick={ onDelete }
          className="marker-wrapper__button"
        >
          <linearGradient
            id="linear-gradient"
            gradientTransform="rotate(60)"
          >
            <stop offset="0%" stopColor="rgb(245, 95, 26)"/>
            <stop offset="20%" stopColor="rgb(245, 95, 26)"/>
            <stop offset="80%" stopColor="rgb(255, 100, 100)"/>
            <stop offset="100%" stopColor="rgb(255, 100, 100)"/>
          </linearGradient>
          <path
            className="marker-wrapper__button__path"
            fill="url(#linear-gradient)"
            d="M86.60254037844386 0
              L 173.20508075688772 50
              L 173.20508075688772 150
              L 86.60254037844386 200
              L 0 150
              L 0 50
              Z"
          />
          <text x="50%" y="50%" className="marker-wrapper__button__text">
            ✖
          </text>
        </svg>
      </div>
    );
  }
}
