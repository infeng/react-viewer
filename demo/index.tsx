import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewerWrap from '../src/ViewerWrap';
const img2 = require('./images/landscape2.jpg');
const img = require('./images/landscape.jpg');
const img3 = require('./images/tibet-6.jpg');

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
        images={[img2, img, img3]}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
