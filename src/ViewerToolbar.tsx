import * as React from 'react';
import Icon, { ActionType } from './Icon';
import { ToolbarConfig } from './ViewerProps';
import {FaAngleUp, FaAngleDown} from 'react-icons/fa';
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
  showExport: boolean;
  compareImages: boolean;
  showToggleToolbar: boolean;
}

export const defaultToolbars: ToolbarConfig[] = [
  {
    key: 'zoomIn',
    actionType: ActionType.zoomIn,
    title: 'Mais Zoom - CTRL + ↑',
  },
  {
    key: 'zoomOut',
    actionType: ActionType.zoomOut,
    title: 'Menos Zoom - CTRL + ↓',
  },
  {
    key: 'prev',
    actionType: ActionType.prev,
    title: 'Anterior - CTRL + ←',
  },
  {
    key: 'reset',
    actionType: ActionType.reset,
    title: 'Resetar - CTRL + Z',
  },
  {
    key: 'next',
    actionType: ActionType.next,
    title: 'Próximo - CTRL + →',
  },
  {
    key: 'rotateLeft',
    actionType: ActionType.rotateLeft,
    title: 'Rotacionar Esquerda - SHIFT + ←',
  },
  {
    key: 'rotateRight',
    actionType: ActionType.rotateRight,
    title: 'Rotacionar Direita - SHIFT + →',
  },
  {
    key: 'scaleX',
    actionType: ActionType.scaleX,
    title: 'Inverter Horizontal - SHIFT + ↑',
  },
  {
    key: 'scaleY',
    actionType: ActionType.scaleY,
    title: 'Inverter Vertical - SHIFT + ↓',
  },
  {
    key: 'download',
    actionType: ActionType.download,
    title: 'Download',
  },
  {
    key: 'export',
    actionType: ActionType.export,
    title: 'Exportar para PDF',
  },
  {
    key: 'compareImages',
    actionType: ActionType.compareImages,
    title: 'Comparar Imagens',
  },
];

function deleteToolbarFromKey(toolbars: ToolbarConfig[], keys: string[]) {
  const targetToolbar = toolbars.filter(item => keys.indexOf(item.key) < 0);

  return targetToolbar;
}

export default class ViewerToolbar extends React.Component<ViewerToolbarProps, any> {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  handleAction(config: ToolbarConfig) {
    this.props.onAction(config);
  }

  renderAction = (config: ToolbarConfig) => {
    let content = null;
    // default toolbar
    if (typeof ActionType[config.actionType] !== 'undefined') {
      content = <Icon type={config.actionType} />;
    }
    // extra toolbar
    if (config.render) {
      content = config.render;
    }
    return (
      <React.Fragment>
          {this.state.isVisible &&
            <li
              key={config.key}
              className={`${this.props.prefixCls}-btn`}
              onClick={() => { this.handleAction(config); }}
              title={config.title}
            >
              {content}
            </li>
          }
      </React.Fragment>
    );
  }

  toggleVisible = () => {
    this.setState({isVisible: !this.state.isVisible});
  }

  render() {
    let attributeNode = this.props.attribute ? (
      <p className={`${this.props.prefixCls}-attribute`}>
        {this.props.alt && `${this.props.alt}`}
        {this.props.noImgDetails || `(${this.props.width} x ${this.props.height})`}
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
    if (!this.props.showExport) {
      toolbars = deleteToolbarFromKey(toolbars, ['export']);
    }
    if (!this.props.compareImages) {
      toolbars = deleteToolbarFromKey(toolbars, ['compareImages']);
    }
    return (
      <div>
        {attributeNode}
        <ul className={`${this.props.prefixCls}-toolbar`}>
          {!!this.props.showToggleToolbar &&
            <li
              className={`${this.props.prefixCls}-btn`}
              onClick={this.toggleVisible}
              title={this.state.isVisible ? 'Recolher Barra de Ferramentas' : 'Expandir Barra de Ferramentas'}
              >
                <i
                className="react-viewer-icon">
                  {this.state.isVisible ? <FaAngleUp /> : <FaAngleDown />}
                </i>
            </li>
          }
          {toolbars.map(item => {
              return this.renderAction(item);
            })}
        </ul>
      </div>
    );
  }
}
