# react-viewer

> react image viewer.

## Introduction

Because i can`t comfortable use [viewerjs](https://github.com/fengyuanchen/viewerjs) in react, so i create react-viewer to replace it.

## Installation

```bash
npm install react-viewer --save
```

## Usage

```javascript
import * as React from 'react';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

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
        <Viewer
        visible={this.state.visible}
        onClose={() => { this.setState({ visible: false }); } }
        images={[src: '', alt: '']}
        />
      </div>
    );
  }
}
```

## Props

| props       | type         | default | description                 | required |
|-------------|--------------|---------|-----------------------------|----------|
| visible     | string       |  false  | Viewer visible             | true |
| onClose     | string       |  -      | Specify a function that will be called when Visible close   | true |
| images      | {src: string, alt: string}[]     | []      | image source array | true  |
| activeIndex | number       | 0       | active image index | false |

## License

MIT
