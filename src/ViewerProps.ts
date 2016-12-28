export interface ImageDecorator {
  src: string;
  alt?: string;
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
}

export default ViewerProps;
