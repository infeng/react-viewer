interface ViewerProps {
  /** viewer是否可见 */
  visible?: boolean;
  /** 点击关闭按钮的回调 */
  onClose?: () => void;
  /** 需要进行浏览的图片地址集合 */
  images?: any[];
}
