import * as React from 'react';
import Icon, { ActionType } from './Icon';
import { ToolbarConfig } from './ViewerProps';

export interface ViewerToolbarProps {
  prefixCls: string;
  onAction: (config: ToolbarConfig) => void;
  alt: string;
  width: number;
  height: number;
  attribute: boolean;
  zoomable: boolean;
  rotatable: boolean;
  scalable: boolean;
  changeable: boolean;
  downloadable: boolean;
  noImgDetails: boolean;
  toolbars: ToolbarConfig[];
}

export const defaultToolbars: ToolbarConfig[] = [
 {
   key: 'zoomIn',
   actionType: ActionType.zoomIn,
 },
 {
   key: 'zoomOut',
   actionType: ActionType.zoomOut,
 },
 {
   key: 'prev',
   actionType: ActionType.prev,
 },
 {
   key: 'reset',
   actionType: ActionType.reset,
 },
 {
   key: 'next',
   actionType: ActionType.next,
 },
 {
   key: 'rotateLeft',
   actionType: ActionType.rotateLeft,
 },
 {
   key: 'rotateRight',
   actionType: ActionType.rotateRight,
 },
 {
   key: 'scaleX',
   actionType: ActionType.scaleX,
 },
 {
   key: 'scaleY',
   actionType: ActionType.scaleY,
 },
 {
   key: 'download',
   actionType: ActionType.download,
 },
];

function deleteToolbarFromKey(toolbars: ToolbarConfig[], keys: string[]) {
  const targetToolbar = toolbars.filter(item => keys.indexOf(item.key) < 0);

  return targetToolbar;
}

export default class ViewerToolbar extends React.Component<ViewerToolbarProps, any> {

  constructor() {
    super();
  }

  handleAction(config: ToolbarConfig) {
    this.props.onAction(config);
  }

  renderAction = (config: ToolbarConfig) => {
    let content = null;
    // default toolbar
    if (typeof ActionType[config.actionType] !== 'undefined') {
      content = <Icon type={config.actionType}/>;
    }
    // extra toolbar
    if (config.render) {
      content = config.render;
    }
    return (
      <li
        key={config.key}
        className={`${this.props.prefixCls}-btn`}
        onClick={() => {this.handleAction(config);}}
        data-key={config.key}
      >
          {content}
      </li>
    );
  }

  render() {
    let attributeNode = this.props.attribute ? (
      <p className={`${this.props.prefixCls}-attribute`}>
        {this.props.alt && `${this.props.alt}`}
        {this.props.noImgDetails || <span className={`${this.props.prefixCls}-img-details`}>
          {`(${this.props.width} x ${this.props.height})`}
        </span>}
      </p>
    ) : null;
    let toolbars = this.props.toolbars;
    if (!this.props.zoomable) {
      toolbars = deleteToolbarFromKey(toolbars, ['zoomIn', 'zoomOut']);
    }
    if (!this.props.changeable) {
      toolbars = deleteToolbarFromKey(toolbars, ['prev', 'next']);
    }
    if (!this.props.rotatable) {
      toolbars = deleteToolbarFromKey(toolbars, ['rotateLeft', 'rotateRight']);
    }
    if (!this.props.scalable) {
      toolbars = deleteToolbarFromKey(toolbars, ['scaleX', 'scaleY']);
    }
    if (!this.props.downloadable) {
      toolbars = deleteToolbarFromKey(toolbars, ['download']);
    }
    return (
      <div>
        {attributeNode}
        <ul className={`${this.props.prefixCls}-toolbar`}>
          {toolbars.map(item => {
            return this.renderAction(item);
          })}
        </ul>
      </div>
    );
  }
}
