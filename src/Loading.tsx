import * as React from 'react';

export interface LoadingProps {
  style?: React.CSSProperties;
}

export default function Loading(props: LoadingProps) {
  let cls = 'circle-loading';
  return (
    <div className="loading-wrap" style={props.style}>
      <div className={cls}>
      </div>
    </div>
  );
}
