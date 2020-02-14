import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewerCore from './ViewerCore';
import ViewerProps from './ViewerProps';

export default (props: ViewerProps) => {
  const defaultContainer = React.useRef(typeof document !== 'undefined' ? document.createElement('div') : null);
  const [ container, setContainer ] = React.useState(props.container);
  const [ init, setInit ] = React.useState(false);

  React.useEffect(() => {
    const childContainer = defaultContainer.current;
    document.body.appendChild(childContainer);
    return () => {
      try {
        document.body.removeChild(childContainer);
      } catch (ex) {
        console.error("Failed to clean up default container element."); 
      }
    };
  }, []);

  React.useEffect(() => {
    if (props.visible && !init) {
      setInit(true);
    }
  }, [props.visible, init]);

  React.useEffect(() => {
    if (props.container) {
      setContainer(props.container);
    } else {
      setContainer(defaultContainer.current);
    }
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
