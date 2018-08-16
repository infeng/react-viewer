# react-viewer

[![NPM version][npm-image]][npm-url] [![](https://travis-ci.org/infeng/react-viewer.svg?branch=master)](https://travis-ci.org/infeng/react-viewer) [![codecov](https://codecov.io/gh/infeng/react-viewer/branch/master/graph/badge.svg)](https://codecov.io/gh/infeng/react-viewer)
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
        images={[{src: '', alt: ''}]}
        />
      </div>
    );
  }
}
```

## Props

| props        | type         | default | description                 | required |
|--------------|--------------|---------|-----------------------------|----------|
| visible      | string       |  false  | Viewer visible             | true |
| onClose      | function       |  -      | Specify a function that will be called when Visible close   | true |
| images       | [ImageDecorator](#imagedecorator)[]     | []      | image source array | true  |
| activeIndex  | number       | 0       | active image index | false |
| zIndex       | number       | 1000    | Viewer css z-index | false |
| container    | HTMLElement  | null    | set parent node(inline mode) | false |
| drag         | boolean      | true    | whether to drag image | false |
| attribute    | boolean      | true    | whether to show image attribute | false |
| zoomable     | boolean      | true    | whether to show 'zoom' button | false |
| rotatable    | boolean      | true    | whether to show 'rotate' button | false |
| scalable     | boolean      | true    | whether to show 'scale' button | false |
| onMaskClick  | (e) => void  |   -     | callback function when mask is clicked | false |
| downloadable     | boolean      |  false  | whether to show 'download' | false |
| noClose      | boolean      |  false  | to not render close button | false |
| noNavbar     | boolean      |  false  | to not render the navbar | false |
| noToolbar    | boolean      |  false  | to not render the toolbar | false |
| noImgDetails | boolean      |  false  | to not render image detail (WxH) | false |
| noFooter     | boolean      |  false  | to not render the entire footer | false |
| changeable   | boolean      |  true   | wheather to show change button  | false |
| customToolbar | (defaultToolbarConfigs: [ToolbarConfig](#toolbarconfig)[]) => ToolbarConfig[] | - | customer toolbar | false |
| zoomSpeed    | number       | 0.05    | zoom speed | false |

### ImageDecorator

| props       | type         | default | description                 | required |
|-------------|--------------|---------|-----------------------------|----------|
| src  | string  |  -  | image source | true |
| alt  | string  |  -  | image description | false |
| downloadUrl  | string  |  -  | image downlaod url | false |

### ToolbarConfig

| props       | type         | default | description                 | required |
|-------------|--------------|---------|-----------------------------|----------|
| key  | string  |  -  | tool key | true |
| render  | React.ReactNode  |  -  | tool render | false |
| onClick  | function  |  -  | callback function when action is clicked | false |

## Keyboard support

- `Esc`: Close viewer.
- `←`: View the previous image.
- `→`: View the next image.
- `↑`: Zoom in the image.
- `↓`: Zoom out the image.
- `Ctrl + 1`: Reset the image.
- `Ctrl + ←`: Rotate left the image.
- `Ctrl + →`: Rotate right the image.


## License

MIT

[npm-image]: https://badge.fury.io/js/react-viewer.svg
[npm-url]: https://npmjs.org/package/react-viewer
