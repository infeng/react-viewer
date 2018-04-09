import * as React from 'react';
import Icon, { ActionType } from './Icon';

export interface ViewerToolbarProps {
  prefixCls: string;
  onAction: (type: ActionType) => void;
  alt: string;
  width: number;
  height: number;
  attribute: boolean;
  zoomable: boolean;
  rotatable: boolean;
  scalable: boolean;
  changeable: boolean;
  downloadable: boolean;
}

export default class ViewerToolbar extends React.Component<ViewerToolbarProps, any> {

  constructor() {
    super();
  }

  handleAction(type: ActionType) {
    this.props.onAction(type);
  }

  render() {
    let attributeNode = this.props.attribute ? (
      <p className={`${this.props.prefixCls}-attribute`}>
        {`${this.props.alt}(${this.props.width} x ${this.props.height})`}
      </p>
    ) : null;
    let featureNodeArr = [];
    if (this.props.zoomable) {
      featureNodeArr = featureNodeArr.concat([
        <li
        key="zoomIn"
        className={`${this.props.prefixCls}-btn`}
        onClick={() => {this.handleAction(ActionType.zoomIn);}}>
          <Icon type={ActionType.zoomIn}/>
        </li>,
        <li
        key="zoomOut"
        className={`${this.props.prefixCls}-btn`}
        onClick={() => {this.handleAction(ActionType.zoomOut);}}>
          <Icon type={ActionType.zoomOut}/>
        </li>,
      ]);
    }
    if (this.props.changeable) {
      featureNodeArr = featureNodeArr.concat([
        <li
        key="prev"
        className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.prev);}}>
          <Icon type={ActionType.prev}/>
        </li>,
        <li
        key="reset"
        className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.reset);}}>
          <Icon type={ActionType.reset}/>
        </li>,
        <li
        key="next"
        className={`${this.props.prefixCls}-btn`} onClick={() => {this.handleAction(ActionType.next);}}>
          <Icon type={ActionType.next}/>
        </li>,
      ]);
    }
    if (this.props.rotatable) {
      featureNodeArr = featureNodeArr.concat([
        <li
        key="rotateLeft"
        className={`${this.props.prefixCls}-btn`}
        onClick={() => {this.handleAction(ActionType.rotateLeft);}}>
          <Icon type={ActionType.rotateLeft}/>
        </li>,
        <li
        key="rotateRight"
        className={`${this.props.prefixCls}-btn`}
        onClick={() => {this.handleAction(ActionType.rotateRight);}}>
          <Icon type={ActionType.rotateRight}/>
        </li>,
      ]);
    }
    if (this.props.scalable) {
      featureNodeArr = featureNodeArr.concat([
        <li
        key="scaleX"
        className={`${this.props.prefixCls}-btn`}
        onClick={() => {this.handleAction(ActionType.scaleX);}}>
          <Icon type={ActionType.scaleX}/>
        </li>,
        <li
        key="scaleY"
        className={`${this.props.prefixCls}-btn`}
        onClick={() => {this.handleAction(ActionType.scaleY);}}>
          <Icon type={ActionType.scaleY}/>
        </li>,
      ]);
    }
    if (this.props.downloadable) {
      featureNodeArr = featureNodeArr.concat([
        <li
        key="download"
        className={`${this.props.prefixCls}-btn`}
        onClick={() => {this.handleAction(ActionType.download);}}>
          <Icon type={ActionType.download}/>
        </li>,
      ]);
    }
    return (
      <div>
        {attributeNode}
        <ul className={`${this.props.prefixCls}-toolbar`}>
          {featureNodeArr}
        </ul>
      </div>
    );
  }
}
