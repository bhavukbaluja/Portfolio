"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseTipTapEditor;
var _react = _interopRequireWildcard(require("react"));
var _iconsMaterial = require("@mui/icons-material");
var _material = require("@mui/material");
var _muiTiptap = require("mui-tiptap");
var _Helper = require("@utils/helper/Helper");
var _EditorMenuControls = _interopRequireDefault(require("./EditorMenuControls"));
var _useExtensions = _interopRequireDefault(require("./useExtensions"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var exampleContent = '<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="15" data-label="Axl Rose">@Axl Rose</span> mentions and lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: #ff9900">But wait, </span><span style="color: #403101"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong> Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="https://picsum.photos/600/400" alt="random image" width="350" style="aspect-ratio: 3 / 2"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>';
function fileListToImageFiles(fileList, saveData) {
  return Array.from(fileList).filter(function (file) {
    var mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}
function BaseTipTapEditor(_ref) {
  var prevContent = _ref.prevContent,
    setPrevContent = _ref.setPrevContent,
    saveData = _ref.saveData,
    imageHandleUpload = _ref.imageHandleUpload,
    readOnly = _ref.readOnly;
  setPrevContent(!(0, _Helper.isEmpty)(prevContent) ? prevContent : "");
  var extensions = (0, _useExtensions["default"])({
    placeholder: "Add your own content here..."
  });
  var rteRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    isEditable = _useState2[0],
    setIsEditable = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    showMenuBar = _useState4[0],
    setShowMenuBar = _useState4[1];
  var handleNewImageFiles = (0, _react.useCallback)(function (files, insertPosition) {
    var _rteRef$current;
    if (!((_rteRef$current = rteRef.current) !== null && _rteRef$current !== void 0 && _rteRef$current.editor)) return;
    var attributesForImageFiles = files.map(function (file) {
      return {
        src: URL.createObjectURL(file),
        alt: file.name
      };
    });
    (0, _muiTiptap.insertImages)({
      images: attributesForImageFiles,
      editor: rteRef.current.editor,
      insertPosition: insertPosition
    });
  }, []);
  var handleDrop = (0, _react.useCallback)(function (view, event) {
    if (!(event instanceof DragEvent) || !event.dataTransfer) return false;
    var imageFiles = fileListToImageFiles(event.dataTransfer.files);
    if ((imageFiles === null || imageFiles === void 0 ? void 0 : imageFiles.length) > 0) {
      var _view$posAtCoords;
      var insertPosition = (_view$posAtCoords = view.posAtCoords({
        left: event.clientX,
        top: event.clientY
      })) === null || _view$posAtCoords === void 0 ? void 0 : _view$posAtCoords.pos;
      handleNewImageFiles(imageFiles, insertPosition);
      event.preventDefault();
      return true;
    }
    return false;
  }, [handleNewImageFiles]);
  var handlePaste = (0, _react.useCallback)(function (_view, event) {
    if (!event.clipboardData) return false;
    var pastedImageFiles = fileListToImageFiles(event.clipboardData.files);
    if ((pastedImageFiles === null || pastedImageFiles === void 0 ? void 0 : pastedImageFiles.length) > 0) {
      handleNewImageFiles(pastedImageFiles);
      return true;
    }
    return false;
  }, [handleNewImageFiles]);
  var saveContent = function saveContent() {
    var _rteRef$current$edito, _rteRef$current2;
    var data = (_rteRef$current$edito = (_rteRef$current2 = rteRef.current) === null || _rteRef$current2 === void 0 || (_rteRef$current2 = _rteRef$current2.editor) === null || _rteRef$current2 === void 0 ? void 0 : _rteRef$current2.getHTML()) !== null && _rteRef$current$edito !== void 0 ? _rteRef$current$edito : "";
    setPrevContent(data);
    saveData(data);
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: '25px'
    }
  }, !readOnly && /*#__PURE__*/_react["default"].createElement(_material.Box, {
    sx: {
      "& .ProseMirror": {
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          scrollMarginTop: showMenuBar ? 50 : 0
        }
      }
    }
  }, prevContent ? /*#__PURE__*/_react["default"].createElement(_muiTiptap.RichTextEditor, {
    ref: rteRef,
    extensions: extensions,
    content: prevContent,
    editable: isEditable,
    editorProps: {
      handleDrop: handleDrop,
      handlePaste: handlePaste
    },
    renderControls: function renderControls() {
      return /*#__PURE__*/_react["default"].createElement(_EditorMenuControls["default"], {
        imageHandleUpload: imageHandleUpload
      });
    },
    RichTextFieldProps: {
      variant: "outlined",
      MenuBarProps: {
        hide: !showMenuBar
      },
      footer: /*#__PURE__*/_react["default"].createElement(_material.Stack, {
        direction: "row",
        spacing: 2,
        sx: {
          borderTopStyle: "solid",
          borderTopWidth: 1,
          borderTopColor: function borderTopColor(theme) {
            return theme.palette.divider;
          },
          py: 1,
          px: 1.5
        }
      }, /*#__PURE__*/_react["default"].createElement(_muiTiptap.MenuButton, {
        value: "formatting",
        tooltipLabel: showMenuBar ? "Hide formatting" : "Show formatting",
        size: "small",
        onClick: function onClick() {
          return setShowMenuBar(function (s) {
            return !s;
          });
        },
        selected: showMenuBar,
        IconComponent: _iconsMaterial.TextFields
      }), /*#__PURE__*/_react["default"].createElement(_muiTiptap.MenuButton, {
        value: "formatting",
        tooltipLabel: isEditable ? "Prevent edits (use read-only mode)" : "Allow edits",
        size: "small",
        onClick: function onClick() {
          return setIsEditable(function (s) {
            return !s;
          });
        },
        selected: !isEditable,
        IconComponent: isEditable ? _iconsMaterial.Lock : _iconsMaterial.LockOpen
      }), /*#__PURE__*/_react["default"].createElement(_material.Button, {
        variant: "contained",
        size: "small",
        onClick: saveContent
      }, "Save"))
    }
  }, function () {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_muiTiptap.LinkBubbleMenu, null), /*#__PURE__*/_react["default"].createElement(_muiTiptap.TableBubbleMenu, null));
  }) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Loading Editor.....")), /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    variant: "h5",
    sx: {
      mt: 5,
      textAlign: 'center'
    }
  }, "Saved result:"), /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    sx: {
      mb: 2,
      textAlign: 'center'
    }
  }, "(Read-only saved snapshot)"), prevContent ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_material.Box, {
    mt: 3
  }, /*#__PURE__*/_react["default"].createElement(_muiTiptap.RichTextReadOnly, {
    content: prevContent,
    extensions: extensions
  }))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "Loading Content...."));
}