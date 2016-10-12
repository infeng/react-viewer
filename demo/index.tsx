import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewerWrap from '../src/ViewerWrap';
const imgSrc2 = require('./images/landscape2.jpg');
const imgSrc = require('./images/landscape.jpg');

class App extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      visible: true,
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.setState({ visible: !this.state.visible }); } }>show</button>
        <ViewerWrap
        visible={this.state.visible}
        onClose={() => { this.setState({ visible: false }); } }
        images={[imgSrc, imgSrc2]}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
