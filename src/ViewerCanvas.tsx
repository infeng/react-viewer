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
  zIndex: number;
  scaleX: number;
  scaleY: number;
  loading: boolean;
  drag: boolean;
  container: HTMLElement;
  onCanvasMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
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
  }

  componentDidMount() {
    if (this.props.drag) {
      this.bindEvent();
    }
  }

  handleResize = (e) => {
    this.props.onResize();
  }

  handleCanvasMouseDown = (e) => {
    this.props.onCanvasMouseDown(e);
    this.handleMouseDown(e);
  }

  handleMouseDown = (e) => {
    if (!this.props.visible || !this.props.drag) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isMouseDown: true,
      mouseX: e.nativeEvent.clientX,
      mouseY: e.nativeEvent.clientY,
    });
  }

  handleMouseMove = (e) => {
    if (this.state.isMouseDown) {
      let diffX = e.clientX - this.state.mouseX;
      let diffY = e.clientY - this.state.mouseY;
      this.setState({
        mouseX: e.clientX,
        mouseY: e.clientY,
      });
      this.props.onChangeImgState(this.props.width, this.props.height, this.props.top + diffY, this.props.left + diffX);
    }
  }

  handleMouseUp = (e) => {
    this.setState({
      isMouseDown: false,
    });
  }

  bindEvent = (remove?: boolean) => {
    let funcName = 'addEventListener';
    if (remove) {
      funcName = 'removeEventListener';
    }

    document[funcName]('click', this.handleMouseUp, false);
    document[funcName]('mousemove', this.handleMouseMove, false);
    window[funcName]('resize', this.handleResize, false);
  }

  componentWillReceiveProps(nextProps: ViewerCanvasProps) {
    if (!this.props.visible && nextProps.visible) {
      if (nextProps.drag) {
        return this.bindEvent();
      }
    }
    if (this.props.visible && !nextProps.visible) {
      this.handleMouseUp({});
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
      transform: `translateX(${this.props.left ? this.props.left + 'px' : 'aoto'}) translateY(${this.props.top}px)
      rotate(${this.props.rotate}deg) scaleX(${this.props.scaleX}) scaleY(${this.props.scaleY})`,
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
      imgNode = (
        <div
          style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading/>
        </div>
      );
    }

    return (
      <div
      className={`${this.props.prefixCls}-canvas`}
      onMouseDown={this.handleCanvasMouseDown}
      style={style}
      >
        {imgNode}
      </div>
    );
  }
}
