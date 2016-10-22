import * as React from 'react';

export interface LoadingProps {
  style?: React.CSSProperties;
}

export default class Loading extends React.Component<LoadingProps, any> {
  constructor() {
    super();
  }

  render() {
    let cls = 'spin spin-spinning';
    return (
      <div className="spin-wrap" style={this.props.style}>
        <div className={cls}>
          <div className="spin-dot"></div>
        </div>
      </div>
    );
  }
}
