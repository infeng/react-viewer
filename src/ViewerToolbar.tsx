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
  activeIndex: number;
  count: number;
  showTotal: boolean;
  totalName: string;
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

const toolbarLabels = {
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  prev: 'Previous image',
  reset: 'Reset image',
  next: 'Next image',
  rotateLeft: 'Rotate left',
  rotateRight: 'Rotate right',
  scaleX: 'Flip horizontally',
  scaleY: 'Flip vertically',
  download: 'Download image',
};

function deleteToolbarFromKey(toolbars: ToolbarConfig[], keys: string[]) {
  const targetToolbar = toolbars.filter(item => keys.indexOf(item.key) < 0);

  return targetToolbar;
}

export default function ViewerToolbar(props: ViewerToolbarProps) {
  function handleAction(config: ToolbarConfig) {
    props.onAction(config);
  }

  function renderAction(config: ToolbarConfig) {
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
        className={`${props.prefixCls}-btn`}
        onClick={() => {handleAction(config); }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ' || event.keyCode === 13 || event.keyCode === 32) {
            event.preventDefault();
            event.stopPropagation();
            handleAction(config);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={toolbarLabels[config.key] || config.key}
        data-key={config.key}
      >
          {content}
      </li>
    );
  }
  const totalLabel = `${props.activeIndex + 1} ${props.totalName} ${props.count}`;
  let attributeNode = props.attribute ? (
    <p className={`${props.prefixCls}-attribute`} data-total={props.showTotal ? totalLabel : undefined}>
      <span className={`${props.prefixCls}-caption`}>
        {props.alt && `${props.alt}`}
        {props.noImgDetails || <span className={`${props.prefixCls}-img-details`}>
          {`(${props.width} x ${props.height})`}
        </span>}
      </span>
      {props.showTotal
        && <span className={`${props.prefixCls}-showTotal`}>
          {totalLabel}</span>}
    </p>
  ) : null;
  let toolbars = props.toolbars;
  if (!props.zoomable) {
    toolbars = deleteToolbarFromKey(toolbars, ['zoomIn', 'zoomOut']);
  }
  if (!props.changeable) {
    toolbars = deleteToolbarFromKey(toolbars, ['prev', 'next']);
  }
  if (!props.rotatable) {
    toolbars = deleteToolbarFromKey(toolbars, ['rotateLeft', 'rotateRight']);
  }
  if (!props.scalable) {
    toolbars = deleteToolbarFromKey(toolbars, ['scaleX', 'scaleY']);
  }
  if (!props.downloadable) {
    toolbars = deleteToolbarFromKey(toolbars, ['download']);
  }
  return (
    <div>
      {attributeNode}
      <ul className={`${props.prefixCls}-toolbar`}>
        {toolbars.map(item => {
          return renderAction(item);
        })}
      </ul>
    </div>
  );
}
