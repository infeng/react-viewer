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
}

export default ViewerProps;
