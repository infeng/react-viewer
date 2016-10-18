import * as React from 'react';
import Icon, { ActionType } from './Icon';

export interface ViewerToolbarProps {
  prefixCls: string;
  onAction: (type: ActionType) => void;
  alt: string;
  width: number;
  height: number;
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
          <li className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.zoomIn);}}>
            <Icon type={ActionType.zoomIn}/>
          </li>
          <li className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.zoomOut);}}>
            <Icon type={ActionType.zoomOut}/>
          </li>
          <li className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.prev);}}>
            <Icon type={ActionType.prev}/>
          </li>
          <li className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.reset);}}>
            <Icon type={ActionType.reset}/>
          </li>
          <li className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.next);}}>
            <Icon type={ActionType.next}/>
          </li>
          <li className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.rotateLeft);}}>
            <Icon type={ActionType.rotateLeft}/>
          </li>
          <li className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.rotateRight);}}>
            <Icon type={ActionType.rotateRight}/>
          </li>
        </ul>
      </div>
    );
  }
}
