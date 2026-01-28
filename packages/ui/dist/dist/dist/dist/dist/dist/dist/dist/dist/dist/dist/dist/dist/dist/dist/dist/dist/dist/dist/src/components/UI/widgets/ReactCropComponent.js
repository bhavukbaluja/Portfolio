"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ReactCropComponent;
var _material = require("@mui/material");
var _react = _interopRequireWildcard(require("react"));
var _reactImageCrop = _interopRequireWildcard(require("react-image-crop"));
require("react-image-crop/dist/ReactCrop.css");
var _useDebounceEffect = require("../../../../../utils/src/helper/hooks/useDebounceEffect");
var _literals = _interopRequireDefault(require("../../../literals"));
var _LanguageProvider = require("../../../literals/LanguageProvider");
var _ImageServices2 = require("../../../../../utils/src/services/ImageServices");
var _BaseDialog = _interopRequireDefault(require("../fields/BaseDialog"));
var _canvasPreview = require("./canvasPreview");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
    "default": e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n["default"] = e, t && t.set(e, n), n;
}
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
/* Aspect Cropper Function */
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return (0, _reactImageCrop.centerCrop)((0, _reactImageCrop.makeAspectCrop)({
    unit: "%",
    width: 100 // Show full image width initially
  }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight);
}
function ReactCropComponent(_ref) {
  var _ref$show = _ref.show,
    show = _ref$show === void 0 ? false : _ref$show,
    imgSrc = _ref.imgSrc,
    setImgSrc = _ref.setImgSrc,
    onHandlecropSave = _ref.onHandlecropSave,
    setImageRefreshKey = _ref.setImageRefreshKey,
    aspectRatio = _ref.aspectRatio,
    setShow = _ref.setShow,
    setLoading = _ref.setLoading;
  var _ImageServices = (0, _ImageServices2.ImageServices)(),
    postImageforUrl = _ImageServices.postImageforUrl;
  var _React$useContext = _react["default"].useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  var previewCanvasRefLg = (0, _react.useRef)(null);
  var previewCanvasRefSm = (0, _react.useRef)(null);
  var imgRef = (0, _react.useRef)(null);
  var blobUrlRef = (0, _react.useRef)("");
  var _useState = (0, _react.useState)(),
    _useState2 = _slicedToArray(_useState, 2),
    crop = _useState2[0],
    setCrop = _useState2[1];
  var _useState3 = (0, _react.useState)(),
    _useState4 = _slicedToArray(_useState3, 2),
    completedCrop = _useState4[0],
    setCompletedCrop = _useState4[1];
  var _useState5 = (0, _react.useState)(1),
    _useState6 = _slicedToArray(_useState5, 2),
    scale = _useState6[0],
    setScale = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    rotate = _useState8[0],
    setRotate = _useState8[1];
  var aspect = aspectRatio || 1;

  // Aspect ratio cropping function
  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return (0, _reactImageCrop.centerCrop)((0, _reactImageCrop.makeAspectCrop)({
      unit: "%",
      width: 100 // Show full image width initially
    }, aspect, mediaWidth, mediaHeight), mediaWidth, mediaHeight);
  }

  // On Image Load handler
  function onImageLoad(e) {
    var _e$currentTarget = e.currentTarget,
      width = _e$currentTarget.width,
      height = _e$currentTarget.height;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  // Download cropped image
  function onDownloadCropClick() {
    return _onDownloadCropClick.apply(this, arguments);
  } // Use debounced effect to optimize the image preview
  function _onDownloadCropClick() {
    _onDownloadCropClick = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var image, previewCanvas, scaleX, scaleY, offscreen, ctx, absoluteCrop, blob, imageUploadResponse;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            image = imgRef.current;
            previewCanvas = previewCanvasRefLg.current;
            if (!(!image || !previewCanvas || !completedCrop)) {
              _context2.next = 4;
              break;
            }
            throw new Error("Crop canvas does not exist");
          case 4:
            scaleX = image.naturalWidth / image.width;
            scaleY = image.naturalHeight / image.height;
            offscreen = new OffscreenCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);
            ctx = offscreen.getContext("2d");
            if (ctx) {
              _context2.next = 10;
              break;
            }
            throw new Error("No 2d context");
          case 10:
            absoluteCrop = {
              unit: completedCrop.unit,
              x: completedCrop.x * scaleX,
              y: completedCrop.y * scaleY,
              height: completedCrop.height * scaleY,
              width: completedCrop.width * scaleX
            };
            ctx.drawImage(previewCanvas, 0, 0, previewCanvas.width, previewCanvas.height, 0, 0, offscreen.width, offscreen.height);
            // Convert to blob and upload
            _context2.next = 14;
            return offscreen.convertToBlob({
              type: "image/png"
            });
          case 14:
            blob = _context2.sent;
            if (blobUrlRef.current) {
              URL.revokeObjectURL(blobUrlRef.current);
            }
            setLoading(true);
            blobUrlRef.current = URL.createObjectURL(blob);
            _context2.next = 20;
            return postImageforUrl(blobUrlRef.current, blob);
          case 20:
            imageUploadResponse = _context2.sent;
            if (!(imageUploadResponse.status === 200)) {
              _context2.next = 27;
              break;
            }
            _context2.next = 24;
            return onHandlecropSave(imageUploadResponse.data.imgurl, crop, absoluteCrop);
          case 24:
            setImgSrc(null);
            setShow(false);
            setLoading(false);
          case 27:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return _onDownloadCropClick.apply(this, arguments);
  }
  (0, _useDebounceEffect.useDebounceEffect)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (completedCrop !== null && completedCrop !== void 0 && completedCrop.width && completedCrop !== null && completedCrop !== void 0 && completedCrop.height && imgRef.current) {
            (0, _canvasPreview.canvasPreview)(imgRef.current, previewCanvasRefLg.current, completedCrop, scale, rotate);
            (0, _canvasPreview.canvasPreview)(imgRef.current, previewCanvasRefSm.current, completedCrop, scale, rotate);
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), 100, [completedCrop, show, scale, rotate]);

  // Close the image modal
  var handleClose = function handleClose() {
    setImgSrc(null);
    setShow(false);
  };
  return /*#__PURE__*/_react["default"].createElement(_BaseDialog["default"], {
    open: show,
    isAlert: false,
    setOpen: setShow,
    title: _literals["default"][lang].adjustImage,
    bodyComponent: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        gap: 2,
        width: '100%',
        height: 'auto',
        paddingBottom: '10px'
      }
    }, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      variant: "body2",
      sx: {
        fontSize: "14px",
        color: "var(--secondarytext-color)"
      }
    }, _literals["default"][lang].dragSqrToChangeImgSizePos)), /*#__PURE__*/_react["default"].createElement(_material.Grid2, {
      container: true,
      spacing: 2,
      wrap: "nowrap",
      sx: {
        width: "100%",
        maxHeight: "70vh",
        padding: "0px 10px",
        overflow: "auto",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'space-around',
        flexWrap: "nowrap" // extra safety
      }
    }, /*#__PURE__*/_react["default"].createElement(_material.Grid2, {
      item: true,
      xs: 9
    }, /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        maxHeight: "65vh",
        overflow: "auto",
        background: "ghostwhite",
        borderRadius: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/_react["default"].createElement(_reactImageCrop["default"], {
      crop: crop,
      onChange: function onChange(_, percentCrop) {
        return setCrop(percentCrop);
      },
      onComplete: function onComplete(c) {
        return setCompletedCrop(c);
      },
      aspect: aspect,
      style: {
        maxHeight: "70vh"
      },
      imgStyle: {
        maxHeight: "70vh",
        objectFit: "contain",
        display: "block"
      }
    }, /*#__PURE__*/_react["default"].createElement("img", {
      ref: imgRef,
      src: imgSrc,
      onLoad: onImageLoad,
      style: {
        maxWidth: "100%",
        height: "auto",
        transform: "scale(".concat(scale, ") rotate(").concat(rotate, "deg)")
      }
    })))), /*#__PURE__*/_react["default"].createElement(_material.Grid2, {
      item: true,
      xs: 3,
      sx: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        maxWidth: "25%" // optional safety net
      }
    }, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      variant: "h6"
    }, _literals["default"][lang].preview), /*#__PURE__*/_react["default"].createElement("canvas", {
      ref: previewCanvasRefLg,
      style: {
        width: "100%",
        // height: "100%",
        background: "ghostwhite",
        border: "1px solid #d4d4d4",
        borderRadius: 4,
        objectFit: "fit"
      }
    }), /*#__PURE__*/_react["default"].createElement("canvas", {
      ref: previewCanvasRefSm,
      style: {
        width: 80,
        height: 80,
        background: "ghostwhite",
        border: "1px solid #d4d4d4",
        borderRadius: 4,
        objectFit: "contain"
      }
    })))),
    button: /*#__PURE__*/_react["default"].createElement(_material.Box, {
      sx: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 2,
        paddingTop: '20px'
      }
    }, /*#__PURE__*/_react["default"].createElement("button", {
      type: "button",
      className: "form-skip-button",
      onClick: handleClose
    }, _literals["default"][lang].cancel), /*#__PURE__*/_react["default"].createElement("button", {
      type: "submit",
      className: "form-button",
      onClick: onDownloadCropClick
    }, _literals["default"][lang].save))
  });
}