import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Viewer from '../src/Viewer';
const img2 = require('./images/landscape2.jpg');
const img = require('./images/landscape.jpg');
const img3 = require('./images/tibet-6.jpg');
const img4 = require('./images/image4.jpg');
const forkImg = require('./images/fork_me_ribbon.svg');
import './index.less';

class App extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      visible: false,
      activeIndex: 0,
    };
  }

  render() {
    let images = [{
      src: img,
      alt: 'lake',
    }, {
      src: img2,
      alt: 'mountain',
    }, {
      src: img3,
      alt: '',
    }, {
      src: img4,
      alt: '',
    }];

    return (
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-brand">
              <a>react-viewer</a>
            </div>
          </div>
        </nav>
        <a href="https://github.com/infeng/react-viewer">
          <img className="img-fork" src={forkImg} />
        </a>
        <div className="container">
          <h1 className="title">Demo</h1>
          <div className="img-list">
            {images.map((item, index) => {
              return (
                <div key={index.toString()} className="img-item">
                  <img src={item.src} onClick={() => {
                    this.setState({
                      visible: true,
                      activeIndex: index,
                    });
                  }}/>
                </div>
              );
            })}
          </div>
          <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }); } }
          images={images}
          activeIndex={this.state.activeIndex}
          />
        </div>
        <div className="footer">
          <div className="container-fluid container-footer">
            <a href="https://github.com/infeng" className="signature">@infeng</a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
