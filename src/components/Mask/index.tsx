import React from 'react';
import { prefixCls } from '@app/constants';
import './style.less';

interface MaskProps {
  zIndex: number;
}

export function Mask(props: MaskProps) {
  const { zIndex } = props;
  return (
    <div className={`${prefixCls}-mask`} style={{ zIndex: zIndex }} />
  );
}
