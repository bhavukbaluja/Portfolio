"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setError = exports.removeError = void 0;
var _error = require("./error.types");
var setError = exports.setError = function setError(data) {
  return {
    type: _error.SETERROR,
    payload: data
  };
};
var removeError = exports.removeError = function removeError() {
  return {
    type: _error.REMOVEERROR
  };
};