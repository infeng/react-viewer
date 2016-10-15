import * as React from 'react';
import './style/index.less';
import ViewerCavans from './ViewerCavans';
import ViewerNav from './ViewerNav';
import ViewerProps from './ViewerProps';

function noop() {}

export interface ViewerCoreState {
  activeIndex?: number;
}

export default class ViewerCore extends React.Component<ViewerProps, ViewerCoreState> {
  static defaultProps = {
    visible: false,
    onClose: noop,
    images: [],
    activeIndex: 0,
  };

  private prefixCls: string;

  constructor(props) {
    super(props);

    this.prefixCls = 'react-viewer';

    this.state = {
      activeIndex: this.props.activeIndex,
    };

    this.handleChangeImg = this.handleChangeImg.bind(this);
  }

  handleClose(e) {
    this.props.onClose();
  }

  handleChangeImg(newIndex: number) {
    let newState = this.state;
    newState.activeIndex = newIndex;
    this.setState(newState);
  }

  componentWillReceiveProps(nextProps: ViewerProps) {
    if (this.state.activeIndex !== nextProps.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  render() {
    let activeImgSrc = '';
    if (this.props.images.length > 0) {
      activeImgSrc = this.props.images[this.state.activeIndex];
    }

    return (
      <div style={{display: this.props.visible ? 'block' : 'none'}}>
        <div className={`${this.prefixCls}-mask`}></div>
        <div className={`${this.prefixCls}-close`} onClick={this.handleClose.bind(this)}></div>
        <ViewerCavans
        prefixCls={this.prefixCls}
        imgSrc={activeImgSrc}
        visible={this.props.visible}
        />
        <div className={`${this.prefixCls}-footer`}>
          <ViewerNav
          prefixCls={this.prefixCls}
          images={this.props.images}
          activeIndex={this.state.activeIndex}
          onChangeImg={this.handleChangeImg}
          />
        </div>
      </div>
    );
  }
}
