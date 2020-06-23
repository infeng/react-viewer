import * as React from 'react';
import { prefixCls } from '@app/constants';
import './style.less';

export interface LoadingProps {
  style?: React.CSSProperties;
}

export function Loading(props: LoadingProps) {
  return (
    <div className="loading-wrap" style={props.style}>
      <div className={`${prefixCls}-circle-loading`}>
      </div>
    </div>
  );
}
