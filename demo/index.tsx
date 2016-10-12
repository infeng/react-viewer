import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewerWrap from '../src/ViewerWrap';

class App extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.setState({ visible: !this.state.visible }); } }>show</button>
        <ViewerWrap
        visible={this.state.visible}
        onClose={() => { this.setState({ visible: false }); } }
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
