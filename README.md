# react-viewer

react image viewer

## Installation

```javascript
npm install react-lazyload-img --save
```

## Usage

```javascript
import * as React from 'react';
import Viewer from 'react-viewer';

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
        images={['']}
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
| images      | string[]     | []      | image source array | true  |
| activeIndex | number       | 0       | active image index | false |

## License

MIT
