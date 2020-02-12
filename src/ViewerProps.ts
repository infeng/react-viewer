export interface ImageDecorator {
  src: string;
  alt?: string;
  downloadUrl?: string;
}

export interface ToolbarConfig {
  key: string;
  actionType?: number;
  render?: React.ReactNode;
  onClick?: (activeImage: ImageDecorator) => void;
  title: string;
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

  // no render close button
  noClose?: boolean;

  // no render image details
  noImgDetails?: boolean;

  // no render navbar
  noNavbar?: boolean;

  // render sideNavBar
  navBarSide?: boolean;
  // hide zoom FullScreen
  hideFullScreen?: boolean;

  // no render toolbar
  noToolbar?: boolean;

  // render up toolbar
  upToolbar?: boolean;

  // no render footer
  noFooter?: boolean;

  // wheather to show change button
  changeable?: boolean;

  // custom toolbar
  customToolbar?: (toolbars: ToolbarConfig[]) => ToolbarConfig[];

  // zoom speed
  zoomSpeed?: number;

  // define scaleX
  scaleX?: number;

  // define scaleY
  scaleY?: number;

  // define stretch
  stretch?: number;

  // define stretchHeight
  stretchHeight?: number;

  // define stretchWidth
  stretchWidth?: number;

  // define height
  height?: number;

  // no disabled Keydown
  noKeyDown?: boolean;

  // abrir imagem em Modalu
  fullScreen?: boolean;

  // informar o loading da imagem
  waiting?: object;

  // Mostra o title da img no canvas
  showTitle?: boolean;

  // Mostra o paginator no toolbar
  showPaginator?: boolean;

}
export default ViewerProps;
