import Viewer from '../index';
import ViewerProps from '../ViewerProps';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
const img2 = require('../../demo/images/landscape2.jpg');
const img = require('../../demo/images/landscape.jpg');

configure({ adapter: new Adapter() });

function $$(className) {
  return document.body.querySelectorAll(className);
}

interface ViewerTesterProps {
  hasContainer?: boolean;
}

class ViewerTester extends React.Component<ViewerTesterProps & ViewerProps, any> {
  static defaultProps = {
    hasContainer: false,
  };

  container: any;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      activeIndex: 0,
    };
  }

  handleOpen = () => {
    this.setState({
      visible: true,
    });
  }

  handleChangeActiveIndex = () => {
    this.setState({
      activeIndex: 1,
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
    }];

    const { hasContainer, ...viewerProps } = this.props;

    return (
      <div>
        <button id="viewer-tester-open-btn" onClick={this.handleOpen}>open viewer</button>
        <button id="viewer-tester-change-btn" onClick={this.handleChangeActiveIndex}>change active index</button>
        <div id="container" ref={ref => {this.container = ref;}} style={{ width: '150px', height: '150px' }}></div>
        <Viewer
          visible={this.state.visible}
          images={images}
          activeIndex={this.state.activeIndex}
          container={hasContainer ? this.container : false}
          ref="viewer"
          onClose={() => { this.setState({ visible: false }); }}
          {...viewerProps}
        />
      </div>
    );
  }
}

import * as EventEmitter from 'wolfy87-eventemitter';

const FAILED_IMG = 'fail_img';

class MockImage {
  source = '';
  width = 0;
  height = 0;
  ee = new EventEmitter();
  constructor() {
    this.ee.defineEvents(['load', 'error']);
  }

  set src(value: string) {
    this.source = value;
    this.width = this.height = 100;
    if (this.source === FAILED_IMG) {
      this.ee.emitEvent('error');
    } else {
      this.ee.emitEvent('load');
    }
  }

  set onerror(ev) {
    this.ee.addListener('error', ev);
  }

  set onload(ev) {
    this.ee.addListener('load', ev);
  }

  addEventListener(event, callback) {
    this.ee.addListener(event, callback);
  }

  get src() {
    return this.source;
  }
}

global.Image = MockImage;

function triggerMouseEvent (node, eventType, x = 0, y = 0) {
  const clickEvent = new MouseEvent(eventType, {
    clientX: x,
    clientY: y,
    view: window,
    bubbles: true,
    cancelable: true,
  });
  node.dispatchEvent (clickEvent);
}

function triggerWheel(node, eventType, deltaY) {
  const wheelEvent = new WheelEvent(eventType, {
    view: window,
    bubbles: true,
    cancelable: true,
    deltaY,
  });
  node.dispatchEvent (wheelEvent);
}

function triggerKeyboard(node, eventType, keyCode, ctrlKey = false) {
  const wheelEvent = new KeyboardEvent(eventType, {
    view: window,
    bubbles: true,
    cancelable: true,
    keyCode: keyCode,
    ctrlKey,
  });
  node.dispatchEvent (wheelEvent);
}

function getTransformValue(transform) {
  const translateXReg = /translateX\((.+)px\)(?= translateY)/;
  const translateYReg = /translateY\((.+)px\)/;
  const rotateReg = /rotate\((.+)deg\)/;
  const scaleXReg = /scaleX\((.+)\) /;
  const scaleYReg = /scaleY\((.+)\)/;
  const translateX = transform.match(translateXReg)[1];
  const translateY = transform.match(translateYReg)[1];
  const rotate = transform.match(rotateReg)[1];
  const scaleX = transform.match(scaleXReg)[1];
  const scaleY = transform.match(scaleYReg)[1];
  return {
    translateX,
    translateY,
    rotate,
    scaleX,
    scaleY,
  };
}

jest.useFakeTimers();

let wrapper = null;

interface ViewerHelperNewOptions extends ViewerProps, ViewerTesterProps {}

class ViewerHelper {
  new(props: ViewerHelperNewOptions = {}) {
    if (wrapper) {
      wrapper.unmount();
    }
    wrapper = mount(<ViewerTester {...props} />);
  }

