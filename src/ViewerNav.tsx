import * as React from 'react';
import { ImageDecorator } from './ViewerProps';

export interface ViewerNavProps {
  prefixCls: string;
  images: ImageDecorator[];
  activeIndex: number;
  onChangeImg: (index: number) => void;
}

export default class ViewerNav extends React.Component<ViewerNavProps, any> {
  static defaultProps = {
    activeIndex: 0,
  };

  handleChangeImg(newIndex) {
    this.props.onChangeImg(newIndex);
  }

  render() {
    let marginLeft = (Math.ceil(this.props.images.length / 2) - this.props.activeIndex - 1) * 1.5 * 30;
    let listStyle = {
      marginLeft: `${marginLeft}px`,
    };

    return (
      <div className={`${this.props.prefixCls}-navbar`}>
        <ul className={`${this.props.prefixCls}-list ${this.props.prefixCls}-list-transition`} style={listStyle}>
          {this.props.images.map((item, index) =>
            <li
            key={index}
            className={index === this.props.activeIndex ? 'active' : ''}
            onClick={this.handleChangeImg.bind(this, index)}
            >
              <img src={item.src} alt={item.alt} />
            </li>
            )
          }
        </ul>
      </div>
    );
  }
}
