"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleAxiosError = handleAxiosError;
var _literals = _interopRequireDefault(require("@ui/src/literals"));
var _Helper = require("./Helper");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function handleAxiosError(response, lang) {
  var _response$data;
  // Handle the error (e.g., show a modal, toast, or alert)
  var isDuplicate = (0, _Helper.isString)(response === null || response === void 0 ? void 0 : response.data) && (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.indexOf(_literals["default"].duplicateMsgKey)) > -1;
  if ((response === null || response === void 0 ? void 0 : response.status) >= 500 || (response === null || response === void 0 ? void 0 : response.status) == 404) {
    // store.dispatch(
    //   setError({
    //     title: getTitle(response),
    //     openDialog: true,
    //     message: response?.data,
    //     msgArray: showBullets(),
    //   })
    // );
  }
  function getTitle() {
    if (isDuplicate) {
      return _literals["default"][lang].alert;
    } else {
      return _literals["default"][lang].failed;
    }
  }
  function showBullets() {
    if (isDuplicate) {
      return "";
    } else {
      return [_literals["default"][lang].technicalGlitch, _literals["default"].contactSupport];
    }
  }
}