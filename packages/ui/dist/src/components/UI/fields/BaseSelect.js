"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseSelect;
var React = _interopRequireWildcard(require("react"));
var _field = require("@base-ui-components/react/field");
var _BaseModule = _interopRequireDefault(require("./Base.module.scss"));
var _literals = _interopRequireDefault(require("@ui/literals"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
var _Helper = require("@utils/helper/Helper");
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _Autocomplete = _interopRequireDefault(require("@mui/material/Autocomplete"));
var _BaseTextField = _interopRequireDefault(require("./BaseTextField2"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function BaseSelect(_ref) {
  var label = _ref.label,
    placeHolderText = _ref.placeHolderText,
    description = _ref.description,
    errorMsg = _ref.errorMsg,
    required = _ref.required,
    sx = _ref.sx,
    name = _ref.name,
    value = _ref.value,
    _onChange = _ref.onChange,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    onBlur = _ref.onBlur,
    onFocus = _ref.onFocus,
    disabled = _ref.disabled;
  var _React$useContext = React.useContext(_LanguageProvider.LanguageContext),
    lang = _React$useContext.lang;
  return /*#__PURE__*/React.createElement(_field.Field.Root, {
    name: name,
    className: _BaseModule["default"].Field,
    sx: sx
  }, /*#__PURE__*/React.createElement(_field.Field.Label, {
    className: _BaseModule["default"].Label
  }, _literals["default"][lang][label] || label, required && /*#__PURE__*/React.createElement("span", {
    className: _BaseModule["default"].red_icon
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: _BaseModule["default"].inputWrapper
  }, /*#__PURE__*/React.createElement(_Autocomplete["default"], {
    fullWidth: true,
    value: value || null,
    disabled: disabled,
    onChange: function onChange(event, newValue) {
      _onChange({
        target: {
          name: name,
          value: newValue
        }
      });
    },
    sx: {
      '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
        padding: '4px 4px 5px 5px'
      }
    },
    onBlur: onBlur,
    onFocus: onFocus,
    options: options,
    getOptionLabel: function getOptionLabel(option) {
      return (option === null || option === void 0 ? void 0 : option.label) || '';
    },
    renderOption: function renderOption(props, option) {
      return /*#__PURE__*/React.createElement("li", _extends({}, props, {
        key: option.value
      }), option.label);
    }
    // className={styles.Input}
    ,
    isOptionEqualToValue: function isOptionEqualToValue(option, val) {
      return (option === null || option === void 0 ? void 0 : option.value) === (val === null || val === void 0 ? void 0 : val.value);
    },
    renderInput: function renderInput(params) {
      return /*#__PURE__*/React.createElement(_TextField["default"], _extends({}, params, {
        placeholder: _literals["default"][lang][placeHolderText] || placeHolderText,
        className: _BaseModule["default"].Input,
        error: !(0, _Helper.isEmpty)(errorMsg),
        sx: {
          '& input': {
            border: '0px'
          },
          '& label': {
            fontFamily: '"Merriweather", serif'
          }
        }
      }));
    }
  })), /*#__PURE__*/React.createElement(_field.Field.Description, {
    className: !(0, _Helper.isEmpty)(errorMsg) ? _BaseModule["default"].Error : _BaseModule["default"].Description
  }, !(0, _Helper.isEmpty)(errorMsg) ? errorMsg : _literals["default"][lang][description] || description));
}