import * as React from 'react';
import { Component } from 'react';
import './BaseInput.css'


export interface IBaseInputProps {
  placeholder: string,
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void,
}

export class BaseInput extends Component<IBaseInputProps, object> {

  public render() {
    return (
      <div className="base-input__container">
        <input
          placeholder={ this.props.placeholder }
          className="base-input__input"
          type="text"
          onKeyUp={ this.props.onKeyUp }
        />
      </div>
    );
  }
}
