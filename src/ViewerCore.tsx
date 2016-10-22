import * as React from 'react';
import './style/index.less';
import ViewerCavans from './ViewerCavans';
import ViewerNav from './ViewerNav';
import ViewerToolbar from './ViewerToolbar';
import ViewerProps, { ImageDecorator } from './ViewerProps';
import Icon, { ActionType } from './Icon';

function noop() {}

const transitionDuration = 300;

export interface ViewerCoreState {
  visible?: boolean;
  visibleStart?: boolean;
  transitionEnd?: boolean;
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
  loading?: boolean;
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
  private containerWidth: number;
  private containerHeight: number;
  private footerHeight: number;

  constructor(props) {
    super(props);

    this.prefixCls = 'react-viewer';

    this.state = {
      visible: false,
      visibleStart: false,
      transitionEnd: false,
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
      loading: false,
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

    this.setContainerWidthHeight();
    this.footerHeight = 84;
  }

  setContainerWidthHeight() {
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;
    if (this.props.container) {
      this.containerWidth = this.props.container.offsetWidth;
      this.containerHeight = this.props.container.offsetHeight;
    }
  }

  handleClose(e) {
    this.props.onClose();
  }

  startVisible(activeIndex: number) {
    this.setState({
      visibleStart: true,
    });
    setTimeout(() => {
      this.setState({
        visible: true,
      });
      setTimeout(() => {
        this.bindEvent();
        this.loadImg(activeIndex, true);
      }, 300);
    }, 10);
  }

  componentDidMount() {
    this.startVisible(this.state.activeIndex);
  }

  getImgWidthHeight(imgWidth, imgHeight) {
    let width = 0;
    let height = 0;
    let aspectRatio = imgWidth / imgHeight;
    if (aspectRatio > 1) {
      width = Math.min(this.containerWidth * .8, imgWidth);
      height = (width / imgWidth) * imgHeight;
    }else {
      height = Math.min((this.containerHeight - this.footerHeight) * .8, imgHeight);
      width = (height / imgHeight) * imgWidth;
    }
    return [width, height];
  }

  loadImg(activeIndex, firstLoad: boolean = false) {
    let imgSrc = '';
    let images = this.props.images || [];
    if (images.length > 0) {
      imgSrc = images[activeIndex].src;
    }
    let img = new Image();
    img.src = imgSrc;
    this.setState({
      activeIndex: activeIndex,
      width: 0,
      height: 0,
      left: this.containerWidth / 2,
      top:  (this.containerHeight - this.footerHeight) / 2,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
      loading: true,
    });
    img.onload = () => {
      let imgWidth = img.width;
      let imgHeight = img.height;
      if (firstLoad) {
        setTimeout(() => {
          this.setState({
            imageWidth: imgWidth,
            imageHeight: imgHeight,
          });
          let imgCenterXY = this.getImageCenterXY();
          this.handleZoom(imgCenterXY.x, imgCenterXY.y, 1, 1);
        }, 50);
      }else {
        const [ width, height ] = this.getImgWidthHeight(imgWidth, imgHeight);
        let left = ( this.containerWidth - width ) / 2;
        let top = (this.containerHeight - height - this.footerHeight) / 2;
        this.setState({
          width: width,
          height: height,
          left: left,
          top:  top,
          imageWidth: imgWidth,
          imageHeight: imgHeight,
          loading: false,
        });
      }
    };
    img.onerror = () => {
      this.setState({
        imageWidth: 0,
        imageHeight: 0,
        loading: false,
      });
    };
  }

  handleChangeImg(newIndex: number) {
    let imgCenterXY2 = this.getImageCenterXY();
    this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, 1);
    setTimeout(() => {
      this.loadImg(newIndex);
    }, transitionDuration);
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
          this.handleChangeImg(this.state.activeIndex - 1);
        }
        break;
      case ActionType.next:
        if (this.state.activeIndex + 1 < this.props.images.length) {
          this.handleChangeImg(this.state.activeIndex + 1);
        }
        break;
      case ActionType.zoomIn:
        let imgCenterXY = this.getImageCenterXY();
        this.handleZoom(imgCenterXY.x, imgCenterXY.y, 1, .05);
        break;
      case ActionType.zoomOut:
        let imgCenterXY2 = this.getImageCenterXY();
        this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, .05);
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

  handleZoom(targetX, targetY, direct, scale) {
    let imgCenterXY = this.getImageCenterXY();
    let diffX = targetX - imgCenterXY.x;
    let diffY = targetY - imgCenterXY.y;
    let diffWidth = direct * this.state.width * scale;
    let diffHeight = direct * this.state.height * scale;
    // when image width is 0, set original width
    if (diffWidth === 0) {
      const [ width, height ] = this.getImgWidthHeight(this.state.imageWidth, this.state.imageHeight);
      diffWidth = width;
      diffHeight = height;
    }
    this.setState({
      width: this.state.width + diffWidth,
      height: this.state.height + diffHeight,
      top: this.state.top + -diffHeight / 2 + -direct * diffY * scale,
      left: this.state.left + -diffWidth / 2 + -direct * diffX * scale,
      loading: false,
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
    this.setContainerWidthHeight();
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

  handleTransitionEnd(e) {
    if (!this.state.transitionEnd || this.state.visibleStart) {
      this.setState({
        visibleStart: false,
        transitionEnd: true,
      });
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
    if (!this.props.visible && nextProps.visible) {
      this.startVisible(nextProps.activeIndex);
      return;
    }
    if (this.props.visible && !nextProps.visible) {
      this.bindEvent(true);
      let imgCenterXY2 = this.getImageCenterXY();
      this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, 1);
      setTimeout(() => {
        this.setState({
          visible: false,
          transitionEnd: false,
        });
      }, transitionDuration);
      return;
    }
    if (this.state.activeIndex !== nextProps.activeIndex) {
      this.handleChangeImg(nextProps.activeIndex);
      return;
    }
  }

  render() {
    let activeImg: ImageDecorator = {
      src: '',
      alt: '',
    };

    let zIndex = 1000;

    if (this.props.zIndex) {
      zIndex = this.props.zIndex;
    }

    let viewerStryle: React.CSSProperties = {
      opacity: this.state.visible ? 1 : 0,
    };

    if (!this.state.visible && this.state.transitionEnd) {
      viewerStryle.display = 'none';
    }
    if (!this.state.visible && this.state.visibleStart) {
      viewerStryle.display = 'block';
    }
    if (this.state.visible && this.state.transitionEnd) {
      let images = this.props.images || [];
      if (images.length > 0 && this.state.activeIndex >= 0) {
        activeImg = images[this.state.activeIndex];
      }
    }

    let className = `${this.prefixCls} ${this.prefixCls}-transition`;
    if (this.props.container) {
      className += ` inline`;
    }

    return (
      <div
      className={className}
      style={viewerStryle}
      onTransitionEnd={this.handleTransitionEnd.bind(this)}
      >
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
        loading={this.state.loading}
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
