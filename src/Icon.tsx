import * as React from 'react';

export enum ActionType {
  zoomIn = 1,
  zoomOut = 2,
  prev = 3,
  next = 4,
  rotateLeft = 5,
  rotateRight = 6,
  reset = 7,
  close = 8,
}

export interface IconProps {
  type: ActionType;
}

export default class Icon extends React.Component<IconProps, any> {
  render() {
    let prefixCls = 'react-viewer-icon';

    return (
      <i className={`${prefixCls} ${prefixCls}-${ActionType[this.props.type]}`}></i>
    );
  }
}
