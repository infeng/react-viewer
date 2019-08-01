import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewerCore from './ViewerCore';
import ViewerProps from './ViewerProps';

export default class Viewer extends React.Component<ViewerProps, any> {
  private defaultContainer: HTMLElement;
  private container: HTMLElement;
  private component: React.ReactNode;

  constructor() {
    super();

    this.container = null;
    this.defaultContainer = document.createElement('div');
    this.component = null;
  }

  renderViewer() {
    if (this.props.visible || this.component) {
      if (!this.container) {
        if (this.props.container) {
          this.container = this.props.container;
        } else {
          this.container = this.defaultContainer;
          document.body.appendChild(this.container);
        }
      }
      let instance = this;
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        <ViewerCore
          {...this.props}
          />,
        this.container,
        function () {
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
    if (this.props.visible &&  this.props.onClose) {
      this.props.onClose();
    }
    this.removeViewer();
  }

  componentWillReceiveProps(nextProps: ViewerProps) {
    if (this.props.container !== nextProps.container) {
      this.component = null;
      if (nextProps.container) {
        if (this.container) {
          document.body.removeChild(this.container);
        }
        this.container = nextProps.container;
      } else {
        this.container = this.defaultContainer;
        document.body.appendChild(this.container);
      }
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
