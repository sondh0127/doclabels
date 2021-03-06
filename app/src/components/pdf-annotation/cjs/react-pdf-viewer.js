'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PdfJs = require('pdfjs-dist');
var hooks = require('@umijs/hooks');
var rangy = _interopDefault(require('rangy/lib/rangy-core'));
require('rangy/lib/rangy-textrange');
var ReactDOM = _interopDefault(require('react-dom'));

var ThemeContext = React__default.createContext({
    prefixClass: 'viewer',
});

var classNames = function (classes) {
    var result = [];
    Object.keys(classes).forEach(function (clazz) {
        if (clazz && classes[clazz]) {
            result.push(clazz);
        }
    });
    return result.join(' ');
};

var Button = function (_a) {
    var _b;
    var children = _a.children, _c = _a.isSelected, isSelected = _c === void 0 ? false : _c, onClick = _a.onClick;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("button", { className: classNames((_b = {},
            _b[theme.prefixClass + "-button"] = true,
            _b[theme.prefixClass + "-button-selected"] = isSelected,
            _b)), onClick: onClick }, children));
};

var MenuDivider = function () {
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("li", { className: theme.prefixClass + "-menu-divider" }));
};

var Icon = function (_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? 24 : _b;
    var theme = React__default.useContext(ThemeContext);
    var width = (size || 24) + "px";
    return (React__default.createElement("svg", { className: theme.prefixClass + "-icon", height: width, viewBox: "0 0 24 24", width: width }, children));
};

var CheckIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M23.5,0.499l-16.5,23l-6.5-6.5" })));
};

var MenuItem = function (_a) {
    var _b = _a.checked, checked = _b === void 0 ? false : _b, children = _a.children, _c = _a.icon, icon = _c === void 0 ? null : _c, onClick = _a.onClick;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("li", { className: theme.prefixClass + "-menu-item", onClick: onClick },
        React__default.createElement("div", { className: theme.prefixClass + "-menu-item-icon" }, icon),
        React__default.createElement("div", { className: theme.prefixClass + "-menu-item-label" }, children),
        React__default.createElement("div", { className: theme.prefixClass + "-menu-item-check" }, checked && React__default.createElement(CheckIcon, null))));
};

var PrimaryButton = function (_a) {
    var children = _a.children, onClick = _a.onClick;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("button", { className: theme.prefixClass + "-primary-button", onClick: onClick }, children));
};

var ProgressBar = function (_a) {
    var progress = _a.progress;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("div", { className: theme.prefixClass + "-progress-bar" },
        React__default.createElement("div", { className: theme.prefixClass + "-progress-bar-inner", style: { width: progress + "%" } },
            progress,
            "%")));
};

var Separator = function () {
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("div", { className: theme.prefixClass + "-separator" }));
};

var Spinner = function () {
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("svg", { className: theme.prefixClass + "-spinner", width: "64px", height: "64px", viewBox: "0 0 32 32" },
        React__default.createElement("circle", { className: theme.prefixClass + "-spinner-circle", cx: "16", cy: "16", r: "12", strokeDasharray: Math.PI * 2 * 9 })));
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var defaultLayout = function (isSidebarOpened, container, main, toolbar, sidebar) {
    var _a;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("div", __assign({}, container.attrs, { className: classNames((_a = {},
            _a[theme.prefixClass + "-layout-container"] = true,
            _a[theme.prefixClass + "-layout-with-sidebar"] = isSidebarOpened,
            _a)), style: container.attrs.style }),
        container.children,
        React__default.createElement("div", { className: theme.prefixClass + "-layout-toolbar" }, toolbar),
        React__default.createElement("div", { className: theme.prefixClass + "-layout-sidebar" }, sidebar.children),
        React__default.createElement("div", __assign({}, main.attrs, { className: theme.prefixClass + "-layout-main", style: main.attrs.style }), main.children)));
};

var defaultToolbar = function (toolbarSlot) {
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("div", { className: theme.prefixClass + "-toolbar" },
        React__default.createElement("div", { className: theme.prefixClass + "-toolbar-left" },
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.toggleSidebarButton),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.searchPopover),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.previousPageButton),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" },
                toolbarSlot.currentPageInput,
                " / ",
                toolbarSlot.numPages),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.nextPageButton)),
        React__default.createElement("div", { className: theme.prefixClass + "-toolbar-center" },
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.zoomOutButton),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.zoomPopover),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.zoomInButton)),
        React__default.createElement("div", { className: theme.prefixClass + "-toolbar-right" },
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.fullScreenButton),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.openFileButton),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.downloadButton),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.printButton),
            React__default.createElement("div", { className: theme.prefixClass + "-toolbar-item" }, toolbarSlot.moreActionsPopover))));
};

var useClickOutside = function (closeOnClickOutside, targetRef, onClickOutside) {
    var clickHandler = function (e) {
        var target = targetRef.current;
        if (target && !target.contains(e.target)) {
            onClickOutside();
        }
    };
    React__default.useEffect(function () {
        if (!closeOnClickOutside) {
            return;
        }
        document.addEventListener('click', clickHandler);
        return function () {
            document.removeEventListener('click', clickHandler);
        };
    }, []);
};

var useKeyUp = function (targetKeyCode, handler) {
    var keyUpHandler = function (e) {
        (e.keyCode === targetKeyCode) && handler();
    };
    React__default.useEffect(function () {
        document.addEventListener('keyup', keyUpHandler);
        return function () {
            document.removeEventListener('keyup', keyUpHandler);
        };
    }, []);
};

var useLockScroll = function () {
    React__default.useEffect(function () {
        var originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return function () {
            document.body.style.overflow = originalStyle;
        };
    }, []);
};

var ModalBody = function (_a) {
    var children = _a.children, closeOnClickOutside = _a.closeOnClickOutside, closeOnEscape = _a.closeOnEscape, onToggle = _a.onToggle;
    var theme = React__default.useContext(ThemeContext);
    var contentRef = React__default.createRef();
    useLockScroll();
    useKeyUp(27, function () { return closeOnEscape && onToggle(); });
    useClickOutside(closeOnClickOutside, contentRef, onToggle);
    return (React__default.createElement("div", { className: theme.prefixClass + "-modal-body", ref: contentRef }, children));
};

var ModalOverlay = function (_a) {
    var children = _a.children;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("div", { className: theme.prefixClass + "-modal-overlay" }, children));
};

var ToggleStatus;
(function (ToggleStatus) {
    ToggleStatus["Close"] = "Close";
    ToggleStatus["Open"] = "Open";
    ToggleStatus["Toggle"] = "Toggle";
})(ToggleStatus || (ToggleStatus = {}));
var useToggle = function () {
    var _a = React__default.useState(false), opened = _a[0], setOpened = _a[1];
    var toggle = function (status) {
        switch (status) {
            case ToggleStatus.Close:
                setOpened(false);
                break;
            case ToggleStatus.Open:
                setOpened(true);
                break;
            case ToggleStatus.Toggle:
            default:
                setOpened(function (isOpened) { return !isOpened; });
                break;
        }
    };
    return { opened: opened, toggle: toggle };
};

var Portal = function (_a) {
    var content = _a.content, target = _a.target;
    var _b = useToggle(), opened = _b.opened, toggle = _b.toggle;
    return (React__default.createElement(React__default.Fragment, null,
        target(toggle, opened),
        opened && content(toggle)));
};

var Modal = function (_a) {
    var closeOnClickOutside = _a.closeOnClickOutside, closeOnEscape = _a.closeOnEscape, content = _a.content, target = _a.target;
    var renderContent = function (toggle) { return (React__default.createElement(ModalOverlay, null,
        React__default.createElement(ModalBody, { closeOnClickOutside: closeOnClickOutside, closeOnEscape: closeOnEscape, onToggle: toggle }, content(toggle)))); };
    return (React__default.createElement(Portal, { target: target, content: renderContent }));
};

var Position;
(function (Position) {
    Position["TopLeft"] = "TOP_LEFT";
    Position["TopCenter"] = "TOP_CENTER";
    Position["TopRight"] = "TOP_RIGHT";
    Position["RightTop"] = "RIGHT_TOP";
    Position["RightCenter"] = "RIGHT_CENTER";
    Position["RightBottom"] = "RIGHT_BOTTOM";
    Position["BottomLeft"] = "BOTTOM_LEFT";
    Position["BottomCenter"] = "BOTTOM_CENTER";
    Position["BottomRight"] = "BOTTOM_RIGHT";
    Position["LeftTop"] = "LEFT_TOP";
    Position["LeftCenter"] = "LEFT_CENTER";
    Position["LeftBottom"] = "LEFT_BOTTOM";
})(Position || (Position = {}));
var Position$1 = Position;

var calculatePosition = function (content, target, position, offset) {
    var targetRect = target.getBoundingClientRect();
    var contentRect = content.getBoundingClientRect();
    var height = contentRect.height, width = contentRect.width;
    var top = 0;
    var left = 0;
    switch (position) {
        case Position$1.TopLeft:
            top = targetRect.top - height;
            left = targetRect.left;
            break;
        case Position$1.TopCenter:
            top = targetRect.top - height;
            left = targetRect.left + targetRect.width / 2 - width / 2;
            break;
        case Position$1.TopRight:
            top = targetRect.top - height;
            left = targetRect.left + targetRect.width - width;
            break;
        case Position$1.RightTop:
            top = targetRect.top;
            left = targetRect.left + targetRect.width;
            break;
        case Position$1.RightCenter:
            top = targetRect.top + targetRect.height / 2 - height / 2;
            left = targetRect.left + targetRect.width;
            break;
        case Position$1.RightBottom:
            top = targetRect.top + targetRect.height - height;
            left = targetRect.left + targetRect.width;
            break;
        case Position$1.BottomLeft:
            top = targetRect.top + targetRect.height;
            left = targetRect.left;
            break;
        case Position$1.BottomCenter:
            top = targetRect.top + targetRect.height;
            left = targetRect.left + targetRect.width / 2 - width / 2;
            break;
        case Position$1.BottomRight:
            top = targetRect.top + targetRect.height;
            left = targetRect.left + targetRect.width - width;
            break;
        case Position$1.LeftTop:
            top = targetRect.top;
            left = targetRect.left - width;
            break;
        case Position$1.LeftCenter:
            top = targetRect.top + targetRect.height / 2 - height / 2;
            left = targetRect.left - width;
            break;
        case Position$1.LeftBottom:
            top = targetRect.top + targetRect.height - height;
            left = targetRect.left - width;
            break;
    }
    return {
        left: left + (offset.left || 0),
        top: top + (offset.top || 0),
    };
};

var usePosition = function (contentRef, targetRef, anchorRef, position, offset) {
    React__default.useLayoutEffect(function () {
        var targetEle = targetRef.current;
        var contentEle = contentRef.current;
        var anchorEle = anchorRef.current;
        if (!contentEle || !targetEle || !anchorEle) {
            return;
        }
        var anchorRect = anchorEle.getBoundingClientRect();
        var _a = calculatePosition(contentEle, targetEle, position, offset), top = _a.top, left = _a.left;
        contentEle.style.top = top - anchorRect.top + "px";
        contentEle.style.left = left - anchorRect.left + "px";
    }, []);
};

var Arrow = function (_a) {
    var _b;
    var customClassName = _a.customClassName, position = _a.position;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("div", { className: classNames((_b = {},
            _b[theme.prefixClass + "-arrow"] = true,
            _b[theme.prefixClass + "-arrow-tl"] = position === Position$1.TopLeft,
            _b[theme.prefixClass + "-arrow-tc"] = position === Position$1.TopCenter,
            _b[theme.prefixClass + "-arrow-tr"] = position === Position$1.TopRight,
            _b[theme.prefixClass + "-arrow-rt"] = position === Position$1.RightTop,
            _b[theme.prefixClass + "-arrow-rc"] = position === Position$1.RightCenter,
            _b[theme.prefixClass + "-arrow-rb"] = position === Position$1.RightBottom,
            _b[theme.prefixClass + "-arrow-bl"] = position === Position$1.BottomLeft,
            _b[theme.prefixClass + "-arrow-bc"] = position === Position$1.BottomCenter,
            _b[theme.prefixClass + "-arrow-br"] = position === Position$1.BottomRight,
            _b[theme.prefixClass + "-arrow-lt"] = position === Position$1.LeftTop,
            _b[theme.prefixClass + "-arrow-lc"] = position === Position$1.LeftCenter,
            _b[theme.prefixClass + "-arrow-lb"] = position === Position$1.LeftBottom,
            _b["" + customClassName] = customClassName !== '',
            _b)) }));
};

var PopoverBody = function (_a) {
    var children = _a.children, closeOnClickOutside = _a.closeOnClickOutside, offset = _a.offset, position = _a.position, targetRef = _a.targetRef, onClose = _a.onClose;
    var theme = React__default.useContext(ThemeContext);
    var contentRef = React__default.createRef();
    var anchorRef = React__default.createRef();
    useClickOutside(closeOnClickOutside, contentRef, onClose);
    usePosition(contentRef, targetRef, anchorRef, position, offset);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { ref: anchorRef, style: { left: 0, position: 'absolute', top: 0 } }),
        React__default.createElement("div", { className: theme.prefixClass + "-popover-body", ref: contentRef },
            React__default.createElement(Arrow, { customClassName: theme.prefixClass + "-popover-body-arrow", position: position }),
            children)));
};

var PopoverOverlay = function (_a) {
    var closeOnEscape = _a.closeOnEscape, onClose = _a.onClose;
    var theme = React__default.useContext(ThemeContext);
    useKeyUp(27, function () { return closeOnEscape && onClose(); });
    return (React__default.createElement("div", { className: theme.prefixClass + "-popover-overlay" }));
};

var Popover = function (_a) {
    var closeOnClickOutside = _a.closeOnClickOutside, closeOnEscape = _a.closeOnEscape, content = _a.content, offset = _a.offset, position = _a.position, target = _a.target;
    var targetRef = React__default.createRef();
    var renderTarget = function (toggle, opened) { return (React__default.createElement("div", { ref: targetRef }, target(toggle, opened))); };
    var renderContent = function (toggle) { return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(PopoverOverlay, { closeOnEscape: closeOnEscape, onClose: toggle }),
        React__default.createElement(PopoverBody, { closeOnClickOutside: closeOnClickOutside, offset: offset, position: position, targetRef: targetRef, onClose: toggle }, content(toggle)))); };
    return (React__default.createElement(Portal, { content: renderContent, target: renderTarget }));
};

var TooltipBody = function (_a) {
    var children = _a.children, offset = _a.offset, position = _a.position, targetRef = _a.targetRef;
    var theme = React__default.useContext(ThemeContext);
    var contentRef = React__default.createRef();
    var anchorRef = React__default.createRef();
    usePosition(contentRef, targetRef, anchorRef, position, offset);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { ref: anchorRef, style: { left: 0, position: 'absolute', top: 0 } }),
        React__default.createElement("div", { className: theme.prefixClass + "-tooltip-body", ref: contentRef },
            React__default.createElement(Arrow, { customClassName: theme.prefixClass + "-tooltip-body-arrow", position: position }),
            React__default.createElement("div", { className: theme.prefixClass + "-tooltip-body-content" }, children))));
};

var Tooltip = function (_a) {
    var content = _a.content, offset = _a.offset, position = _a.position, target = _a.target;
    var targetRef = React__default.createRef();
    var renderTarget = function (toggle) {
        var show = function () { toggle(ToggleStatus.Open); };
        var hide = function () { toggle(ToggleStatus.Close); };
        return (React__default.createElement("div", { ref: targetRef, onMouseEnter: show, onMouseLeave: hide }, target));
    };
    var renderContent = function () { return (React__default.createElement(TooltipBody, { offset: offset, position: position, targetRef: targetRef }, content())); };
    return (React__default.createElement(Portal, { target: renderTarget, content: renderContent }));
};

var ScrollMode;
(function (ScrollMode) {
    ScrollMode["Horizontal"] = "Horizontal";
    ScrollMode["Vertical"] = "Vertical";
    ScrollMode["Wrapped"] = "Wrapped";
})(ScrollMode || (ScrollMode = {}));
var ScrollMode$1 = ScrollMode;

var SelectionMode;
(function (SelectionMode) {
    SelectionMode[SelectionMode["Hand"] = 0] = "Hand";
    SelectionMode[SelectionMode["Text"] = 1] = "Text";
})(SelectionMode || (SelectionMode = {}));
var SelectionMode$1 = SelectionMode;

var SpecialZoomLevel;
(function (SpecialZoomLevel) {
    SpecialZoomLevel["ActualSize"] = "ActualSize";
    SpecialZoomLevel["PageFit"] = "PageFit";
    SpecialZoomLevel["PageWidth"] = "PageWidth";
})(SpecialZoomLevel || (SpecialZoomLevel = {}));
var SpecialZoomLevel$1 = SpecialZoomLevel;

var useDragScroll = function (ref) {
    var theme = React__default.useContext(ThemeContext);
    var _a = React__default.useState(false), enabled = _a[0], setEnabled = _a[1];
    var pos = React__default.useRef({ top: 0, left: 0, x: 0, y: 0 });
    var onMouseMoveHandler = function (e) {
        var ele = ref.current;
        if (!ele) {
            return;
        }
        ele.scrollTop = pos.current.top - (e.clientY - pos.current.y);
        ele.scrollLeft = pos.current.left - (e.clientX - pos.current.x);
    };
    var onMouseUpHandler = function () {
        var ele = ref.current;
        if (!ele) {
            return;
        }
        ele.classList.add(theme.prefixClass + "-grab");
        ele.classList.remove(theme.prefixClass + "-grabbing");
        document.removeEventListener('mousemove', onMouseMoveHandler);
        document.removeEventListener('mouseup', onMouseUpHandler);
    };
    var onMouseDownHandler = function (e) {
        var ele = ref.current;
        if (!enabled || !ele) {
            return;
        }
        ele.classList.remove(theme.prefixClass + "-grab");
        ele.classList.add(theme.prefixClass + "-grabbing");
        e.preventDefault();
        e.stopPropagation();
        pos.current = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            x: e.clientX,
            y: e.clientY,
        };
        document.addEventListener('mousemove', onMouseMoveHandler);
        document.addEventListener('mouseup', onMouseUpHandler);
    };
    React__default.useEffect(function () {
        var ele = ref.current;
        if (!ele) {
            return;
        }
        enabled
            ? ele.classList.add(theme.prefixClass + "-grab")
            : ele.classList.remove(theme.prefixClass + "-grab");
        ele.addEventListener('mousedown', onMouseDownHandler);
        return function () {
            ele.removeEventListener('mousedown', onMouseDownHandler);
        };
    }, [enabled]);
    return {
        toggleDragScroll: setEnabled,
    };
};

var useDrop = function (ref, onDrop) {
    var dragCount = React__default.useRef(0);
    var _a = React__default.useState(false), isDragging = _a[0], setDragging = _a[1];
    var onDropHandler = function (e) {
        e.preventDefault();
        setDragging(false);
        dragCount.current = 0;
        if (e.dataTransfer) {
            onDrop(e.dataTransfer.files);
        }
    };
    var onDragOverHandler = function (e) {
        e.preventDefault();
    };
    var onDragEnterHandler = function (e) {
        e.preventDefault();
        dragCount.current += 1;
        if (dragCount.current <= 1) {
            setDragging(true);
        }
    };
    var onDragLeaveHandler = function (e) {
        e.preventDefault();
        dragCount.current -= 1;
        if (dragCount.current <= 0) {
            setDragging(false);
        }
    };
    React__default.useEffect(function () {
        var ele = ref.current;
        if (!ele) {
            return;
        }
        ele.addEventListener('drop', onDropHandler);
        ele.addEventListener('dragover', onDragOverHandler);
        ele.addEventListener('dragenter', onDragEnterHandler);
        ele.addEventListener('dragleave', onDragLeaveHandler);
        return function () {
            ele.removeEventListener('drop', onDropHandler);
            ele.removeEventListener('dragover', onDragOverHandler);
            ele.removeEventListener('dragenter', onDragEnterHandler);
            ele.removeEventListener('dragleave', onDragLeaveHandler);
        };
    }, [ref.current]);
    return { isDragging: isDragging };
};

