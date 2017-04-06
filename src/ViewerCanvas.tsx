import * as React from 'react';
import Loading from './Loading';

export interface ViewerCanvasProps {
  prefixCls: string;
  imgSrc: string;
  visible: boolean;
  width: number;
  height: number;
  top: number;
  left: number;
  rotate: number;
  onChangeImgState: (width: number, height: number, top: number, left: number) => void;
  onResize: () => void;
  onZoom: (targetX: number, targetY: number, direct: number, scale: number) => void;
  zIndex: number;
  scaleX: 1 | -1;
  scaleY: 1 | -1;
  loading: boolean;
  drag: boolean;
}

export interface ViewerCanvasState {
  isMouseDown?: boolean;
  mouseX?: number;
  mouseY?: number;
}

export default class ViewerCanvas extends React.Component<ViewerCanvasProps, ViewerCanvasState> {

  constructor() {
    super();

    this.state = {
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
    if (this.props.drag) {
      this.bindEvent();
    }
    window.addEventListener('resize', this.handleResize, false);
  }

  handleResize(e) {
    this.props.onResize();
  }

  handleMouseDown(e) {
    if (!this.props.visible || !this.props.drag) {
      return;
    }
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
        mouseX: e.x,
        mouseY: e.y,
      });
      this.props.onChangeImgState(this.props.width, this.props.height, this.props.top + diffY, this.props.left + diffX);
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
      let pageX = e.pageX;
      let pageY = e.pageY;
      this.props.onZoom(pageX, pageY, direct, .05);
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
  }

  componentWillReceiveProps(nextProps: ViewerCanvasProps) {
    if (!this.props.visible && nextProps.visible) {
      if (nextProps.drag) {
        return this.bindEvent();
      }
    }
    if (this.props.visible && !nextProps.visible) {
      if (nextProps.drag) {
        return this.bindEvent(true);
      }
    }
    if (this.props.drag && !nextProps.drag) {
      return this.bindEvent(true);
    }
    if (!this.props.drag && nextProps.drag) {
      if (nextProps.visible) {
        return this.bindEvent(true);
      }
    }
  }

  componentWillUnmount() {
    this.bindEvent(true);
  }

  render() {
    let imgStyle: React.CSSProperties = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
      marginTop: `${this.props.top}px`,
      marginLeft: this.props.left ? `${this.props.left}px` : 'auto',
      transform: `rotate(${this.props.rotate}deg) scaleX(${this.props.scaleX}) scaleY(${this.props.scaleY})`,
    };

    let imgClass = this.props.drag ? 'drag' : '';
    if (!this.state.isMouseDown) {
      imgClass += ` ${this.props.prefixCls}-image-transition`;
    }

    let style = {
      zIndex: this.props.zIndex,
    };

    let imgNode = null;
    if (this.props.imgSrc !== '') {
      imgNode = <img
      className={imgClass}
      src={this.props.imgSrc}
      style={imgStyle}
      onMouseDown={this.handleMouseDown}
      />;
    }
    if (this.props.loading) {
      imgNode = <Loading style={{
        marginTop: this.props.top,
        marginLeft: this.props.left,
      }}/>;
    }

    return (
      <div
      className={`${this.props.prefixCls}-canvas`}
      onMouseDown={this.handleMouseDown}
      style={style}
      >
        {imgNode}
      </div>
    );
  }
}
