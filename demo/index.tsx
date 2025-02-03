import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Viewer from '../src/Viewer';
const img2 = require('./images/landscape2.jpg').default;
const img = require('./images/landscape.jpg').default;
const img3 = require('./images/tibet-6.jpg').default;
const img4 = require('./images/image4.jpg').default;
const pdf = require('./pdf/sample-local-pdf.pdf').default;
import './index.less';
import classNames from 'classnames';
import { Button, List, Checkbox } from 'antd';

import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const ButtonGroup = Button.Group;

interface State {
  visible: boolean;
  activeIndex: number;
  mode: 'modal' | 'inline';
  drawerVisible: boolean;
  drag: boolean;
  attribute: boolean;
}

interface OptionData {
  key: string;
  type: 'boolean';
  value?: any;
}

const optionData: OptionData[] = [{
  key: 'drag',
  type: 'boolean',
}, {
  key: 'attribute',
  type: 'boolean',
}, {
  key: 'zoomable',
  type: 'boolean',
}, {
  key: 'rotatable',
  type: 'boolean',
}, {
  key: 'scalable',
  type: 'boolean',
}, {
  key: 'downloadable',
  type: 'boolean',
}, {
  key: 'loop',
  type: 'boolean',
}, {
  key: 'noClose',
  type: 'boolean',
  value: false,
}, {
  key: 'noImgDetails',
  type: 'boolean',
  value: false,
}, {
  key: 'noNavbar',
  type: 'boolean',
  value: false,
}, {
  key: 'noToolbar',
  type: 'boolean',
  value: false,
}, {
  key: 'noFooter',
  type: 'boolean',
  value: false,
}, {
  key: 'changeable',
  type: 'boolean',
}, {
  key: 'disableKeyboardSupport',
  type: 'boolean',
  value: false,
}, {
  key: 'noResetZoomAfterChange',
  type: 'boolean',
  value: false,
}, {
  key: 'noLimitInitializationSize',
  type: 'boolean',
  value: false,
}, {
  key: 'disableMouseZoom',
  type: 'boolean',
  value: false,
}, {
  key: 'downloadInNewWindow',
  type: 'boolean',
  value: false,
}, {
  key: 'showTotal',
  type: 'boolean',
}];

class App extends React.Component<any, Partial<State>> {
  container: HTMLDivElement;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      activeIndex: 0,
      mode: 'modal',
    };
    optionData.forEach(item => {
      if (item.value === undefined) {
        this.state[item.key] = true;
      } else {
        this.state[item.key] = item.value;
      }
    });
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

  handleOption = key => {
    this.setState({
      [key]: !this.state[key],
    });
  }

  render() {
    let files = [{
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
    }, {
      src: pdf,
      alt: 'Sample pdf'
    }];

    let inline = this.state.mode === 'inline';

    let inlineContainerClass = classNames('inline-container', {
      show: this.state.visible && inline,
    });

    let imgListClass = classNames('img-list', {
      hide: this.state.visible && inline,
    });

    let options = {};
    optionData.forEach(item => {
      options[item.key] = this.state[item.key];
    });

    return (
      <div>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-brand">
              react-viewer
            </div>
            <a className="bagde" href="https://npmjs.org/package/react-viewer">
              <img src="https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=3.0.0&x2=0" />
            </a>
            <a className="bagde" href="https://travis-ci.org/infeng/react-viewer">
              <img src="https://travis-ci.org/infeng/react-viewer.svg?branch=master" />
            </a>
            <a className="bagde" href="https://codecov.io/gh/infeng/react-viewer">
              <img src="https://codecov.io/gh/infeng/react-viewer/branch/master/graph/badge.svg" />
            </a>
            <div className="github">
              <a className="bagde" href="https://github.com/infeng/react-viewer">
                <img
                src="https://img.shields.io/github/stars/infeng/react-viewer?style=social"
                />
              </a>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="wrap">
            <div>
              <h2>Options</h2>
              <div className="options">
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
                <List
                  className="options-list"
                  bordered
                  dataSource={optionData}
                  renderItem={item => {
                    let content = null;
                    switch (item.type) {
                      case 'boolean':
                        content = (
                          <Checkbox
                            checked={this.state[item.key]}
                            onChange={() => { this.handleOption(item.key); }}
                          >
                            {item.key}
                          </Checkbox>
                        );
                        break;
                      default:
                        break;
                    }
                    return (
                      <List.Item>
                        {content}
                      </List.Item>
                    );
                  }}
                />
              </div>
            </div>
            <div className="img-list-wrap">
              <div className={imgListClass}>
                {files.map((item, index) => {
                  return (
                    <div 
                      key={index.toString()} 
                      className="img-item"
                      onClick={() => {
                        this.setState({
                          visible: true,
                          activeIndex: index,
                        });
                      }}
                    >
                      {
                        item.src.includes('.pdf')
                        ? <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Document file={item.src}>
                            <Page pageNumber={1} width={150} scale={0.75} renderTextLayer={false} />
                          </Document>
                          </div>
                        : <img src={item.src} />
                      }
                    </div>
                  );
                })}
              </div>
              <div className={inlineContainerClass} ref={ref => {this.container = ref; }}></div>
            </div>
          </div>
          <Viewer
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
          files={files}
          activeIndex={this.state.activeIndex}
          container={inline ? this.container : null}
          downloadable
          customToolbar={(toolbars) => {
            return toolbars.concat([{
              key: 'test',
              render: <div>C</div>,
              onClick: (activeFile) => {
                console.log(activeFile);
              },
            }]);
          }}
          {...options}
          />
        </div>
        <div className="footer">
          <div className="container-footer">
            <a href="https://github.com/infeng" className="signature">@infeng</a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
