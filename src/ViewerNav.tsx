import * as React from 'react';

export interface ViewerNavProps {
  prefixCls: string;
  images: any[];
  activeIndex: number;
}

export default class ViewerNav extends React.Component<ViewerNavProps, any> {
  static defaultProps = {
    activeIndex: 0,
  };

  render() {
    return (
      <div className={`${this.props.prefixCls}-navbar`}>
        <ul className={`${this.props.prefixCls}-list`}>
          {this.props.images.map((item, index) =>
            <li className={index === this.props.activeIndex ? 'active' : ''}><img src={item} /></li>
            )
          }
        </ul>
      </div>
    );
  }
}
