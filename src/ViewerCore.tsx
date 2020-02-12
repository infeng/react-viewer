import * as React from 'react';
import './style/index.less';
import ViewerCanvas from './ViewerCanvas';
import ViewerNav from './ViewerNav';
import ViewerNavSide from './ViewerNavSide';
import ViewerToolbar, { defaultToolbars } from './ViewerToolbar';
import ViewerProps, { ImageDecorator, ToolbarConfig } from './ViewerProps';
import Icon, { ActionType } from './Icon';

function noop() { }

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
  scaleX?: number;
  scaleY?: number;
  loading?: boolean;
  fullScreenImage?: boolean;
}

export default class ViewerCore extends React.Component<ViewerProps, ViewerCoreState> {
  static defaultProps = {
    visible: false,
    onClose: noop,
    images: [],
    activeIndex: 0,
    zIndex: 1000,
    drag: true,
    attribute: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    onMaskClick: noop,
    changeable: true,
    customToolbar: (toolbars) => toolbars,
    zoomSpeed: .05,
    fullScreen: false,
    showTitle: false,
    showPaginator: false,
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
      activeIndex: this.props.activeIndex || 0,
      width: 0,
      height: 0,
      top: 15,
      left: null,
      rotate: 0,
      imageWidth: 0,
      imageHeight: 0,
      scaleX: this.props.scaleX ? this.props.scaleX : 1,
      scaleY: this.props.scaleY ? this.props.scaleY : 1,
      loading: false,
      fullScreenImage: false,
    };

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

  handleClose = (e) => {
    this.props.onClose();
  }

  handleFullScreen = () => {
    this.setState({ fullScreenImage: !this.state.fullScreenImage });
  }

  imageLoad(val) {
    // retorna o valor true/false para o carregamento da imagem
    if (this.props.waiting && typeof (this.props.waiting) === 'function') {
      this.props.waiting(val);
      // console.log('children ',val, new Date())
    }
  }