var Api;
(function (Api) {
    Api[Api["ExitFullScreen"] = 0] = "ExitFullScreen";
    Api[Api["FullScreenChange"] = 1] = "FullScreenChange";
    Api[Api["FullScreenElement"] = 2] = "FullScreenElement";
    Api[Api["FullScreenEnabled"] = 3] = "FullScreenEnabled";
    Api[Api["RequestFullScreen"] = 4] = "RequestFullScreen";
})(Api || (Api = {}));
var defaultVendor = {
    ExitFullScreen: 'exitFullscreen',
    FullScreenChange: 'fullscreenchange',
    FullScreenElement: 'fullscreenElement',
    FullScreenEnabled: 'fullscreenEnabled',
    RequestFullScreen: 'requestFullscreen',
};
var webkitVendor = {
    ExitFullScreen: 'webkitExitFullscreen',
    FullScreenChange: 'webkitfullscreenchange',
    FullScreenElement: 'webkitFullscreenElement',
    FullScreenEnabled: 'webkitFullscreenEnabled',
    RequestFullScreen: 'webkitRequestFullscreen',
};
var msVendor = {
    ExitFullScreen: 'msExitFullscreen',
    FullScreenChange: 'MSFullscreenChange',
    FullScreenElement: 'msFullscreenElement',
    FullScreenEnabled: 'msFullscreenEnabled',
    RequestFullScreen: 'msRequestFullscreen',
};
var isBrowser = (typeof window !== 'undefined');
var vendor = isBrowser ? ((Api.FullScreenEnabled in document && defaultVendor) ||
    (webkitVendor.FullScreenEnabled in document && webkitVendor) ||
    (msVendor.FullScreenEnabled in document && msVendor) ||
    defaultVendor) : defaultVendor;
var addFullScreenChangeListener = function (handler) {
    if (isBrowser) {
        document.addEventListener(vendor.FullScreenChange, handler);
    }
};
var removeFullScreenChangeListener = function (handler) {
    if (isBrowser) {
        document.removeEventListener(vendor.FullScreenChange, handler);
    }
};
var exitFullScreen = function (element) {
    return isBrowser
        ? element[vendor.ExitFullScreen]()
        : Promise.resolve({});
};
var getFullScreenElement = function () {
    return isBrowser ? document[vendor.FullScreenElement] : null;
};
var requestFullScreen = function (element) {
    if (isBrowser) {
        element[vendor.RequestFullScreen]();
    }
};

var useFullScreen = function (ref) {
    var _a = React__default.useState(false), isFullScreen = _a[0], setIsFullScreen = _a[1];
    var closeOtherFullScreen = function () {
        var ele = getFullScreenElement();
        return (ele && ele !== ref.current)
            ? exitFullScreen(ele)
            : Promise.resolve();
    };
    var openFullScreen = function () {
        closeOtherFullScreen().then(function () {
            if (ref.current) {
                requestFullScreen(ref.current);
            }
        });
    };
    var closeFullScreen = function () {
        var ele = getFullScreenElement();
        if (isFullScreen && ele && ele === ref.current) {
            exitFullScreen(document);
        }
    };
    var onFullScreenChange = function () {
        var ele = getFullScreenElement();
        setIsFullScreen(ele === ref.current);
    };
    React__default.useEffect(function () {
        addFullScreenChangeListener(onFullScreenChange);
        return function () {
            removeFullScreenChangeListener(onFullScreenChange);
        };
    }, [ref.current]);
    return {
        closeFullScreen: closeFullScreen,
        isFullScreen: isFullScreen,
        openFullScreen: openFullScreen,
    };
};

var stringify = function (value) {
    return ("0" + value).slice(-2);
};
var getDateString = function (date) {
    var dateString = "D:" + date.getFullYear() + stringify(date.getMonth() + 1) + stringify(date.getDate());
    dateString = "" + dateString + stringify(date.getHours()) + stringify(date.getMinutes()) + stringify(date.getSeconds());
    var matches = date.toString().match(/GMT(.\w+)/);
    if (!matches) {
        return dateString;
    }
    var timezone = matches[0].replace("GMT", "");
    timezone = timezone.substr(0, 3) + "'" + timezone.substr(3, 5) + "'";
    dateString = "" + dateString + timezone;
    return dateString;
};
var getNormalizeAnnotation = function (id, rect, quadPoints) {
    return {
        annotationFlags: 4,
        borderStyle: {
            width: 1,
            style: 1,
            dashArray: [3],
            horizontalCornerRadius: 0,
            verticalCornerRadius: 0,
        },
        color: new Uint8ClampedArray([255, 237, 0]),
        contents: "",
        hasAppearance: true,
        id: id,
        modificationDate: getDateString(new Date()),
        rect: rect,
        subtype: "Highlight",
        title: "",
        creationDate: getDateString(new Date()),
        hasPopup: true,
        annotationType: 9,
        quadPoints: quadPoints,
    };
};
var getAreaAsPng = function (canvas, position) {
    var left = position.left, top = position.top, width = position.width, height = position.height;
    var newCanvas = document.createElement("canvas");
    if (!(newCanvas instanceof HTMLCanvasElement)) {
        return "";
    }
    newCanvas.width = width;
    newCanvas.height = height;
    var newCanvasContext = newCanvas.getContext("2d");
    if (!newCanvasContext || !canvas) {
        return "";
    }
    var dpr = window.devicePixelRatio;
    newCanvasContext.drawImage(canvas, left * dpr, top * dpr, width * dpr, height * dpr, 0, 0, width, height);
    return newCanvas.toDataURL("image/png");
};

var Popover$1 = function (_a) {
    var children = _a.children;
    return React__default.createElement("div", { className: "Popover" }, children);
};
var AnnotationContext = React__default.createContext([
    function () {
        throw new Error("Not implement AnnotationContext.onNewAnnotation");
    },
    { state: [], SelectionPopover: Popover$1, AnnotationPopover: Popover$1 },
]);
var AnnotationProvider = function (_a) {
    var children = _a.children, onNewAnnotation = _a.onNewAnnotation, value = _a.value, _b = _a.SelectionPopover, SelectionPopover = _b === void 0 ? Popover$1 : _b, _c = _a.AnnotationPopover, AnnotationPopover = _c === void 0 ? Popover$1 : _c;
    var addNewAnnotation = React.useCallback(function (rect, quadPoints, contents, hideTipAndSelection) {
        var getLocalId = function () {
            var existId = value ? value.map(function (item) { return item.id; }) : [];
            var newId;
            do {
                newId =
                    Math.random().toString().substr(2, 3) +
                        Math.random()
                            .toString(36)
                            .replace(/[^a-z]+/g, "")
                            .substr(0, 1)
                            .toUpperCase();
            } while (existId.includes(newId));
            return newId;
        };
        var newAnno = getNormalizeAnnotation(getLocalId(), rect, quadPoints);
        if (onNewAnnotation) {
            onNewAnnotation(newAnno, contents, hideTipAndSelection);
        }
    }, [onNewAnnotation]);
    return (React__default.createElement(AnnotationContext.Provider, { value: [
            addNewAnnotation,
            { state: value || [], SelectionPopover: SelectionPopover, AnnotationPopover: AnnotationPopover },
        ] }, children));
};
var useAnnotationState = function () {
    var _a = React.useContext(AnnotationContext), _ = _a[0], state = _a[1].state;
    return state;
};
var useSelectionPopover = function () {
    var _a = React.useContext(AnnotationContext), _ = _a[0], SelectionPopover = _a[1].SelectionPopover;
    return SelectionPopover;
};
var useAnnotationPopover = function () {
    var _a = React.useContext(AnnotationContext), _ = _a[0], AnnotationPopover = _a[1].AnnotationPopover;
    return AnnotationPopover;
};
var useAddNewAnnotation = function () {
    var addNewAnnotation = React.useContext(AnnotationContext)[0];
    return addNewAnnotation;
};

var AnnotationLoader = function (_a) {
    var page = _a.page, renderAnnotations = _a.renderAnnotations;
    var _b = React__default.useState(true), loading = _b[0], setLoading = _b[1];
    var _c = React__default.useState([]), annotations = _c[0], setAnnotations = _c[1];
    var annotationValues = useAnnotationState();
    React__default.useEffect(function () {
        page.getAnnotations({ intent: 'display' }).then(function (result) {
            setLoading(false);
            setAnnotations(annotationValues);
        });
    }, [annotationValues]);
    return (loading
        ? React__default.createElement(React__default.Fragment, null)
        : renderAnnotations(annotations));
};

var AnnotationType;
(function (AnnotationType) {
    AnnotationType[AnnotationType["Text"] = 1] = "Text";
    AnnotationType[AnnotationType["Link"] = 2] = "Link";
    AnnotationType[AnnotationType["FreeText"] = 3] = "FreeText";
    AnnotationType[AnnotationType["Line"] = 4] = "Line";
    AnnotationType[AnnotationType["Square"] = 5] = "Square";
    AnnotationType[AnnotationType["Circle"] = 6] = "Circle";
    AnnotationType[AnnotationType["Polygon"] = 7] = "Polygon";
    AnnotationType[AnnotationType["Polyline"] = 8] = "Polyline";
    AnnotationType[AnnotationType["Highlight"] = 9] = "Highlight";
    AnnotationType[AnnotationType["Underline"] = 10] = "Underline";
    AnnotationType[AnnotationType["Squiggly"] = 11] = "Squiggly";
    AnnotationType[AnnotationType["StrikeOut"] = 12] = "StrikeOut";
    AnnotationType[AnnotationType["Stamp"] = 13] = "Stamp";
    AnnotationType[AnnotationType["Caret"] = 14] = "Caret";
    AnnotationType[AnnotationType["Ink"] = 15] = "Ink";
    AnnotationType[AnnotationType["Popup"] = 16] = "Popup";
    AnnotationType[AnnotationType["FileAttachment"] = 17] = "FileAttachment";
})(AnnotationType || (AnnotationType = {}));
var AnnotationType$1 = AnnotationType;

var AnnotationBorderStyleType;
(function (AnnotationBorderStyleType) {
    AnnotationBorderStyleType[AnnotationBorderStyleType["Solid"] = 1] = "Solid";
    AnnotationBorderStyleType[AnnotationBorderStyleType["Dashed"] = 2] = "Dashed";
    AnnotationBorderStyleType[AnnotationBorderStyleType["Beveled"] = 3] = "Beveled";
    AnnotationBorderStyleType[AnnotationBorderStyleType["Inset"] = 4] = "Inset";
    AnnotationBorderStyleType[AnnotationBorderStyleType["Underline"] = 5] = "Underline";
})(AnnotationBorderStyleType || (AnnotationBorderStyleType = {}));
var AnnotationBorderStyleType$1 = AnnotationBorderStyleType;

var dateRegex = new RegExp('^D:' +
    '(\\d{4})' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '(\\d{2})?' +
    '([Z|+|-])?' +
    '(\\d{2})?' +
    '\'?' +
    '(\\d{2})?' +
    '\'?');
var parse = function (value, min, max, defaultValue) {
    var parsed = parseInt(value, 10);
    return (parsed >= min && parsed <= max) ? parsed : defaultValue;
};
var convertDate = function (input) {
    var matches = dateRegex.exec(input);
    if (!matches) {
        return null;
    }
    var year = parseInt(matches[1], 10);
    var month = parse(matches[2], 1, 12, 1) - 1;
    var day = parse(matches[3], 1, 31, 1);
    var hour = parse(matches[4], 0, 23, 0);
    var minute = parse(matches[5], 0, 59, 0);
    var second = parse(matches[6], 0, 59, 0);
    var universalTimeRelation = matches[7] || 'Z';
    var offsetHour = parse(matches[8], 0, 23, 0);
    var offsetMinute = parse(matches[9], 0, 59, 0);
    switch (universalTimeRelation) {
        case '-':
            hour += offsetHour;
            minute += offsetMinute;
            break;
        case '+':
            hour -= offsetHour;
            minute -= offsetMinute;
            break;
    }
    return new Date(Date.UTC(year, month, day, hour, minute, second));
};

var PopupWrapper = function (_a) {
    var annotation = _a.annotation;
    var theme = React.useContext(ThemeContext);
    var dateStr = '';
    if (annotation.modificationDate) {
        var date = convertDate(annotation.modificationDate);
        dateStr = date ? date.toLocaleDateString() + ", " + date.toLocaleTimeString() : '';
    }
    return (React__default.createElement("div", { className: theme.prefixClass + "-annotation-popup-wrapper", style: {
            top: annotation.annotationType === AnnotationType$1.Popup ? '' : '100%',
        } },
        (annotation.title) && (React__default.createElement("div", { className: theme.prefixClass + "-annotation-popup-wrapper-header" },
            React__default.createElement("div", { className: theme.prefixClass + "-annotation-popup-wrapper-title" }, annotation.title),
            React__default.createElement("span", { className: theme.prefixClass + "-annotation-popup-wrapper-date" }, dateStr))),
        annotation.contents && (React__default.createElement("div", { className: theme.prefixClass + "-annotation-popup-wrapper-content" }, annotation.contents.split('\n').map(function (item, index) { return React__default.createElement(React.Fragment, { key: index },
            item,
            React__default.createElement("br", null)); })))));
};

var TogglePopupBy;
(function (TogglePopupBy) {
    TogglePopupBy["Click"] = "Click";
    TogglePopupBy["Hover"] = "Hover";
})(TogglePopupBy || (TogglePopupBy = {}));
var useTogglePopup = function () {
    var _a = useToggle(), opened = _a.opened, toggle = _a.toggle;
    var _b = React__default.useState(TogglePopupBy.Hover), togglePopupBy = _b[0], setTooglePopupBy = _b[1];
    var toggleOnClick = function () {
        switch (togglePopupBy) {
            case TogglePopupBy.Click:
                opened && setTooglePopupBy(TogglePopupBy.Hover);
                toggle(ToggleStatus.Toggle);
                break;
            case TogglePopupBy.Hover:
                setTooglePopupBy(TogglePopupBy.Click);
                toggle(ToggleStatus.Open);
                break;
        }
    };
    var openOnHover = function () {
        togglePopupBy === TogglePopupBy.Hover && toggle(ToggleStatus.Open);
    };
    var closeOnHover = function () {
        togglePopupBy === TogglePopupBy.Hover && toggle(ToggleStatus.Close);
    };
    return {
        opened: opened,
        closeOnHover: closeOnHover,
        openOnHover: openOnHover,
        toggleOnClick: toggleOnClick,
    };
};

var Annotation = function (_a) {
    var annotation = _a.annotation, children = _a.children, ignoreBorder = _a.ignoreBorder, hasPopup = _a.hasPopup, isRenderable = _a.isRenderable, page = _a.page, viewport = _a.viewport;
    var rect = annotation.rect;
    var _b = useTogglePopup(), closeOnHover = _b.closeOnHover, opened = _b.opened, openOnHover = _b.openOnHover, toggleOnClick = _b.toggleOnClick;
    var normalizeRect = function (r) { return [
        Math.min(r[0], r[2]),
        Math.min(r[1], r[3]),
        Math.max(r[0], r[2]),
        Math.max(r[1], r[3]),
    ]; };
    var bound = normalizeRect([
        rect[0],
        page.view[3] + page.view[1] - rect[1],
        rect[2],
        page.view[3] + page.view[1] - rect[3],
    ]);
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var styles = {
        borderColor: '',
        borderBottomStyle: '',
        borderRadius: '',
        borderStyle: '',
        borderWidth: '',
    };
    if (!ignoreBorder && annotation.borderStyle.width > 0) {
        switch (annotation.borderStyle.style) {
            case AnnotationBorderStyleType$1.Dashed:
                styles.borderStyle = 'dashed';
                break;
            case AnnotationBorderStyleType$1.Solid:
                styles.borderStyle = 'solid';
                break;
            case AnnotationBorderStyleType$1.Underline:
                styles.borderBottomStyle = 'solid';
                break;
            case AnnotationBorderStyleType$1.Beveled:
            case AnnotationBorderStyleType$1.Inset:
        }
        var borderWidth = annotation.borderStyle.width;
        styles.borderWidth = borderWidth + "px";
        if (annotation.borderStyle.style !== AnnotationBorderStyleType$1.Underline) {
            width = width - 2 * borderWidth;
            height = height - 2 * borderWidth;
        }
        var _c = annotation.borderStyle, horizontalCornerRadius = _c.horizontalCornerRadius, verticalCornerRadius = _c.verticalCornerRadius;
        if (horizontalCornerRadius > 0 || verticalCornerRadius > 0) {
            styles.borderRadius = horizontalCornerRadius + "px / " + verticalCornerRadius + "px";
        }
        annotation.color
            ? (styles.borderColor = "rgb(" + (annotation.color[0] | 0) + ", " + (annotation.color[1] | 0) + ", " + (annotation.color[2] | 0) + ")")
            : (styles.borderWidth = '0');
    }
    return (React__default.createElement(React__default.Fragment, null, isRenderable &&
        children({
            popup: {
                opened: opened,
                closeOnHover: closeOnHover,
                openOnHover: openOnHover,
                toggleOnClick: toggleOnClick,
            },
            slot: {
                attrs: {
                    style: Object.assign({
                        height: height + "px",
                        left: bound[0] + "px",
                        top: bound[1] + "px",
                        transform: "matrix(" + viewport.transform.join(',') + ")",
                        transformOrigin: "-" + bound[0] + "px -" + bound[1] + "px",
                        width: width + "px",
                    }, styles),
                },
                children: (React__default.createElement(React__default.Fragment, null, hasPopup && opened && (React__default.createElement(PopupWrapper, { annotation: annotation })))),
            }
        })));
};

var Caret = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-caret", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var Circle = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-circle", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        React__default.createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default.createElement("circle", { cy: height / 2, fill: 'none', rx: width / 2 - borderWidth / 2, ry: height / 2 - borderWidth / 2, stroke: 'transparent', strokeWidth: borderWidth || 1 })),
        props.slot.children)); }));
};

var fileName = function (url) {
    var str = url.split('/').pop();
    return str ? str.split('#')[0].split('?')[0] : url;
};

var downloadFile = function (url, data) {
    var blobUrl = (typeof data === 'string')
        ? ''
        : URL.createObjectURL(new Blob([data], { type: '' }));
    var link = document.createElement('a');
    link.style.display = 'none';
    link.href = blobUrl || url;
    link.setAttribute('download', fileName(url));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
    }
};

var FileAttachment = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false && (!!annotation.title || !!annotation.contents);
    var doubleClick = function () {
        var file = annotation.file;
        file && downloadFile(file.filename, file.content);
    };
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: true, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-file-attachment", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onDoubleClick: doubleClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var FreeText = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-free-text", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var Highlight = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup ||
        annotation.title ||
        annotation.contents);
    var Popover = useAnnotationPopover();
    var annotations = (annotation.quadPoints ? annotation.quadPoints : []).map(function (quadPoint) {
        var cloneAnno = __assign(__assign({}, annotation), { rect: [quadPoint[0].x, quadPoint[3].y, quadPoint[3].x, quadPoint[0].y] });
        return cloneAnno;
    });
    return (React__default.createElement(React__default.Fragment, null, annotations.map(function (annotation, idx) {
        return (React__default.createElement(Annotation, { key: idx, annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) {
            var _a, _b;
            var attrs = __assign(__assign({}, props.slot.attrs), { style: __assign(__assign({}, props.slot.attrs.style), { backgroundColor: "rgb(" + annotation.color + ", 0.4)", outline: "0.5px solid rgb(" + annotation.color + ", 0.8)" }) });
            var contentStyle = {
                height: (_a = props.slot.attrs.style) === null || _a === void 0 ? void 0 : _a.height,
                width: (_b = props.slot.attrs.style) === null || _b === void 0 ? void 0 : _b.width,
            };
            return (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(Popover, { style: __assign(__assign({}, attrs.style), { position: "absolute", cursor: 'pointer', mixBlendMode: 'multiply' }), data: annotation, onConfirm: function () {
                        console.log("onConfirm");
                    }, content: React__default.createElement("div", { style: contentStyle, "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }, props.slot.children) })));
        }));
    })));
};

var Ink = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-ink", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        annotation.inkLists && annotation.inkLists.length && (React__default.createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" }, annotation.inkLists.map(function (inkList, index) { return (React__default.createElement("polyline", { key: index, fill: 'none', stroke: 'transparent', strokeWidth: borderWidth || 1, points: inkList.map(function (item) { return item.x - rect[0] + "," + (rect[3] - item.y); }).join(' ') })); }))),
        props.slot.children)); }));
};

var Line = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-line", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        React__default.createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default.createElement("line", { stroke: 'transparent', strokeWidth: borderWidth || 1, x1: rect[2] - annotation.lineCoordinates[0], x2: rect[2] - annotation.lineCoordinates[2], y1: rect[3] - annotation.lineCoordinates[1], y2: rect[3] - annotation.lineCoordinates[3] })),
        props.slot.children)); }));
};

