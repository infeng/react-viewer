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

const pxChange = -30;
const marginCalc = (index) => { return (index - 1) * 2 * pxChange; };

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

  toggleNavVisible = () => {
    this.setState({isVisible: !this.state.isVisible});
  }

  handleChangeImg = (newIndex) => {
    if (this.props.activeIndex === newIndex) {
      return;
    }

    if (this.props.activeIndex > 0) {
      this.setState({ marginTop: marginCalc(newIndex) });
    }

    this.props.onChangeImg(newIndex);
  }

  scrollSidebar = (up = false) => {

    let margin = this.state.marginTop;
    up ? margin -= pxChange * 2 : margin += pxChange * 2;

    if (margin <= 0 && margin >= this.state.maxMargin) { this.setState({ marginTop: margin }); }

  }

  render() {

    let listStyle = {
      marginTop: `${this.state.marginTop}px`,
    };

    let paginator = null;
    if (this.props.showPaginator) {
      paginator = (
        <div className={`${this.props.prefixCls}-navbar-paginator`}>
          Imagem {this.props.activeIndex + 1} de {this.props.images.length}
        </div>
      );
    }

    let scrollDown = null;
    let scrollUp = null;
    if (this.props.showScrollSideThumbs) {

      scrollUp = (
        <div className={`${this.props.prefixCls}-navbarside-scrollcontrol up`}
          onClick={() => { this.scrollSidebar(true); }}>
          <i class="react-viewer-icon react-viewer-icon-next"></i>
        </div>
      );

      scrollDown = (
        <div className={`${this.props.prefixCls}-navbarside-scrollcontrol down`}
          onClick={() => { this.scrollSidebar(); }}>
          <i class="react-viewer-icon react-viewer-icon-next"></i>
        </div>
      );

    }

    return (
        <div className={`${this.props.prefixCls}-navbarside`}>
            { scrollUp }
            <div className={ this.props.showScrollSideThumbs ? `${this.props.prefixCls}-navbarside-container` : ''}>
              <ul className={`${this.props.prefixCls}-list ${this.props.prefixCls}-list-transition`} style={listStyle}>
                {this.props.images.map((item, index) =>
                  <li
                  key={index}
                  className={index === this.props.activeIndex ? 'active' : ''}
                  onClick={() => { this.handleChangeImg(index); }}
                  >
                    <img src={item.src} alt={item.alt} title={item.alt} />
                  </li>
                  )
                }
              </ul>
              {paginator}
            </div>
            { scrollDown }
        </div>
    );
  }
}
