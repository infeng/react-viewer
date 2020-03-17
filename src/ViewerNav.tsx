import * as React from 'react';
import { ImageDecorator } from './ViewerProps';
import {FaAngleUp, FaAngleDown} from 'react-icons/fa';
export interface ViewerNavProps {
  prefixCls: string;
  images: ImageDecorator[];
  activeIndex: number;
  showPaginator: boolean;
  onChangeImg: (index: number) => void;
}

export default class ViewerNav extends React.Component<ViewerNavProps, any> {
  static defaultProps = {
    activeIndex: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }

  handleChangeImg = (newIndex) => {
    if (this.props.activeIndex === newIndex) {
      return;
    }
    this.props.onChangeImg(newIndex);
  }

  toggleVisible = () => {
    this.setState({isVisible: !this.state.isVisible});
  }

  render() {
    let marginLeft = (Math.ceil(this.props.images.length / 2) - this.props.activeIndex - 1) * 1.5 * 30;
    let listStyle = {
      marginLeft: `${marginLeft}px`,
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
        <div className={`${this.props.prefixCls}-navbar`}>

        <button onClick={this.toggleVisible} className={`${this.props.prefixCls}-btn-toggle`}>
          {!!this.state.isVisible ? <FaAngleDown /> : <FaAngleUp />}
        </button>
        {this.state.isVisible &&
        <div>
          <ul className={`${this.props.prefixCls}-list ${this.props.prefixCls}-list-transition`} style={listStyle}>
            {this.props.images.map((item, index) =>
              <li
              key={index}
              className={index === this.props.activeIndex ? 'active' : ''}
                onClick={() => { this.handleChangeImg(index); }}>
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
