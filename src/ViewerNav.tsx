import * as React from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { FileDecorator } from './ViewerProps';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export interface ViewerNavProps {
  prefixCls: string;
  files: FileDecorator[];
  activeIndex: number;
  onChangeFile: (index: number) => void;
}

export default function ViewerNav(props: ViewerNavProps) {
  const { activeIndex = 0 } = props;

  function handleChangeFile(newIndex) {
    if (activeIndex === newIndex) {
      return;
    }
    props.onChangeFile(newIndex);
  }

  let marginLeft = `calc(50% - ${activeIndex + 1} * 31px)`;
  let listStyle = {
    marginLeft: marginLeft,
  };

  return (
    <div className={`${props.prefixCls}-navbar`}>
      <ul className={`${props.prefixCls}-list ${props.prefixCls}-list-transition`} style={listStyle}>
        {props.files.map((item, index) =>
          <li
          key={index}
          className={index === activeIndex ? 'active' : ''}
          onClick={() => { handleChangeFile(index); }}
          >
            {
              item.src.includes('.pdf')
              ? <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Document file={item.src}>
              <Page pageNumber={1} width={150} scale={0.75} renderTextLayer={false} />
            </Document>
            </div>
              : <img src={item.src} alt={item.alt} />
            }
          </li>,
          )
        }
      </ul>
    </div>
  );
}
