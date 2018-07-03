import * as React from 'react';
import { Component } from 'react';
import './BaseInput.css'


export interface IBaseInputProps {
  text: string,
  onAddPoint: () => void,
}

export class BaseInput extends Component<IBaseInputProps, object> {

  public render() {
    return (
      <div className="base-input__container">
        <input type="text" onKeyUp={ this.onKeyUp }/>
      </div>
    );
  }

  private onKeyUp = ( event: React.SyntheticEvent<HTMLInputElement> ) => {
    if (event.nativeEvent instanceof KeyboardEvent) {
      if (event.nativeEvent.keyCode === 13) {
        this.props.onAddPoint();
      }
    }
  }
}
