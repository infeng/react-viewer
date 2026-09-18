import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewerCore from './ViewerCore';
import ViewerProps from './ViewerProps';

export default (props: ViewerProps) => {
  const defaultContainer = React.useRef<HTMLDivElement>(null);
  const [ container, setContainer ] = React.useState(props.container);
  const [ init, setInit ] = React.useState(false);

  React.useEffect(() => {
    if (props.visible && !init) {
      setInit(true);
    }
  }, [props.visible, init]);

  React.useEffect(() => {
    if (props.container) {
      setContainer(props.container);
      return;
    }
    if (!defaultContainer.current) {
      defaultContainer.current = document.createElement('div');
    }
    const node = defaultContainer.current;
    document.body.appendChild(node);
    setContainer(node);
    return () => {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    };
  }, [props.container]);

  if (!init) {
    return null;
  }
  return ReactDOM.createPortal((
    <ViewerCore
      {...props}
    />
  ), container);
};
