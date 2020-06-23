import React from 'react';
import { Icon, ActionType } from '@app/components';
import { prefixCls } from '@app/constants';

interface CloseProps {
  onClose: () => void;
  zIndex: number;
}

export function Close(props: CloseProps) {
  const { onClose, zIndex } = props;
  return (
    <div
      className={`${prefixCls}-close ${prefixCls}-btn`}
      onClick={() => {
        onClose();
      }}
      style={{ zIndex: zIndex + 10 }}
    >
      <Icon type={ActionType.close} />
    </div>
  );
}
