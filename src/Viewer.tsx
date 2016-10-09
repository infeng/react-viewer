import * as React from 'react';
import './style/index.less';

function noop() {}

export default class Viewer extends React.Component<ViewerProps, any> {
  static defaultProps = {
    visible: false,
    onClose: noop,
  };

  private prefixCls: string;

  constructor() {
    super();

    this.prefixCls = 'react-viewer';
  }

  handleClose(e) {
    this.props.onClose();
  }

  render() {
    return (
      <div style={{display: this.props.visible ? 'block' : 'none'}}>
        <div className={`${this.prefixCls}-mask`}></div>
        <div className={`${this.prefixCls}-close`} onClick={this.handleClose.bind(this)}></div>
      </div>
    );
  }
}
