import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Viewer from './Viewer';

export default class ViewerWrap extends React.Component<ViewerProps, any> {
  private container: HTMLDivElement;
  private component: React.ReactNode;

  constructor() {
    super();

    this.container = null;
    this.component = null;
  }

  renderViewer() {
    if (this.props.visible || this.component) {
      if (!this.container) {
        this.container = document.createElement('div');
      }
      document.body.appendChild(this.container);
      let instance = this;
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        <Viewer
        {...this.props}
        />,
        this.container,
        function() {
          instance.component = this;
        },
      );
    }
  }

  removeViewer() {
    if (this.container) {
      const container = this.container;
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      this.container = null;
      this.component = null;
    }
  }

  componentWillUnmount() {
    if (this.props.visible) {
      this.props.onClose();
      this.removeViewer();
    }else {
      this.removeViewer();
    }
  }

  componentDidMount() {
    this.renderViewer();
  }

  componentDidUpdate() {
    this.renderViewer();
  }

  render() {
    return null;
  }
}