var parse$1 = function (pageIndex, destArray) {
    var bottomOffset;
    var scale;
    switch (destArray[1].name) {
        case 'XYZ':
            bottomOffset = destArray[3];
            scale = destArray[4];
            return {
                bottomOffset: bottomOffset,
                pageIndex: pageIndex - 1,
                scaleTo: scale,
            };
        case 'Fit':
            return {
                bottomOffset: 0,
                pageIndex: pageIndex - 1,
                scaleTo: SpecialZoomLevel$1.PageFit,
            };
        default:
            return {
                bottomOffset: 0,
                pageIndex: pageIndex - 1,
                scaleTo: 1,
            };
    }
};
var getDestination = function (doc, dest) {
    return new Promise(function (res) {
        new Promise(function (resolve) {
            if (typeof dest === 'string') {
                doc.getDestination(dest).then(function (destArray) {
                    resolve(destArray);
                });
            }
            else {
                resolve(dest);
            }
        }).then(function (destArray) {
            doc.getPageIndex(destArray[0]).then(function (pageIndex) {
                var target = parse$1(pageIndex, destArray);
                res(target);
            });
        });
    });
};

var Link = function (_a) {
    var annotation = _a.annotation, doc = _a.doc, page = _a.page, viewport = _a.viewport, onExecuteNamedAction = _a.onExecuteNamedAction, onJumpToDest = _a.onJumpToDest;
    var theme = React.useContext(ThemeContext);
    var link = function (e) {
        e.preventDefault();
        annotation.action
            ? onExecuteNamedAction(annotation.action)
            : getDestination(doc, annotation.dest).then(function (target) {
                var pageIndex = target.pageIndex, bottomOffset = target.bottomOffset, scaleTo = target.scaleTo;
                onJumpToDest(pageIndex + 1, bottomOffset, scaleTo);
            });
    };
    var isRenderable = !!(annotation.url || annotation.dest || annotation.action);
    var attrs = annotation.url
        ? {
            href: annotation.url,
            rel: 'noopener noreferrer nofollow',
            target: annotation.newWindow ? '_blank' : '',
            title: annotation.url,
        }
        : {
            href: '',
            onClick: link,
        };
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: false, ignoreBorder: false, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-link", "data-annotation-id": annotation.id }),
        React__default.createElement("a", __assign({}, attrs)))); }));
};

var Polygon = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-polygon", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        annotation.vertices && annotation.vertices.length && (React__default.createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default.createElement("polygon", { fill: 'none', stroke: 'transparent', strokeWidth: borderWidth || 1, points: annotation.vertices.map(function (item) { return item.x - rect[0] + "," + (rect[3] - item.y); }).join(' ') }))),
        props.slot.children)); }));
};

var Polyline = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-polyline", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        annotation.vertices && annotation.vertices.length && (React__default.createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default.createElement("polyline", { fill: 'none', stroke: 'transparent', strokeWidth: borderWidth || 1, points: annotation.vertices.map(function (item) { return item.x - rect[0] + "," + (rect[3] - item.y); }).join(' ') }))),
        props.slot.children)); }));
};

var Popup = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var isRenderable = !!(annotation.title || annotation.contents);
    var ignoredParents = ['Circle', 'Ink', 'Line', 'Polygon', 'PolyLine', 'Square'];
    var hasPopup = !annotation.parentType || ignoredParents.includes(annotation.parentType);
    React__default.useLayoutEffect(function () {
        if (!annotation.parentId) {
            return;
        }
        var parent = document.querySelector("[data-annotation-id=\"" + annotation.parentId + "\"]");
        var container = document.querySelector("[data-annotation-id=\"" + annotation.id + "\"]");
        if (!parent || !container) {
            return;
        }
        var left = parseFloat(parent.style.left);
        var top = parseFloat(parent.style.top) + parseFloat(parent.style.height);
        container.style.left = left + "px";
        container.style.top = top + "px";
        container.style.transformOrigin = "-" + left + "px -" + top + "px";
    }, []);
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: false, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-popup", "data-annotation-id": annotation.id }),
        React__default.createElement(PopupWrapper, { annotation: annotation }))); }));
};

var Square = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var rect = annotation.rect;
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    var borderWidth = annotation.borderStyle.width;
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-square", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
        React__default.createElement("svg", { height: height + "px", preserveAspectRatio: 'none', version: '1.1', viewBox: "0 0 " + width + " " + height, width: width + "px" },
            React__default.createElement("rect", { height: height - borderWidth, fill: 'none', stroke: 'transparent', strokeWidth: borderWidth || 1, x: borderWidth / 2, y: borderWidth / 2, width: width - borderWidth })),
        props.slot.children)); }));
};

var Squiggly = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-squiggly", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var Stamp = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-stamp", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var StrikeOut = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-strike-out", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var CommentIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: 'M.5,16.5a1,1,0,0,0,1,1h2v4l4-4h15a1,1,0,0,0,1-1V3.5a1,1,0,0,0-1-1H1.5a1,1,0,0,0-1,1Z' }),
        React__default.createElement("path", { d: 'M7.25,9.75A.25.25,0,1,1,7,10a.25.25,0,0,1,.25-.25' }),
        React__default.createElement("path", { d: 'M12,9.75a.25.25,0,1,1-.25.25A.25.25,0,0,1,12,9.75' }),
        React__default.createElement("path", { d: 'M16.75,9.75a.25.25,0,1,1-.25.25.25.25,0,0,1,.25-.25' })));
};

var HelpIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: 'M0.500 12.001 A11.500 11.500 0 1 0 23.500 12.001 A11.500 11.500 0 1 0 0.500 12.001 Z' }),
        React__default.createElement("path", { d: 'M6.000 12.001 A6.000 6.000 0 1 0 18.000 12.001 A6.000 6.000 0 1 0 6.000 12.001 Z' }),
        React__default.createElement("path", { d: 'M21.423 5.406L17.415 9.414' }),
        React__default.createElement("path", { d: 'M14.587 6.585L18.607 2.565' }),
        React__default.createElement("path", { d: 'M5.405 21.424L9.413 17.416' }),
        React__default.createElement("path", { d: 'M6.585 14.588L2.577 18.596' }),
        React__default.createElement("path", { d: 'M18.602 21.419L14.595 17.412' }),
        React__default.createElement("path", { d: 'M17.419 14.58L21.428 18.589' }),
        React__default.createElement("path", { d: 'M2.582 5.399L6.588 9.406' }),
        React__default.createElement("path", { d: 'M9.421 6.581L5.412 2.572' })));
};

var KeyIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: 'M4.000 18.500 A1.500 1.500 0 1 0 7.000 18.500 A1.500 1.500 0 1 0 4.000 18.500 Z' }),
        React__default.createElement("path", { d: 'M20.5.5l-9.782,9.783a7,7,0,1,0,3,3L17,10h1.5V8.5L19,8h1.5V6.5L21,6h1.5V4.5l1-1V.5Z' })));
};

var NoteIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: 'M2.000 2.500 L22.000 2.500 L22.000 23.500 L2.000 23.500 Z' }),
        React__default.createElement("path", { d: 'M6 4.5L6 0.5' }),
        React__default.createElement("path", { d: 'M18 4.5L18 0.5' }),
        React__default.createElement("path", { d: 'M10 4.5L10 0.5' }),
        React__default.createElement("path", { d: 'M14 4.5L14 0.5' })));
};

var ParagraphIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: 'M17.5 0.498L17.5 23.498' }),
        React__default.createElement("path", { d: 'M10.5 0.498L10.5 23.498' }),
        React__default.createElement("path", { d: 'M23.5.5H6.5a6,6,0,0,0,0,12h4' })));
};

var TriangleIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: 'M2.5 22.995L12 6.005 21.5 22.995 2.5 22.995z' })));
};

var Text = function (_a) {
    var annotation = _a.annotation, childAnnotation = _a.childAnnotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    var name = annotation.name ? annotation.name.toLowerCase() : '';
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: false, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-text", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }),
            name && (React__default.createElement("div", { className: theme.prefixClass + "-annotation-text-icon" },
                name === 'check' && React__default.createElement(CheckIcon, null),
                name === 'comment' && React__default.createElement(CommentIcon, null),
                name === 'help' && React__default.createElement(HelpIcon, null),
                name === 'insert' && React__default.createElement(TriangleIcon, null),
                name === 'key' && React__default.createElement(KeyIcon, null),
                name === 'note' && React__default.createElement(NoteIcon, null),
                (name === 'newparagraph' || name === 'paragraph') && React__default.createElement(ParagraphIcon, null))),
            props.slot.children),
        childAnnotation && childAnnotation.annotationType === AnnotationType$1.Popup && props.popup.opened && (React__default.createElement(Popup, { annotation: childAnnotation, page: page, viewport: viewport })))); }));
};

var Underline = function (_a) {
    var annotation = _a.annotation, page = _a.page, viewport = _a.viewport;
    var theme = React.useContext(ThemeContext);
    var hasPopup = annotation.hasPopup === false;
    var isRenderable = !!(annotation.hasPopup || annotation.title || annotation.contents);
    return (React__default.createElement(Annotation, { annotation: annotation, hasPopup: hasPopup, ignoreBorder: true, isRenderable: isRenderable, page: page, viewport: viewport }, function (props) { return (React__default.createElement("div", __assign({}, props.slot.attrs, { className: theme.prefixClass + "-annotation " + theme.prefixClass + "-annotation-underline", "data-annotation-id": annotation.id, onClick: props.popup.toggleOnClick, onMouseEnter: props.popup.openOnHover, onMouseLeave: props.popup.closeOnHover }), props.slot.children)); }));
};

