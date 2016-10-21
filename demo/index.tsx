import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Viewer from '../src/Viewer';
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
        <div id="container" style={{
          width: '500px',
          height: '500px',
        }}>
        </div>
        <Viewer
        visible={this.state.visible}
        onClose={() => { this.setState({ visible: false }); } }
        images={[{
          src: img,
          alt: 'lake',
        }, {
          src: img2,
          alt: 'mountain',
        }, {
          src: img3,
          alt: '',
        }]}
        container={document.getElementById('container')}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
