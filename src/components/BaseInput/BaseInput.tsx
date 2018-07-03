import * as React from 'react';
import { Component } from 'react';
import './BaseInput.css'


export interface IBaseInputProps {
  text: string,
  onAddPoint: (name: string) => void,
}

export class BaseInput extends Component<IBaseInputProps, object> {

  private inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  public render() {
    return (
      <div className="base-input__container">
        <input
          className="base-input__input"
          ref={ this.inputRef }
          type="text"
          onKeyUp={ this.onKeyUp }
        />
      </div>
    );
  }

  private onKeyUp = ( event: React.SyntheticEvent<HTMLInputElement> ) => {
    if (event.nativeEvent instanceof KeyboardEvent) {
      if (event.nativeEvent.keyCode === 13) {
        this.createNewPoint();
      }
    }
  }

  private createNewPoint = (): void => {
    if (this.inputRef.current) {
      this.props.onAddPoint(this.inputRef.current.value);
      this.inputRef.current.value = '';
    }
  }
}