  open() {
    wrapper.find('#viewer-tester-open-btn').simulate('click');
    this.skipAnimation();
  }

  skipAnimation() {
    jest.advanceTimersByTime(1000);

    wrapper.ref('viewer').component.handleTransitionEnd();
  }
}

const viewerHelper = new ViewerHelper();

describe('Viewer', () => {
  it('open and close', () => {
    viewerHelper.new();
    viewerHelper.open();

    expect($$('img.react-viewer-image')).toHaveLength(1);

    $$('.react-viewer-close')[0].click();

    viewerHelper.skipAnimation();

    expect($$('.react-viewer')[0].style.display).toBe('none');
  });

  it('render with no footer', () => {
    viewerHelper.new({ noFooter: true });
    viewerHelper.open();

    expect($$('.react-viewer-footer')).toHaveLength(0);
  });

  it('render with no navbar', () => {
    viewerHelper.new({ noNavbar: true });
    viewerHelper.open();

    expect($$('.react-viewer-navbar')).toHaveLength(0);
  });

  it('render with no toolbar', () => {
    viewerHelper.new({ noToolbar: true });
    viewerHelper.open();

    expect($$('.react-viewer-toolbar')).toHaveLength(0);
  });

  it('render with no attribute', () => {
    viewerHelper.new({ attribute: false });
    viewerHelper.open();

    expect($$('.react-viewer-attribute')).toHaveLength(0);
  });

  it('render with no img details', () => {
    viewerHelper.new({ noImgDetails: true });
    viewerHelper.open();

    expect($$('.react-viewer-img-details')).toHaveLength(0);
  });

  it('render with no zoom rotate scale change toolbar button', () => {
    viewerHelper.new({
      zoomable: false,
      rotatable: false,
      scalable: false,
      changeable: false,
    });
    viewerHelper.open();

    expect($$('.react-viewer-icon-zoomIn')).toHaveLength(0);
    expect($$('.react-viewer-icon-zoomOut')).toHaveLength(0);
    expect($$('.react-viewer-icon-rotateLeft')).toHaveLength(0);
    expect($$('.react-viewer-icon-rotateRight')).toHaveLength(0);
    expect($$('.react-viewer-icon-scaleX')).toHaveLength(0);
    expect($$('.react-viewer-icon-scaleY')).toHaveLength(0);
    expect($$('.react-viewer-icon-prev')).toHaveLength(0);
    expect($$('.react-viewer-icon-next')).toHaveLength(0);
  });

  it('change active index success', () => {
    viewerHelper.new();
    viewerHelper.open();

    wrapper.find('#viewer-tester-change-btn').simulate('click');
    viewerHelper.skipAnimation();

    expect($$('.react-viewer-attribute')[0].innerHTML).toContain('mountain');
  });

  it('custom toolbar', () => {
    const handleClick = jest.fn();
    viewerHelper.new({
      customToolbar: toolbars => {
        return toolbars.concat([{
          key: 'test',
          render: <div id="c">C</div>,
          onClick: handleClick,
        }]);
      },
    });
    viewerHelper.open();

    expect($$('li[data-key=test]')).toHaveLength(1);

    $$('li[data-key=test]')[0].click();

    expect(handleClick).toBeCalledWith(
      expect.objectContaining({
        alt: 'lake',
        downloadUrl: expect.anything(),
        src: expect.any(String),
      }),
    );
  });

  it('handle mask click', () => {
    const handleMaskClick = jest.fn();
    viewerHelper.new({
      onMaskClick: handleMaskClick,
    });
    viewerHelper.open();

    const canvas = $$('.react-viewer-canvas')[0];
    triggerMouseEvent(canvas, 'mousedown');

    expect(handleMaskClick).toBeCalledWith(expect.anything());
  });

  it('move image with mouse move', () => {
    viewerHelper.new();
    viewerHelper.open();

    let imgNode = $$('img.react-viewer-image')[0];

    const oldTransform = imgNode.style.transform;

    const canvas = $$('.react-viewer-canvas')[0];
    triggerMouseEvent(canvas, 'mousedown');

    triggerMouseEvent(canvas, 'mousemove', 50, 50);

    const newTransform = imgNode.style.transform;

    const oldTransformValue = getTransformValue(oldTransform);
    const newTransformValue = getTransformValue(newTransform);

    expect(newTransformValue.translateX - oldTransformValue.translateX).toBe(50);
    expect(newTransformValue.translateY - oldTransformValue.translateY).toBe(50);
  });

  it('change active iamge whith prev and next button', () => {
    viewerHelper.new();
    viewerHelper.open();

    $$('li[data-key=next]')[0].click();
    $$('li[data-key=next]')[0].click();
    expect($$('.react-viewer-attribute')[0].innerHTML).toContain('lake');

    $$('li[data-key=prev]')[0].click();
    expect($$('.react-viewer-attribute')[0].innerHTML).toContain('mountain');
  });

  it('rotate image', () => {
    viewerHelper.new();
    viewerHelper.open();

    let imgNode = $$('img.react-viewer-image')[0];

    $$('li[data-key=rotateRight]')[0].click();

    expect(getTransformValue(imgNode.style.transform).rotate).toBe('90');

    $$('li[data-key=rotateLeft]')[0].click();

    expect(getTransformValue(imgNode.style.transform).rotate).toBe('0');
  });

  it('scale image', () => {
    viewerHelper.new();
    viewerHelper.open();

    let imgNode = $$('img.react-viewer-image')[0];

    $$('li[data-key=scaleX]')[0].click();

    expect(getTransformValue(imgNode.style.transform).scaleX).toBe('-1');

    $$('li[data-key=scaleY]')[0].click();

    expect(getTransformValue(imgNode.style.transform).scaleX).toBe('-1');
  });

  it('zoom image', () => {
    viewerHelper.new();
    viewerHelper.open();

    let imgNode = $$('img.react-viewer-image')[0];

    $$('li[data-key=zoomIn]')[0].click();

    expect(getTransformValue(imgNode.style.transform).scaleX).toBe('1.05');

    $$('li[data-key=zoomOut]')[0].click();

    expect(getTransformValue(imgNode.style.transform).scaleX).toBe('1');
  });

  it('mouse wheel', () => {
    viewerHelper.new();
    viewerHelper.open();

    let imgNode = $$('img.react-viewer-image')[0];

    const viewer = $$('.react-viewer')[0];

    triggerWheel(viewer, 'wheel', -1);

    expect(getTransformValue(imgNode.style.transform).scaleX).toBe('1.05');

    triggerWheel(viewer, 'wheel', 1);

    expect(getTransformValue(imgNode.style.transform).scaleX).toBe('1');
  });

  it('can not drag', () => {
    viewerHelper.new({
      drag: false,
    });
    viewerHelper.open();

    let imgNode = $$('img.react-viewer-image')[0];

    const oldTransform = imgNode.style.transform;

    const canvas = $$('.react-viewer-canvas')[0];
    triggerMouseEvent(canvas, 'mousedown');

    triggerMouseEvent(canvas, 'mousemove', 50, 50);

    const newTransform = imgNode.style.transform;

    const oldTransformValue = getTransformValue(oldTransform);
    const newTransformValue = getTransformValue(newTransform);

    expect(newTransformValue.translateX - oldTransformValue.translateX).toBe(0);
    expect(newTransformValue.translateY - oldTransformValue.translateY).toBe(0);
  });

  it('change active image with nav', () => {
    viewerHelper.new({});
    viewerHelper.open();

    const navList = $$('.react-viewer-list')[0];

    navList.children[1].click();

    viewerHelper.skipAnimation();

    expect($$('.react-viewer-attribute')[0].innerHTML).toContain('mountain');
  });

  it('render witch container', () => {
    viewerHelper.new({
      hasContainer: true,
    });
    viewerHelper.open();

    expect(wrapper.render().find('.react-viewer-inline')).toHaveLength(1);

    wrapper.ref('viewer').component.handleMouseScroll(new WheelEvent('wheel', {
      view: window,
      bubbles: true,
      cancelable: true,
      deltaY: -1,
    }));

    expect(getTransformValue(wrapper.render().find('.react-viewer-image')[0].attribs.style).scaleX).toBe('1.05');
  });

  it('reset image', () => {
    viewerHelper.new();
    viewerHelper.open();

    let imgNode = $$('img.react-viewer-image')[0];

    const oldTransformValue = getTransformValue(imgNode.style.transform);

    $$('li[data-key=scaleX]')[0].click();
    $$('li[data-key=reset]')[0].click();

    const newTransformValue = getTransformValue(imgNode.style.transform);

    expect(oldTransformValue.scaleX - newTransformValue.scaleX).toBe(0);
  });

  it('download', () => {
    viewerHelper.new({
      downloadable: true,
    });
    viewerHelper.open();

    $$('li[data-key=download]')[0].click();
  });

  it('keyboard support', () => {
    viewerHelper.new();
    viewerHelper.open();

    // close
    triggerKeyboard(document, 'keydown', 27);
    viewerHelper.skipAnimation();
    expect($$('.react-viewer')[0].style.display).toBe('none');
    viewerHelper.open();

    // prev
    triggerKeyboard(document, 'keydown', 37);
    viewerHelper.skipAnimation();
    expect($$('.react-viewer-attribute')[0].innerHTML).toContain('mountain');

    // next
    triggerKeyboard(document, 'keydown', 39);
    viewerHelper.skipAnimation();
    expect($$('.react-viewer-attribute')[0].innerHTML).toContain('lake');

    let imgNode = $$('img.react-viewer-image')[0];

    // zoomIn
    triggerKeyboard(document, 'keydown', 38);
    expect(getTransformValue(imgNode.style.transform).scaleX).toBe('1.05');

    // zoomOut
    triggerKeyboard(document, 'keydown', 40);
    expect(getTransformValue(imgNode.style.transform).scaleX).toBe('1');

    // rotateLeft
    triggerKeyboard(document, 'keydown', 37, true);
    expect(getTransformValue(imgNode.style.transform).rotate).toBe('-90');

    // rotateRight
    triggerKeyboard(document, 'keydown', 39, true);
    expect(getTransformValue(imgNode.style.transform).rotate).toBe('0');

    // reset 
    triggerKeyboard(document, 'keydown', 39, true);
    triggerKeyboard(document, 'keydown', 49, true);
    viewerHelper.skipAnimation();
    imgNode = $$('img.react-viewer-image')[0];
    expect(getTransformValue(imgNode.style.transform).rotate).toBe('0');
  });

  it('set default size', () => {
    viewerHelper.new({
      downloadable: true,
      defaultSize: {
        width: 100,
        height: 100,
      },
      images: [{
        src: img,
        alt: 'lake',
        downloadUrl: '',
      }, {
        src: img2,
        alt: 'mountain',
        downloadUrl: '',
        defaultSize: {
          width: 200,
          height: 200,
        },
      }],
    });
    viewerHelper.open();

    let imgNode = $$('img.react-viewer-image')[0];
    expect(imgNode.style.width).toBe('100px');
    expect(imgNode.style.width).toBe('100px');

    $$('li[data-key=next]')[0].click();
    imgNode = $$('img.react-viewer-image')[0];
    expect(imgNode.style.width).toBe('200px');
    expect(imgNode.style.width).toBe('200px');
  });

  it('set defaultImg', () => {
    const defaultImg = 'deafult_img';

    viewerHelper.new({
      images: [{
        src: FAILED_IMG,
        alt: 'lake',
      }, {
        src: img2,
        alt: 'mountain',
      }],
      defaultImg: {
        src: defaultImg,
        width: 100,
        height: 100,
      },
    });

    viewerHelper.open();

    const imgNode = $$('img.react-viewer-image')[0];
    expect(imgNode.src).toBe(`http://localhost/${defaultImg}`);
    expect(imgNode.style.width).toBe('100px');
    expect(imgNode.style.width).toBe('100px');
  });

  it('set defaultScale', () => {
    const defaultImg = 'deafult_img';

    viewerHelper.new({
      images: [{
        src: FAILED_IMG,
        alt: 'lake',
      }, {
        src: img2,
        alt: 'mountain',
      }],
      defaultImg: {
        src: defaultImg,
        width: 100,
        height: 100,
      },
      defaultScale: .5,
    });

    viewerHelper.open();

    const imgNode = $$('img.react-viewer-image')[0];
    expect(imgNode.src).toBe(`http://localhost/${defaultImg}`);
    expect(imgNode.style.width).toBe('50px');
    expect(imgNode.style.width).toBe('50px');
  });
});
