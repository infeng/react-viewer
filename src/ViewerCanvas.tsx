import * as React from 'react';
import Loading from './Loading';
import classnames from 'classnames';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import useClickOutside from './useClickOutside';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export interface ViewerCanvasProps {
  prefixCls: string;
  fileSrc: string;
  isPdf: boolean;
  visible: boolean;
  width: number;
  height: number;
  top: number;
  left: number;
  rotate: number;
  onChangeFileState: (width: number, height: number, top: number, left: number) => void;
  onResize: () => void;
  zIndex: number;
  scaleX: number;
  scaleY: number;
  loading: boolean;
  drag: boolean;
  container: HTMLElement;
  onCanvasMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface ViewerCanvasState {
  isMouseDown?: boolean;
  mouseX?: number;
  mouseY?: number;
}

export default function ViewerCanvas(props: ViewerCanvasProps) {
  const pdfRef = React.useRef();
  const isMouseDown = React.useRef(false);
  const prePosition = React.useRef({
    x: 0,
    y: 0,
  });
  const [ position, setPosition ] = React.useState({
    x: 0,
    y: 0,
  });
  const [ numPages, setNumPages ] = React.useState<number>();

  React.useEffect(() => {
    return () => {
      bindEvent(true);
      bindWindowResizeEvent(true);
    };
  }, []);

  React.useEffect(() => {
    bindWindowResizeEvent();

    return () => {
      bindWindowResizeEvent(true);
    };
  });

  React.useEffect(() => {
    if (props.visible && props.drag) {
      bindEvent();
    }
    if (!props.visible && props.drag) {
      handleMouseUp({});
    }
    return () => {
      bindEvent(true);
    };
  }, [props.drag, props.visible]);

  React.useEffect(() => {
    let diffX = position.x - prePosition.current.x;
    let diffY = position.y - prePosition.current.y;
    prePosition.current = {
      x: position.x,
      y: position.y,
    };
    props.onChangeFileState(props.width, props.height, props.top + diffY, props.left + diffX);
  }, [position]);

  function handleResize(e) {
    props.onResize();
  }

  function handleCanvasMouseDown(e) {
    props.onCanvasMouseDown(e);
    handleMouseDown(e);
  }

  function handleMouseDown(e) {
    if (e.button !== 0) {
      return;
    }
    if (!props.visible || !props.drag || props.isPdf) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    isMouseDown.current = true;
    prePosition.current = {
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    };
  }

  const handleMouseMove = (e) => {
    if (isMouseDown.current) {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  function handleMouseUp(e) {
    isMouseDown.current = false;
  }

  function bindWindowResizeEvent(remove?: boolean) {
    let funcName = 'addEventListener';
    if (remove) {
      funcName = 'removeEventListener';
    }
    window[funcName]('resize', handleResize, false);
  }

  function bindEvent(remove?: boolean) {
    let funcName = 'addEventListener';
    if (remove) {
      funcName = 'removeEventListener';
    }

    document[funcName]('click', handleMouseUp, false);
    document[funcName]('mousemove', handleMouseMove, false);
  }

  let fileStyle: React.CSSProperties = {
    width: `${props.width}px`,
    height: `${props.height}px`,
    transform: `
      translateX(${props.left !== null ? props.left + 'px' : 'aoto'}) translateY(${props.top}px)
      rotate(${props.rotate}deg) scaleX(${props.scaleX}) scaleY(${props.scaleY})`,
  };

  const imgClass = classnames(`${props.prefixCls}-image`, {
    drag: props.drag,
    [`${props.prefixCls}-image-transition`]: !isMouseDown.current,
  });

  let style = {
    zIndex: props.zIndex,
  };

  let node = null;
  if (props.fileSrc !== '') {
    if (props.isPdf) {
      const scale = props.scaleX < 0 ? -props.scaleX : props.scaleX;
      node = <div style={{
          height: '85%',
          display: 'flex',
          justifyContent: 'center',
          transform:
            props.scaleX < 0 || props.scaleY < 0
              ? `scaleX(${props.scaleX * (1 / scale)}) scaleY(${props.scaleY * (1 / scale)})`
              : undefined,
        }}
      >
        <Document
          inputRef={pdfRef}
          file={props.fileSrc}
          onLoadSuccess={(info: { numPages: number }) => setNumPages(info.numPages)}
        >
          <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
          {
            [...new Array(numPages)].map((_, index) => {
              return (
                <div key={index} style={{ marginTop: 5 }}>
                  <Page pageNumber={index + 1} rotate={props.rotate} scale={scale} />
                </div>
              );
            })
          }
          </div>
        </Document>
      </div>;
    } else {
      node = <img
      className={imgClass}
      src={props.fileSrc}
      style={fileStyle}
      onMouseDown={handleMouseDown}
    />;
    }
  }
  if (props.loading) {
    node = (
      <div
        style={{
          display: 'flex',
          height: `${window.innerHeight - 84}px`,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loading/>
      </div>
    );
  }

  useClickOutside(pdfRef, handleCanvasMouseDown);

  return (
    <div
    className={`${props.prefixCls}-canvas`}
    onMouseDown={props.isPdf ? () => {} : handleCanvasMouseDown}
    style={style}
    >
      {node}
    </div>
  );
}
