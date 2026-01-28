"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _components = require("./components");
Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _components[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});
var _pages = require("./pages");
Object.keys(_pages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _pages[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pages[key];
    }
  });
});
var _literals = require("./literals");
Object.keys(_literals).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _literals[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _literals[key];
    }
  });
});
var _assets = require("./assets");
Object.keys(_assets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _assets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _assets[key];
    }
  });
});