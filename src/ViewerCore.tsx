import * as React from 'react';
import './style/index.less';
import ViewerCavans from './ViewerCavans';
import ViewerNav from './ViewerNav';
import ViewerToolbar from './ViewerToolbar';
import ViewerProps, { ImageDecorator } from './ViewerProps';
import Icon, { ActionType } from './Icon';

function noop() {}

export interface ViewerCoreState {
  activeIndex?: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
  rotate?: number;
  imageWidth?: number;
  imageHeight?: number;
  scaleX?: 1 | -1;
  scaleY?: 1 | -1;
}

export default class ViewerCore extends React.Component<ViewerProps, ViewerCoreState> {
  static defaultProps = {
    visible: false,
    onClose: noop,
    images: [],
    activeIndex: 0,
    zIndex: 1000,
  };

  private prefixCls: string;

  constructor(props) {
    super(props);

    this.prefixCls = 'react-viewer';

    this.state = {
      activeIndex: this.props.activeIndex,
      width: 0,
      height: 0,
      top: 15,
      left: null,
      rotate: 0,
      imageWidth: 0,
      imageHeight: 0,
      scaleX: 1,
      scaleY: 1,
    };

    this.handleChangeImg = this.handleChangeImg.bind(this);
    this.handleChangeImgState = this.handleChangeImgState.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.handleRotate = this.handleRotate.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleScaleX = this.handleScaleX.bind(this);
    this.handleScaleY = this.handleScaleY.bind(this);
    this.getImageCenterXY = this.getImageCenterXY.bind(this);
  }

  handleClose(e) {
    this.props.onClose();
  }

  componentDidMount() {
    this.bindEvent();
    this.loadImg(this.state.activeIndex);
  }