  startVisible(activeIndex: number) {
    this.imageLoad(true);
    if (!this.props.container) {
      document.body.style.overflow = 'hidden';
      if (document.body.scrollHeight > document.body.clientHeight) {
        document.body.style.paddingRight = '15px';
      }
    }
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
      }, 200);
    }, 10);
  }

  componentDidMount() {
    (this.refs['viewerCore'] as HTMLDivElement).addEventListener(
      'transitionend',
      this.handleTransitionEnd,
      false
    );
    this.startVisible(this.state.activeIndex);
  }

  getImgWidthHeight(imgWidth, imgHeight) {
    let width = 0;
    let height = 0;
    let maxWidth = this.containerWidth * 2.5;
    let maxHeight = (this.containerHeight - this.footerHeight) * 2.5;
    width = Math.min(maxWidth, imgWidth);
    height = width / imgWidth * imgHeight;
    if (height > maxHeight) {
      height = maxHeight;
      width = height / imgHeight * imgWidth;
    }
    return [width, height];
  }

  loadImg(activeIndex, firstLoad: boolean = false) {
    let imgSrc = '';
    let images = this.props.images || [];
    if (images.length > 0) {
      imgSrc = images[activeIndex] ? images[activeIndex].src : '';
    }
    let img = new Image();
    img.src = imgSrc;
    if (firstLoad) {
      this.setState({
        activeIndex: activeIndex,
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        rotate: 0,
        scaleX: this.props.scaleX ? this.props.scaleX : 1,
        scaleY: this.props.scaleY ? this.props.scaleY : 1,
        loading: true,
      });
    } else {
      this.setState({
        activeIndex: activeIndex,
        loading: true,
      });
    }
    img.onload = () => {
      let imgWidth = img.width;
      let imgHeight = img.height;
      // if (firstLoad) {
      //   setTimeout(() => {
      //     this.setState({
      //       activeIndex: activeIndex,
      //       imageWidth: imgWidth,
      //       imageHeight: imgHeight,
      //     });
      //     let imgCenterXY = this.getImageCenterXY();
      //     this.handleZoom(this.props.scaleX, this.props.scaleY, 1, 1);
      //   }, 50);
      // } else {
      let [width, height] = this.getImgWidthHeight(imgWidth, imgHeight);
      let left = (this.containerWidth - width) / 2;
      let top = (this.containerHeight - height - this.footerHeight) / 2;

      let stretchWidth = false;
      if (!this.props.stretch &&
        !this.props.stretchHeight &&
        !this.props.stretchWidth &&
        !this.props.scaleX &&
        !this.props.scaleX) {
        stretchWidth = true;
      }

      if (this.props.stretch) {
        let stretch = 99;

        if (this.props.stretch > 1) {
          stretch = this.props.stretch;
        }

        stretch = stretch;
        top = (this.containerWidth - (this.containerWidth * (stretch / 100))) / 2;
        left = (this.containerWidth - (this.containerWidth * (stretch / 100))) / 2;
        width = this.containerWidth * (stretch / 100);
        height = this.containerHeight * (stretch / 100);
      }

      if (this.props.stretchHeight) {
        top = 2;
        height = this.containerHeight;
        width = imgWidth * ((this.containerHeight / imgHeight));
        left = (this.containerWidth - width) / 2;
      }

      if (this.props.stretchWidth || stretchWidth) {
        top = 2;
        height = imgHeight * ((this.containerWidth / imgWidth));
        width = this.containerWidth - (this.containerWidth * 0.01);
        left = (this.containerWidth - width) / 2;
      }

      this.setState({
        activeIndex: activeIndex,
        width: width,
        height: height,
        left: left,
        top: top,
        imageWidth: imgWidth,
        imageHeight: imgHeight,
        loading: false,
        rotate: 0,
        scaleX: this.props.scaleX ? this.props.scaleX : 1,
        scaleY: this.props.scaleY ? this.props.scaleY : 1,
      });
    };

    img.onerror = () => {
      this.setState({
        activeIndex: activeIndex,
        imageWidth: 0,
        imageHeight: 0,
        loading: false,
      });
    };

    this.imageLoad(false);
  }

  handleChangeImg = (newIndex: number) => {
    // let imgCenterXY2 = this.getImageCenterXY();
    // this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, 1);
    // setTimeout(() => {
    //   this.loadImg(newIndex);
    // }, transitionDuration);

    // setTimeout(() => {
    //   this.bindEvent();
    //   this.loadImg(newIndex, true);
    // }, 25000);

    this.loadImg(newIndex);
  }

  handleChangeImgState = (width, height, top, left) => {
    this.setState({
      width: width,
      height: height,
      top: top,
      left: left,
    });
  }

  handleDefaultAction = (type: ActionType) => {
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
        this.handleZoom(imgCenterXY.x, imgCenterXY.y, 1, this.props.zoomSpeed);
        break;
      case ActionType.zoomOut:
        let imgCenterXY2 = this.getImageCenterXY();
        this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, this.props.zoomSpeed);
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
        this.handleScaleX(-1);
        break;
      case ActionType.scaleY:
        this.handleScaleY(-1);
        break;
      case ActionType.download:
        this.handleDownload();
        break;
      default:
        break;
    }
  }

  handleAction = (config: ToolbarConfig) => {
    this.handleDefaultAction(config.actionType);

    if (config.onClick) {
      const activeImage = this.getActiveImage();
      config.onClick(activeImage);
    }
  }

  handleDownload = () => {
    const activeImage = this.getActiveImage();
    if (activeImage.downloadUrl) {
      location.href = activeImage.downloadUrl;
    }
  };

  handleScaleX = (newScale: 1 | -1) => {
    this.setState({
      scaleX: this.state.scaleX * newScale,
    });
  }

  handleScaleY = (newScale: 1 | -1) => {
    this.setState({
      scaleY: this.state.scaleY * newScale,
    });
  }

  handleScrollZoom = (targetX, targetY, direct) => {
    this.handleZoom(targetX, targetY, direct, this.props.zoomSpeed);
  }
  handleMoveImg = (value, direct) => {

    let stateTop = this.state.top;
    let stateLeft = this.state.left;

    // inline mode 
    if (this.props.container) {
      let hImg = document.getElementsByClassName('drag react-viewer-image-transition')[0].height;
      let up = Math.abs(stateTop) - value;
      let down = stateTop + value;
      let left = Math.abs(stateLeft - value - 30);
      let rigth = Math.abs(stateLeft + value + 30);

      switch (direct) {
        case 'up':
          if (up < hImg) {
            if (up + value < hImg) {
              stateTop -= value;
            }
            // console.log('up', stateTop, hImg);
          }
          break;
        case 'down':
          if (down < hImg) {
            stateTop += value;
            // console.log('3down', stateTop, hImg);
          }
          break;

        case 'left':
          if (left < this.containerWidth) {
            stateLeft -= value;
          }
          break;

        case 'right':
          if (rigth < this.containerWidth) {
            stateLeft += value;
          }
          break;
        default:
          break;
      }

      this.setState({
        top: stateTop,
        left: stateLeft,
      });
    }
  }

  handleZoom = (targetX, targetY, direct, scale) => {
    let imgCenterXY = this.getImageCenterXY();
    let diffX = targetX - imgCenterXY.x;
    let diffY = targetY - imgCenterXY.y;
    // when image width is 0, set original width
    let reset = false;
    let top = 0;
    let left = 0;
    let width = 0;
    let height = 0;
    let scaleX = 0;
    let scaleY = 0;
    if (this.state.width === 0) {
      const [imgWidth, imgHeight] = this.getImgWidthHeight(
        this.state.imageWidth,
        this.state.imageHeight
      );
      reset = true;
      left = (this.containerWidth - imgWidth) / 2;
      top = (this.containerHeight - this.footerHeight - imgHeight) / 30;
      width = this.state.width + imgWidth;
      height = this.state.height + imgHeight;
      scaleX = scaleY = 1;
    } else {
      let directX = this.state.scaleX > 0 ? 1 : -1;
      let directY = this.state.scaleY > 0 ? 1 : -1;
      scaleX = this.state.scaleX + scale * direct * directX;
      scaleY = this.state.scaleY + scale * direct * directY;
      if (Math.abs(scaleX) < 0.1 || Math.abs(scaleY) < 0.1) {
        return;
      }
      top = this.state.top + -direct * diffY / this.state.scaleX * scale * directX;
      left = this.state.left + -direct * diffX / this.state.scaleY * scale * directY;
      width = this.state.width;
      height = this.state.height;
    }
    this.setState({
      width: width,
      scaleX: scaleX,
      scaleY: scaleY,
      height: height,
      top: top,
      left: left,
      loading: false,
    });
  }

  getImageCenterXY = () => {
    return {
      x: this.state.left + this.state.width / 2,
      y: this.state.top + this.state.height / 2,
    };
  }

  handleRotate = (isRight: boolean = false) => {
    this.setState({
      rotate: this.state.rotate + 90 * (isRight ? 1 : -1),
    });
  }

  handleResize = () => {
    this.setContainerWidthHeight();
    if (this.props.visible) {
      const [width, height] = this.getImgWidthHeight(this.state.imageWidth, this.state.imageHeight);
      let left = (this.containerWidth - width) / 2;
      let top = (this.containerHeight - height - this.footerHeight) / 2;
      this.setState({
        width: width,
        height: height,
        left: left,
        top: top,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
      });
    }
  }

  handleKeydown = (e) => {
    let keyCode = e.keyCode || e.which || e.charCode;
    let isFeatrue = false;

    if (this.props.noKeyDown) {
      return;
    }

    // Move img
    if (e.ctrlKey && e.shiftKey) {
      switch (keyCode) {

        case 37:
          this.handleMoveImg(50, 'left');
          isFeatrue = true;
          break;

        case 39:
          this.handleMoveImg(50, 'right');
          isFeatrue = true;
          break;

        case 38:
          this.handleMoveImg(50, 'up');
          isFeatrue = true;
          break;

        case 40:
          this.handleMoveImg(50, 'down');
          isFeatrue = true;
          break;
        default:
          break;

      }
    } else {
      switch (keyCode) {
        // key: esc
        case 27:
          if (this.state.fullScreenImage) {
            this.handleFullScreen();
          } else {
            this.props.onClose();
          }
          isFeatrue = true;
          break;
        // key: ←
        case 37:
          if (e.shiftKey) {
            this.handleDefaultAction(ActionType.rotateLeft);
          }
          if (e.ctrlKey) {
            this.handleDefaultAction(ActionType.prev);
          }
          isFeatrue = true;
          break;
        // key: →
        case 39:
          if (e.shiftKey) {
            this.handleDefaultAction(ActionType.rotateRight);
          }
          if (e.ctrlKey) {
            this.handleDefaultAction(ActionType.next);
          }
          isFeatrue = true;
          break;
        // key: ↑
        case 38:
          if (e.ctrlKey) {
            this.handleDefaultAction(ActionType.zoomIn);
          }
          if (e.shiftKey) {
            this.handleDefaultAction(ActionType.scaleX);
          }
          isFeatrue = true;
          break;
        // key: ↓
        case 40:
          if (e.ctrlKey) {
            this.handleDefaultAction(ActionType.zoomOut);
          }
          if (e.shiftKey) {
            this.handleDefaultAction(ActionType.scaleY);
          }
          isFeatrue = true;
          break;
        // key: Ctrl + z
        case 90:
          if (e.ctrlKey) {
            this.loadImg(this.state.activeIndex);
            isFeatrue = true;
          }
          break;
        // key: Ctrl + m
        case 77:
          if (e.ctrlKey) {
            if (this.props.fullScreen) {
              this.handleFullScreen();
              isFeatrue = true;
            }
          }
          break;
        default:
          break;
      }

    }
    if (isFeatrue) {
      e.preventDefault();
    }

  }

  handleTransitionEnd = e => {
    if (!this.state.transitionEnd || this.state.visibleStart) {
      this.setState({
        visibleStart: false,
        transitionEnd: true,
      });
    }
  };

  bindEvent(remove: boolean = false) {
    let funcName = 'addEventListener';
    if (remove) {
      funcName = 'removeEventListener';
    }
    document[funcName]('keydown', this.handleKeydown, false);
  }

  componentWillUnmount() {
    this.bindEvent(true);
    (this.refs['viewerCore'] as HTMLDivElement).removeEventListener(
      'transitionend',
      this.handleTransitionEnd,
      false
    );
  }

  componentWillReceiveProps(nextProps: ViewerProps) {
    if (!this.props.visible && nextProps.visible) {
      this.startVisible(nextProps.activeIndex);
      return;
    }
    if (this.props.visible && !nextProps.visible) {
      this.bindEvent(true);
      this.handleZoom(
        this.containerWidth / 2,
        (this.containerHeight - this.footerHeight) / 2,
        -1,
        (this.state.scaleX > 0 ? 1 : -1) * this.state.scaleX - 0.11
      );
      setTimeout(() => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        this.setState({
          visible: false,
          transitionEnd: false,
          width: 0,
          height: 0,
        });
      }, transitionDuration);
      return;
    }
    if (this.props.activeIndex !== nextProps.activeIndex) {
      this.handleChangeImg(nextProps.activeIndex);
      return;
    }
  }

  handleCanvasMouseDown = e => {
    this.props.onMaskClick(e);
  };

  getActiveImage = () => {
    let activeImg: ImageDecorator = {
      src: '',
      alt: '',
      downloadUrl: '',
    };

    let images = this.props.images || [];
    if (images.length > 0 && this.state.activeIndex >= 0) {
      if (this.state.activeIndex > images.length) {
        activeImg = images[0];
        this.setState({ activeIndex: 0 });
      } else {
        activeImg = images[this.state.activeIndex];
      }
    }

    return activeImg;
  };

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
      activeImg = this.getActiveImage();
    }

    let className = `${this.prefixCls} ${this.prefixCls}-transition`;
    if (this.props.container) {
      if (this.state.fullScreenImage) {
        className += ` ${this.prefixCls}-modal`;
      } else {
        className += ` ${this.prefixCls}-inline`;
      }
    }

    return (
      <div ref="viewerCore" className={className} style={viewerStryle}>
        <div className={`${this.prefixCls}-mask`} style={{ zIndex: zIndex }} />
        {this.props.noClose || (
          <div
            className={`${this.prefixCls}-close ${this.prefixCls}-btn`}
            onClick={this.handleClose}
            style={{ zIndex: zIndex + 10 }}
          >
            <Icon type={ActionType.close} />
          </div>
        )}

          {this.props.navBarSide &&  (
            <ViewerNavSide
              prefixCls={this.prefixCls}
              images={this.props.images}
              activeIndex={this.state.activeIndex}
              onChangeImg={this.handleChangeImg}
              showPaginator={this.props.showPaginator}
            />
          )}
        {!this.props.navBarSide && 
          <div
          className={`${this.prefixCls}-fullScreen ${this.prefixCls}-btn`}
          onClick={this.handleFullScreen}
          style={{ zIndex: zIndex + 100 }}
          >
          <Icon type={ActionType.zoomIn} />
          </div>
        }

        <ViewerCanvas
          prefixCls={this.prefixCls}
          imgAlt={activeImg.alt}
          imgSrc={activeImg.src}
          visible={this.props.visible}
          width={this.state.width}
          height={this.state.height}
          top={this.state.top}
          left={this.state.left}
          rotate={this.state.rotate}
          onChangeImgState={this.handleChangeImgState}
          onResize={this.handleResize}
          onZoom={this.handleScrollZoom}
          zIndex={zIndex + 5}
          scaleX={this.state.scaleX}
          scaleY={this.state.scaleY}
          loading={this.state.loading}
          drag={this.props.drag}
          container={this.props.container}
          onCanvasMouseDown={this.handleCanvasMouseDown}
          showTitle={this.props.showTitle}
        />

         { this.props.noToolbar || (this.props.upToolbar &&( <div className={`${this.prefixCls}-uptoolbar`} style={{ zIndex: zIndex + 5 }}>
              <ViewerToolbar
                prefixCls={this.prefixCls}
                onAction={this.handleAction}
                alt={activeImg.alt}
                width={this.state.imageWidth}
                height={this.state.imageHeight}
                attribute={this.props.attribute}
                zoomable={this.props.zoomable}
                rotatable={this.props.rotatable}
                scalable={this.props.scalable}
                changeable={this.props.changeable}
                downloadable={this.props.downloadable}
                noImgDetails={this.props.noImgDetails}
                toolbars={this.props.customToolbar(defaultToolbars)}
              />              
          </div>
         ))}
        {this.props.noFooter || (
          <div className={`${this.prefixCls}-footer`} style={{ zIndex: zIndex + 5 }}>
            {this.props.noToolbar || this.props.upToolbar || (
              <ViewerToolbar
                prefixCls={this.prefixCls}
                onAction={this.handleAction}
                alt={activeImg.alt}
                width={this.state.imageWidth}
                height={this.state.imageHeight}
                attribute={this.props.attribute}
                zoomable={this.props.zoomable}
                rotatable={this.props.rotatable}
                scalable={this.props.scalable}
                changeable={this.props.changeable}
                downloadable={this.props.downloadable}
                noImgDetails={this.props.noImgDetails}
                toolbars={this.props.customToolbar(defaultToolbars)}
              />
            )}
            {!this.props.noNavbar && !this.props.navBarSide &&
              <ViewerNav
                prefixCls={this.prefixCls}
                images={this.props.images}
                activeIndex={this.state.activeIndex}
                onChangeImg={this.handleChangeImg}
                showPaginator={this.props.showPaginator}
              />
            }
          </div>
        )}
      </div>
    );
  }
}
