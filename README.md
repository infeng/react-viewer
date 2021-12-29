# react-viewer

[![NPM version][npm-image]][npm-url] [![](https://travis-ci.org/infeng/react-viewer.svg?branch=master)](https://travis-ci.org/infeng/react-viewer) [![codecov](https://codecov.io/gh/infeng/react-viewer/branch/master/graph/badge.svg)](https://codecov.io/gh/infeng/react-viewer)
> react image viewer.

## Introduction

Because I can`t be comfortable using [viewerjs](https://github.com/fengyuanchen/viewerjs) in react, so I created react-viewer to replace it.

## Installation

> react >= 16.8.0 | react-dom >= 16.8.0

```bash
npm install react-viewer --save
```

## Usage

```javascript
import * as React from 'react';
import Viewer from 'react-viewer';

function App() {
  const [ visible, setVisible ] = React.useState(false);

  return (
    <div>
      <button onClick={() => { setVisible(true); } }>show</button>
      <Viewer
      visible={visible}
      onClose={() => { setVisible(false); } }
      images={[{src: '', alt: ''}]}
      />
    </div>
  );
}
```

## Server Side (NextJS)

```
import React, { FC } from 'react'
import dynamic from 'next/dynamic'

const ReactViewer = dynamic(
  () => import('react-viewer'),
  { ssr: false }
)

export const Viewer: FC = () => {
  return (
    <ReactViewer
      visible={true}
      onClose={() => {}}
      images={[{src: ''}]}
    />
  )
}

export default Viewer
```

## Server Side rest..
I'm sorry, ssr is not currently supported in `3.x`, it will be fixed in `4.0`.

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
| pinchSpeed    | number       | 0.0015    | pinch zoom speed | false |
| defaultSize    | [ViewerImageSize](#viewerimagesize) | - | default image size | false |
| defaultImg    | [viewerdefaultimg](#viewerimagesize) | - | if load img failed, show default img | false |
| disableKeyboardSupport | boolean | false | disable keyboard support | false |
| noResetZoomAfterChange | boolean | false | preserve zoom after image change | false |
| noLimitInitializationSize | boolean | false | no limit image initialization size | false |
| defaultScale | number | 1 | set default scale | false |
| onChange | (activeImage: [ImageDecorator](#imagedecorator), index: number) => void | - | callback when image change | false |
| loop         | boolean      |  true   | whether enable image loop | false |
| disableMouseZoom   | boolean      |  false   | whether disable mouse zoom | false |
| disablePinchZoom   | boolean      |  false   | whether disable the pinch zoom touch gesture | false |
| downloadInNewWindow | boolean | false | whether to download in a new window | false |
| className   | string    |  -  | customized CSS class | false |
| showTotal   | boolean    |  true  | whether to display the total number and range | false |
| totalName | string | 'of' | total image separator name | false | 
| maxScale   | number    |  -  | maximum scaling | false |
| minScale   | number    |  0.1  | minimum scaling | false |

### ImageDecorator

| props       | type         | default | description                 | required |
|-------------|--------------|---------|-----------------------------|----------|
| src  | string  |  -  | image source | true |
| alt  | string  |  -  | image description | false |
| downloadUrl  | string  |  -  | image downlaod url | false |
| defaultSize  | [ViewerImageSize](#viewerimagesize)  |  -  | image size | false |

### ViewerImageSize

| props       | type         | default | description                 | required |
|-------------|--------------|---------|-----------------------------|----------|
| width  | number  |  -  | image width | true |
| height  | number  |  -  | image height | true |

### ViewerDefaultImg

| props       | type         | default | description                 | required |
|-------------|--------------|---------|-----------------------------|----------|
| src  | number  |  -  | image source | true |
| width  | number  |  -  | image width | false |
| height  | number  |  -  | image height | false |

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