  loadImg(activeIndex) {
    let imgSrc = '';
    let images = this.props.images || [];
    if (images.length > 0) {
      imgSrc = images[activeIndex].src;
    }
    let img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      let width = 0;
      let height = 0;
      let imgWidth = img.width;
      let imgHeight = img.height;
      let aspectRatio = imgWidth / imgHeight;
      let footerHeight = 84;
      if (aspectRatio > 1) {
        width = Math.min(window.innerWidth * .9, imgWidth);
        height = (width / imgWidth) * imgHeight;
      }else {
        height = Math.min((window.innerHeight - footerHeight) * .8, imgHeight);
        width = (height / imgHeight) * imgWidth;
      }
      let left = ( window.innerWidth - width ) / 2;
      let top = (window.innerHeight - height - footerHeight) / 2;
      this.setState({
        activeIndex: activeIndex,
        width: width,
        height: height,
        left: left,
        top: top,
        rotate: 0,
        imageWidth: imgWidth,
        imageHeight: imgHeight,
        scaleX: 1,
        scaleY: 1,
      });
    };
    img.onerror = () => {
      this.setState({
        activeIndex: activeIndex,
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        rotate: 0,
        imageWidth: 0,
        imageHeight: 0,
        scaleX: 1,
        scaleY: 1,
      });
    };
  }

  handleChangeImg(newIndex: number) {
    this.loadImg(newIndex);
  }

  handleChangeImgState(width, height, top, left) {
    this.setState({
      width: width,
      height: height,
      top: top,
      left: left,
    });
  }

  handleAction(type: ActionType) {
    switch (type) {
      case ActionType.prev:
        if (this.state.activeIndex - 1 >= 0) {
          this.loadImg(this.state.activeIndex - 1);
        }
        break;
      case ActionType.next:
        if (this.state.activeIndex + 1 < this.props.images.length) {
          this.loadImg(this.state.activeIndex + 1);
        }
        break;
      case ActionType.zoomIn:
        let imgCenterXY = this.getImageCenterXY();
        this.handleZoom(imgCenterXY.x, imgCenterXY.y, 1);
        break;
      case ActionType.zoomOut:
        let imgCenterXY2 = this.getImageCenterXY();
        this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1);
        break;
      case ActionType.rotateLeft:
        this.handleRotate();
        break;
      case ActionType.rotateRight:
        this.handleRotate(true);
        break;
      case ActionType.reset:
        this.loadImg(this.state.activeIndex);
        break;
      case ActionType.scaleX:
        this.handleScaleX(this.state.scaleX === 1 ? -1 : 1);
        break;
      case ActionType.scaleY:
        this.handleScaleY(this.state.scaleY === 1 ? -1 : 1);
        break;
      default:
        break;
    }
  }

  handleScaleX(newScale: 1 | -1) {
    this.setState({
      scaleX: newScale,
    });
  }

  handleScaleY(newScale: 1 | -1) {
    this.setState({
      scaleY: newScale,
    });
  }

  handleZoom(targetX, targetY, direct) {
    let imgCenterXY = this.getImageCenterXY();
    let diffX = targetX - imgCenterXY.x;
    let diffY = targetY - imgCenterXY.y;
    let diffWidth = direct * this.state.width * 0.05;
    let diffHeight = direct * this.state.height * 0.05;
    this.setState({
      width: this.state.width + diffWidth,
      height: this.state.height + diffHeight,
      top: this.state.top + -diffHeight / 2 + -direct * diffY * .05,
      left: this.state.left + -diffWidth / 2 + -direct * diffX * .05,
    });
  }

  getImageCenterXY() {
    return {
      x: this.state.left + this.state.width / 2,
      y: this.state.top + this.state.height / 2,
    };
  }

  handleRotate(isRight: boolean = false) {
    this.setState({
      rotate: this.state.rotate + 90 * (isRight ? 1 : -1),
    });
  }

  handleResize() {
    this.loadImg(this.state.activeIndex);
  }

  handleKeydown(e) {
    let keyCode = e.keyCode || e.which || e.charCode;
    let isFeatrue = false;
    switch (keyCode) {
      // key: esc
      case 27:
        this.props.onClose();
        isFeatrue = true;
        break;
      // key: ←
      case 37:
        if (e.ctrlKey) {
          this.handleAction(ActionType.rotateLeft);
        }else {
          this.handleAction(ActionType.prev);
        }
        isFeatrue = true;
        break;
      // key: →
      case 39:
        if (e.ctrlKey) {
          this.handleAction(ActionType.rotateRight);
        }else {
          this.handleAction(ActionType.next);
        }
        isFeatrue = true;
        break;
      // key: ↑
      case 38:
        this.handleAction(ActionType.zoomIn);
        isFeatrue = true;
        break;
      // key: ↓
      case 40:
        this.handleAction(ActionType.zoomOut);
        isFeatrue = true;
        break;
      // key: Ctrl + 1
      case 49:
        if (e.ctrlKey) {
          this.loadImg(this.state.activeIndex);
          isFeatrue = true;
        }
        break;
      default:
        break;
    }
    if (isFeatrue) {
      e.preventDefault();
    }
  }

  bindEvent(remove: boolean = false) {
    let funcName = 'addEventListener';
    if (remove) {
      funcName = 'removeEventListener';
    }
    document[funcName]('keydown', this.handleKeydown, false);
  }

  componentWillReceiveProps(nextProps: ViewerProps) {
    if (this.state.activeIndex !== nextProps.activeIndex || (!this.props.visible && nextProps.visible)) {
      this.loadImg(nextProps.activeIndex);
    }
    if (!this.props.visible && nextProps.visible) {
      this.bindEvent();
    }
    if (this.props.visible && !nextProps.visible) {
      this.bindEvent(true);
    }
  }

  render() {
    let activeImg: ImageDecorator = {
      src: '',
      alt: '',
    };
    let images = this.props.images || [];
    if (images.length > 0) {
      activeImg = images[this.state.activeIndex];
    }

    let zIndex = 1000;

    if (this.props.zIndex) {
      zIndex = this.props.zIndex;
    }

    return (
      <div className={this.prefixCls} style={{display: this.props.visible ? 'block' : 'none'}}>
        <div className={`${this.prefixCls}-mask`} style={{zIndex: zIndex}}></div>
        <div
        className={`${this.prefixCls}-close ${this.prefixCls}-btn`}
        onClick={this.handleClose.bind(this)}
        style={{zIndex: zIndex + 10}}
        >
          <Icon type={ActionType.close}/>
        </div>
        <ViewerCavans
        prefixCls={this.prefixCls}
        imgSrc={activeImg.src}
        visible={this.props.visible}
        width={this.state.width}
        height={this.state.height}
        top={this.state.top}
        left={this.state.left}
        rotate={this.state.rotate}
        onChangeImgState={this.handleChangeImgState}
        onResize={this.handleResize}
        onZoom={this.handleZoom}
        zIndex={zIndex + 5}
        scaleX={this.state.scaleX}
        scaleY={this.state.scaleY}
        />
        <div className={`${this.prefixCls}-footer`} style={{zIndex: zIndex + 5}}>
          <ViewerToolbar
          prefixCls={this.prefixCls}
          onAction={this.handleAction}
          alt={activeImg.alt}
          width={this.state.imageWidth}
          height={this.state.imageHeight}
          />
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
