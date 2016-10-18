import * as React from 'react';

export interface ViewerToolbarProps {
  prefixCls: string;
  onAction: (type: ActionType) => void;
  alt: string;
  width: number;
  height: number;
}

export enum ActionType {
  zoomIn = 1,
  zoomOut = 2,
  prev = 3,
  next = 4,
  rotateLeft = 5,
  rotateRight = 6,
}

export default class ViewerToolbar extends React.Component<ViewerToolbarProps, any> {

  constructor() {
    super();
  }

  handleAction(type: ActionType) {
    this.props.onAction(type);
  }

  render() {
    return (
      <div>
        <p className={`${this.props.prefixCls}-attribute`}>
          {`${this.props.alt}(${this.props.width} x ${this.props.height})`}
        </p>
        <ul className={`${this.props.prefixCls}-toolbar`}>
          <li onClick={() => {this.handleAction(ActionType.zoomIn);}}>
            <i className={`${this.props.prefixCls}-zoom-in`}></i>
          </li>
          <li onClick={() => {this.handleAction(ActionType.zoomOut);}}>
            <i className={`${this.props.prefixCls}-zoom-out`}></i>
          </li>
          <li onClick={() => {this.handleAction(ActionType.prev);}}>
            <i className={`${this.props.prefixCls}-prev`}></i>
          </li>
          <li className="empty"></li>
          <li onClick={() => {this.handleAction(ActionType.next);}}>
            <i className={`${this.props.prefixCls}-next`}></i>
          </li>
          <li onClick={() => {this.handleAction(ActionType.rotateLeft);}}>
            <i className={`${this.props.prefixCls}-rotate-left`}></i>
          </li>
          <li onClick={() => {this.handleAction(ActionType.rotateRight);}}>
            <i className={`${this.props.prefixCls}-rotate-right`}></i>
          </li>
        </ul>
      </div>
    );
  }
}
