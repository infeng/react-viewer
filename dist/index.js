(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["react-viewer"] = factory(require("react"), require("react-dom"));
	else
		root["react-viewer"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Viewer = __webpack_require__(4);

	var _Viewer2 = _interopRequireDefault(_Viewer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Viewer2.default;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = exports.ActionType = undefined;

	var _react = __webpack_require__(1);

	var React = _interopRequireWildcard(_react);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var ActionType = exports.ActionType = undefined;
	(function (ActionType) {
	    ActionType[ActionType["zoomIn"] = 1] = "zoomIn";
	    ActionType[ActionType["zoomOut"] = 2] = "zoomOut";
	    ActionType[ActionType["prev"] = 3] = "prev";
	    ActionType[ActionType["next"] = 4] = "next";
	    ActionType[ActionType["rotateLeft"] = 5] = "rotateLeft";
	    ActionType[ActionType["rotateRight"] = 6] = "rotateRight";
	    ActionType[ActionType["reset"] = 7] = "reset";
	    ActionType[ActionType["close"] = 8] = "close";
	    ActionType[ActionType["scaleX"] = 9] = "scaleX";
	    ActionType[ActionType["scaleY"] = 10] = "scaleY";
	    ActionType[ActionType["download"] = 11] = "download";
	    ActionType[ActionType["bookmark"] = 12] = "bookmark";
	})(ActionType || (exports.ActionType = ActionType = {}));

	var Icon = function (_React$Component) {
	    _inherits(Icon, _React$Component);

	    function Icon() {
	        _classCallCheck(this, Icon);

	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	    }

	    Icon.prototype.render = function render() {
	        var prefixCls = 'react-viewer-icon';
	        return React.createElement("i", { className: prefixCls + " " + prefixCls + "-" + ActionType[this.props.type] });
	    };

	    return Icon;
	}(React.Component);

	exports.default = Icon;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(1);

	var React = _interopRequireWildcard(_react);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var Loading = function (_React$Component) {
	    _inherits(Loading, _React$Component);

	    function Loading(props) {
	        _classCallCheck(this, Loading);

	        return _possibleConstructorReturn(this, _React$Component.call(this, props));
	    }

	    Loading.prototype.render = function render() {
	        var cls = 'spin spin-spinning';
	        return React.createElement(
	            'div',
	            { className: 'spin-wrap', style: this.props.style },
	            React.createElement(
	                'div',
	                { className: cls },
	                React.createElement('div', { className: 'spin-dot' })
	            )
	        );
	    };

	    return Loading;
	}(React.Component);

	exports.default = Loading;
	module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(1);

	var React = _interopRequireWildcard(_react);

	var _reactDom = __webpack_require__(10);

	var ReactDOM = _interopRequireWildcard(_reactDom);

	var _ViewerCore = __webpack_require__(6);

	var _ViewerCore2 = _interopRequireDefault(_ViewerCore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var Viewer = function (_React$Component) {
	    _inherits(Viewer, _React$Component);

	    function Viewer(props) {
	        _classCallCheck(this, Viewer);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	        _this.container = null;
	        _this.defaultContainer = document.createElement('div');
	        _this.component = null;
	        return _this;
	    }

	    Viewer.prototype.renderViewer = function renderViewer() {
	        if (this.props.visible || this.component) {
	            if (!this.container) {
	                if (this.props.container) {
	                    this.container = this.props.container;
	                } else {
	                    this.container = this.defaultContainer;
	                    document.body.appendChild(this.container);
	                }
	            }
	            var instance = this;
	            ReactDOM.unstable_renderSubtreeIntoContainer(this, React.createElement(_ViewerCore2.default, _extends({}, this.props, { noClose: this.props.noClose || true })), this.container, function () {
	                instance.component = this;
	            });
	        }
	    };

	    Viewer.prototype.removeViewer = function removeViewer() {
	        if (this.container) {
	            var container = this.container;
	            ReactDOM.unmountComponentAtNode(container);
	            container.parentNode.removeChild(container);
	            this.container = null;
	            this.component = null;
	        }
	    };

	    Viewer.prototype.componentWillUnmount = function componentWillUnmount() {
	        if (this.props.visible && this.props.onClose) {
	            this.props.onClose();
	        }
	        this.removeViewer();
	    };

	    Viewer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (nextProps.removeContainer) {
	            this.renderViewer();
	        }
	        if (this.props.container !== nextProps.container) {
	            this.component = null;
	            if (nextProps.container) {
	                if (this.container) {
	                    document.body.removeChild(this.container);
	                }
	                this.container = nextProps.container;
	            } else {
	                this.container = this.defaultContainer;
	                document.body.appendChild(this.container);
	            }
	        }
	    };

	    Viewer.prototype.componentDidMount = function componentDidMount() {
	        this.renderViewer();
	    };

	    Viewer.prototype.componentDidUpdate = function componentDidUpdate() {
	        this.renderViewer();
	    };

	    Viewer.prototype.render = function render() {
	        return null;
	    };

	    return Viewer;
	}(React.Component);

	exports.default = Viewer;
	module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(1);

	var React = _interopRequireWildcard(_react);

	var _Loading = __webpack_require__(3);

	var _Loading2 = _interopRequireDefault(_Loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var ViewerCanvas = function (_React$Component) {
	    _inherits(ViewerCanvas, _React$Component);

	    function ViewerCanvas(props) {
	        _classCallCheck(this, ViewerCanvas);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	        _this.handleResize = function (e) {
	            _this.props.onResize();
	        };
	        _this.handleCanvasMouseDown = function (e) {
	            _this.props.onCanvasMouseDown(e);
	            _this.handleMouseDown(e);
	        };
	        _this.handleMouseDown = function (e) {
	            if (!_this.props.visible || !_this.props.drag) {
	                return;
	            }
	            e.preventDefault();
	            e.stopPropagation();
	            _this.setState({
	                isMouseDown: true,
	                mouseX: e.nativeEvent.clientX,
	                mouseY: e.nativeEvent.clientY
	            });
	        };
	        _this.handleMouseMove = function (e) {
	            if (_this.state.isMouseDown) {
	                var diffX = e.clientX - _this.state.mouseX;
	                var diffY = e.clientY - _this.state.mouseY;
	                _this.setState({
	                    mouseX: e.clientX,
	                    mouseY: e.clientY
	                });
	                _this.props.onChangeImgState(_this.props.width, _this.props.height, _this.props.top + diffY, _this.props.left + diffX);
	            }
	        };
	        _this.handleMouseUp = function (e) {
	            _this.setState({
	                isMouseDown: false
	            });
	        };
	        _this.handleMouseScroll = function (e) {
	            e.preventDefault();
	            var direct = 0;
	            if (e.wheelDelta) {
	                direct = e.wheelDelta > 0 ? 1 : -1;
	            } else if (e.detail) {
	                direct = e.detail > 0 ? -1 : 1;
	            }
	            if (direct !== 0) {
	                var x = e.clientX;
	                var y = e.clientY;
	                if (_this.props.container) {
	                    var containerRect = _this.props.container.getBoundingClientRect();
	                    x -= containerRect.left;
	                    y -= containerRect.top;
	                }
	                _this.props.onZoom(x, y, direct);
	            }
	        };
	        _this.bindEvent = function (remove) {
	            var funcName = 'addEventListener';
	            if (remove) {
	                funcName = 'removeEventListener';
	            }
	            var mouseScrollArea = document;
	            if (_this.props.container) {
	                mouseScrollArea = _this.props.container;
	            }
	            mouseScrollArea[funcName]('DOMMouseScroll', _this.handleMouseScroll, false);
	            mouseScrollArea[funcName]('mousewheel', _this.handleMouseScroll, false);
	            document[funcName]('click', _this.handleMouseUp, false);
	            document[funcName]('mousemove', _this.handleMouseMove, false);
	            window[funcName]('resize', _this.handleResize, false);
	        };
	        _this.state = {
	            isMouseDown: false,
	            mouseX: 0,
	            mouseY: 0
	        };
	        return _this;
	    }

	    ViewerCanvas.prototype.componentDidMount = function componentDidMount() {
	        if (this.props.drag) {
	            this.bindEvent();
	        }
	    };

	    ViewerCanvas.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!this.props.visible && nextProps.visible) {
	            if (nextProps.drag) {
	                return this.bindEvent();
	            }
	        }
	        if (this.props.visible && !nextProps.visible) {
	            this.handleMouseUp({});
	            if (nextProps.drag) {
	                return this.bindEvent(true);
	            }
	        }
	        if (this.props.drag && !nextProps.drag) {
	            return this.bindEvent(true);
	        }
	        if (!this.props.drag && nextProps.drag) {
	            if (nextProps.visible) {
	                return this.bindEvent(true);
	            }
	        }
	    };

	    ViewerCanvas.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.bindEvent(true);
	    };

	    ViewerCanvas.prototype.render = function render() {
	        var imgStyle = {
	            width: this.props.width + 'px',
	            height: this.props.height + 'px',
	            transform: 'translateX(' + (this.props.left ? this.props.left + 'px' : 'aoto') + ') translateY(' + this.props.top + 'px)\n      rotate(' + this.props.rotate + 'deg) scaleX(' + this.props.scaleX + ') scaleY(' + this.props.scaleY + ')'
	        };
	        var imgClass = this.props.drag ? 'drag' : '';
	        if (!this.state.isMouseDown) {
	            imgClass += ' ' + this.props.prefixCls + '-image-transition';
	        }
	        var style = {
	            zIndex: this.props.zIndex
	        };
	        var imgNode = null;
	        if (this.props.imgSrc !== '') {
	            imgNode = React.createElement('img', { className: imgClass, src: this.props.imgSrc, style: imgStyle, onMouseDown: this.handleMouseDown });
	        }
	        if (this.props.loading) {
	            imgNode = React.createElement(
	                'div',
	                { style: {
	                        display: 'flex',
	                        height: '100%',
	                        justifyContent: 'center',
	                        alignItems: 'center'
	                    } },
	                React.createElement(_Loading2.default, null)
	            );
	        }
	        return React.createElement(
	            'div',
	            { className: this.props.prefixCls + '-canvas', onMouseDown: this.handleCanvasMouseDown, style: style },
	            imgNode
	        );
	    };

	    return ViewerCanvas;
	}(React.Component);

	exports.default = ViewerCanvas;
	module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _react = __webpack_require__(1);

	var React = _interopRequireWildcard(_react);

	__webpack_require__(9);

	var _ViewerCanvas = __webpack_require__(5);

	var _ViewerCanvas2 = _interopRequireDefault(_ViewerCanvas);

	var _ViewerNav = __webpack_require__(7);

	var _ViewerNav2 = _interopRequireDefault(_ViewerNav);

	var _ViewerToolbar = __webpack_require__(8);

	var _ViewerToolbar2 = _interopRequireDefault(_ViewerToolbar);

	var _Icon = __webpack_require__(2);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	function noop() {}
	var transitionDuration = 300;

	var ViewerCore = function (_React$Component) {
	    _inherits(ViewerCore, _React$Component);

	    function ViewerCore(props) {
	        _classCallCheck(this, ViewerCore);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	        _this.handleClose = function (e) {
	            _this.props.onClose();
	        };
	        _this.handleFullScreen = function () {
	            _this.setState({ fullScreenImage: !_this.state.fullScreenImage });
	        };
	        _this.handleChangeImg = function (newIndex) {
	            // let imgCenterXY2 = this.getImageCenterXY();
	            // this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, 1);
	            // setTimeout(() => {
	            //   this.loadImg(newIndex);
	            // }, transitionDuration);
	            // setTimeout(() => {
	            //   this.bindEvent();
	            //   this.loadImg(newIndex, true);
	            // }, 25000);
	            _this.loadImg(newIndex);
	        };
	        _this.handleChangeImgState = function (width, height, top, left) {
	            _this.setState({
	                width: width,
	                height: height,
	                top: top,
	                left: left
	            });
	        };
	        _this.handleDefaultAction = function (type) {
	            switch (type) {
	                case _Icon.ActionType.prev:
	                    if (_this.state.activeIndex - 1 >= 0) {
	                        _this.handleChangeImg(_this.state.activeIndex - 1);
	                    }
	                    break;
	                case _Icon.ActionType.next:
	                    if (_this.state.activeIndex + 1 < _this.props.images.length) {
	                        _this.handleChangeImg(_this.state.activeIndex + 1);
	                    }
	                    break;
	                case _Icon.ActionType.zoomIn:
	                    var imgCenterXY = _this.getImageCenterXY();
	                    _this.handleZoom(imgCenterXY.x, imgCenterXY.y, 1, _this.props.zoomSpeed);
	                    break;
	                case _Icon.ActionType.zoomOut:
	                    var imgCenterXY2 = _this.getImageCenterXY();
	                    _this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, _this.props.zoomSpeed);
	                    break;
	                case _Icon.ActionType.rotateLeft:
	                    _this.handleRotate();
	                    break;
	                case _Icon.ActionType.rotateRight:
	                    _this.handleRotate(true);
	                    break;
	                case _Icon.ActionType.reset:
	                    _this.loadImg(_this.state.activeIndex);
	                    break;
	                case _Icon.ActionType.scaleX:
	                    _this.handleScaleX(-1);
	                    break;
	                case _Icon.ActionType.scaleY:
	                    _this.handleScaleY(-1);
	                    break;
	                case _Icon.ActionType.download:
	                    _this.handleDownload();
	                    break;
	                default:
	                    break;
	            }
	        };
	        _this.handleAction = function (config) {
	            _this.handleDefaultAction(config.actionType);
	            if (config.onClick) {
	                var activeImage = _this.getActiveImage();
	                config.onClick(activeImage);
	            }
	        };
	        _this.handleDownload = function () {
	            var activeImage = _this.getActiveImage();
	            if (activeImage.downloadUrl) {
	                location.href = activeImage.downloadUrl;
	            }
	        };
	        _this.handleScaleX = function (newScale) {
	            _this.setState({
	                scaleX: _this.state.scaleX * newScale
	            });
	        };
	        _this.handleScaleY = function (newScale) {
	            _this.setState({
	                scaleY: _this.state.scaleY * newScale
	            });
	        };
	        _this.handleScrollZoom = function (targetX, targetY, direct) {
	            _this.handleZoom(targetX, targetY, direct, _this.props.zoomSpeed);
	        };
	        _this.handleMoveImg = function (value, direct) {
	            var stateTop = _this.state.top;
	            var stateLeft = _this.state.left;
	            // inline mode 
	            if (_this.props.container) {
	                var hImg = document.getElementsByClassName('drag react-viewer-image-transition')[0].height;
	                var up = Math.abs(stateTop) - value;
	                var down = stateTop + value;
	                var left = Math.abs(stateLeft - value - 30);
	                var rigth = Math.abs(stateLeft + value + 30);
	                switch (direct) {
	                    case 'up':
	                        if (up < hImg) {
	                            if (up + value < hImg) {
	                                stateTop -= value;
	                            }
	                            // console.log('up', stateTop, hImg);
	                        }
	                        break;
	                    case 'down':
	                        if (down < hImg) {
	                            stateTop += value;
	                            // console.log('3down', stateTop, hImg);
	                        }
	                        break;
	                    case 'left':
	                        if (left < _this.containerWidth) {
	                            stateLeft -= value;
	                        }
	                        break;
	                    case 'right':
	                        if (rigth < _this.containerWidth) {
	                            stateLeft += value;
	                        }
	                        break;
	                    default:
	                        break;
	                }
	                _this.setState({
	                    top: stateTop,
	                    left: stateLeft
	                });
	            }
	        };
	        _this.handleZoom = function (targetX, targetY, direct, scale) {
	            var imgCenterXY = _this.getImageCenterXY();
	            var diffX = targetX - imgCenterXY.x;
	            var diffY = targetY - imgCenterXY.y;
	            // when image width is 0, set original width
	            var reset = false;
	            var top = 0;
	            var left = 0;
	            var width = 0;
	            var height = 0;
	            var scaleX = 0;
	            var scaleY = 0;
	            if (_this.state.width === 0) {
	                var _this$getImgWidthHeig = _this.getImgWidthHeight(_this.state.imageWidth, _this.state.imageHeight),
	                    _this$getImgWidthHeig2 = _slicedToArray(_this$getImgWidthHeig, 2),
	                    imgWidth = _this$getImgWidthHeig2[0],
	                    imgHeight = _this$getImgWidthHeig2[1];

	                reset = true;
	                left = (_this.containerWidth - imgWidth) / 2;
	                top = (_this.containerHeight - _this.footerHeight - imgHeight) / 30;
	                width = _this.state.width + imgWidth;
	                height = _this.state.height + imgHeight;
	                scaleX = scaleY = 1;
	            } else {
	                var directX = _this.state.scaleX > 0 ? 1 : -1;
	                var directY = _this.state.scaleY > 0 ? 1 : -1;
	                scaleX = _this.state.scaleX + scale * direct * directX;
	                scaleY = _this.state.scaleY + scale * direct * directY;
	                if (Math.abs(scaleX) < 0.1 || Math.abs(scaleY) < 0.1) {
	                    return;
	                }
	                top = _this.state.top + -direct * diffY / _this.state.scaleX * scale * directX;
	                left = _this.state.left + -direct * diffX / _this.state.scaleY * scale * directY;
	                width = _this.state.width;
	                height = _this.state.height;
	            }
	            _this.setState({
	                width: width,
	                scaleX: scaleX,
	                scaleY: scaleY,
	                height: height,
	                top: top,
	                left: left,
	                loading: false
	            });
	        };
	        _this.getImageCenterXY = function () {
	            return {
	                x: _this.state.left + _this.state.width / 2,
	                y: _this.state.top + _this.state.height / 2
	            };
	        };
	        _this.handleRotate = function () {
	            var isRight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	            _this.setState({
	                rotate: _this.state.rotate + 90 * (isRight ? 1 : -1)
	            });
	        };
	        _this.handleResize = function () {
	            _this.setContainerWidthHeight();
	            if (_this.props.visible) {
	                var _this$getImgWidthHeig3 = _this.getImgWidthHeight(_this.state.imageWidth, _this.state.imageHeight),
	                    _this$getImgWidthHeig4 = _slicedToArray(_this$getImgWidthHeig3, 2),
	                    width = _this$getImgWidthHeig4[0],
	                    height = _this$getImgWidthHeig4[1];

	                var left = (_this.containerWidth - width) / 2;
	                var top = (_this.containerHeight - height - _this.footerHeight) / 2;
	                _this.setState({
	                    width: width,
	                    height: height,
	                    left: left,
	                    top: top,
	                    rotate: 0,
	                    scaleX: 1,
	                    scaleY: 1
	                });
	            }
	        };
	        _this.handleKeydown = function (e) {
	            var keyCode = e.keyCode || e.which || e.charCode;
	            var isFeatrue = false;
	            if (_this.props.noKeyDown) {
	                return;
	            }
	            // Move img
	            if (e.ctrlKey && e.shiftKey) {
	                switch (keyCode) {
	                    case 37:
	                        _this.handleMoveImg(50, 'left');
	                        isFeatrue = true;
	                        break;
	                    case 39:
	                        _this.handleMoveImg(50, 'right');
	                        isFeatrue = true;
	                        break;
	                    case 38:
	                        _this.handleMoveImg(50, 'up');
	                        isFeatrue = true;
	                        break;
	                    case 40:
	                        _this.handleMoveImg(50, 'down');
	                        isFeatrue = true;
	                        break;
	                    default:
	                        break;
	                }
	            } else {
	                switch (keyCode) {
	                    // key: esc
	                    case 27:
	                        if (_this.state.fullScreenImage) {
	                            _this.handleFullScreen();
	                        } else {
	                            _this.props.onClose();
	                        }
	                        isFeatrue = true;
	                        break;
	                    // key: ←
	                    case 37:
	                        if (e.shiftKey) {
	                            _this.handleDefaultAction(_Icon.ActionType.rotateLeft);
	                        }
	                        if (e.ctrlKey) {
	                            _this.handleDefaultAction(_Icon.ActionType.prev);
	                        }
	                        isFeatrue = true;
	                        break;
	                    // key: →
	                    case 39:
	                        if (e.shiftKey) {
	                            _this.handleDefaultAction(_Icon.ActionType.rotateRight);
	                        }
	                        if (e.ctrlKey) {
	                            _this.handleDefaultAction(_Icon.ActionType.next);
	                        }
	                        isFeatrue = true;
	                        break;
	                    // key: ↑
	                    case 38:
	                        if (e.ctrlKey) {
	                            _this.handleDefaultAction(_Icon.ActionType.zoomIn);
	                        }
	                        if (e.shiftKey) {
	                            _this.handleDefaultAction(_Icon.ActionType.scaleX);
	                        }
	                        isFeatrue = true;
	                        break;
	                    // key: ↓
	                    case 40:
	                        if (e.ctrlKey) {
	                            _this.handleDefaultAction(_Icon.ActionType.zoomOut);
	                        }
	                        if (e.shiftKey) {
	                            _this.handleDefaultAction(_Icon.ActionType.scaleY);
	                        }
	                        isFeatrue = true;
	                        break;
	                    // key: Ctrl + z
	                    case 90:
	                        if (e.ctrlKey) {
	                            _this.loadImg(_this.state.activeIndex);
	                            isFeatrue = true;
	                        }
	                        break;
	                    // key: Ctrl + m
	                    case 77:
	                        if (e.ctrlKey) {
	                            if (_this.props.fullScreen) {
	                                _this.handleFullScreen();
	                                isFeatrue = true;
	                            }
	                        }
	                        break;
	                    default:
	                        break;
	                }
	            }
	            if (isFeatrue) {
	                e.preventDefault();
	            }
	        };
	        _this.handleTransitionEnd = function (e) {
	            if (!_this.state.transitionEnd || _this.state.visibleStart) {
	                _this.setState({
	                    visibleStart: false,
	                    transitionEnd: true
	                });
	            }
	        };
	        _this.handleCanvasMouseDown = function (e) {
	            _this.props.onMaskClick(e);
	        };
	        _this.getActiveImage = function () {
	            var activeImg = {
	                src: '',
	                alt: '',
	                downloadUrl: ''
	            };
	            var images = _this.props.images || [];
	            if (images.length > 0 && _this.state.activeIndex >= 0) {
	                activeImg = images[_this.state.activeIndex];
	            }
	            return activeImg;
	        };
	        _this.prefixCls = 'react-viewer';
	        _this.state = {
	            visible: false,
	            visibleStart: false,
	            transitionEnd: false,
	            activeIndex: _this.props.activeIndex || 0,
	            width: 0,
	            height: 0,
	            top: 15,
	            left: null,
	            rotate: 0,
	            imageWidth: 0,
	            imageHeight: 0,
	            scaleX: _this.props.scaleX ? _this.props.scaleX : 1,
	            scaleY: _this.props.scaleY ? _this.props.scaleY : 1,
	            loading: false,
	            fullScreenImage: false
	        };
	        _this.setContainerWidthHeight();
	        _this.footerHeight = 84;
	        return _this;
	    }

	    ViewerCore.prototype.setContainerWidthHeight = function setContainerWidthHeight() {
	        this.containerWidth = window.innerWidth;
	        this.containerHeight = window.innerHeight;
	        if (this.props.container) {
	            this.containerWidth = this.props.container.offsetWidth;
	            this.containerHeight = this.props.container.offsetHeight;
	        }
	    };

	    ViewerCore.prototype.imageLoad = function imageLoad(val) {
	        // retorna o valor true/false para o carregamento da imagem
	        if (this.props.waiting && typeof this.props.waiting === 'function') {
	            this.props.waiting(val);
	            // console.log('children ',val, new Date())
	        }
	    };

	    ViewerCore.prototype.startVisible = function startVisible(activeIndex) {
	        var _this2 = this;

	        this.imageLoad(true);
	        if (!this.props.container) {
	            document.body.style.overflow = 'hidden';
	            if (document.body.scrollHeight > document.body.clientHeight) {
	                document.body.style.paddingRight = '15px';
	            }
	        }
	        this.setState({
	            visibleStart: true
	        });
	        setTimeout(function () {
	            _this2.setState({
	                visible: true
	            });
	            setTimeout(function () {
	                _this2.bindEvent();
	                _this2.loadImg(activeIndex, true);
	            }, 200);
	        }, 10);
	    };

	    ViewerCore.prototype.componentDidMount = function componentDidMount() {
	        this.refs['viewerCore'].addEventListener('transitionend', this.handleTransitionEnd, false);
	        this.startVisible(this.state.activeIndex);
	    };

	    ViewerCore.prototype.getImgWidthHeight = function getImgWidthHeight(imgWidth, imgHeight) {
	        var width = 0;
	        var height = 0;
	        var maxWidth = this.containerWidth * 2.5;
	        var maxHeight = (this.containerHeight - this.footerHeight) * 2.5;
	        width = Math.min(maxWidth, imgWidth);
	        height = width / imgWidth * imgHeight;
	        if (height > maxHeight) {
	            height = maxHeight;
	            width = height / imgHeight * imgWidth;
	        }
	        return [width, height];
	    };

	    ViewerCore.prototype.loadImg = function loadImg(activeIndex) {
	        var _this3 = this;

	        var firstLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        var imgSrc = '';
	        var images = this.props.images || [];
	        if (images.length > 0) {
	            imgSrc = images[activeIndex] ? images[activeIndex].src : '';
	        }
	        var img = new Image();
	        img.src = imgSrc;
	        if (firstLoad) {
	            this.setState({
	                activeIndex: activeIndex,
	                width: 0,
	                height: 0,
	                left: 0,
	                top: 0,
	                rotate: 0,
	                scaleX: this.props.scaleX ? this.props.scaleX : 1,
	                scaleY: this.props.scaleY ? this.props.scaleY : 1,
	                loading: true
	            });
	        } else {
	            this.setState({
	                activeIndex: activeIndex,
	                loading: true
	            });
	        }
	        img.onload = function () {
	            var imgWidth = img.width;
	            var imgHeight = img.height;
	            // if (firstLoad) {
	            //   setTimeout(() => {
	            //     this.setState({
	            //       activeIndex: activeIndex,
	            //       imageWidth: imgWidth,
	            //       imageHeight: imgHeight,
	            //     });
	            //     let imgCenterXY = this.getImageCenterXY();
	            //     this.handleZoom(this.props.scaleX, this.props.scaleY, 1, 1);
	            //   }, 50);
	            // } else {

	            var _getImgWidthHeight = _this3.getImgWidthHeight(imgWidth, imgHeight),
	                _getImgWidthHeight2 = _slicedToArray(_getImgWidthHeight, 2),
	                width = _getImgWidthHeight2[0],
	                height = _getImgWidthHeight2[1];

	            var left = (_this3.containerWidth - width) / 2;
	            var top = (_this3.containerHeight - height - _this3.footerHeight) / 2;
	            var stretchWidth = false;
	            if (!_this3.props.stretch && !_this3.props.stretchHeight && !_this3.props.stretchWidth && !_this3.props.scaleX && !_this3.props.scaleX) {
	                stretchWidth = true;
	            }
	            if (_this3.props.stretch) {
	                var stretch = 99;
	                if (_this3.props.stretch > 1) {
	                    stretch = _this3.props.stretch;
	                }
	                stretch = stretch;
	                top = (_this3.containerWidth - _this3.containerWidth * (stretch / 100)) / 2;
	                left = (_this3.containerWidth - _this3.containerWidth * (stretch / 100)) / 2;
	                width = _this3.containerWidth * (stretch / 100);
	                height = _this3.containerHeight * (stretch / 100);
	            }
	            if (_this3.props.stretchHeight) {
	                top = 2;
	                height = _this3.containerHeight;
	                width = imgWidth * (_this3.containerHeight / imgHeight);
	                left = (_this3.containerWidth - width) / 2;
	            }
	            if (_this3.props.stretchWidth || stretchWidth) {
	                top = 2;
	                height = imgHeight * (_this3.containerWidth / imgWidth);
	                width = _this3.containerWidth - _this3.containerWidth * 0.01;
	                left = (_this3.containerWidth - width) / 2;
	            }
	            _this3.setState({
	                activeIndex: activeIndex,
	                width: width,
	                height: height,
	                left: left,
	                top: top,
	                imageWidth: imgWidth,
	                imageHeight: imgHeight,
	                loading: false,
	                rotate: 0,
	                scaleX: _this3.props.scaleX ? _this3.props.scaleX : 1,
	                scaleY: _this3.props.scaleY ? _this3.props.scaleY : 1
	            });
	        };
	        img.onerror = function () {
	            _this3.setState({
	                activeIndex: activeIndex,
	                imageWidth: 0,
	                imageHeight: 0,
	                loading: false
	            });
	        };
	        this.imageLoad(false);
	    };

	    ViewerCore.prototype.bindEvent = function bindEvent() {
	        var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	        var funcName = 'addEventListener';
	        if (remove) {
	            funcName = 'removeEventListener';
	        }
	        document[funcName]('keydown', this.handleKeydown, false);
	    };

	    ViewerCore.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.bindEvent(true);
	        this.refs['viewerCore'].removeEventListener('transitionend', this.handleTransitionEnd, false);
	    };

	    ViewerCore.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        var _this4 = this;

	        if (!this.props.visible && nextProps.visible) {
	            this.startVisible(nextProps.activeIndex);
	            return;
	        }
	        if (this.props.visible && !nextProps.visible) {
	            this.bindEvent(true);
	            this.handleZoom(this.containerWidth / 2, (this.containerHeight - this.footerHeight) / 2, -1, (this.state.scaleX > 0 ? 1 : -1) * this.state.scaleX - 0.11);
	            setTimeout(function () {
	                document.body.style.overflow = '';
	                document.body.style.paddingRight = '';
	                _this4.setState({
	                    visible: false,
	                    transitionEnd: false,
	                    width: 0,
	                    height: 0
	                });
	            }, transitionDuration);
	            return;
	        }
	        if (this.props.activeIndex !== nextProps.activeIndex) {
	            this.handleChangeImg(nextProps.activeIndex);
	            return;
	        }
	    };

	    ViewerCore.prototype.render = function render() {
	        var activeImg = {
	            src: '',
	            alt: ''
	        };
	        var zIndex = 1000;
	        if (this.props.zIndex) {
	            zIndex = this.props.zIndex;
	        }
	        var viewerStryle = {
	            opacity: this.state.visible ? 1 : 0
	        };
	        if (!this.state.visible && this.state.transitionEnd) {
	            viewerStryle.display = 'none';
	        }
	        if (!this.state.visible && this.state.visibleStart) {
	            viewerStryle.display = 'block';
	        }
	        if (this.state.visible && this.state.transitionEnd) {
	            activeImg = this.getActiveImage();
	        }
	        var className = this.prefixCls + ' ' + this.prefixCls + '-transition';
	        if (this.props.container) {
	            if (this.state.fullScreenImage) {
	                className += ' ' + this.prefixCls + '-modal';
	            } else {
	                className += ' ' + this.prefixCls + '-inline';
	            }
	        }
	        return React.createElement(
	            'div',
	            { ref: 'viewerCore', className: className, style: viewerStryle },
	            React.createElement('div', { className: this.prefixCls + '-mask', style: { zIndex: zIndex } }),
	            this.props.noClose || React.createElement(
	                'div',
	                { className: this.prefixCls + '-close ' + this.prefixCls + '-btn', onClick: this.handleClose, style: { zIndex: zIndex + 10 } },
	                React.createElement(_Icon2.default, { type: _Icon.ActionType.close })
	            ),
	            this.props.fullScreen ? React.createElement(
	                'div',
	                { className: this.prefixCls + '-fullScreen ' + this.prefixCls + '-btn', onClick: this.handleFullScreen, style: { zIndex: zIndex + 100 } },
	                React.createElement(_Icon2.default, { type: _Icon.ActionType.zoomIn })
	            ) : '',
	            React.createElement(_ViewerCanvas2.default, { prefixCls: this.prefixCls, imgSrc: activeImg.src, visible: this.props.visible, width: this.state.width, height: this.state.height, top: this.state.top, left: this.state.left, rotate: this.state.rotate, onChangeImgState: this.handleChangeImgState, onResize: this.handleResize, onZoom: this.handleScrollZoom, zIndex: zIndex + 5, scaleX: this.state.scaleX, scaleY: this.state.scaleY, loading: this.state.loading, drag: this.props.drag, container: this.props.container, onCanvasMouseDown: this.handleCanvasMouseDown }),
	            this.props.noFooter || React.createElement(
	                'div',
	                { className: this.prefixCls + '-footer', style: { zIndex: zIndex + 5 } },
	                this.props.noToolbar || React.createElement(_ViewerToolbar2.default, { prefixCls: this.prefixCls, onAction: this.handleAction, alt: activeImg.alt, width: this.state.imageWidth, height: this.state.imageHeight, attribute: this.props.attribute, zoomable: this.props.zoomable, rotatable: this.props.rotatable, scalable: this.props.scalable, changeable: this.props.changeable, downloadable: this.props.downloadable, noImgDetails: this.props.noImgDetails, toolbars: this.props.customToolbar(_ViewerToolbar.defaultToolbars) }),
	                this.props.noNavbar || React.createElement(_ViewerNav2.default, { prefixCls: this.prefixCls, images: this.props.images, activeIndex: this.state.activeIndex, onChangeImg: this.handleChangeImg })
	            )
	        );
	    };

	    return ViewerCore;
	}(React.Component);

	exports.default = ViewerCore;

	ViewerCore.defaultProps = {
	    visible: false,
	    onClose: noop,
	    images: [],
	    activeIndex: 0,
	    zIndex: 1000,
	    drag: true,
	    attribute: true,
	    zoomable: true,
	    rotatable: true,
	    scalable: true,
	    onMaskClick: noop,
	    changeable: true,
	    customToolbar: function customToolbar(toolbars) {
	        return toolbars;
	    },
	    zoomSpeed: .05,
	    fullScreen: false
	};
	module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;

	var _react = __webpack_require__(1);

	var React = _interopRequireWildcard(_react);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var ViewerNav = function (_React$Component) {
	    _inherits(ViewerNav, _React$Component);

	    function ViewerNav() {
	        _classCallCheck(this, ViewerNav);

	        var _this = _possibleConstructorReturn(this, _React$Component.apply(this, arguments));

	        _this.handleChangeImg = function (newIndex) {
	            if (_this.props.activeIndex === newIndex) {
	                return;
	            }
	            _this.props.onChangeImg(newIndex);
	        };
	        return _this;
	    }

	    ViewerNav.prototype.render = function render() {
	        var _this2 = this;

	        var marginLeft = (Math.ceil(this.props.images.length / 2) - this.props.activeIndex - 1) * 1.5 * 30;
	        var listStyle = {
	            marginLeft: marginLeft + 'px'
	        };
	        return React.createElement(
	            'div',
	            { className: this.props.prefixCls + '-navbar' },
	            React.createElement(
	                'ul',
	                { className: this.props.prefixCls + '-list ' + this.props.prefixCls + '-list-transition', style: listStyle },
	                this.props.images.map(function (item, index) {
	                    return React.createElement(
	                        'li',
	                        { key: index, className: index === _this2.props.activeIndex ? 'active' : '', onClick: function onClick() {
	                                _this2.handleChangeImg(index);
	                            } },
	                        React.createElement('img', { src: item.src, alt: item.alt })
	                    );
	                })
	            )
	        );
	    };

	    return ViewerNav;
	}(React.Component);

	exports.default = ViewerNav;

	ViewerNav.defaultProps = {
	    activeIndex: 0
	};
	module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = exports.defaultToolbars = undefined;

	var _react = __webpack_require__(1);

	var React = _interopRequireWildcard(_react);

	var _Icon = __webpack_require__(2);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var defaultToolbars = exports.defaultToolbars = [{
	    key: 'zoomIn',
	    actionType: _Icon.ActionType.zoomIn,
	    title: 'CTRL + ↑'
	}, {
	    key: 'zoomOut',
	    actionType: _Icon.ActionType.zoomOut,
	    title: 'CTRL + ↓'
	}, {
	    key: 'prev',
	    actionType: _Icon.ActionType.prev,
	    title: 'CTRL + ←'
	}, {
	    key: 'reset',
	    actionType: _Icon.ActionType.reset,
	    title: 'CTRL + Z'
	}, {
	    key: 'next',
	    actionType: _Icon.ActionType.next,
	    title: 'CTRL + →'
	}, {
	    key: 'rotateLeft',
	    actionType: _Icon.ActionType.rotateLeft,
	    title: 'SHIFT + ←'
	}, {
	    key: 'rotateRight',
	    actionType: _Icon.ActionType.rotateRight,
	    title: 'SHIFT + →'
	}, {
	    key: 'scaleX',
	    actionType: _Icon.ActionType.scaleX,
	    title: 'SHIFT + ↑'
	}, {
	    key: 'scaleY',
	    actionType: _Icon.ActionType.scaleY,
	    title: 'SHIFT + ↓'
	}, {
	    key: 'download',
	    actionType: _Icon.ActionType.download,
	    title: ''
	}];
	function deleteToolbarFromKey(toolbars, keys) {
	    var targetToolbar = toolbars.filter(function (item) {
	        return keys.indexOf(item.key) < 0;
	    });
	    return targetToolbar;
	}

	var ViewerToolbar = function (_React$Component) {
	    _inherits(ViewerToolbar, _React$Component);

	    function ViewerToolbar(props) {
	        _classCallCheck(this, ViewerToolbar);

	        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	        _this.renderAction = function (config) {
	            var content = null;
	            // default toolbar
	            if (typeof _Icon.ActionType[config.actionType] !== 'undefined') {
	                content = React.createElement(_Icon2.default, { type: config.actionType });
	            }
	            // extra toolbar
	            if (config.render) {
	                content = config.render;
	            }
	            return React.createElement(
	                'li',
	                { key: config.key, className: _this.props.prefixCls + '-btn', onClick: function onClick() {
	                        _this.handleAction(config);
	                    }, title: config.title },
	                content
	            );
	        };
	        return _this;
	    }

	    ViewerToolbar.prototype.handleAction = function handleAction(config) {
	        this.props.onAction(config);
	    };

	    ViewerToolbar.prototype.render = function render() {
	        var _this2 = this;

	        var attributeNode = this.props.attribute ? React.createElement(
	            'p',
	            { className: this.props.prefixCls + '-attribute' },
	            this.props.alt && '' + this.props.alt,
	            this.props.noImgDetails || '(' + this.props.width + ' x ' + this.props.height + ')'
	        ) : null;
	        var toolbars = this.props.toolbars;
	        if (!this.props.zoomable) {
	            toolbars = deleteToolbarFromKey(toolbars, ['zoomIn', 'zoomOut']);
	        }
	        if (!this.props.changeable) {
	            toolbars = deleteToolbarFromKey(toolbars, ['prev', 'next']);
	        }
	        if (!this.props.rotatable) {
	            toolbars = deleteToolbarFromKey(toolbars, ['rotateLeft', 'rotateRight']);
	        }
	        if (!this.props.scalable) {
	            toolbars = deleteToolbarFromKey(toolbars, ['scaleX', 'scaleY']);
	        }
	        if (!this.props.downloadable) {
	            toolbars = deleteToolbarFromKey(toolbars, ['download']);
	        }
	        return React.createElement(
	            'div',
	            null,
	            attributeNode,
	            React.createElement(
	                'ul',
	                { className: this.props.prefixCls + '-toolbar' },
	                toolbars.map(function (item) {
	                    return _this2.renderAction(item);
	                })
	            )
	        );
	    };

	    return ViewerToolbar;
	}(React.Component);

	exports.default = ViewerToolbar;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ })
/******/ ])
});
;