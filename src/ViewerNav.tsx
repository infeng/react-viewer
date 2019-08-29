import * as React from 'react';
import { ImageDecorator } from './ViewerProps';

export interface ViewerNavProps {
  prefixCls: string;
  images: ImageDecorator[];
  activeIndex: number;
  onChangeImg: (index: number) => void;
}

export default function ViewerNav(props: ViewerNavProps) {
  const { activeIndex = 0 } = props;

  function handleChangeImg(newIndex) {
    if (activeIndex === newIndex) {
      return;
    }
    props.onChangeImg(newIndex);
  }

  let marginLeft = `calc(50% - ${activeIndex + 1} * 31px)`;
  let listStyle = {
    marginLeft: marginLeft,
  };

  return (
    <div className={`${props.prefixCls}-navbar`}>
      <ul className={`${props.prefixCls}-list ${props.prefixCls}-list-transition`} style={listStyle}>
        {props.images.map((item, index) =>
          <li
          key={index}
          className={index === activeIndex ? 'active' : ''}
          onClick={() => { handleChangeImg(index); }}
          >
            <img src={item.src} alt={item.alt} />
          </li>,
          )
        }
      </ul>
    </div>
  );
}