var AnnotationLayer = function (_a) {
    var doc = _a.doc, page = _a.page, rotation = _a.rotation, scale = _a.scale, onExecuteNamedAction = _a.onExecuteNamedAction, onJumpToDest = _a.onJumpToDest;
    var theme = React__default.useContext(ThemeContext);
    var renderAnnotations = function (annotations) {
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        var clonedViewPort = viewport.clone({ dontFlip: true });
        return (React__default.createElement(React__default.Fragment, null, annotations
            .filter(function (annotation) { return !annotation.parentId; })
            .map(function (annotation) {
            var childAnnotation = annotations.find(function (item) { return item.parentId === annotation.id; });
            switch (annotation.annotationType) {
                case AnnotationType$1.Caret:
                    return (React__default.createElement(Caret, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Circle:
                    return (React__default.createElement(Circle, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.FileAttachment:
                    return (React__default.createElement(FileAttachment, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.FreeText:
                    return (React__default.createElement(FreeText, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Highlight:
                    return (React__default.createElement(Highlight, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Ink:
                    return (React__default.createElement(Ink, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Line:
                    return (React__default.createElement(Line, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Link:
                    return (React__default.createElement(Link, { key: annotation.id, annotation: annotation, doc: doc, page: page, viewport: clonedViewPort, onExecuteNamedAction: onExecuteNamedAction, onJumpToDest: onJumpToDest }));
                case AnnotationType$1.Polygon:
                    return (React__default.createElement(Polygon, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Polyline:
                    return (React__default.createElement(Polyline, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Popup:
                    return (React__default.createElement(Popup, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Square:
                    return (React__default.createElement(Square, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Squiggly:
                    return (React__default.createElement(Squiggly, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Stamp:
                    return (React__default.createElement(Stamp, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.StrikeOut:
                    return (React__default.createElement(StrikeOut, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Text:
                    return (React__default.createElement(Text, { key: annotation.id, annotation: annotation, childAnnotation: childAnnotation, page: page, viewport: clonedViewPort }));
                case AnnotationType$1.Underline:
                    return (React__default.createElement(Underline, { key: annotation.id, annotation: annotation, page: page, viewport: clonedViewPort }));
                default:
                    return React__default.createElement(React.Fragment, { key: annotation.id });
            }
        })));
    };
    return (React__default.createElement("div", { className: theme.prefixClass + "-annotation-layer" },
        React__default.createElement(AnnotationLoader, { page: page, renderAnnotations: renderAnnotations })));
};

var Observer = function (_a) {
    var children = _a.children, threshold = _a.threshold, onVisibilityChanged = _a.onVisibilityChanged;
    var containerRef = React__default.useRef(null);
    React__default.useEffect(function () {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var isVisible = entry.isIntersecting;
                var ratio = entry.intersectionRatio;
                onVisibilityChanged({ isVisible: isVisible, ratio: ratio });
            });
        }, {
            threshold: threshold || 0,
        });
        var container = containerRef.current;
        if (!container) {
            return;
        }
        io.observe(container);
        return function () {
            io.unobserve(container);
        };
    }, []);
    return (React__default.createElement("div", { ref: containerRef }, children));
};

var WithScale = function (_a) {
    var callback = _a.callback, children = _a.children, rotation = _a.rotation, scale = _a.scale;
    React__default.useLayoutEffect(function () {
        callback();
    }, [rotation, scale]);
    return (React__default.createElement(React__default.Fragment, null, children));
};

var CanvasLayer = function (_a) {
    var height = _a.height, page = _a.page, rotation = _a.rotation, scale = _a.scale, width = _a.width;
    var theme = React__default.useContext(ThemeContext);
    var canvasRef = React__default.createRef();
    var renderTask = React__default.useRef();
    var devicePixelRatio = window.devicePixelRatio || 1;
    var renderCanvas = function () {
        var task = renderTask.current;
        if (task) {
            task.cancel();
        }
        var canvasEle = canvasRef.current;
        canvasEle.height = height * devicePixelRatio;
        canvasEle.width = width * devicePixelRatio;
        var canvasContext = canvasEle.getContext('2d', { alpha: false });
        var viewport = page.getViewport({ rotation: rotation, scale: scale * devicePixelRatio });
        renderTask.current = page.render({ canvasContext: canvasContext, viewport: viewport });
        renderTask.current.promise.then(function () { }, function () { });
    };
    return (React__default.createElement(WithScale, { callback: renderCanvas, rotation: rotation, scale: scale },
        React__default.createElement("div", { className: theme.prefixClass + "-canvas-layer", style: {
                height: height + "px",
                width: width + "px",
            } },
            React__default.createElement("canvas", { ref: canvasRef, style: {
                    transform: "scale(" + 1 / devicePixelRatio + ")",
                    transformOrigin: "top left",
                } }))));
};

var SvgLayer = function (_a) {
    var height = _a.height, page = _a.page, rotation = _a.rotation, scale = _a.scale, width = _a.width;
    var theme = React__default.useContext(ThemeContext);
    var containerRef = React__default.createRef();
    var empty = function () {
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        containerEle.innerHTML = '';
    };
    var renderSvg = function () {
        var containerEle = containerRef.current;
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        page.getOperatorList().then(function (operatorList) {
            empty();
            var graphic = new PdfJs.SVGGraphics(page.commonObjs, page.objs);
            graphic.getSVG(operatorList, viewport).then(function (svg) {
                svg.style.height = height + "px";
                svg.style.width = width + "px";
                containerEle.appendChild(svg);
            });
        });
    };
    return (React__default.createElement(WithScale, { callback: renderSvg, rotation: rotation, scale: scale },
        React__default.createElement("div", { className: theme.prefixClass + "-svg-layer", ref: containerRef })));
};

var calculateOffset = function (children, parent) {
    var top = children.offsetTop;
    var left = children.offsetLeft;
    var p = children.parentElement;
    while (p && p !== parent) {
        top += p.offsetTop;
        left += p.offsetLeft;
        p = p.parentElement;
    }
    return {
        left: left,
        top: top,
    };
};

var removeNode = function (ele) {
    var parent = ele.parentNode;
    if (parent) {
        parent.removeChild(ele);
    }
};
var replaceNode = function (replacementNode, node) {
    removeNode(replacementNode);
    var parent = node.parentNode;
    if (parent) {
        parent.insertBefore(replacementNode, node);
    }
    removeNode(node);
};
var unwrap = function (ele) {
    var parent = ele.parentNode;
    if (!parent) {
        return;
    }
    var range = document.createRange();
    range.selectNodeContents(ele);
    replaceNode(range.extractContents(), ele);
    parent.normalize();
};

var wrap = function (ele, startOffset, endOffset) {
    var range = new Range();
    range.setStart(ele, startOffset);
    range.setEnd(ele, endOffset);
    var wrapper = document.createElement('span');
    range.surroundContents(wrapper);
    return wrapper;
};

var nullifyTransforms = function (_a, transformArr) {
    var top = _a.top, left = _a.left, width = _a.width, height = _a.height;
    if (transformArr.length == 6) {
        var t = transformArr;
        var det = t[0] * t[3] - t[1] * t[2];
        return {
            width: width / t[0],
            height: height / t[3],
            left: (left * t[3] - top * t[2] + t[2] * t[5] - t[4] * t[3]) / det,
            top: (-left * t[1] + top * t[0] + t[4] * t[1] - t[0] * t[5]) / det,
        };
    }
    else {
        return { top: top, left: left, width: width, height: height };
    }
};

var getBoundingRect = function (start, end) {
    return {
        left: Math.min(end.x, start.x),
        top: Math.min(end.y, start.y),
        width: Math.abs(end.x - start.x),
        height: Math.abs(end.y - start.y),
    };
};
var shouldRender = function (boundingRect) {
    return boundingRect.width >= 1 && boundingRect.height >= 1;
};
var MouseSelection = function (_a) {
    var onSelection = _a.onSelection, onDragStart = _a.onDragStart, onDragEnd = _a.onDragEnd, shouldStart = _a.shouldStart, textLayerRef = _a.textLayerRef, canvas = _a.canvas;
    var theme = React__default.useContext(ThemeContext);
    var _b = React.useState(null), start = _b[0], setStart = _b[1];
    var _c = React.useState(null), end = _c[0], setEnd = _c[1];
    var _d = React.useState(false), locked = _d[0], setLocked = _d[1];
    var containerRef = React.useRef(null);
    var reset = React.useCallback(function () {
        onDragEnd();
        setStart(null);
        setEnd(null);
        setLocked(false);
    }, [onDragEnd]);
    var containerCoords = React.useCallback(function (pageX, pageY) {
        var textLayerEle = textLayerRef.current;
        if (!textLayerEle) {
            return null;
        }
        var parentEle = textLayerEle.parentElement;
        if (!(parentEle instanceof HTMLElement)) {
            return null;
        }
        var containerBoundingRect;
        if (!containerBoundingRect) {
            containerBoundingRect = parentEle.getBoundingClientRect();
        }
        return {
            x: pageX - containerBoundingRect.left + parentEle.scrollLeft,
            y: pageY - containerBoundingRect.top + parentEle.scrollTop,
        };
    }, [textLayerRef.current]);
    var mousedownHandler = React.useCallback(function (event) {
        if (!shouldStart(event)) {
            reset();
            return;
        }
        onDragStart();
        var newStart = containerCoords(event.pageX, event.pageY);
        setStart(newStart);
        setEnd(null);
        setLocked(false);
    }, [containerCoords]);
    var mousemoveHandler = React.useCallback(function (event) {
        if (!start || locked) {
            return;
        }
        var newEnd = containerCoords(event.pageX, event.pageY);
        setEnd(newEnd);
    }, [start, locked]);
    var mouseUpHandler = React.useCallback(function (event) {
        var textLayerEle = textLayerRef.current;
        if (!textLayerEle) {
            return;
        }
        var parentEle = textLayerEle.parentElement;
        if (!(parentEle instanceof HTMLElement)) {
            return;
        }
        if (event.currentTarget) {
            event.currentTarget.removeEventListener("mouseup", function () {
                return mouseUpHandler(event);
            });
        }
        var ended = containerCoords(event.pageX, event.pageY);
        if (!start || !ended) {
            return;
        }
        var boundingRect = getBoundingRect(start, ended);
        if (!(event.target instanceof HTMLElement) ||
            !parentEle.contains(event.target) ||
            !shouldRender(boundingRect)) {
            reset();
            return;
        }
        setEnd(ended);
        setLocked(true);
        if (!start || !ended) {
            return;
        }
        var image = getAreaAsPng(canvas, boundingRect);
        if (event.target instanceof HTMLElement) {
            onSelection(image, boundingRect, reset);
        }
    }, [start, textLayerRef.current, canvas]);
    hooks.useEventListener("mousedown", mousedownHandler, {
        dom: textLayerRef.current,
    });
    hooks.useEventListener("mousemove", mousemoveHandler, {
        dom: textLayerRef.current,
    });
    hooks.useEventListener("mouseup", mouseUpHandler, {
        dom: textLayerRef.current,
    });
    return (React__default.createElement("div", { className: theme.prefixClass + "-mouse-selection", ref: containerRef }, start && end ? (React__default.createElement("div", { className: theme.prefixClass + "-mouse-selection-content", style: getBoundingRect(start, end) })) : null));
};

var clamp = function (value, left, right) {
    return Math.min(Math.max(value, left), right);
};
var TipContainer = function (_a) {
    var position = _a.position, containerBoundingRect = _a.containerBoundingRect, scrollTop = _a.scrollTop, onConfirm = _a.onConfirm, viewport = _a.viewport, boundingRect = _a.boundingRect;
    var theme = React.useContext(ThemeContext);
    var Popover = useSelectionPopover();
    var containerRef = React.useRef(null);
    var _b = React.useState(0), width = _b[0], setWidth = _b[1];
    var _c = React.useState(0), height = _c[0], setHeight = _c[1];
    React.useEffect(function () {
        if (containerRef && containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
            setHeight(containerRef.current.offsetHeight);
        }
    }, [containerRef.current]);
    var shouldMove = position.top - height - 5 < scrollTop;
    var top = shouldMove ? position.bottom + 5 : position.top - height - 5;
    var left = clamp(position.left - width / 2, 0, containerBoundingRect.width - width);
    return (React__default.createElement(Popover, { onConfirm: onConfirm, style: __assign(__assign({}, boundingRect), { position: "absolute" }), content: React__default.createElement("div", { style: __assign({}, boundingRect) }) }));
};
var TipContainer$1 = React__default.memo(TipContainer);

var sort = function (rects) {
    return rects.sort(function (A, B) {
        var top = A.top - B.top;
        if (top === 0) {
            return A.left - B.left;
        }
        return top;
    });
};
var overlaps = function (A, B) {
    return A.left <= B.left && B.left <= A.left + A.width;
};
var sameLine = function (A, B, yMargin) {
    if (yMargin === void 0) { yMargin = 5; }
    return Math.abs(A.top - B.top) < yMargin && Math.abs(A.height - B.height) < yMargin;
};
var inside = function (A, B) {
    return A.top > B.top &&
        A.left > B.left &&
        A.top + A.height < B.top + B.height &&
        A.left + A.width < B.left + B.width;
};
var nextTo = function (A, B, xMargin) {
    if (xMargin === void 0) { xMargin = 10; }
    var Aright = A.left + A.width;
    var Bright = B.left + B.width;
    return A.left <= B.left && Aright <= Bright && B.left - Aright <= xMargin;
};
var extendWidth = function (A, B) {
    A.width = Math.max(B.width - A.left + B.left, A.width);
};
var optimizeClientRects = function (clientRects) {
    var rects = sort(clientRects);
    var toRemove = new Set();
    var firstPass = rects.filter(function (rect) {
        return rects.every(function (otherRect) {
            return !inside(rect, otherRect);
        });
    });
    var passCount = 0;
    while (passCount <= 2) {
        firstPass.forEach(function (A) {
            firstPass.forEach(function (B) {
                if (A === B || toRemove.has(A) || toRemove.has(B)) {
                    return;
                }
                if (!sameLine(A, B)) {
                    return;
                }
                if (overlaps(A, B)) {
                    extendWidth(A, B);
                    A.height = Math.max(A.height, B.height);
                    toRemove.add(B);
                }
                if (nextTo(A, B)) {
                    extendWidth(A, B);
                    toRemove.add(B);
                }
            });
        });
        passCount += 1;
    }
    return firstPass.filter(function (rect) { return !toRemove.has(rect); });
};

rangy.init();
var createRangy = (function () {
    return rangy.getSelection();
});

var getClientRects = function (range, containerEle) {
    var clientRects = Array.from(range.getClientRects());
    return clientRects.map(function (rect) {
        return {
            left: rect.left - containerEle.getBoundingClientRect().left,
            top: rect.top - containerEle.getBoundingClientRect().top,
            width: rect.width,
            height: rect.height,
        };
    });
};
var getBoundingtRect = function (range, containerEle) {
    var clientRects = range.getBoundingClientRect();
    return {
        left: clientRects.left - containerEle.getBoundingClientRect().left,
        top: clientRects.top - containerEle.getBoundingClientRect().top,
        width: clientRects.width,
        height: clientRects.height,
    };
};
var TextSelection = function (_a) {
    var textLayerRef = _a.textLayerRef, onSelection = _a.onSelection, onCancel = _a.onCancel;
    var theme = React.useContext(ThemeContext);
    var containerRef = React.useRef(null);
    var _b = React.useState([]), postions = _b[0], setPostions = _b[1];
    var reset = React.useCallback(function () {
        onCancel();
        setPostions([]);
    }, [onCancel]);
    var mousedownHandler = React.useCallback(function () {
        var selObj = createRangy();
        if (!selObj)
            return;
        reset();
        selObj.removeAllRanges();
    }, [reset]);
    var mouseupHandler = React.useCallback(function (event) {
        var element = event.target;
        if (element.className !== "viewer-text")
            return;
        var selObj = createRangy();
        selObj.expand("word", {
            trim: true,
        });
        if (!selObj)
            return;
        setPostions([]);
        var text = selObj ? selObj.toString() : "";
        if (text && selObj && selObj.rangeCount >= 1) {
            var rangeRangy = selObj.getRangeAt(0);
            var range = rangeRangy.nativeRange;
            var containerEle = textLayerRef.current;
            if (range && range.startContainer.parentElement && containerEle) {
                var LTWHs = optimizeClientRects(getClientRects(range, containerEle));
                var LTWH = getBoundingtRect(range, containerEle);
                setPostions(LTWHs);
                onSelection(text, LTWH, LTWHs, reset);
                selObj.removeAllRanges();
            }
        }
    }, [textLayerRef.current, reset]);
    hooks.useEventListener("mousedown", mousedownHandler, {
        dom: textLayerRef.current,
    });
    hooks.useEventListener("mouseup", mouseupHandler, {
        dom: textLayerRef.current,
    });
    return (React__default.createElement(React.Fragment, null, postions.map(function (postion, idx) { return (React__default.createElement("div", { key: idx, className: theme.prefixClass + "-text-selection", ref: containerRef, style: postion })); })));
};

var TextLayer = function (_a) {
    var keywordRegexp = _a.keywordRegexp, match = _a.match, page = _a.page, pageIndex = _a.pageIndex, rotation = _a.rotation, scale = _a.scale, onJumpToMatch = _a.onJumpToMatch;
    var theme = React__default.useContext(ThemeContext);
    var containerRef = React__default.useRef(null);
    var renderTask = React__default.useRef();
    var isRendered = React__default.useRef(false);
    var addNewAnnotation = useAddNewAnnotation();
    var getRectFromViewport = React__default.useCallback(function (_a) {
        var left = _a.left, top = _a.top, width = _a.width, height = _a.height;
        var viewport = page
            .getViewport({ rotation: rotation, scale: scale })
            .clone({ dontFlip: true });
        var transform = viewport.transform;
        var _b = nullifyTransforms({ top: top, left: left, width: width, height: height }, transform), orginTop = _b.top, orginLeft = _b.left, orginWidth = _b.width, orginHeight = _b.height;
        var X0 = orginLeft;
        var Y1 = page.view[1] + page.view[3] - orginTop;
        var Y0 = Y1 - orginHeight;
        var X1 = X0 + orginWidth;
        return [X0, Y0, X1, Y1];
    }, [page, rotation, scale]);
    var getQuadPointsFromViewport = React__default.useCallback(function (rects) {
        return rects.map(function (rect) {
            var _a = getRectFromViewport(rect), X0 = _a[0], Y1 = _a[1], X1 = _a[2], Y0 = _a[3];
            return [
                { x: X0, y: Y0 },
                { x: X1, y: Y0 },
                { x: X0, y: Y1 },
                { x: X1, y: Y1 },
            ];
        });
    }, [getRectFromViewport]);
    var empty = function () {
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        var spans = containerEle.querySelectorAll("span." + theme.prefixClass + "-text");
        var numSpans = spans.length;
        for (var i = 0; i < numSpans; i++) {
            var span = spans[i];
            containerEle.removeChild(span);
        }
    };
    var highlight = function (span) {
        var text = span.textContent;
        if (!keywordRegexp.source.trim() || !text) {
            return;
        }
        var startOffset = text.search(keywordRegexp);
        var firstChild = span.firstChild;
        if (startOffset === -1 || !firstChild) {
            return;
        }
        var endOffset = startOffset + keywordRegexp.source.length;
        var wrapper = wrap(firstChild, startOffset, endOffset);
        wrapper.classList.add(theme.prefixClass + "-text-highlight");
    };
    var unhighlightAll = function () {
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        var highlightNodes = containerEle.querySelectorAll("span." + theme.prefixClass + "-text-highlight");
        var total = highlightNodes.length;
        for (var i = 0; i < total; i++) {
            unwrap(highlightNodes[i]);
        }
    };
    var scrollToMatch = function () {
        var containerEle = containerRef.current;
        if (match.pageIndex !== pageIndex || !containerEle) {
            return;
        }
        var spans = containerEle.querySelectorAll("span." + theme.prefixClass + "-text-highlight");
        if (match.matchIndex < spans.length) {
            var span = spans[match.matchIndex];
            var _a = calculateOffset(span, containerEle), top_1 = _a.top, left = _a.left;
            onJumpToMatch(pageIndex, top_1 / scale, left / scale);
        }
    };
    var renderText = function () {
        var task = renderTask.current;
        if (task) {
            task.cancel();
        }
        var containerEle = containerRef.current;
        if (!containerEle) {
            return;
        }
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        isRendered.current = false;
        page.getTextContent().then(function (textContent) {
            empty();
            renderTask.current = PdfJs.renderTextLayer({
                container: containerEle,
                textContent: textContent,
                viewport: viewport,
            });
            renderTask.current.promise.then(function () {
                isRendered.current = true;
                var spans = containerEle.childNodes;
                var numSpans = spans.length;
                if (keywordRegexp) {
                    unhighlightAll();
                }
                for (var i = 0; i < numSpans; i++) {
                    var span = spans[i];
                    span.classList.add(theme.prefixClass + "-text");
                    if (keywordRegexp) {
                        highlight(span);
                    }
                }
                scrollToMatch();
            }, function () {
            });
        });
    };
    React__default.useEffect(function () {
        var containerEle = containerRef.current;
        if (!keywordRegexp || !isRendered.current || !containerEle) {
            return;
        }
        unhighlightAll();
        if (keywordRegexp.source.trim()) {
            var spans = containerEle.querySelectorAll("span." + theme.prefixClass + "-text");
            var numSpans = spans.length;
            for (var i = 0; i < numSpans; i++) {
                highlight(spans[i]);
            }
        }
    }, [keywordRegexp, isRendered.current]);
    React__default.useEffect(function () {
        if (isRendered.current) {
            scrollToMatch();
        }
    }, [match]);
    var _b = React__default.useState(false), disableSelection = _b[0], setDisableSelection = _b[1];
    var _c = React__default.useState(null), ghostAnnotation = _c[0], setGhostAnnotation = _c[1];
    var resetSelectionRef = React__default.useRef(null);
    var getViewport = React__default.useCallback(function () {
        return page.getViewport({ rotation: rotation, scale: scale }).clone({ dontFlip: true });
    }, [page, rotation, scale]);
    var getCanvas = React__default.useCallback(function () {
        var _a, _b;
        return (_b = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector("div ." + theme.prefixClass + "-canvas-layer canvas");
    }, [containerRef.current]);
    return (React__default.createElement(WithScale, { callback: renderText, rotation: rotation, scale: scale },
        React__default.createElement("div", { className: theme.prefixClass + "-text-layer", ref: containerRef },
            React__default.createElement(MouseSelection, { canvas: getCanvas(), onDragStart: function () {
                    setDisableSelection(true);
                }, onDragEnd: function () {
                    setDisableSelection(false);
                    setGhostAnnotation(null);
                }, textLayerRef: containerRef, onChange: function (isVisible) {
                }, shouldStart: function (event) {
                    var cond1 = event.altKey;
                    var cond2 = event.target instanceof HTMLElement &&
                        event.target.className === theme.prefixClass + "-text-layer";
                    return cond1 && cond2;
                }, onSelection: function (image, boundingRect, resetSelection) {
                    var rect = getRectFromViewport(boundingRect);
                    var quadPoints = getQuadPointsFromViewport([boundingRect]);
                    setGhostAnnotation({
                        boundingRect: boundingRect,
                        rect: rect,
                        quadPoints: quadPoints,
                        contents: { image: image },
                    });
                    resetSelectionRef.current = resetSelection;
                } })),
        React__default.createElement(TextSelection, { textLayerRef: containerRef, onCancel: function () {
                setGhostAnnotation(null);
            }, onSelection: function (text, boundingRect, rects, resetSelection) {
                var rect = getRectFromViewport(boundingRect);
                var quadPoints = getQuadPointsFromViewport(rects);
                setGhostAnnotation({
                    boundingRect: boundingRect,
                    rect: rect,
                    quadPoints: quadPoints,
                    contents: { text: text },
                });
                resetSelectionRef.current = resetSelection;
            } }),
        containerRef && containerRef.current && ghostAnnotation && (React__default.createElement(TipContainer$1, { viewport: getViewport(), onConfirm: function () {
                if (resetSelectionRef.current) {
                    addNewAnnotation(ghostAnnotation.rect, ghostAnnotation.quadPoints, ghostAnnotation.contents, resetSelectionRef.current);
                    setGhostAnnotation(null);
                }
            }, scrollTop: containerRef.current.scrollTop, containerBoundingRect: containerRef.current.getBoundingClientRect(), boundingRect: ghostAnnotation.boundingRect, position: {
                left: containerRef.current.offsetLeft +
                    ghostAnnotation.boundingRect.left +
                    ghostAnnotation.boundingRect.width / 2,
                top: ghostAnnotation.boundingRect.top + containerRef.current.offsetTop,
                bottom: ghostAnnotation.boundingRect.top +
                    containerRef.current.offsetLeft +
                    ghostAnnotation.boundingRect.height,
            } }))));
};

var PageLayer = function (_a) {
    var doc = _a.doc, height = _a.height, keywordRegexp = _a.keywordRegexp, match = _a.match, pageIndex = _a.pageIndex, renderPage = _a.renderPage, rotation = _a.rotation, scale = _a.scale, width = _a.width, onExecuteNamedAction = _a.onExecuteNamedAction, onJumpToDest = _a.onJumpToDest, onPageVisibilityChanged = _a.onPageVisibilityChanged;
    var theme = React__default.useContext(ThemeContext);
    var _b = React__default.useState({
        isCalculated: false,
        page: null,
        pageHeight: height,
        pageWidth: width,
        viewportRotation: 0,
    }), pageSize = _b[0], setPageSize = _b[1];
    var isCalculated = pageSize.isCalculated, page = pageSize.page, pageHeight = pageSize.pageHeight, pageWidth = pageSize.pageWidth;
    var intersectionThreshold = Array(10).fill(null).map(function (_, i) { return i / 10; });
    var scaledWidth = pageWidth * scale;
    var scaledHeight = pageHeight * scale;
    var isVertical = Math.abs(rotation) % 180 === 0;
    var w = isVertical ? scaledWidth : scaledHeight;
    var h = isVertical ? scaledHeight : scaledWidth;
    var visibilityChanged = function (params) {
        var ratio = params.isVisible ? params.ratio : 0;
        onPageVisibilityChanged(pageIndex, ratio);
        if (params.isVisible && !isCalculated) {
            doc.getPage(pageIndex + 1).then(function (pdfPage) {
                var viewport = pdfPage.getViewport({ scale: 1 });
                setPageSize({
                    isCalculated: true,
                    page: pdfPage,
                    pageHeight: viewport.height,
                    pageWidth: viewport.width,
                    viewportRotation: viewport.rotation,
                });
            });
        }
    };
    var jumpToMatch = function (indexOfPage, top, left) {
        onJumpToDest(indexOfPage, pageHeight - top, scale);
    };
    var defaultPageRenderer = function (props) { return (React__default.createElement(React__default.Fragment, null,
        props.canvasLayer.children,
        props.textLayer.children,
        props.annotationLayer.children)); };
    var renderPageLayer = renderPage || defaultPageRenderer;
    var rotationNumber = (rotation + pageSize.viewportRotation) % 360;
    return (React__default.createElement(Observer, { onVisibilityChanged: visibilityChanged, threshold: intersectionThreshold },
        React__default.createElement("div", { className: theme.prefixClass + "-page-layer", style: {
                height: h + "px",
                width: w + "px",
            } }, !page
            ? React__default.createElement(Spinner, null)
            : renderPageLayer({
                annotationLayer: {
                    attrs: {},
                    children: (React__default.createElement(AnnotationLayer, { doc: doc, page: page, rotation: rotationNumber, scale: scale, onExecuteNamedAction: onExecuteNamedAction, onJumpToDest: onJumpToDest }))
                },
                canvasLayer: {
                    attrs: {},
                    children: (React__default.createElement(CanvasLayer, { height: h, page: page, rotation: rotationNumber, scale: scale, width: w })),
                },
                doc: doc,
                height: h,
                pageIndex: pageIndex,
                rotation: rotation,
                scale: scale,
                svgLayer: {
                    attrs: {},
                    children: (React__default.createElement(SvgLayer, { height: h, page: page, rotation: rotationNumber, scale: scale, width: w })),
                },
                textLayer: {
                    attrs: {},
                    children: (React__default.createElement(TextLayer, { keywordRegexp: keywordRegexp, match: match, page: page, pageIndex: pageIndex, rotation: rotationNumber, scale: scale, onJumpToMatch: jumpToMatch }))
                },
                width: w,
            }))));
};

var LocalizationContext = React__default.createContext({});

var DropArea = function () {
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("div", { className: theme.prefixClass + "-drop-area" }, l10n.main.dragDropFile));
};

var PrintProgress = function (_a) {
    var numLoadedPages = _a.numLoadedPages, numPages = _a.numPages, onCancel = _a.onCancel, onStartPrinting = _a.onStartPrinting;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var progress = Math.floor(numLoadedPages * 100 / numPages);
    React__default.useEffect(function () {
        if (numLoadedPages === numPages) {
            onStartPrinting();
        }
    }, [numLoadedPages]);
    return (React__default.createElement("div", { className: theme.prefixClass + "-print-progress" },
        React__default.createElement("div", { className: theme.prefixClass + "-print-progress-inner" },
            React__default.createElement("div", { className: theme.prefixClass + "-print-progress-message" }, l10n.printProgress.preparingDocument),
            React__default.createElement("div", { className: theme.prefixClass + "-print-progress-bar" },
                React__default.createElement(ProgressBar, { progress: progress })),
            React__default.createElement(PrimaryButton, { onClick: onCancel }, l10n.printProgress.cancel))));
};

var PrintStatus;
(function (PrintStatus) {
    PrintStatus["Inactive"] = "Inactive";
    PrintStatus["Preparing"] = "Preparing";
    PrintStatus["Cancelled"] = "Cancelled";
    PrintStatus["Ready"] = "Ready";
})(PrintStatus || (PrintStatus = {}));
var PrintStatus$1 = PrintStatus;

var PageThumbnail = function (_a) {
    var page = _a.page, pageHeight = _a.pageHeight, pageWidth = _a.pageWidth, rotation = _a.rotation, onLoad = _a.onLoad;
    var theme = React__default.useContext(ThemeContext);
    var renderTask = React__default.useRef();
    var _b = React__default.useState(''), src = _b[0], setSrc = _b[1];
    React__default.useEffect(function () {
        var task = renderTask.current;
        if (task) {
            task.cancel();
        }
        var canvas = document.createElement('canvas');
        var printUnit = 150 / 72;
        canvas.height = Math.floor(pageHeight * printUnit);
        canvas.width = Math.floor(pageWidth * printUnit);
        var canvasContext = canvas.getContext('2d');
        canvasContext.save();
        canvasContext.fillStyle = 'rgb(255, 255, 255)';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.restore();
        var viewport = page.getViewport({ rotation: rotation, scale: 1 });
        renderTask.current = page.render({
            canvasContext: canvasContext,
            intent: 'print',
            transform: [printUnit, 0, 0, printUnit, 0, 0],
            viewport: viewport,
        });
        renderTask.current.promise.then(function () {
            ('toBlob' in canvas)
                ? canvas.toBlob(function (blob) {
                    setSrc(URL.createObjectURL(blob));
                })
                : setSrc(canvas.toDataURL());
        }, function () { });
    }, []);
    return (!src
        ? React__default.createElement(Spinner, null)
        : (React__default.createElement("div", { className: theme.prefixClass + "-print-page-thumbnail", style: {
                height: Math.floor(pageHeight * 96 / 72) + "px",
                width: Math.floor(pageWidth * 96 / 72) + "px",
            } },
            React__default.createElement("img", { src: src, style: {
                    height: Math.floor(pageHeight * 96 / 72) + "px",
                    width: Math.floor(pageWidth * 96 / 72) + "px",
                }, onLoad: onLoad }))));
};

var PageThumbnailContainer = function (_a) {
    var doc = _a.doc, pageHeight = _a.pageHeight, pageIndex = _a.pageIndex, pageWidth = _a.pageWidth, rotation = _a.rotation, onLoad = _a.onLoad;
    var _b = React__default.useState({
        height: pageHeight,
        page: null,
        viewportRotation: 0,
        width: pageWidth,
    }), pageSize = _b[0], setPageSize = _b[1];
    var page = pageSize.page, height = pageSize.height, width = pageSize.width;
    var isVertical = Math.abs(rotation) % 180 === 0;
    React__default.useEffect(function () {
        doc.getPage(pageIndex + 1).then(function (pdfPage) {
            var viewport = pdfPage.getViewport({ scale: 1 });
            setPageSize({
                height: viewport.height,
                page: pdfPage,
                viewportRotation: viewport.rotation,
                width: viewport.width,
            });
        });
    }, []);
    var rotationNumber = (rotation + pageSize.viewportRotation) % 360;
    return (!page
        ? React__default.createElement(Spinner, null)
        : (React__default.createElement(PageThumbnail, { page: page, pageHeight: isVertical ? height : width, pageWidth: isVertical ? width : height, rotation: rotationNumber, onLoad: onLoad })));
};

var PrintZone = function (_a) {
    var doc = _a.doc, pageHeight = _a.pageHeight, pageWidth = _a.pageWidth, printStatus = _a.printStatus, rotation = _a.rotation, onCancel = _a.onCancel, onLoad = _a.onLoad;
    var theme = React__default.useContext(ThemeContext);
    var _b = React__default.useState(0), numLoadedPages = _b[0], setNumLoadedPages = _b[1];
    React__default.useEffect(function () {
        if (printStatus === PrintStatus$1.Ready) {
            document.body.classList.add(theme.prefixClass + "-body-printing");
            window.print();
        }
        var handler = function () {
            if (printStatus === PrintStatus$1.Ready) {
                document.body.classList.remove(theme.prefixClass + "-body-printing");
                onCancel();
            }
        };
        document.addEventListener('mousemove', handler);
        return function () { return document.removeEventListener('mousemove', handler); };
    }, [printStatus]);
    var numPages = doc.numPages;
    var loadPage = function () {
        var total = numLoadedPages + 1;
        setNumLoadedPages(total);
        onLoad(total);
    };
    return (ReactDOM.createPortal((React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: theme.prefixClass + "-print-zone" }, Array(numPages).fill(0).map(function (_, index) {
            return (React__default.createElement(PageThumbnailContainer, { key: index, doc: doc, pageHeight: pageHeight, pageIndex: index, pageWidth: pageWidth, rotation: rotation, onLoad: loadPage }));
        })),
        React__default.createElement("style", { dangerouslySetInnerHTML: {
                __html: "\n                            @supports ((size:A4) and (size:1pt 1pt)) {\n                                @page { size: " + pageWidth + "pt " + pageHeight + "pt }\n                            }\n                        "
            } }))), document.body));
};

var PrintContainer = function (_a) {
    var doc = _a.doc, pageHeight = _a.pageHeight, pageWidth = _a.pageWidth, printStatus = _a.printStatus, rotation = _a.rotation, onCancel = _a.onCancel, onStartPrinting = _a.onStartPrinting;
    var _b = React__default.useState(0), numLoadedPagesForPrint = _b[0], setNumLoadedPagesForPrint = _b[1];
    var cancelPrinting = function () {
        setNumLoadedPagesForPrint(0);
        onCancel();
    };
    var startPrinting = function () {
        setNumLoadedPagesForPrint(0);
        onStartPrinting();
    };
    return (React__default.createElement(React__default.Fragment, null,
        printStatus === PrintStatus$1.Preparing && (React__default.createElement(PrintProgress, { numLoadedPages: numLoadedPagesForPrint, numPages: doc.numPages, onCancel: cancelPrinting, onStartPrinting: startPrinting })),
        (printStatus === PrintStatus$1.Preparing || printStatus === PrintStatus$1.Ready) && (React__default.createElement(PrintZone, { doc: doc, pageHeight: pageHeight, pageWidth: pageWidth, printStatus: printStatus, rotation: rotation, onCancel: cancelPrinting, onLoad: setNumLoadedPagesForPrint }))));
};

var getFileExt = function (url) {
    var str = url.split(/\./).pop();
    return str ? str.toLowerCase() : '';
};

var ExitFullScreenIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M10.515,9.514h3c0.552,0,1,0.448,1,1v3c0,0.552-0.448,1-1,1h-3c-0.552,0-1-0.448-1-1v-3\n                C9.515,9.962,9.963,9.514,10.515,9.514z\n                M0.531,23.499l6.984-6.985\n                M16.515,7.514L23.5,0.529\n                M21.515,7.514h-5v-5\n                M7.515,21.514v-5 h-5\n                M0.523,0.521l6.992,6.993\n                M16.515,16.514l6.985,6.985\n                M16.515,21.514v-5h5\n                M2.515,7.514h5v-5" })));
};

var ExitFullScreen = function (_a) {
    var onClick = _a.onClick;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("div", { className: theme.prefixClass + "-exit-fullscreen" },
        React__default.createElement("div", { className: theme.prefixClass + "-exit-fullscreen-inner" },
            React__default.createElement(Button, { onClick: onClick },
                React__default.createElement(ExitFullScreenIcon, null)))));
};

var AttachmentList = function (_a) {
    var files = _a.files;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var renderItem = function (file) {
        var onClick = function () { return downloadFile(file.fileName, file.data); };
        return (React__default.createElement("li", { className: theme.prefixClass + "-attachment-item", key: "attachment-" + file.fileName, title: "" + l10n.attachment.clickToDownload, onClick: onClick }, file.fileName));
    };
    return (files.length === 0
        ? React__default.createElement("div", { className: theme.prefixClass + "-attachment-list-empty" }, l10n.attachment.noAttachment)
        : (React__default.createElement("ul", { className: theme.prefixClass + "-attachment-list" }, files.map(renderItem))));
};

var AttachmentLoader = function (_a) {
    var doc = _a.doc;
    var _b = React__default.useState({
        files: [],
        isLoaded: false,
    }), attachments = _b[0], setAttachments = _b[1];
    React__default.useEffect(function () {
        doc.getAttachments().then(function (response) {
            var files = response
                ? Object.keys(response).map(function (file) {
                    return {
                        data: response[file].content,
                        fileName: response[file].filename,
                    };
                })
                : [];
            setAttachments({
                files: files,
                isLoaded: true,
            });
        });
    }, []);
    return (!attachments.isLoaded
        ? React__default.createElement(Spinner, null)
        : React__default.createElement(AttachmentList, { files: attachments.files }));
};

var BookmarkItem = function (_a) {
    var bookmark = _a.bookmark, depth = _a.depth, doc = _a.doc, onClick = _a.onClick, onJumpToDest = _a.onJumpToDest;
    var theme = React__default.useContext(ThemeContext);
    var toggleRef = React__default.createRef();
    var subItemRef = React__default.createRef();
    var subItemsDisplayed = React__default.useRef(true);
    var hasSubItems = bookmark.items && bookmark.items.length > 0;
    var toggleSubItems = function () {
        subItemsDisplayed.current = !subItemsDisplayed.current;
        var subItemsEle = subItemRef.current;
        var toggleEle = toggleRef.current;
        if (!subItemsEle || !toggleEle) {
            return;
        }
        subItemsEle.style.display = subItemsDisplayed.current ? 'block' : 'none';
        toggleEle.classList.toggle(theme.prefixClass + "-bookmark-toggle-expanded");
    };
    var clickBookmak = function () {
        if (hasSubItems && bookmark.dest) {
            onClick(bookmark.dest);
        }
    };
    var clickItem = function () {
        if (!hasSubItems && bookmark.dest) {
            onClick(bookmark.dest);
        }
    };
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: theme.prefixClass + "-bookmark-item", style: {
                paddingLeft: depth * 20 + 4 + "px",
            }, onClick: clickItem },
            hasSubItems && (React__default.createElement("span", { ref: toggleRef, className: theme.prefixClass + "-bookmark-toggle", onClick: toggleSubItems }, "\u25BA")),
            bookmark.url
                ? (React__default.createElement("a", { className: theme.prefixClass + "-bookmark-title", href: bookmark.url, rel: 'noopener noreferrer nofollow', target: bookmark.newWindow ? '_blank' : '' }, bookmark.title))
                : (React__default.createElement("div", { className: theme.prefixClass + "-bookmark-title", onClick: clickBookmak }, bookmark.title))),
        hasSubItems && (React__default.createElement("div", { ref: subItemRef },
            React__default.createElement(BookmarkList, { bookmarks: bookmark.items, depth: depth + 1, doc: doc, onJumpToDest: onJumpToDest })))));
};

var BookmarkList = function (_a) {
    var bookmarks = _a.bookmarks, _b = _a.depth, depth = _b === void 0 ? 0 : _b, doc = _a.doc, onJumpToDest = _a.onJumpToDest;
    var theme = React__default.useContext(ThemeContext);
    var jumpToDest = function (dest) {
        getDestination(doc, dest).then(function (target) {
            var pageIndex = target.pageIndex, bottomOffset = target.bottomOffset, scaleTo = target.scaleTo;
            onJumpToDest(pageIndex + 1, bottomOffset, scaleTo);
        });
    };
    return (React__default.createElement("ul", { className: theme.prefixClass + "-bookmark-list" }, bookmarks.map(function (bookmark, index) {
        return (React__default.createElement("li", { key: index },
            React__default.createElement(BookmarkItem, { bookmark: bookmark, depth: depth, doc: doc, onClick: jumpToDest, onJumpToDest: onJumpToDest })));
    })));
};

var BookmarkLoader = function (_a) {
    var doc = _a.doc, onJumpToDest = _a.onJumpToDest;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var _b = React__default.useState({
        isLoaded: false,
        items: [],
    }), bookmarks = _b[0], setBookmarks = _b[1];
    React__default.useEffect(function () {
        doc.getOutline().then(function (outline) {
            setBookmarks({
                isLoaded: true,
                items: outline || [],
            });
        });
    }, []);
    return (!bookmarks.isLoaded
        ? React__default.createElement(Spinner, null)
        : (bookmarks.items.length === 0
            ? React__default.createElement("div", { className: theme.prefixClass + "-bookmark-empty" }, l10n.bookmark.noBookmark)
            : (React__default.createElement(BookmarkList, { bookmarks: bookmarks.items, depth: 0, doc: doc, onJumpToDest: onJumpToDest }))));
};

var BookmarkIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M11.5,1.5h11c0.552,0,1,0.448,1,1v20c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h3\n                M11.5,10.5c0,0.55-0.3,0.661-0.659,0.248L8,7.5l-2.844,3.246c-0.363,0.414-0.659,0.3-0.659-0.247v-9c0-0.552,0.448-1,1-1h5\n                c0.552,0,1,0.448,1,1L11.5,10.5z\n                M14.5,6.499h6\n                M14.5,10.499h6\n                M3.5,14.499h17\n                M3.5,18.499h16.497" })));
};

var FileIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M7.618,15.345l8.666-8.666c0.78-0.812,2.071-0.838,2.883-0.058s0.838,2.071,0.058,2.883\n                c-0.019,0.02-0.038,0.039-0.058,0.058L7.461,21.305c-1.593,1.593-4.175,1.592-5.767,0s-1.592-4.175,0-5.767c0,0,0,0,0,0\n                L13.928,3.305c2.189-2.19,5.739-2.19,7.929-0.001s2.19,5.739,0,7.929l0,0L13.192,19.9" })));
};

var WrappedScrollingIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M10.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z\n                M23.5,9.5c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V9.5z\n                M10.5,22.5 c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z\n                M23.5,22.5c0,0.552-0.448,1-1,1 h-8c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1h8c0.552,0,1,0.448,1,1V22.5z" })));
};

var ThumbnailItem = function (_a) {
    var page = _a.page, pageHeight = _a.pageHeight, pageWidth = _a.pageWidth, rotation = _a.rotation, thumbnailHeight = _a.thumbnailHeight, thumbnailWidth = _a.thumbnailWidth;
    var renderTask = React__default.useRef();
    var _b = React__default.useState(''), src = _b[0], setSrc = _b[1];
    React__default.useEffect(function () {
        var task = renderTask.current;
        if (task) {
            task.cancel();
        }
        var canvas = document.createElement('canvas');
        var canvasContext = canvas.getContext('2d', { alpha: false });
        var w = thumbnailWidth;
        var h = w / (pageWidth / pageHeight);
        var scale = w / pageWidth;
        canvas.height = h;
        canvas.width = w;
        canvas.style.height = h + "px";
        canvas.style.width = w + "px";
        var viewport = page.getViewport({ rotation: rotation, scale: scale });
        renderTask.current = page.render({ canvasContext: canvasContext, viewport: viewport });
        renderTask.current.promise.then(function () { return setSrc(canvas.toDataURL()); }, function () { });
    }, [rotation]);
    return (!src
        ? React__default.createElement(Spinner, null)
        : React__default.createElement("img", { src: src, height: thumbnailHeight + "px", width: thumbnailWidth + "px" }));
};

var THUMBNAIL_WIDTH = 100;
var ThumbnailContainer = function (_a) {
    var doc = _a.doc, pageHeight = _a.pageHeight, pageIndex = _a.pageIndex, pageWidth = _a.pageWidth, rotation = _a.rotation;
    var theme = React__default.useContext(ThemeContext);
    var _b = React__default.useState({
        height: pageHeight,
        isCalculated: false,
        page: null,
        viewportRotation: 0,
        width: pageWidth,
    }), pageSize = _b[0], setPageSize = _b[1];
    var isCalculated = pageSize.isCalculated, page = pageSize.page, height = pageSize.height, width = pageSize.width;
    var scale = width / height;
    var isVertical = Math.abs(rotation) % 180 === 0;
    var w = isVertical ? THUMBNAIL_WIDTH : (THUMBNAIL_WIDTH / scale);
    var h = isVertical ? (THUMBNAIL_WIDTH / scale) : THUMBNAIL_WIDTH;
    var onVisibilityChanged = function (params) {
        if (params.isVisible && !isCalculated) {
            doc.getPage(pageIndex + 1).then(function (pdfPage) {
                var viewport = pdfPage.getViewport({ scale: 1 });
                setPageSize({
                    height: viewport.height,
                    isCalculated: true,
                    page: pdfPage,
                    viewportRotation: viewport.rotation,
                    width: viewport.width,
                });
            });
        }
    };
    var rotationNumber = (rotation + pageSize.viewportRotation) % 360;
    return (React__default.createElement(Observer, { onVisibilityChanged: onVisibilityChanged },
        React__default.createElement("div", { className: theme.prefixClass + "-thumbnail-container", style: {
                height: h + "px",
                width: w + "px",
            } }, !page
            ? React__default.createElement(Spinner, null)
            : (React__default.createElement(ThumbnailItem, { page: page, pageHeight: isVertical ? height : width, pageWidth: isVertical ? width : height, rotation: rotationNumber, thumbnailHeight: h, thumbnailWidth: w })))));
};

var ThumbnailList = function (_a) {
    var currentPage = _a.currentPage, doc = _a.doc, pageHeight = _a.pageHeight, pageWidth = _a.pageWidth, rotation = _a.rotation, onJumpToPage = _a.onJumpToPage;
    var theme = React__default.useContext(ThemeContext);
    var numPages = doc.numPages;
    return (React__default.createElement(React__default.Fragment, null, Array(numPages).fill(0).map(function (_, index) {
        var _a;
        var onClick = function () { return onJumpToPage(index); };
        return (React__default.createElement("div", { key: "thumbnail-" + index },
            React__default.createElement("div", { className: classNames((_a = {},
                    _a[theme.prefixClass + "-thumbnail"] = true,
                    _a[theme.prefixClass + "-thumbnail-selected"] = currentPage === index,
                    _a)), onClick: onClick },
                React__default.createElement(ThumbnailContainer, { doc: doc, pageHeight: pageHeight, pageIndex: index, pageWidth: pageWidth, rotation: rotation }))));
    })));
};

var Tab;
(function (Tab) {
    Tab["Attachment"] = "Attachment";
    Tab["Bookmark"] = "Bookmark";
    Tab["Thumbnail"] = "Thumbnail";
})(Tab || (Tab = {}));
var TOOLTIP_OFFSET = { left: 0, top: 8 };
var Sidebar = function (_a) {
    var _b;
    var currentPage = _a.currentPage, doc = _a.doc, height = _a.height, rotation = _a.rotation, width = _a.width, onJumpToDest = _a.onJumpToDest, onJumpToPage = _a.onJumpToPage;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var _c = React__default.useState(Tab.Thumbnail), tab = _c[0], setTab = _c[1];
    var clickThumbnailTab = function () { return setTab(Tab.Thumbnail); };
    var clickBookmarkTab = function () { return setTab(Tab.Bookmark); };
    var clickAttachmentTab = function () { return setTab(Tab.Attachment); };
    var renderAttachmentTip = function () { return l10n.sidebar.attachment; };
    var renderBookmarkTip = function () { return l10n.sidebar.bookmark; };
    var renderThumbnailTip = function () { return l10n.sidebar.thumbnail; };
    return (React__default.createElement("div", { className: theme.prefixClass + "-sidebar" },
        React__default.createElement("div", { className: theme.prefixClass + "-sidebar-tabs" },
            React__default.createElement("div", { className: theme.prefixClass + "-sidebar-tab" },
                React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: (React__default.createElement(Button, { onClick: clickThumbnailTab, isSelected: tab === Tab.Thumbnail },
                        React__default.createElement(WrappedScrollingIcon, null))), content: renderThumbnailTip, offset: TOOLTIP_OFFSET })),
            React__default.createElement("div", { className: theme.prefixClass + "-sidebar-tab" },
                React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: (React__default.createElement(Button, { onClick: clickBookmarkTab, isSelected: tab === Tab.Bookmark },
                        React__default.createElement(BookmarkIcon, null))), content: renderBookmarkTip, offset: TOOLTIP_OFFSET })),
            React__default.createElement("div", { className: theme.prefixClass + "-sidebar-tab" },
                React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: (React__default.createElement(Button, { onClick: clickAttachmentTab, isSelected: tab === Tab.Attachment },
                        React__default.createElement(FileIcon, null))), content: renderAttachmentTip, offset: TOOLTIP_OFFSET }))),
        React__default.createElement("div", { className: classNames((_b = {},
                _b[theme.prefixClass + "-sidebar-content"] = true,
                _b[theme.prefixClass + "-sidebar-thumbnails"] = tab === Tab.Thumbnail,
                _b)) },
            tab === Tab.Thumbnail && (React__default.createElement(ThumbnailList, { currentPage: currentPage, doc: doc, pageHeight: height, pageWidth: width, rotation: rotation, onJumpToPage: onJumpToPage })),
            tab === Tab.Bookmark && React__default.createElement(BookmarkLoader, { doc: doc, onJumpToDest: onJumpToDest }),
            tab === Tab.Attachment && React__default.createElement(AttachmentLoader, { doc: doc }))));
};

var DownArrowIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M2.32,2.966h19.452c0.552,0.001,1,0.449,0.999,1.001c0,0.182-0.05,0.36-0.144,0.516L12.9,20.552\n                c-0.286,0.472-0.901,0.624-1.373,0.338c-0.138-0.084-0.254-0.2-0.338-0.338L1.465,4.483C1.179,4.01,1.331,3.396,1.804,3.11\n                C1.96,3.016,2.138,2.966,2.32,2.966z" })));
};

var DownloadIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M17.5,11.5c3.314,0,6,2.686,6,6s-2.686,6-6,6s-6-2.686-6-6S14.186,11.5,17.5,11.5z\n                M17.5,14.5v6\n                M17.5,20.5\n                l-2.25-2.25\n                M17.5,20.5l2.25-2.25\n                M10.5,23.5h-9c-0.552,0-1-0.448-1-1v-21c0-0.552,0.448-1,1-1h13.293\n                c0.265,0,0.52,0.105,0.707,0.293L19.207,4.5C19.395,4.687,19.5,4.942,19.5,5.207V8.5" })));
};

var FullScreenIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M15.5,8.499l8-8\n                M0.5,23.499l8-8\n                M5.5,23.499h-5v-5\n                M23.5,5.499v-5h-5\n                M15.5,15.499l8,8\n                M0.5,0.499l8,8\n                M0.5,5.499v-5h5\n                M18.5,23.499h5v-5" })));
};

var HandToolIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M11.5,5.5v-2C11.5,2.672,12.172,2,13,2s1.5,0.672,1.5,1.5v2 M14.5,11.5v-6C14.5,4.672,15.172,4,16,4\n                c0.828,0,1.5,0.672,1.5,1.5v3 M17.5,13V8.5C17.5,7.672,18.172,7,19,7s1.5,0.672,1.5,1.5v10c0,2.761-2.239,5-5,5h-3.335\n                c-1.712-0.001-3.305-0.876-4.223-2.321C6.22,18.467,4.083,14,4.083,14c-0.378-0.545-0.242-1.292,0.303-1.67\n                c0.446-0.309,1.044-0.281,1.458,0.07L8.5,15.5v-10C8.5,4.672,9.172,4,10,4s1.5,0.672,1.5,1.5v6" })));
};

var HorizontalScrollingIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M6.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z\n                M14.5,21.5c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z\n                M22.5,21.5 c0,0.552-0.448,1-1,1h-4c-0.552,0-1-0.448-1-1v-20c0-0.552,0.448-1,1-1h4c0.552,0,1,0.448,1,1V21.5z" })));
};

var InfoIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M12,1.001c6.075,0,11,4.925,11,11s-4.925,11-11,11s-11-4.925-11-11S5.925,1.001,12,1.001z\n                M14.5,17.005H13\n                c-0.552,0-1-0.448-1-1v-6.5c0-0.276-0.224-0.5-0.5-0.5H10\n                M11.745,6.504L11.745,6.504\n                M11.745,6.5c-0.138,0-0.25,0.112-0.25,0.25\n                S11.607,7,11.745,7s0.25-0.112,0.25-0.25S11.883,6.5,11.745,6.5" })));
};

var LeftSidebarIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M1.5,0.497h20c0.552,0,1,0.448,1,1v20c0,0.552-0.448,1-1,1h-20c-0.552,0-1-0.448-1-1v-20\n                C0.5,0.945,0.948,0.497,1.5,0.497z\n                M7.5,0.497v22" })));
};

var NextIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M0.541,5.627L11.666,18.2c0.183,0.207,0.499,0.226,0.706,0.043c0.015-0.014,0.03-0.028,0.043-0.043\n                L23.541,5.627" })));
};

var PreviousIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M23.535,18.373L12.409,5.8c-0.183-0.207-0.499-0.226-0.706-0.043C11.688,5.77,11.674,5.785,11.66,5.8\n                L0.535,18.373" })));
};

var PrintIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M7.5,19.499h9 M7.5,16.499h9 M5.5,16.5h-3c-1.103-0.003-1.997-0.897-2-2v-6c0.003-1.103,0.897-1.997,2-2h19\n                c1.103,0.003,1.997,0.897,2,2v6c-0.003,1.103-0.897,1.997-2,2h-3\n                M5.5,4.5v-4h9.586c0.265,0,0.52,0.105,0.707,0.293l2.414,2.414\n                C18.395,3.394,18.5,3.649,18.5,3.914V4.5\n                M18.5,22.5c0,0.552-0.448,1-1,1h-11c-0.552,0-1-0.448-1-1v-9h13V22.5z\n                M3.5,8.499\n                c0.552,0,1,0.448,1,1s-0.448,1-1,1s-1-0.448-1-1S2.948,8.499,3.5,8.499z\n                M14.5,0.499v4h4" })));
};

var RotateBackwardIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M3.434,10.537c0.141-0.438,0.316-0.864,0.523-1.274\n                M3.069,14.425C3.023,14.053,3,13.679,3,13.305 c0-0.291,0.014-0.579,0.041-0.863\n                M4.389,18.111c-0.341-0.539-0.623-1.112-0.843-1.711\n                M7.163,20.9 c-0.543-0.345-1.048-0.747-1.506-1.2\n                M10.98,22.248c-0.65-0.074-1.29-0.218-1.909-0.431\n                M10,4.25h2 c4.987,0.015,9.017,4.069,9.003,9.055c-0.013,4.581-3.456,8.426-8.008,8.945\n                M13.5,1.75L10,4.25l3.5,2.5" })));
};

var RotateForwardIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M20.566,10.537c-0.141-0.438-0.316-0.864-0.523-1.274\n                M20.931,14.425C20.977,14.053,21,13.679,21,13.305 c0-0.291-0.014-0.579-0.041-0.863\n                M19.611,18.111c0.341-0.539,0.624-1.114,0.843-1.713\n                M16.837,20.9 c0.543-0.345,1.048-0.747,1.506-1.2\n                M13.02,22.248c0.65-0.074,1.29-0.218,1.909-0.431\n                M14,4.25h-2 c-4.987,0.015-9.017,4.069-9.003,9.055c0.013,4.581,3.456,8.426,8.008,8.945\n                M10.5,1.75l3.5,2.5l-3.5,2.5" })));
};

var TextSelectionIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M13.675,11.671l2.941-2.941c0.195-0.196,0.195-0.512-0.001-0.707C16.563,7.971,16.5,7.931,16.43,7.906\n                L4.168,3.527C3.908,3.434,3.622,3.57,3.529,3.83c-0.039,0.109-0.039,0.228,0,0.336l4.379,12.262\n                c0.093,0.26,0.379,0.396,0.639,0.303c0.07-0.025,0.133-0.065,0.185-0.117l2.943-2.943l6.146,6.146c0.195,0.195,0.512,0.195,0.707,0\n                l1.293-1.293c0.195-0.195,0.195-0.512,0-0.707L13.675,11.671z" })));
};

var UpArrowIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M21.783,21.034H2.332c-0.552,0-1-0.448-1-1c0-0.182,0.05-0.361,0.144-0.517L11.2,3.448\n                c0.286-0.472,0.901-0.624,1.373-0.338c0.138,0.084,0.254,0.2,0.338,0.338l9.726,16.069c0.286,0.473,0.134,1.087-0.339,1.373\n                C22.143,20.984,21.965,21.034,21.783,21.034z" })));
};

var VerticalScrollingIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M23.5,5.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V5.5z\n                M23.5,13.5c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V13.5z\n                M23.5,21.5 c0,0.552-0.448,1-1,1h-21c-0.552,0-1-0.448-1-1v-3c0-0.552,0.448-1,1-1h21c0.552,0,1,0.448,1,1V21.5z" })));
};

var ZoomInIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z\n                M23.5,23.499\n                l-5.929-5.929\n                M5.5,10.499h10\n                M10.5,5.499v10" })));
};

var ZoomOutIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M10.5,0.499c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.499,10.5,0.499z\n                M23.5,23.499\n                l-5.929-5.929\n                M5.5,10.499h10" })));
};

var OpenFileIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M4.5,8.5H14\n                M4.5,11.5h6\n                M4.5,5.5h7\n                M4.5,14.5h4\n                M4.5,17.5h4\n                M10.5,23.5h-9c-0.552,0-1-0.448-1-1v-21\n                c0-0.552,0.448-1,1-1h13.293c0.265,0,0.52,0.105,0.707,0.293L19.207,4.5C19.395,4.687,19.5,4.942,19.5,5.207V8.5\n                M17.5,11.5\n                c3.314,0,6,2.686,6,6s-2.686,6-6,6s-6-2.686-6-6S14.186,11.5,17.5,11.5z\n                M17.5,20.5v-6\n                M17.5,14.5l-2.25,2.25\n                M17.5,14.5l2.25,2.25" })));
};

var TOOLTIP_OFFSET$1 = { left: 0, top: 8 };
var OpenFileButton = function (_a) {
    var onOpenFiles = _a.onOpenFiles;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var openFiles = function (e) {
        var files = e.target.files;
        if (files) {
            onOpenFiles(files);
        }
    };
    var renderContent = function () { return l10n.toolbar.openFile; };
    return (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: (React__default.createElement("div", { className: theme.prefixClass + "-open-file" },
            React__default.createElement("input", { className: theme.prefixClass + "-open-file-input", multiple: false, type: 'file', title: '', onChange: openFiles }),
            React__default.createElement(OpenFileIcon, null))), content: renderContent, offset: TOOLTIP_OFFSET$1 }));
};

var fileSize = function (bytes) {
    var sufixes = ['B', 'kB', 'MB', 'GB', 'TB'];
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sufixes[i];
};

var PropertiesLoader = function (_a) {
    var doc = _a.doc, render = _a.render;
    var theme = React__default.useContext(ThemeContext);
    var _b = React__default.useState(), data = _b[0], setData = _b[1];
    React__default.useEffect(function () {
        doc.getMetadata().then(function (meta) {
            return Promise.resolve(meta);
        }).then(function (meta) {
            return doc.getDownloadInfo().then(function (d) {
                return Promise.resolve({
                    fileName: meta.contentDispositionFilename || '',
                    info: meta.info,
                    length: d.length,
                });
            });
        }).then(function (response) {
            setData(response);
        });
    }, []);
    return (data ? render(data) : React__default.createElement("div", { className: theme.prefixClass + "-properties-loader" },
        React__default.createElement(Spinner, null)));
};

var PropertyItem = function (_a) {
    var label = _a.label, value = _a.value;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("dl", { className: theme.prefixClass + "-property-item" },
        React__default.createElement("dt", { className: theme.prefixClass + "-property-item-label" },
            label,
            ":"),
        React__default.createElement("dd", { className: theme.prefixClass + "-property-item-value" }, value || '-')));
};

var PropertiesModal = function (_a) {
    var doc = _a.doc, fileName$1 = _a.fileName, onToggle = _a.onToggle;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var formatDate = function (input) {
        var date = convertDate(input);
        return date ? date.toLocaleDateString() + ", " + date.toLocaleTimeString() : '';
    };
    var renderData = function (data) { return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement("div", { className: theme.prefixClass + "-properties-modal-group" },
            React__default.createElement(PropertyItem, { label: "" + l10n.property.fileName, value: data.fileName || fileName(fileName$1) }),
            React__default.createElement(PropertyItem, { label: "" + l10n.property.fileSize, value: fileSize(data.length) })),
        React__default.createElement(Separator, null),
        React__default.createElement("div", { className: theme.prefixClass + "-properties-modal-group" },
            React__default.createElement(PropertyItem, { label: "" + l10n.property.title, value: data.info.Title }),
            React__default.createElement(PropertyItem, { label: "" + l10n.property.author, value: data.info.Author }),
            React__default.createElement(PropertyItem, { label: "" + l10n.property.subject, value: data.info.Subject }),
            React__default.createElement(PropertyItem, { label: "" + l10n.property.keywords, value: data.info.Keywords }),
            React__default.createElement(PropertyItem, { label: "" + l10n.property.creator, value: data.info.Creator }),
            React__default.createElement(PropertyItem, { label: "" + l10n.property.creationDate, value: formatDate(data.info.CreationDate) }),
            React__default.createElement(PropertyItem, { label: "" + l10n.property.modificationDate, value: formatDate(data.info.ModDate) })),
        React__default.createElement(Separator, null),
        React__default.createElement("div", { className: theme.prefixClass + "-properties-modal-group" },
            React__default.createElement(PropertyItem, { label: "" + l10n.property.pdfProducer, value: data.info.Producer }),
            React__default.createElement(PropertyItem, { label: "" + l10n.property.pdfVersion, value: data.info.PDFFormatVersion }),
            React__default.createElement(PropertyItem, { label: "" + l10n.property.pageCount, value: "" + doc.numPages })))); };
    return (React__default.createElement("div", { className: theme.prefixClass + "-properties-modal" },
        React__default.createElement(PropertiesLoader, { doc: doc, render: renderData }),
        React__default.createElement("div", { className: theme.prefixClass + "-properties-modal-footer" },
            React__default.createElement(PrimaryButton, { onClick: onToggle }, l10n.property.close))));
};

var SearchIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M10.5,0.5c5.523,0,10,4.477,10,10s-4.477,10-10,10s-10-4.477-10-10S4.977,0.5,10.5,0.5z\n                M23.5,23.5\n                l-5.929-5.929" })));
};

var EMPTY_KEYWORD_REGEXP = new RegExp(' ');
var PORTAL_OFFSET = { left: 0, top: 8 };
var SearchPopover = function (_a) {
    var doc = _a.doc, onJumpToMatch = _a.onJumpToMatch, onSearchFor = _a.onSearchFor;
    var theme = React__default.useContext(ThemeContext);
    var numPages = doc.numPages;
    var indexArr = Array(numPages).fill(0).map(function (_, i) { return i; });
    var l10n = React__default.useContext(LocalizationContext);
    var _b = React__default.useState(''), keyword = _b[0], setKeyword = _b[1];
    var _c = React__default.useState([]), found = _c[0], setFound = _c[1];
    var _d = React__default.useState(0), currentMatch = _d[0], setCurrentMatch = _d[1];
    var _e = React__default.useState(false), matchCase = _e[0], setMatchCase = _e[1];
    var _f = React__default.useState(false), wholeWords = _f[0], setWholeWords = _f[1];
    var textContents = React__default.useRef([]);
    var changeKeyword = function (e) {
        setKeyword(e.target.value);
    };
    var getTextContents = function () {
        var promises = indexArr.map(function (pageIndex) {
            return doc.getPage(pageIndex + 1).then(function (page) {
                return page.getTextContent();
            }).then(function (content) {
                var pageContent = content.items.map(function (item) { return item.str || ''; }).join('');
                return Promise.resolve({
                    pageContent: pageContent,
                    pageIndex: pageIndex,
                });
            });
        });
        return Promise.all(promises).then(function (data) {
            data.sort(function (a, b) { return a.pageIndex - b.pageIndex; });
            return Promise.resolve(data.map(function (item) { return item.pageContent; }));
        });
    };
    var buildKeywordRegex = function (keywordParam, matchCaseParam, wholeWordsParam) {
        var source = wholeWordsParam ? " " + keywordParam + " " : keywordParam;
        var flags = matchCaseParam ? 'g' : 'gi';
        return new RegExp(source, flags);
    };
    var search = function (keywordParam, matchCaseParam, wholeWordsParam) {
        var regexp = buildKeywordRegex(keywordParam, matchCaseParam, wholeWordsParam);
        onSearchFor(regexp);
        setCurrentMatch(0);
        setFound([]);
        var promise = (textContents.current.length === 0)
            ? getTextContents().then(function (response) {
                textContents.current = response;
                return Promise.resolve(response);
            })
            : Promise.resolve(textContents.current);
        promise.then(function (response) {
            var arr = [];
            response.forEach(function (item, pageIndex) {
                var numMatches = (item.match(regexp) || []).length;
                for (var matchIndex = 0; matchIndex < numMatches; matchIndex++) {
                    arr.push({
                        matchIndex: matchIndex,
                        pageIndex: pageIndex,
                    });
                }
            });
            setFound(arr);
            if (arr.length > 0) {
                setCurrentMatch(1);
                onJumpToMatch(arr[0]);
            }
        });
    };
    var keydownSearch = function (e) {
        if (e.keyCode !== 13 || !keyword) {
            return;
        }
        search(keyword, matchCase, wholeWords);
    };
    var jumpToPreviousMatch = function () {
        var prev = currentMatch - 1;
        var updated = prev > 0 ? prev : found.length;
        setCurrentMatch(updated);
        onJumpToMatch(found[updated - 1]);
    };
    var jumpToNextMatch = function () {
        var next = currentMatch + 1;
        var updated = next <= found.length ? next : 1;
        setCurrentMatch(updated);
        onJumpToMatch(found[updated - 1]);
    };
    var changeMatchCase = function (e) {
        var isChecked = e.target.checked;
        setMatchCase(isChecked);
        if (keyword) {
            search(keyword, isChecked, wholeWords);
        }
    };
    var changeWholeWords = function (e) {
        var isChecked = e.target.checked;
        setWholeWords(isChecked);
        if (keyword) {
            search(keyword, matchCase, isChecked);
        }
    };
    var clearKeyword = function () {
        onSearchFor(EMPTY_KEYWORD_REGEXP);
        setKeyword('');
        setCurrentMatch(0);
        setFound([]);
        setMatchCase(false);
        setWholeWords(false);
    };
    var renderSearch = function () { return l10n.toolbar.search; };
    var renderTarget = function (toggle, opened) { return (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: toggle, isSelected: opened },
            React__default.createElement(SearchIcon, null)), content: renderSearch, offset: PORTAL_OFFSET })); };
    var renderPreviousMatch = function () { return l10n.search.previousMatch; };
    var renderNextMatch = function () { return l10n.search.nextMatch; };
    var renderContent = function (toggle) {
        var close = function () {
            toggle();
            clearKeyword();
        };
        return (React__default.createElement("div", { className: theme.prefixClass + "-search-popover" },
            React__default.createElement("div", { className: theme.prefixClass + "-search-popover-input-counter" },
                React__default.createElement("input", { className: theme.prefixClass + "-search-popover-input", placeholder: "" + l10n.search.enterToSearch, type: "text", value: keyword, onChange: changeKeyword, onKeyDown: keydownSearch }),
                React__default.createElement("div", { className: theme.prefixClass + "-search-popover-counter" },
                    currentMatch,
                    "/",
                    found.length)),
            React__default.createElement("label", { className: theme.prefixClass + "-search-popover-label" },
                React__default.createElement("input", { className: theme.prefixClass + "-search-popover-label-checkbox", checked: matchCase, type: "checkbox", onChange: changeMatchCase }),
                " ",
                l10n.search.matchCase),
            React__default.createElement("label", { className: theme.prefixClass + "-search-popover-label" },
                React__default.createElement("input", { className: theme.prefixClass + "-search-popover-label-checkbox", checked: wholeWords, type: "checkbox", onChange: changeWholeWords }),
                " ",
                l10n.search.wholeWords),
            React__default.createElement("div", { className: theme.prefixClass + "-search-popover-footer" },
                React__default.createElement("div", { className: theme.prefixClass + "-search-popover-footer-item" },
                    React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: jumpToPreviousMatch },
                            React__default.createElement(PreviousIcon, null)), content: renderPreviousMatch, offset: PORTAL_OFFSET })),
                React__default.createElement("div", { className: theme.prefixClass + "-search-popover-footer-item" },
                    React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: jumpToNextMatch },
                            React__default.createElement(NextIcon, null)), content: renderNextMatch, offset: PORTAL_OFFSET })),
                React__default.createElement("div", { className: theme.prefixClass + "-search-popover-footer-button" },
                    React__default.createElement(PrimaryButton, { onClick: close }, l10n.search.close)))));
    };
    return (React__default.createElement(Popover, { position: Position$1.BottomLeft, target: renderTarget, content: renderContent, offset: PORTAL_OFFSET, closeOnClickOutside: false, closeOnEscape: true }));
};

var LEVELS = [
    0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
    1, 1.1, 1.3, 1.5, 1.7, 1.9,
    2.1, 2.4, 2.7,
    3.0, 3.3, 3.7,
    4.1, 4.6,
    5.1, 5.7,
    6.3,
    7.0, 7.7,
    8.5,
    9.4,
    10,
];
var increase = function (currentLevel) {
    var found = LEVELS.find(function (item) { return item > currentLevel; });
    return found || currentLevel;
};
var decrease = function (currentLevel) {
    var found = LEVELS.findIndex(function (item) { return item >= currentLevel; });
    return found === -1 || found === 0 ? currentLevel : LEVELS[found - 1];
};

var Menu = function (_a) {
    var children = _a.children;
    var theme = React__default.useContext(ThemeContext);
    return (React__default.createElement("ul", { className: theme.prefixClass + "-menu" }, children));
};

