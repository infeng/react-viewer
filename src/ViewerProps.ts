export interface ViewerImageSize {
  width: number;
  height: number;
}

export interface ImageDecorator {
  src: string;
  alt?: string;
  downloadUrl?: string;
  defaultSize?: ViewerImageSize;
}

export interface ToolbarConfig {
  key: string;
  actionType?: number;
  render?: React.ReactNode;
  onClick?: (activeImage: ImageDecorator) => void;
}

export interface ViewerDefaultImg {
  src: string;
  width?: number;
  height?: number;
}

interface ViewerProps {
  /** viewer是否可见 */
  visible?: boolean;
  /** 点击关闭按钮的回调 */
  onClose?: () => void;
  /** 需要进行浏览的图片地址集合 */
  images?: ImageDecorator[];
  /** 当前图像index */
  activeIndex?: number;
  /** 自定义viewer组件的z-index */
  zIndex?: number;
  /** viewer渲染的父节点，设置后开启inline mode */
  container?: HTMLElement;
  /** 图片是否可拖动 */
  drag?: boolean;
  /** 是否显示图片属性 */
  attribute?: boolean;
  /** 是否显示缩放按钮 */
  zoomable?: boolean;
  /** 是否显示旋转按钮 */
  rotatable?: boolean;
  /** 是否显示变换按钮 */
  scalable?: boolean;
  /** callback function when mask is clicked */
  onMaskClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 是否显示下载按钮 */
  downloadable?: boolean;
  /** 图片是否可循环 */
  loop?: boolean;

  // no render close button
  noClose?: boolean;

  // no render image details
  noImgDetails?: boolean;

  // no render navbar
  noNavbar?: boolean;

  // no render toolbar
  noToolbar?: boolean;

  // no render footer
  noFooter?: boolean;

  // wheather to show change button
  changeable?: boolean;

  // custom toolbar
  customToolbar?: (toolbars: ToolbarConfig[]) => ToolbarConfig[];

  // zoom speed
  zoomSpeed?: number;

  // default image size
  defaultSize?: ViewerImageSize;

  // if load img failed, show default img
  defaultImg?: ViewerDefaultImg;

  // disable keyboard support
  disableKeyboardSupport?: boolean;

  // no reset zoom after image change
  noResetZoomAfterChange?: boolean;

  // no limit image initialization size
  noLimitInitializationSize?: boolean;

  // default scale
  defaultScale?: number;

  // callback when iamge change
  onChange?: (activeImage: ImageDecorator, index: number) => void;

  // disable mouse zoom
  disableMouseZoom?: boolean;

  // whether to download in a new window
  downloadInNewWindow?: boolean;

  className?: string;

  // whether to display the total number and range
  showTotal?: boolean;

  // total indicator name.
  totalName?: string;

  // max scale
  maxScale?: number;

  // min scale
  minScale?: number;
}

export default ViewerProps;
