import * as React from 'react';
import { ImageDecorator } from './ViewerProps';
export interface ViewerNavSideProps {
  prefixCls: string;
  images: ImageDecorator[];
  activeIndex: number;
  showPaginator: boolean;
  showScrollSideThumbs: boolean;
  onChangeImg: (index: number) => void;
}

const itemHeight = 60;
const marginCalc = (index) => { return (index - 1) * itemHeight * -1; };

export default class ViewerNavSide extends React.Component<ViewerNavSideProps, any> {
  static defaultProps = {
    activeIndex: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      marginTop: 0,
      upScroll: false,
      maxMargin: marginCalc(this.props.images.length),
    };

    this.toggleNavVisible = this.toggleNavVisible.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.images !== this.props.images) {
      this.setState({ maxMargin: marginCalc(this.props.images.length) });
    }
  }

  toggleNavVisible = () => {
    this.setState({isVisible: !this.state.isVisible});
  }

  handleChangeImg = (newIndex) => {
    if (this.props.activeIndex === newIndex) {
      return;
    }

    if (newIndex > 0) {
      const newMarginTop = marginCalc(newIndex);
      this.setState({ marginTop: newMarginTop <= 0 ? newMarginTop : 0 });
      this.setState({ marginTop: newMarginTop <= 0 ? newMarginTop : 0 });
      this.setState({ activeIndex: newIndex });
    }

    this.props.onChangeImg(newIndex);
  }

  scrollSidebar = (up = false) => {
    const { marginTop, maxMargin } = this.state;
    const margin = up ? marginTop + itemHeight : marginTop - itemHeight;
    if (margin <= 0 && margin >= maxMargin) { this.setState({ marginTop: margin }); }
  }

  render() {
    const { maxMargin, marginTop } = this.state;
    const { prefixCls, showScrollSideThumbs, activeIndex, images, showPaginator} = this.props;

    return (
        <div className={`${prefixCls}-navbarside`}>
            {!!showScrollSideThumbs && (
              <div
                className={`${prefixCls}-navbarside-scrollcontrol up ${marginTop >= 0 ? 'disabled' : ''}`}
                onClick={() => this.scrollSidebar(true)}
              >
                <i className="react-viewer-icon react-viewer-icon-next"></i>
              </div>
            )}
            <div className={ showScrollSideThumbs ? `${prefixCls}-navbarside-container` : ''}>
              <ul
                className={`${prefixCls}-list ${prefixCls}-list-transition`}
                style={{
                  marginTop: `${marginTop}px`,
                }}
              >
                {images.map((item, index) =>
                  <li
                    key={index}
                    className={index === activeIndex ? 'active' : ''}
                    onClick={() => { this.handleChangeImg(index); }}
                  >
                    <img src={item.src} alt={item.alt} title={item.alt} />
                  </li>
                  )
                }
              </ul>
              {!!showPaginator && (
                <div className={`${prefixCls}-navbar-paginator`}>
                  Imagem {activeIndex + 1} de {images.length}
                </div>
              )}
            </div>
            {!!showScrollSideThumbs && (
              <div
                className={`${prefixCls}-navbarside-scrollcontrol down ${marginTop <= maxMargin ? 'disabled' : ''}`}
                onClick={() => this.scrollSidebar()}
              >
                <i className="react-viewer-icon react-viewer-icon-next"></i>
              </div>
            )}
        </div>
    );
  }
}
