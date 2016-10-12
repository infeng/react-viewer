import * as React from 'react';
import ViewerNav from './ViewerNav';

export interface ViewerFooterProps {
  prefixCls: string;
  images: any[];
  activeIndex: number;
}

export default class ViewerFooter extends React.Component<ViewerFooterProps, any> {
  render() {
    return (
      <div className={`${this.props.prefixCls}-footer`}>
        <ViewerNav
        prefixCls={this.props.prefixCls}
        images={this.props.images}
        activeIndex={this.props.activeIndex}
        />
      </div>
    );
  }
}
