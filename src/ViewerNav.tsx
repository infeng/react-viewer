import * as React from 'react';

export interface ViewerNavProps {
  prefixCls: string;
  images: any[];
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
        <ul className={`${this.props.prefixCls}-list ${this.props.prefixCls}-transition`} style={listStyle}>
          {this.props.images.map((item, index) =>
            <li
            key={index}
            className={index === this.props.activeIndex ? 'active' : ''}
            onClick={this.handleChangeImg.bind(this, index)}
            >
              <img src={item} />
            </li>
            )
          }
        </ul>
      </div>
    );
  }
}
