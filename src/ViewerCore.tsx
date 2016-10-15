import * as React from 'react';

export interface ViewerCoreProps {
  prefixCls: string;
  imgSrc: string;
  visible: boolean;
}

interface ViewerCoreState {
  width?: number;
  top?: number;
  left?: number;
  isMouseDown?: boolean;
  mouseX?: number;
  mouseY?: number;
}

export default class ViewerCore extends React.Component<ViewerCoreProps, ViewerCoreState> {

  constructor() {
    super();

    this.state = {
      width: 0,
      top: 15,
      left: null,
      isMouseDown: false,
      mouseX: 0,
      mouseY: 0,
    };

    this.handleMouseScroll = this.handleMouseScroll.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.bindEvent = this.bindEvent.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.bindEvent();
    this.resizeImg(this.props.imgSrc);
  }

  resizeImg(imgSrc) {
    let img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      let width = 0;
      let height = 0;
      let imgWidth = img.width;
      let imgHeight = img.height;
      let aspectRatio = imgWidth / imgHeight;
      if (aspectRatio > 1) {
        width = Math.min(window.innerWidth * .9, imgWidth);
        height = (width / imgWidth) * imgHeight;
      }else {
        height = Math.min((window.innerHeight - 52) * .8, imgHeight);
        width = (height / imgHeight) * imgWidth;
      }
      let left = ( window.innerWidth - width ) / 2;
      let top = (window.innerHeight - height) / 2;
      this.setState({
        width: width,
        left: left,
        top: top,
      });
    };
  }

  handleResize(e) {
    this.resizeImg(this.props.imgSrc);
  }

  handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isMouseDown: true,
      mouseX: e.nativeEvent.pageX,
      mouseY: e.nativeEvent.pageY,
    });
  }

  handleMouseMove(e) {
    if (this.state.isMouseDown) {
      let diffX = e.x - this.state.mouseX;
      let diffY = e.y - this.state.mouseY;
      this.setState({
        top: this.state.top + diffY,
        left: this.state.left + diffX,
        mouseX: e.x,
        mouseY: e.y,
      });
    }
  }

  handleMouseUp(e) {
    this.setState({
      isMouseDown: false,
    });
  }

  handleMouseScroll(e) {
    let direct: 0 | 1 | -1 = 0;
    if (e.wheelDelta) {
      direct = e.wheelDelta > 0 ? 1 : -1;
    }else if (e.detail) {
      direct = e.detail > 0 ? 1 : -1;
    }
    if (direct !== 0) {
      this.setState({
        width: this.state.width + direct * this.state.width * 0.05,
      });
    }
  }

  bindEvent(remove?: boolean) {
    let funcName = 'addEventListener';
    if (remove) {
      funcName = 'removeEventListener';
    }
    document[funcName]('mousewheel', this.handleMouseScroll, false);
    document[funcName]('click', this.handleMouseUp, false);
    document[funcName]('mousemove', this.handleMouseMove, false);
    window[funcName]('resize', this.handleResize, false);
  }

  componentWillReceiveProps(nextProps: ViewerCoreProps) {
    if (this.props.imgSrc !== nextProps.imgSrc) {
      this.resizeImg(nextProps.imgSrc);
    }
    if (!this.props.visible && nextProps.visible) {
      this.bindEvent();
      this.resizeImg(this.props.imgSrc);
    }
    if (this.props.visible && !nextProps.visible) {
      this.bindEvent(true);
    }
  }

  render() {
    let imgStyle: React.CSSProperties = {
      width: `${this.state.width}px`,
      marginTop: `${this.state.top}px`,
      marginLeft: this.state.left ? `${this.state.left}px` : 'auto',
    };

    let imgClass = '';
    if (!this.state.isMouseDown) {
      imgClass = `${this.props.prefixCls}-transition`;
    }

    return (
      <div
      className={`${this.props.prefixCls}-core`}
      onMouseDown={this.handleMouseDown}
      >
        <img
        ref="img"
        className={imgClass}
        src={this.props.imgSrc}
        style={imgStyle}
        onMouseDown={this.handleMouseDown}
        />
      </div>
    );
  }
}