var LEVELS$1 = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
var PORTAL_OFFSET$1 = { left: 0, top: 8 };
var ZoomPopover = function (_a) {
    var scale = _a.scale, onZoom = _a.onZoom;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var getSpcialLevelLabel = function (level) {
        switch (level) {
            case SpecialZoomLevel$1.ActualSize: return l10n.zoom.actualSize;
            case SpecialZoomLevel$1.PageFit: return l10n.zoom.pageFit;
            case SpecialZoomLevel$1.PageWidth: return l10n.zoom.pageWidth;
        }
    };
    var renderTarget = function (toggle) {
        var click = function () { toggle(); };
        return (React__default.createElement("span", { className: theme.prefixClass + "-zoom-popover-target", onClick: click },
            React__default.createElement("span", { className: theme.prefixClass + "-zoom-popover-target-scale" },
                Math.round(scale * 100),
                "%"),
            React__default.createElement("span", { className: theme.prefixClass + "-zoom-popover-target-arrow" })));
    };
    var renderContent = function (toggle) { return (React__default.createElement(Menu, null,
        Object.keys(SpecialZoomLevel$1).map(function (k) {
            var level = k;
            var clickMenuItem = function () { toggle(); onZoom(level); };
            return (React__default.createElement(MenuItem, { key: level, onClick: clickMenuItem }, getSpcialLevelLabel(level)));
        }),
        React__default.createElement(MenuDivider, null),
        LEVELS$1.map(function (level) {
            var clickMenuItem = function () { toggle(); onZoom(level); };
            return (React__default.createElement(MenuItem, { key: level, onClick: clickMenuItem }, Math.round(level * 100) + "%"));
        }))); };
    return (React__default.createElement(Popover, { position: Position$1.BottomCenter, target: renderTarget, content: renderContent, offset: PORTAL_OFFSET$1, closeOnClickOutside: true, closeOnEscape: true }));
};

var MoreIcon = function () {
    return (React__default.createElement(Icon, { size: 16 },
        React__default.createElement("path", { d: "M12,0.5c1.381,0,2.5,1.119,2.5,2.5S13.381,5.5,12,5.5S9.5,4.381,9.5,3S10.619,0.5,12,0.5z\n                M12,9.5\n                c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5S9.5,13.381,9.5,12S10.619,9.5,12,9.5z\n                M12,18.5c1.381,0,2.5,1.119,2.5,2.5\n                s-1.119,2.5-2.5,2.5S9.5,22.381,9.5,21S10.619,18.5,12,18.5z" })));
};

var PORTAL_OFFSET$2 = { left: 0, top: 8 };
var MoreActionsPopover = function (_a) {
    var doc = _a.doc, fileName = _a.fileName, scrollMode = _a.scrollMode, selectionMode = _a.selectionMode, onChangeScrollMode = _a.onChangeScrollMode, onChangeSelectionMode = _a.onChangeSelectionMode, onJumpToFirstPage = _a.onJumpToFirstPage, onJumpToLastPage = _a.onJumpToLastPage, onRotate = _a.onRotate;
    var l10n = React__default.useContext(LocalizationContext);
    var renderMoreActions = function () { return l10n.toolbar.moreActions; };
    var renderTarget = function (toggle, opened) { return (React__default.createElement(Tooltip, { position: Position$1.BottomRight, target: React__default.createElement(Button, { onClick: toggle, isSelected: opened },
            React__default.createElement(MoreIcon, null)), content: renderMoreActions, offset: PORTAL_OFFSET$2 })); };
    var renderPropertyMenu = function (toggle) { return (React__default.createElement(MenuItem, { icon: React__default.createElement(InfoIcon, null), onClick: toggle }, l10n.toolbar.documentProperties)); };
    var renderPropertiesModal = function (toggle) { return (React__default.createElement(PropertiesModal, { doc: doc, fileName: fileName, onToggle: toggle })); };
    var renderContent = function (toggle) {
        var jumpToFirstPage = function () {
            toggle();
            onJumpToFirstPage();
        };
        var jumpToLastPage = function () {
            toggle();
            onJumpToLastPage();
        };
        var rotateForward = function () {
            toggle();
            onRotate(90);
        };
        var rotateBackward = function () {
            toggle();
            onRotate(-90);
        };
        var activateTextSelectionMode = function () {
            toggle();
            onChangeSelectionMode(SelectionMode$1.Text);
        };
        var activateHandMode = function () {
            toggle();
            onChangeSelectionMode(SelectionMode$1.Hand);
        };
        var activateScrollMode = function (mode) {
            toggle();
            onChangeScrollMode(mode);
        };
        var setVerticalScrollMode = function () { return activateScrollMode(ScrollMode$1.Vertical); };
        var setHorizontalScrollMode = function () { return activateScrollMode(ScrollMode$1.Horizontal); };
        var setWrappedScrollMode = function () { return activateScrollMode(ScrollMode$1.Wrapped); };
        return (React__default.createElement(Menu, null,
            React__default.createElement(MenuItem, { icon: React__default.createElement(UpArrowIcon, null), onClick: jumpToFirstPage }, l10n.toolbar.goToFirstPage),
            React__default.createElement(MenuItem, { icon: React__default.createElement(DownArrowIcon, null), onClick: jumpToLastPage }, l10n.toolbar.goToLastPage),
            React__default.createElement(MenuDivider, null),
            React__default.createElement(MenuItem, { icon: React__default.createElement(RotateForwardIcon, null), onClick: rotateForward }, l10n.toolbar.rotateForward),
            React__default.createElement(MenuItem, { icon: React__default.createElement(RotateBackwardIcon, null), onClick: rotateBackward }, l10n.toolbar.rotateBackward),
            React__default.createElement(MenuDivider, null),
            React__default.createElement(MenuItem, { checked: selectionMode === SelectionMode$1.Text, icon: React__default.createElement(TextSelectionIcon, null), onClick: activateTextSelectionMode }, l10n.toolbar.textSelectionTool),
            React__default.createElement(MenuItem, { checked: selectionMode === SelectionMode$1.Hand, icon: React__default.createElement(HandToolIcon, null), onClick: activateHandMode }, l10n.toolbar.handTool),
            React__default.createElement(MenuDivider, null),
            React__default.createElement(MenuItem, { checked: scrollMode === ScrollMode$1.Vertical, icon: React__default.createElement(VerticalScrollingIcon, null), onClick: setVerticalScrollMode }, l10n.toolbar.verticalScrolling),
            React__default.createElement(MenuItem, { checked: scrollMode === ScrollMode$1.Horizontal, icon: React__default.createElement(HorizontalScrollingIcon, null), onClick: setHorizontalScrollMode }, l10n.toolbar.horizontalScrolling),
            React__default.createElement(MenuItem, { checked: scrollMode === ScrollMode$1.Wrapped, icon: React__default.createElement(WrappedScrollingIcon, null), onClick: setWrappedScrollMode }, l10n.toolbar.wrappedScrolling),
            React__default.createElement(MenuDivider, null),
            React__default.createElement(Modal, { target: renderPropertyMenu, content: renderPropertiesModal, closeOnClickOutside: true, closeOnEscape: true })));
    };
    return (React__default.createElement(Popover, { position: Position$1.BottomRight, target: renderTarget, content: renderContent, offset: PORTAL_OFFSET$2, closeOnClickOutside: true, closeOnEscape: true }));
};

var TOOLTIP_OFFSET$2 = { left: 0, top: 8 };
var Toolbar = function (_a) {
    var currentPage = _a.currentPage, doc = _a.doc, fileName = _a.fileName, scale = _a.scale, scrollMode = _a.scrollMode, selectionMode = _a.selectionMode, onChangeScrollMode = _a.onChangeScrollMode, onChangeSelectionMode = _a.onChangeSelectionMode, onDownload = _a.onDownload, onFullScreen = _a.onFullScreen, onJumpTo = _a.onJumpTo, onJumpToMatch = _a.onJumpToMatch, onOpenFiles = _a.onOpenFiles, onPrint = _a.onPrint, onRotate = _a.onRotate, onSearchFor = _a.onSearchFor, onToggleSidebar = _a.onToggleSidebar, onZoom = _a.onZoom, renderToolbar = _a.renderToolbar;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var _b = React__default.useState(false), pageTextboxFocused = _b[0], setPageTextboxFocused = _b[1];
    var _c = React__default.useState(currentPage), editingPage = _c[0], setEditingPage = _c[1];
    var _d = React__default.useState(false), isSidebarOpened = _d[0], setSidebarOpened = _d[1];
    var numPages = doc.numPages;
    var zoomOut = function () {
        var newLevel = decrease(scale);
        onZoom(newLevel);
    };
    var zoomIn = function () {
        var newLevel = increase(scale);
        onZoom(newLevel);
    };
    var gotoNextPage = function () {
        var nextPage = currentPage + 1;
        if (nextPage < numPages) {
            setEditingPage(nextPage);
            onJumpTo(nextPage);
        }
    };
    var gotoPreviousPage = function () {
        var previousPage = currentPage - 1;
        if (previousPage >= 0) {
            setEditingPage(previousPage);
            onJumpTo(previousPage);
        }
    };
    var changePage = function (e) {
        var newPage = parseInt(e.target.value, 10);
        if (newPage > 0 && newPage <= numPages) {
            setEditingPage(newPage - 1);
        }
    };
    var focusPageTextbox = function () {
        setPageTextboxFocused(true);
        setEditingPage(currentPage);
    };
    var blurPageTextbox = function () {
        setPageTextboxFocused(false);
    };
    var keydownPage = function (e) {
        switch (e.keyCode) {
            case 38:
                gotoPreviousPage();
                break;
            case 40:
                gotoNextPage();
                break;
            case 13:
                onJumpTo(editingPage);
                break;
        }
    };
    var jumpToFirstPage = function () { return onJumpTo(0); };
    var jumpToLastPage = function () { return onJumpTo(numPages - 1); };
    var toggleSidebar = function () {
        setSidebarOpened(!isSidebarOpened);
        onToggleSidebar();
    };
    var rotateForward = function () { return onRotate(90); };
    var rotateBackward = function () { return onRotate(-90); };
    var activateTextSelectionMode = function () { return onChangeSelectionMode(SelectionMode$1.Text); };
    var activateHandMode = function () { return onChangeSelectionMode(SelectionMode$1.Hand); };
    var setVerticalScrollMode = function () { return onChangeScrollMode(ScrollMode$1.Vertical); };
    var setHorizontalScrollMode = function () { return onChangeScrollMode(ScrollMode$1.Horizontal); };
    var setWrappedScrollMode = function () { return onChangeScrollMode(ScrollMode$1.Wrapped); };
    var renderToggle = function () { return l10n.toolbar.toggleSidebar; };
    var renderPreviousPage = function () { return l10n.toolbar.previousPage; };
    var renderNextPage = function () { return l10n.toolbar.nextPage; };
    var renderZoomOut = function () { return l10n.toolbar.zoomOut; };
    var renderZoomIn = function () { return l10n.toolbar.zoomIn; };
    var renderFullScreen = function () { return l10n.toolbar.fullScreen; };
    var renderDownload = function () { return l10n.toolbar.download; };
    var renderPrint = function () { return l10n.toolbar.print; };
    var renderGoToFirstPage = function () { return l10n.toolbar.goToFirstPage; };
    var renderGoToLastPage = function () { return l10n.toolbar.goToLastPage; };
    var renderRotateClockwise = function () { return l10n.toolbar.rotateForward; };
    var renderRotateCounterclockwise = function () { return l10n.toolbar.rotateBackward; };
    var renderTextSelection = function () { return l10n.toolbar.textSelectionTool; };
    var renderHandTool = function () { return l10n.toolbar.handTool; };
    var renderVerticalScrolling = function () { return l10n.toolbar.verticalScrolling; };
    var renderHorizontalScrolling = function () { return l10n.toolbar.horizontalScrolling; };
    var renderDocumentProperties = function () { return l10n.toolbar.documentProperties; };
    var renderWrappedScrolling = function () { return l10n.toolbar.wrappedScrolling; };
    var renderPropertyButton = function (toggle) { return (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: toggle },
            React__default.createElement(InfoIcon, null)), content: renderDocumentProperties, offset: TOOLTIP_OFFSET$2 })); };
    var renderPropertiesModal = function (toggle) { return (React__default.createElement(PropertiesModal, { doc: doc, fileName: fileName, onToggle: toggle })); };
    return renderToolbar({
        currentPage: currentPage,
        currentPageInput: (React__default.createElement("input", { className: theme.prefixClass + "-toolbar-current-page-input", type: "text", value: pageTextboxFocused ? (editingPage + 1) : (currentPage + 1), onChange: changePage, onFocus: focusPageTextbox, onBlur: blurPageTextbox, onKeyDown: keydownPage })),
        documentPropertiesButton: (React__default.createElement(Modal, { target: renderPropertyButton, content: renderPropertiesModal, closeOnClickOutside: true, closeOnEscape: true })),
        downloadButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: onDownload },
                React__default.createElement(DownloadIcon, null)), content: renderDownload, offset: TOOLTIP_OFFSET$2 })),
        fullScreenButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: onFullScreen },
                React__default.createElement(FullScreenIcon, null)), content: renderFullScreen, offset: TOOLTIP_OFFSET$2 })),
        goToFirstPageButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: jumpToFirstPage },
                React__default.createElement(UpArrowIcon, null)), content: renderGoToFirstPage, offset: TOOLTIP_OFFSET$2 })),
        goToLastPageButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: jumpToLastPage },
                React__default.createElement(DownArrowIcon, null)), content: renderGoToLastPage, offset: TOOLTIP_OFFSET$2 })),
        handToolButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: activateHandMode, isSelected: selectionMode === SelectionMode$1.Hand },
                React__default.createElement(HandToolIcon, null)), content: renderHandTool, offset: TOOLTIP_OFFSET$2 })),
        horizontalScrollingButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: setHorizontalScrollMode, isSelected: scrollMode === ScrollMode$1.Horizontal },
                React__default.createElement(HorizontalScrollingIcon, null)), content: renderHorizontalScrolling, offset: TOOLTIP_OFFSET$2 })),
        moreActionsPopover: (React__default.createElement(MoreActionsPopover, { doc: doc, fileName: fileName, scrollMode: scrollMode, selectionMode: selectionMode, onChangeScrollMode: onChangeScrollMode, onChangeSelectionMode: onChangeSelectionMode, onJumpToFirstPage: jumpToFirstPage, onJumpToLastPage: jumpToLastPage, onRotate: onRotate })),
        nextPageButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: gotoNextPage },
                React__default.createElement(NextIcon, null)), content: renderNextPage, offset: TOOLTIP_OFFSET$2 })),
        numPages: numPages,
        openFileButton: (React__default.createElement(OpenFileButton, { onOpenFiles: onOpenFiles })),
        previousPageButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: gotoPreviousPage },
                React__default.createElement(PreviousIcon, null)), content: renderPreviousPage, offset: TOOLTIP_OFFSET$2 })),
        printButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: onPrint },
                React__default.createElement(PrintIcon, null)), content: renderPrint, offset: TOOLTIP_OFFSET$2 })),
        rotateClockwiseButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: rotateForward },
                React__default.createElement(RotateForwardIcon, null)), content: renderRotateClockwise, offset: TOOLTIP_OFFSET$2 })),
        rotateCounterclockwiseButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: rotateBackward },
                React__default.createElement(RotateBackwardIcon, null)), content: renderRotateCounterclockwise, offset: TOOLTIP_OFFSET$2 })),
        searchPopover: (React__default.createElement(SearchPopover, { doc: doc, onJumpToMatch: onJumpToMatch, onSearchFor: onSearchFor })),
        textSelectionButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: activateTextSelectionMode, isSelected: selectionMode === SelectionMode$1.Text },
                React__default.createElement(TextSelectionIcon, null)), content: renderTextSelection, offset: TOOLTIP_OFFSET$2 })),
        toggleSidebarButton: (React__default.createElement(Tooltip, { position: Position$1.BottomLeft, target: (React__default.createElement(Button, { onClick: toggleSidebar, isSelected: isSidebarOpened },
                React__default.createElement(LeftSidebarIcon, null))), content: renderToggle, offset: TOOLTIP_OFFSET$2 })),
        verticalScrollingButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: setVerticalScrollMode, isSelected: scrollMode === ScrollMode$1.Vertical },
                React__default.createElement(VerticalScrollingIcon, null)), content: renderVerticalScrolling, offset: TOOLTIP_OFFSET$2 })),
        zoomInButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: zoomIn },
                React__default.createElement(ZoomInIcon, null)), content: renderZoomIn, offset: TOOLTIP_OFFSET$2 })),
        zoomOutButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: zoomOut },
                React__default.createElement(ZoomOutIcon, null)), content: renderZoomOut, offset: TOOLTIP_OFFSET$2 })),
        zoomPopover: (React__default.createElement(ZoomPopover, { scale: scale, onZoom: onZoom })),
        wrappedScrollingButton: (React__default.createElement(Tooltip, { position: Position$1.BottomCenter, target: React__default.createElement(Button, { onClick: setWrappedScrollMode, isSelected: scrollMode === ScrollMode$1.Wrapped },
                React__default.createElement(WrappedScrollingIcon, null)), content: renderWrappedScrolling, offset: TOOLTIP_OFFSET$2 })),
    });
};

