import * as React from 'react';
import './style/index.less';
import ViewerFooter from './ViewerFooter';

function noop() {}

interface ViewerState {
  activeIndex: number;
}

export default class Viewer extends React.Component<ViewerProps, ViewerState> {
  static defaultProps = {
    visible: false,
    onClose: noop,
    images: [],
  };

  private prefixCls: string;

  constructor() {
    super();

    this.prefixCls = 'react-viewer';

    this.state = {
      activeIndex: 0,
    };
  }

  handleClose(e) {
    this.props.onClose();
  }

  render() {
    return (
      <div style={{display: this.props.visible ? 'block' : 'none'}}>
        <div className={`${this.prefixCls}-mask`}></div>
        <div className={`${this.prefixCls}-close`} onClick={this.handleClose.bind(this)}></div>
        <div className={`${this.prefixCls}-container`}>
        </div>
        <ViewerFooter
        prefixCls={this.prefixCls}
        images={this.props.images}
        activeIndex={this.state.activeIndex}
        />
      </div>
    );
  }
}
