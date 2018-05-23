import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Viewer from '../src/Viewer';
const img2 = require('./images/landscape2.jpg');
const img = require('./images/landscape.jpg');
const img3 = require('./images/tibet-6.jpg');
const img4 = require('./images/image4.jpg');
const forkImg = require('./images/fork_me_ribbon.svg');
import './index.less';
import classNames from 'classnames';
import { Row, Col, Button } from 'antd';
const ButtonGroup = Button.Group;

interface State {
  visible: boolean;
  activeIndex: number;
  mode: 'modal' | 'inline';
}

class App extends React.Component<any, Partial<State>> {
  container: HTMLDivElement;

  constructor() {
    super();

    this.state = {
      visible: false,
      activeIndex: 0,
      mode: 'modal',
    };
  }

  handleChangeModal = (e) => {
    this.setState({
      mode: 'modal',
    });
  }

  handleChangeInline = (e) => {
    this.setState({
      mode: 'inline',
      visible: true,
    });
  }

  render() {
    let images = [{
      src: img,
      alt: 'lake',
      downloadUrl: '',
    }, {
      src: img2,
      alt: 'mountain',
      downloadUrl: '',
    }, {
      src: img3,
      alt: '',
      downloadUrl: '',
    }, {
      src: img4,
      alt: '',
      downloadUrl: '',
    }];

    let inline = this.state.mode === 'inline';

    let inlineContainerClass = classNames('inline-container', {
      show: this.state.visible && inline,
    });

    let imgListClass = classNames('img-list', {
      hide: this.state.visible && inline,
    });

    return (
      <div>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-brand">
              <p>react-viewer</p>
            </div>
          </div>
        </nav>
        <a href="https://github.com/infeng/react-viewer">
          <img className="img-fork" src={forkImg} />
        </a>
        <div className="container">
          <h1 className="title">Demo</h1>
          <Row>
            <Col span={6}>
              <h2>Options</h2>
              <div className="options-list">
                <ButtonGroup>
                  <Button
                    type={inline ? null : 'primary'}
                    onClick={this.handleChangeModal}
                  >
                      Modal mode
                  </Button>
                  <Button
                    type={inline ? 'primary' : null}
                    onClick={this.handleChangeInline}
                  >
                      Inline mode
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
            <Col span={12}>
              <div className={imgListClass}>
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
              <div className={inlineContainerClass} ref={ref => {this.container = ref;}}></div>
            </Col>
          </Row>
          <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }); } }
          images={images}
          activeIndex={this.state.activeIndex}
          container={inline ? this.container : null}
          downloadable
          customToolbar={(toolbars) => {
            return toolbars.concat([{
              key: 'test',
              render: <div>C</div>,
              onClick: (activeImage) => {
                console.log(activeImage);
              },
            }]);
          }}
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