var EMPTY_KEYWORD_REGEXP$1 = new RegExp(' ');
var SCROLL_BAR_WIDTH = 17;
var PAGE_PADDING = 8;
var Inner = function (_a) {
    var defaultScale = _a.defaultScale, doc = _a.doc, file = _a.file, initialPage = _a.initialPage, keyword = _a.keyword, layout = _a.layout, pageSize = _a.pageSize, render = _a.render, renderPage = _a.renderPage, selectionMode = _a.selectionMode, onDocumentLoad = _a.onDocumentLoad, onOpenFile = _a.onOpenFile, onZoom = _a.onZoom, annotationValue = _a.annotationValue, onNewAnnotation = _a.onNewAnnotation, onPageNumberChange = _a.onPageNumberChange, SelectionPopover = _a.SelectionPopover, AnnotationPopover = _a.AnnotationPopover;
    var theme = React__default.useContext(ThemeContext);
    var pagesRef = React__default.useRef(null);
    var _b = React__default.useState(pageSize.scale), scale = _b[0], setScale = _b[1];
    var _c = React__default.useState(0), currentPage = _c[0], setCurrentPage = _c[1];
    var _d = React__default.useState(0), rotation = _d[0], setRotation = _d[1];
    var _e = React__default.useState(keyword
        ? ((typeof keyword === 'string') ? new RegExp(keyword) : keyword)
        : EMPTY_KEYWORD_REGEXP$1), keywordRegexp = _e[0], setKeywordRegexp = _e[1];
    var _f = React__default.useState({
        matchIndex: -1,
        pageIndex: -1,
    }), match = _f[0], setMatch = _f[1];
    var _g = React__default.useState(ScrollMode$1.Vertical), scrollMode = _g[0], setScrollMode = _g[1];
    var _h = React__default.useState(selectionMode), currentMode = _h[0], setCurrentMode = _h[1];
    var toggleDragScroll = useDragScroll(pagesRef).toggleDragScroll;
    var _j = useFullScreen(pagesRef), isFullScreen = _j.isFullScreen, openFullScreen = _j.openFullScreen, closeFullScreen = _j.closeFullScreen;
    var toggleSidebar = useToggle();
    var numPages = doc.numPages;
    var pageWidth = pageSize.pageWidth, pageHeight = pageSize.pageHeight;
    var arr = Array(numPages).fill(null);
    var pageVisibility = arr.map(function () { return 0; });
    var pageRefs = arr.map(function () { return React__default.useRef(); });
    var handleNewAnnotation = React__default.useCallback(function (newAnnotation, contents, hideTipAndSelection) {
        if (onNewAnnotation) {
            onNewAnnotation(newAnnotation, contents, currentPage, hideTipAndSelection);
        }
    }, [onNewAnnotation, currentPage]);
    var openFiles = function (files) {
        if (files.length === 0) {
            return;
        }
        var selectedFile = files[0];
        if (getFileExt(file.name).toLowerCase() !== 'pdf') {
            return;
        }
        new Promise(function (resolve) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(selectedFile);
            reader.onload = function () {
                var bytes = new Uint8Array(reader.result);
                resolve(bytes);
            };
        }).then(function (data) {
            onOpenFile(selectedFile.name, data);
        });
    };
    var isDragging = useDrop(pagesRef, function (files) { return openFiles(files); }).isDragging;
    var _k = React__default.useState(PrintStatus$1.Inactive), printStatus = _k[0], setPrintStatus = _k[1];
    var jumpToPage = function (pageIndex) {
        if (pageIndex < 0 || pageIndex >= numPages) {
            return;
        }
        setCurrentPage(pageIndex);
        var pagesContainer = pagesRef.current;
        var targetPage = pageRefs[pageIndex].current;
        if (pagesContainer && targetPage) {
            pagesContainer.scrollTop = targetPage.offsetTop;
        }
    };
    React__default.useEffect(function () {
        onDocumentLoad(doc);
        if (initialPage) {
            jumpToPage(initialPage);
        }
    }, []);
    var changeSelectionMode = function (mode) {
        toggleDragScroll(mode === SelectionMode$1.Hand);
        setCurrentMode(mode);
    };
    var download = function () {
        downloadFile(file.name, file.data);
    };
    var zoom = function (newScale) {
        var pagesEle = pagesRef.current;
        if (!pagesEle) {
            return;
        }
        var scaled = 1;
        switch (newScale) {
            case SpecialZoomLevel$1.ActualSize:
                scaled = 1;
                break;
            case SpecialZoomLevel$1.PageFit:
                scaled = Math.min((pagesEle.offsetWidth - SCROLL_BAR_WIDTH) / pageWidth, (pagesEle.offsetHeight - 2 * PAGE_PADDING) / pageHeight);
                break;
            case SpecialZoomLevel$1.PageWidth:
                scaled = (pagesEle.offsetWidth - SCROLL_BAR_WIDTH) / pageWidth;
                break;
            default:
                scaled = newScale;
                break;
        }
        setScale(scaled);
        onZoom(doc, scaled);
    };
    React__default.useEffect(function () {
        if (selectionMode === SelectionMode$1.Hand) {
            toggleDragScroll(true);
        }
        if (defaultScale) {
            zoom(defaultScale);
        }
    }, []);
    var pageVisibilityChanged = function (pageIndex, ratio) {
        pageVisibility[pageIndex] = ratio;
        var maxRatioPage = pageVisibility.reduce(function (maxIndex, item, index, array) {
            return item > array[maxIndex] ? index : maxIndex;
        }, 0);
        setCurrentPage(maxRatioPage);
    };
    var rotate = function (degree) {
        var updateRotation = (rotation === 360 || rotation === -360) ? degree : rotation + degree;
        setRotation(updateRotation);
    };
    var changeScrollMode = function (mode) {
        var pagesContainer = pagesRef.current;
        if (!pagesContainer) {
            return;
        }
        switch (mode) {
            case ScrollMode$1.Vertical:
                pagesContainer.classList.add(theme.prefixClass + "-inner-pages-vertical");
                pagesContainer.classList.remove(theme.prefixClass + "-inner-pages-horizontal");
                pagesContainer.classList.remove(theme.prefixClass + "-inner-pages-wrapped");
                break;
            case ScrollMode$1.Horizontal:
                pagesContainer.classList.add(theme.prefixClass + "-inner-pages-horizontal");
                pagesContainer.classList.remove(theme.prefixClass + "-inner-pages-vertical");
                pagesContainer.classList.remove(theme.prefixClass + "-inner-pages-wrapped");
                break;
            case ScrollMode$1.Wrapped:
                pagesContainer.classList.add(theme.prefixClass + "-inner-pages-wrapped");
                pagesContainer.classList.remove(theme.prefixClass + "-inner-pages-vertical");
                pagesContainer.classList.remove(theme.prefixClass + "-inner-pages-horizontal");
                break;
        }
        setScrollMode(mode);
    };
    var jumpToMatch = function (target) {
        jumpToPage(target.pageIndex);
        setMatch(target);
    };
    var jumpToDest = function (pageIndex, bottomOffset, scaleTo) {
        var pagesContainer = pagesRef.current;
        if (!pagesContainer) {
            return;
        }
        var newPageIndex = pageIndex + 1;
        doc.getPage(newPageIndex).then(function (page) {
            var viewport = page.getViewport({ scale: 1 });
            var top = 0;
            var bottom = bottomOffset || 0;
            switch (scaleTo) {
                case SpecialZoomLevel$1.PageFit:
                    top = 0;
                    zoom(SpecialZoomLevel$1.PageFit);
                    break;
                default:
                    top = (viewport.height - bottom) * scale;
                    break;
            }
            var targetPageEle = pageRefs[pageIndex].current;
            if (targetPageEle) {
                pagesContainer.scrollTop = targetPageEle.offsetTop + top;
            }
        });
    };
    var executeNamedAction = function (action) {
        var previousPage = currentPage - 1;
        var nextPage = currentPage + 1;
        switch (action) {
            case 'FirstPage':
                jumpToPage(0);
                break;
            case 'LastPage':
                jumpToPage(numPages - 1);
                break;
            case 'NextPage':
                (nextPage < numPages) && jumpToPage(nextPage);
                break;
            case 'PrevPage':
                (previousPage >= 0) && jumpToPage(previousPage);
                break;
        }
    };
    var print = function () { return setPrintStatus(PrintStatus$1.Preparing); };
    var cancelPrinting = function () { return setPrintStatus(PrintStatus$1.Inactive); };
    var startPrinting = function () { return setPrintStatus(PrintStatus$1.Ready); };
    return render({
        viewer: layout(toggleSidebar.opened, {
            attrs: {
                style: {
                    position: 'relative',
                }
            },
            children: (React__default.createElement(PrintContainer, { doc: doc, pageHeight: pageHeight, pageWidth: pageWidth, printStatus: printStatus, rotation: rotation, onCancel: cancelPrinting, onStartPrinting: startPrinting }))
        }, {
            attrs: {
                ref: pagesRef,
            },
            children: (React__default.createElement(React__default.Fragment, null,
                isDragging && React__default.createElement(DropArea, null),
                isFullScreen && React__default.createElement(ExitFullScreen, { onClick: closeFullScreen }),
                Array(numPages).fill(0).map(function (_, index) {
                    return (React__default.createElement("div", { className: theme.prefixClass + "-inner-page", key: "pagelayer-" + index, ref: function (ref) {
                            pageRefs[index].current = ref;
                        } },
                        React__default.createElement(AnnotationProvider, { value: annotationValue ? annotationValue[index] : [], onNewAnnotation: function (newAnnotation, contents, hideTipAndSelection) {
                                return handleNewAnnotation(newAnnotation, contents, hideTipAndSelection);
                            }, AnnotationPopover: AnnotationPopover, SelectionPopover: SelectionPopover },
                            React__default.createElement(PageLayer, { doc: doc, keywordRegexp: keywordRegexp, height: pageHeight, match: match, pageIndex: index, renderPage: renderPage, rotation: rotation, scale: scale, width: pageWidth, onExecuteNamedAction: executeNamedAction, onJumpToDest: jumpToDest, onPageVisibilityChanged: pageVisibilityChanged }))));
                }))),
        }, function (renderToolbar) { return (React__default.createElement(Toolbar, { currentPage: currentPage, doc: doc, fileName: file.name, scale: scale, scrollMode: scrollMode, selectionMode: currentMode, onChangeScrollMode: changeScrollMode, onChangeSelectionMode: changeSelectionMode, onDownload: download, onFullScreen: openFullScreen, onJumpTo: jumpToPage, onJumpToMatch: jumpToMatch, onOpenFiles: openFiles, onPrint: print, onRotate: rotate, onSearchFor: setKeywordRegexp, onToggleSidebar: toggleSidebar.toggle, onZoom: zoom, renderToolbar: renderToolbar })); }, {
            attrs: {},
            children: (React__default.createElement(Sidebar, { currentPage: currentPage, doc: doc, height: pageHeight, rotation: rotation, width: pageWidth, onJumpToDest: jumpToDest, onJumpToPage: jumpToPage })),
        }),
        doc: doc,
        download: download,
        changeScrollMode: changeScrollMode,
        changeSelectionMode: changeSelectionMode,
        jumpToPage: jumpToPage,
        print: print,
        rotate: rotate,
        zoom: zoom,
    });
};

var PageSizeCalculator = function (_a) {
    var doc = _a.doc, render = _a.render;
    var theme = React__default.useContext(ThemeContext);
    var pagesRef = React__default.useRef(null);
    var _b = React__default.useState({
        pageHeight: 0,
        pageWidth: 0,
        scale: 1,
    }), pageSize = _b[0], setPageSize = _b[1];
    React__default.useEffect(function () {
        doc.getPage(1).then(function (pdfPage) {
            var viewport = pdfPage.getViewport({ scale: 1 });
            var w = viewport.width;
            var h = viewport.height;
            var pagesEle = pagesRef.current;
            if (!pagesEle) {
                return;
            }
            var scaled = pagesEle.offsetWidth / w;
            var scale = decrease(Math.max(1, scaled));
            setPageSize({
                pageHeight: h,
                pageWidth: w,
                scale: scale,
            });
        });
    }, [doc]);
    var pageWidth = pageSize.pageWidth;
    return (pageWidth === 0
        ? (React__default.createElement("div", { className: theme.prefixClass + "-page-size-calculator", ref: pagesRef },
            React__default.createElement(Spinner, null)))
        : render(pageSize));
};

var LoadingStatus = (function () {
    function LoadingStatus() {
    }
    return LoadingStatus;
}());

var AskForPasswordState = (function (_super) {
    __extends(AskForPasswordState, _super);
    function AskForPasswordState(verifyPasswordFn) {
        var _this = _super.call(this) || this;
        _this.verifyPasswordFn = verifyPasswordFn;
        return _this;
    }
    return AskForPasswordState;
}(LoadingStatus));

var AskingPassword = function (_a) {
    var verifyPasswordFn = _a.verifyPasswordFn;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var _b = React__default.useState(''), password = _b[0], setPassword = _b[1];
    var changePassword = function (e) { return setPassword(e.target.value); };
    var submit = function () { return verifyPasswordFn(password); };
    return (React__default.createElement("div", { className: theme.prefixClass + "-asking-password" },
        React__default.createElement("div", null,
            React__default.createElement("div", { className: theme.prefixClass + "-asking-password-message" },
                l10n.askingPassword.requirePasswordToOpen,
                ":"),
            React__default.createElement("div", { className: theme.prefixClass + "-asking-password-input-container" },
                React__default.createElement("input", { className: theme.prefixClass + "-asking-password-input", type: "password", onChange: changePassword }),
                React__default.createElement("button", { className: theme.prefixClass + "-asking-password-button", onClick: submit }, l10n.askingPassword.submit)))));
};

var CompletedState = (function (_super) {
    __extends(CompletedState, _super);
    function CompletedState(doc) {
        var _this = _super.call(this) || this;
        _this.doc = doc;
        return _this;
    }
    return CompletedState;
}(LoadingStatus));

var FailureState = (function (_super) {
    __extends(FailureState, _super);
    function FailureState(error) {
        var _this = _super.call(this) || this;
        _this.error = error;
        return _this;
    }
    return FailureState;
}(LoadingStatus));

var LoadingState = (function (_super) {
    __extends(LoadingState, _super);
    function LoadingState(percentages) {
        var _this = _super.call(this) || this;
        _this.percentages = percentages;
        return _this;
    }
    return LoadingState;
}(LoadingStatus));

var WrongPassword = function (_a) {
    var verifyPasswordFn = _a.verifyPasswordFn;
    var l10n = React__default.useContext(LocalizationContext);
    var theme = React__default.useContext(ThemeContext);
    var _b = React__default.useState(''), password = _b[0], setPassword = _b[1];
    var changePassword = function (e) { return setPassword(e.target.value); };
    var submit = function () { return verifyPasswordFn(password); };
    return (React__default.createElement("div", { className: theme.prefixClass + "-asking-password" },
        React__default.createElement("div", null,
            React__default.createElement("div", { className: theme.prefixClass + "-asking-password-message" },
                l10n.wrongPassword.tryAgain,
                ":"),
            React__default.createElement("div", { className: theme.prefixClass + "-asking-password-input-container" },
                React__default.createElement("input", { className: theme.prefixClass + "-asking-password-input", type: "password", onChange: changePassword }),
                React__default.createElement("button", { className: theme.prefixClass + "-asking-password-button", onClick: submit }, l10n.wrongPassword.submit)))));
};

var WrongPasswordState = (function (_super) {
    __extends(WrongPasswordState, _super);
    function WrongPasswordState(verifyPasswordFn) {
        var _this = _super.call(this) || this;
        _this.verifyPasswordFn = verifyPasswordFn;
        return _this;
    }
    return WrongPasswordState;
}(LoadingStatus));

var DocumentLoader = function (_a) {
    var file = _a.file, render = _a.render, renderError = _a.renderError;
    var theme = React__default.useContext(ThemeContext);
    var _b = React__default.useState(new LoadingState(0)), status = _b[0], setStatus = _b[1];
    React__default.useEffect(function () {
        setStatus(new LoadingState(0));
        var loadingTask = PdfJs.getDocument(file);
        loadingTask.onPassword = function (verifyPassword, reason) {
            switch (reason) {
                case PdfJs.PasswordResponses.NEED_PASSWORD:
                    setStatus(new AskForPasswordState(verifyPassword));
                    break;
                case PdfJs.PasswordResponses.INCORRECT_PASSWORD:
                    setStatus(new WrongPasswordState(verifyPassword));
                    break;
            }
        };
        loadingTask.promise.then(function (doc) { return setStatus(new CompletedState(doc)); }, function (err) { return setStatus(new FailureState({
            message: err.message || 'Cannot load document',
            name: err.name,
        })); });
        return function () {
            loadingTask.destroy();
        };
    }, [file]);
    switch (true) {
        case (status instanceof AskForPasswordState):
            return React__default.createElement(AskingPassword, { verifyPasswordFn: status.verifyPasswordFn });
        case (status instanceof WrongPasswordState):
            return React__default.createElement(WrongPassword, { verifyPasswordFn: status.verifyPasswordFn });
        case (status instanceof CompletedState):
            return render(status.doc);
        case (status instanceof FailureState):
            return renderError
                ? renderError(status.error)
                : (React__default.createElement("div", { className: theme.prefixClass + "-doc-error" },
                    React__default.createElement("div", { className: theme.prefixClass + "-doc-error-text" }, status.error.message)));
        case (status instanceof LoadingState):
        default:
            return (React__default.createElement("div", { className: theme.prefixClass + "-doc-loading" },
                React__default.createElement(Spinner, null)));
    }
};

var askingPassword = {
	requirePasswordToOpen: "This document requires a password to open",
	submit: "Submit"
};
var attachment = {
	clickToDownload: "Click to download",
	noAttachment: "There is no attachment"
};
var bookmark = {
	noBookmark: "There is no bookmark"
};
var main = {
	dragDropFile: "Drag and drop a PDF document here"
};
var printProgress = {
	cancel: "Cancel",
	preparingDocument: "Preparing document ..."
};
var property = {
	author: "Author",
	close: "Close",
	creationDate: "Creation date",
	creator: "Creator",
	fileName: "File name",
	fileSize: "File size",
	keywords: "Keywords",
	modificationDate: "Modification date",
	pageCount: "Page count",
	pdfProducer: "PDF producer",
	pdfVersion: "PDF Version",
	subject: "Subject",
	title: "Title"
};
var search = {
	close: "Close",
	enterToSearch: "Enter to search",
	matchCase: "Match case",
	nextMatch: "Next match",
	previousMatch: "Previous match",
	wholeWords: "Whole words"
};
var sidebar = {
	attachment: "Attachment",
	bookmark: "Bookmark",
	thumbnail: "Thumbnail"
};
var toolbar = {
	documentProperties: "Document properties",
	download: "Download",
	fullScreen: "Full screen",
	goToFirstPage: "Go to first page",
	goToLastPage: "Go to last page",
	handTool: "Hand tool",
	horizontalScrolling: "Horizontal scrolling",
	moreActions: "More actions",
	nextPage: "Next page",
	openFile: "Open file",
	previousPage: "Previous page",
	print: "Print",
	rotateBackward: "Rotate counterclockwise",
	rotateForward: "Rotate clockwise",
	search: "Search",
	textSelectionTool: "Text selection tool",
	toggleSidebar: "Toggle sidebar",
	verticalScrolling: "Vertical scrolling",
	zoomIn: "Zoom in",
	zoomOut: "Zoom out",
	wrappedScrolling: "Wrapped scrolling"
};
var wrongPassword = {
	submit: "Submit",
	tryAgain: "The password is wrong. Please try again"
};
var zoom = {
	actualSize: "Actual size",
	pageFit: "Page fit",
	pageWidth: "Page width"
};
var enUs = {
	askingPassword: askingPassword,
	attachment: attachment,
	bookmark: bookmark,
	main: main,
	printProgress: printProgress,
	property: property,
	search: search,
	sidebar: sidebar,
	toolbar: toolbar,
	wrongPassword: wrongPassword,
	zoom: zoom
};

var LocalizationProvider = function (_a) {
    var children = _a.children, localization = _a.localization;
    var defaultL10n = enUs;
    var l10n = localization || defaultL10n;
    return (React__default.createElement(LocalizationContext.Provider, { value: l10n }, children));
};

var ThemeProvider = function (_a) {
    var children = _a.children, prefixClass = _a.prefixClass;
    return (React__default.createElement(ThemeContext.Provider, { value: { prefixClass: prefixClass || 'viewer' } }, children));
};

var Viewer = function (_a) {
    var defaultScale = _a.defaultScale, fileUrl = _a.fileUrl, initialPage = _a.initialPage, keyword = _a.keyword, layout = _a.layout, localization = _a.localization, prefixClass = _a.prefixClass, render = _a.render, renderError = _a.renderError, renderPage = _a.renderPage, _b = _a.selectionMode, selectionMode = _b === void 0 ? SelectionMode$1.Text : _b, _c = _a.onDocumentLoad, onDocumentLoad = _c === void 0 ? function () { } : _c, _d = _a.onZoom, onZoom = _d === void 0 ? function () { } : _d, annotationValue = _a.annotationValue, onPageNumberChange = _a.onPageNumberChange, _e = _a.onNewAnnotation, onNewAnnotation = _e === void 0 ? function () { } : _e, SelectionPopover = _a.SelectionPopover, AnnotationPopover = _a.AnnotationPopover;
    var _f = React__default.useState({
        data: fileUrl,
        name: (typeof fileUrl === 'string') ? fileUrl : '',
    }), file = _f[0], setFile = _f[1];
    var layoutOption = function (isSidebarOpened, container, main, toolbar, sidebar) {
        return defaultLayout(isSidebarOpened, container, main, toolbar(defaultToolbar), sidebar);
    };
    var openFile = function (fileName, data) {
        setFile({
            data: data,
            name: fileName,
        });
    };
    var renderDoc = function (renderViewer) { return function (doc) {
        var renderInner = function (ps) {
            var pageSize = ps;
            return (React__default.createElement(Inner, { defaultScale: defaultScale, doc: doc, file: file, initialPage: initialPage, keyword: keyword, layout: layout || layoutOption, pageSize: pageSize, render: renderViewer, renderPage: renderPage, selectionMode: selectionMode, onDocumentLoad: onDocumentLoad, onOpenFile: openFile, onZoom: onZoom, onPageNumberChange: onPageNumberChange, annotationValue: annotationValue, onNewAnnotation: onNewAnnotation, SelectionPopover: SelectionPopover, AnnotationPopover: AnnotationPopover }));
        };
        return (React__default.createElement(PageSizeCalculator, { doc: doc, render: renderInner }));
    }; };
    React.useEffect(function () {
        setFile({
            data: fileUrl,
            name: (typeof fileUrl === 'string') ? fileUrl : '',
        });
    }, [fileUrl]);
    var defaultRenderer = render || (function (props) { return props.viewer; });
    return (React__default.createElement(ThemeProvider, { prefixClass: prefixClass },
        React__default.createElement(LocalizationProvider, { localization: localization },
            React__default.createElement(DocumentLoader, { file: file.data, render: renderDoc(defaultRenderer), renderError: renderError }))));
};

var Worker = function (_a) {
    var children = _a.children, workerUrl = _a.workerUrl;
    PdfJs.GlobalWorkerOptions.workerSrc = workerUrl;
    return React__default.createElement(React__default.Fragment, null, children);
};

exports.Button = Button;
exports.Icon = Icon;
exports.MenuDivider = MenuDivider;
exports.MenuItem = MenuItem;
exports.Modal = Modal;
exports.Popover = Popover;
exports.Position = Position$1;
exports.PrimaryButton = PrimaryButton;
exports.ProgressBar = ProgressBar;
exports.ScrollMode = ScrollMode$1;
exports.SelectionMode = SelectionMode$1;
exports.Separator = Separator;
exports.SpecialZoomLevel = SpecialZoomLevel$1;
exports.Spinner = Spinner;
exports.Tooltip = Tooltip;
exports.Worker = Worker;
exports.default = Viewer;
exports.defaultLayout = defaultLayout;
exports.defaultToolbar = defaultToolbar;
