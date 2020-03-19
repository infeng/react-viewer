import * as React from 'react';
import { ImageDecorator } from './ViewerProps';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';
export interface ViewerNavSideProps {
  prefixCls: string;
  images: ImageDecorator[];
  activeIndex: number;
  showPaginator: boolean;
  showToggleNav: boolean;
  onChangeImg: (index: number) => void;
}
const pxChange = -30;

export default class ViewerNavSide extends React.Component<ViewerNavSideProps, any> {
  static defaultProps = {
    activeIndex: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
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
    this.props.onChangeImg(newIndex);
  }

  render() {
    let marginTop = 0;
    if (this.props.activeIndex > 0) {
      marginTop = ((this.props.activeIndex - 1 ) * 2 * pxChange);
    }
    let listStyle = {
      marginTop: `${marginTop}px`,
    };

    let paginator = null;
    if (this.props.showPaginator) {
      paginator = (
        <div className={`${this.props.prefixCls}-navbar-paginator`}>
          Imagem {this.props.activeIndex + 1} de {this.props.images.length}
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className={`${this.props.prefixCls}-navbarside`}>
          {!!this.props.showToggleNav &&
            <button onClick={this.toggleNavVisible} className={`${this.props.prefixCls}-btn-toggle`}>
              {!!this.state.isVisible ? <FaAngleRight /> : <FaAngleLeft />}
            </button>
          }
          {this.state.isVisible &&
            <div>
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
          }
        </div>
      </React.Fragment>
    );
  }
}
