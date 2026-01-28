"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatus = exports.getServerTimeZone = exports.getModifiedDateValue = exports.getModifiedDateCell = exports.getManageCommonColumns = exports.getLocalDateTime = exports.getGUITimeFormat = exports.getEllipsisSx = exports.getColumnData = exports.fetchImage = exports.encodeEmailOrMobile = exports.decodeUnicode = exports.convertMilisecondsToTimeFormat = exports.convertDateToEpoch = exports.convertDateBack = exports.convertDate = exports.convertEntities = exports.actionColumn = exports.ShowUserId = exports.ShowStartedDate = void 0;
exports.highlightSearchMatch = highlightSearchMatch;
exports.validateField = exports.updateBrandName = exports.toTitleCase = exports.removeLoginDetailCookies = exports.paginationData = exports.navigateOnQuickSearch = exports.loadProfileImage = exports.isString = exports.isEmpty = exports.homePagePaginationData = void 0;
var _universalCookie = _interopRequireDefault(require("universal-cookie"));
var _Properties = _interopRequireDefault(require("../Config/Properties.json"));
var _API_Helper = require("./ApiConfig/API_Helper");
var _AuthService = require("./ApiConfig/AuthService");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _customParseFormat = _interopRequireDefault(require("dayjs/plugin/customParseFormat"));
var _react = _interopRequireDefault(require("react"));
var _LocalDateTimeComponent = _interopRequireDefault(require("@ui/components/UI/widgets/LocalDateTimeComponent"));
var _material = require("@mui/material");
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[_n++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return a = r.done, r;
    },
    e: function e(r) {
      u = !0, o = r;
    },
    f: function f() {
      try {
        a || null == t["return"] || t["return"]();
      } finally {
        if (u) throw o;
      }
    }
  };
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
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
var isEmpty = exports.isEmpty = function isEmpty(value) {
  return value === null || value === undefined || value === "" || Array.isArray(value) && value.length === 0 || _typeof(value) === "object" && Object.keys(value).length === 0;
};
var getServerTimeZone = exports.getServerTimeZone = function getServerTimeZone() {
  var serverConfig = getReduxState("runtime").serverConfigureProperties;
  if (serverConfig && serverConfig.hasOwnProperty("timeZone")) {
    return serverConfig.timeZone;
  }
};
var getGUITimeFormat = exports.getGUITimeFormat = function getGUITimeFormat() {
  // var serverConfig = getReduxState("runtime").serverConfigureProperties;
  // if (serverConfig && serverConfig.hasOwnProperty("guiTimeFormat")) {
  //   return serverConfig.guiTimeFormat ;
  // }
  return 12;
};
var removeLoginDetailCookies = exports.removeLoginDetailCookies = function removeLoginDetailCookies() {
  var cookies = new _universalCookie["default"]();
  cookies.remove(window.uiTokenName, {
    path: "/"
  });
  cookies.remove("saml-user-attributes", {
    path: "/"
  });
  cookies.remove("seis", {
    path: "/"
  });
  cookies.remove("JSESSIONID", {
    path: "/"
  });
};
var isString = exports.isString = function isString(payload) {
  return typeof payload === "string";
};
var updateBrandName = exports.updateBrandName = function updateBrandName(str) {
  if (typeof str === "string") {
    return str.replaceAll("${BrandName}", _Properties["default"].BrandName);
  }
};
var toTitleCase = exports.toTitleCase = function toTitleCase(str) {
  return str.toLowerCase().split(" ").map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
};
var validateField = exports.validateField = function validateField(name, value) {
  var error = "";
  if (!value.trim()) {
    error = "This field is required.";
  } else {
    switch (name) {
      case "otp":
        if (value.length != 6) error = "".concat(name.toUpperCase(), " must be 6 digits");
        break;
      case "fullName":
      case "lastName":
        if (value.length < 3) error = "".concat("fullname" ? "Name" : name, " must be at least 3 characters.");
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email address.";
        break;
      case "mobile":
        // Accepts optional '+' at the beginning, followed by 7 to 15 digits
        if (!/^\+?\d{9,18}$/.test(value)) {
          error = "Invalid mobile number (must be 7–15 digits, optionally starting with '+').";
        }
        break;
      default:
        break;
    }
  }
  return error;
};
var encodeEmailOrMobile = exports.encodeEmailOrMobile = function encodeEmailOrMobile(mobileOrEmail) {
  if (!mobileOrEmail) return "";
  if (/^\d+$/.test(mobileOrEmail)) {
    // It's a mobile number (digits only)
    var length = mobileOrEmail.length;
    if (length <= 4) {
      return "*".repeat(length); // Fully hide short numbers
    } else if (length <= 6) {
      return "".concat(mobileOrEmail.slice(0, 1)).concat("*".repeat(length - 2));
    } else {
      var hiddenPart = "*".repeat(length - 4);
      return "".concat(mobileOrEmail.slice(0, 1)).concat(hiddenPart).concat(mobileOrEmail.slice(-2));
    }
  } else {
    // It's an email
    var _mobileOrEmail$split = mobileOrEmail.split("@"),
      _mobileOrEmail$split2 = _slicedToArray(_mobileOrEmail$split, 2),
      username = _mobileOrEmail$split2[0],
      domain = _mobileOrEmail$split2[1];
    if (username.length <= 2) {
      return "".concat(username[0]).concat("*".repeat(username.length - 1), "@").concat(domain);
    }
    var _hiddenPart = "*".repeat(username.length - 3); // Hide middle part
    return "".concat(username.slice(0, 2)).concat(_hiddenPart).concat(username.slice(-1), "@").concat(domain);
  }
};
var decodeUnicode = exports.decodeUnicode = function decodeUnicode(jsonString) {
  try {
    // decode both \uXXXX characters and escaped HTML characters
    return JSON.parse("\"".concat(jsonString.replace(/"/g, '\\"'), "\""));
  } catch (err) {
    console.error("Invalid unicode string", err);
    return jsonString;
  }
};
var fetchImage = exports.fetchImage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(imageUrl) {
    var token, response, blob, imageObjectURL;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = (0, _API_Helper.getAuthToken)();
          _context.next = 4;
          return fetch(imageUrl, {
            headers: {
              Authorization: "Bearer ".concat(token)
            }
          });
        case 4:
          response = _context.sent;
          if ((response === null || response === void 0 ? void 0 : response.status) == 401) {
            (0, _AuthService.refreshAccessToken)();
          }
          if (response.ok) {
            _context.next = 8;
            break;
          }
          throw new Error("Image fetch failed");
        case 8:
          _context.next = 10;
          return response.blob();
        case 10:
          blob = _context.sent;
          imageObjectURL = URL.createObjectURL(blob);
          return _context.abrupt("return", imageObjectURL);
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error("Failed to fetch profile image:", _context.t0);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function fetchImage(_x) {
    return _ref.apply(this, arguments);
  };
}();
var loadProfileImage = exports.loadProfileImage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(imageUrl, imageRefreshKey) {
    var key, cached, refreshedUrl, blobUrl;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          key = "profileImageBlob_".concat(imageRefreshKey);
          cached = sessionStorage.getItem(key);
          if (!cached) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", cached);
        case 6:
          refreshedUrl = "".concat(imageUrl, "?t=").concat(imageRefreshKey);
          _context2.next = 9;
          return fetchImage(refreshedUrl);
        case 9:
          blobUrl = _context2.sent;
          sessionStorage.setItem(key, blobUrl);
          return _context2.abrupt("return", blobUrl);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function loadProfileImage(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
_dayjs["default"].extend(_customParseFormat["default"]);
var convertDate = exports.convertDate = function convertDate(date) {
  var parsedDate = (0, _dayjs["default"])(date, "DD/MM/YYYY");
  if (!parsedDate.isValid()) {
    console.error("Invalid date format. Expected DD/MM/YYYY");
  }
  return parsedDate.format("YYYY-MM-DD");
};
var convertDateBack = exports.convertDateBack = function convertDateBack(date) {
  var parsedDate = (0, _dayjs["default"])(date, "YYYY-MM-DD");
  if (!parsedDate.isValid()) {
    console.error("Invalid date format. Expected YYYY-MM-DD");
  }
  return parsedDate.format("DD/MM/YYYY");
};
var paginationData = exports.paginationData = function paginationData(type) {
  return {
    page: 0,
    pageSize: 12,
    pageSizeOptions: [12, 24, 36, 48, 60, 72, 84, 99]
  };
};
var homePagePaginationData = exports.homePagePaginationData = function homePagePaginationData(type) {
  return {
    page: 0,
    pageSize: 5
  };
};
var actionColumn = exports.actionColumn = function actionColumn(actionText) {
  return {
    show: true,
    text: actionText
  };
};
var getColumnData = exports.getColumnData = function getColumnData(row, value) {
  var val = value;
  return /*#__PURE__*/_react["default"].createElement(_material.Tooltip, {
    title: isString(val) && val.length > 10 ? val : ""
  }, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
    sx: {
      textOverflow: "ellipsis"
    },
    className: "custom-span-cellContent"
  }, val));
};
var getModifiedDateValue = exports.getModifiedDateValue = function getModifiedDateValue(row) {
  var _row$original, _row$original2;
  var value = (row === null || row === void 0 || (_row$original = row.original) === null || _row$original === void 0 ? void 0 : _row$original.lastModifiedDate) + " " + (row === null || row === void 0 || (_row$original2 = row.original) === null || _row$original2 === void 0 ? void 0 : _row$original2.lastModifiedTime);
  return /*#__PURE__*/_react["default"].createElement(CustomTooltip, {
    title: value
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "custom-span-cellContent"
  }, value));
};
var navigateOnQuickSearch = exports.navigateOnQuickSearch = function navigateOnQuickSearch(navigate, path, value) {
  navigate({
    pathname: path,
    search: "?query=" + value
  });
};
var getStatus = exports.getStatus = function getStatus(params) {
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      color: params.value === 'Active' ? 'green' : 'gray'
    }
  }, params.value);
};
var getEllipsisSx = exports.getEllipsisSx = function getEllipsisSx(width) {
  return {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    maxWidth: "".concat(width + 10, "px")
  };
};
var getLocalDateTime = exports.getLocalDateTime = function getLocalDateTime(timestamp) {
  var showToday = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var Literal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    today: "Today"
  };
  var dateformat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "MMM dd yyyy";
  if (isEmpty(timestamp)) return "";
  var parsedTimestamp = typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp;

  // Convert timestamp to a localized Date object
  var zonedDate = utcToZonedTime(new Date(parsedTimestamp), Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Get the current year and the timestamp year
  var currentYear = new Date().getFullYear();
  var timestampYear = zonedDate.getFullYear();

  // Adjust date format: Remove year if it matches the current year
  var adjustedDateFormat = currentYear === timestampYear ? "MMM dd" : dateformat;

  // Format date accordingly
  var formattedDate = showToday && isToday(zonedDate) ? Literal.today : format(zonedDate, adjustedDateFormat);
  var timeFormat = getGUITimeFormat() === "12" ? "h:mm:ss a" : "HH:mm:ss";
  var formattedTime = format(zonedDate, timeFormat); // Format time

  return "".concat(formattedDate, " ").concat(formattedTime);
};
var convertMilisecondsToTimeFormat = exports.convertMilisecondsToTimeFormat = function convertMilisecondsToTimeFormat(milliseconds) {
  // Convert to hours, minutes, seconds, and remaining milliseconds
  var hours = Math.floor(milliseconds / 3600000);
  var remainingMs = milliseconds % 3600000;
  var minutes = Math.floor(remainingMs / 60000);
  remainingMs %= 60000;
  var seconds = Math.floor(remainingMs / 1000);
  remainingMs %= 1000;

  // Build the formatted string conditionally
  var timeComponents = [];
  if (hours > 0) {
    timeComponents.push("".concat(hours, " hr"));
  }
  if (minutes > 0 || hours > 0) {
    // Include minutes if hours are present
    timeComponents.push("".concat(minutes, " min"));
  }
  if (seconds > 0 || minutes > 0 || hours > 0) {
    // Include seconds if higher units are present
    timeComponents.push("".concat(seconds, " sec"));
  }
  timeComponents.push("".concat(remainingMs, " ms"));
  return timeComponents.join(" ");
};
var ShowStartedDate = exports.ShowStartedDate = function ShowStartedDate(_ref3) {
  var dateTime = _ref3.dateTime,
    width = _ref3.width,
    _ref3$dateFormat = _ref3.dateFormat,
    dateFormat = _ref3$dateFormat === void 0 ? "MMM dd yyyy" : _ref3$dateFormat;
  var localDateTime = /*#__PURE__*/_react["default"].createElement(_LocalDateTimeComponent["default"], {
    serverTimestamp: dateTime,
    showDateOnly: true,
    dateFormat: dateFormat
  });
  if (dateTime) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      sx: getEllipsisSx(width)
    }, localDateTime));
  }
};
var ShowUserId = exports.ShowUserId = function ShowUserId(_ref4) {
  var userId = _ref4.userId,
    width = _ref4.width;
  if (userId) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_material.Typography, {
      sx: getEllipsisSx(width)
    }, userId));
  }
};
var convertDateToEpoch = exports.convertDateToEpoch = function convertDateToEpoch(dateString) {
  var date = new Date(dateString);
  var epochTimestamp = date.getTime();
  return epochTimestamp;
};
function highlightSearchMatch(celltext, isSearchActive, searchText) {
  var resultText = celltext;
  if (isSearchActive && searchText) {
    var escapedSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var regex = new RegExp("(".concat(escapedSearchText, ")"), "gi");
    resultText = celltext.replace(regex, '<span class="highlight">$1</span>');
  }
  return resultText;
}
var getManageCommonColumns = exports.getManageCommonColumns = function getManageCommonColumns(view, Literal) {
  var commonColumns = [];
  if (!(view.type === "valuemap" || view.type === "ediReport")) {
    // commonColumns.concat(getIdColumnA());
    var accessorKey = nameKeyEntity.includes(view.type) ? "name" : "entityName";
    commonColumns.push({
      accessorKey: accessorKey,
      header: "Name",
      size: 150,
      enableSorting: true,
      enableColumnFilter: false,
      enableColumnOrdering: true,
      enableColumnActions: true,
      Cell: function Cell(_ref5) {
        var renderedCellValue = _ref5.renderedCellValue,
          row = _ref5.row;
        return view.showNameIcon ? /*#__PURE__*/_react["default"].createElement(_material.Stack, {
          width: "100%",
          direction: "row",
          alignItems: "center",
          gap: 1
        }, /*#__PURE__*/_react["default"].createElement(Avatar, {
          className: "grid-item-logo",
          alt: renderedCellValue,
          variant: "rounded",
          src: getAppImageListUrl(row.original)
        }, /*#__PURE__*/_react["default"].createElement(Avatar, {
          className: "fallback-icon",
          alt: "",
          sx: {
            background: "transparent"
          },
          variant: "rounded",
          src: URL_CONFIG_Apps.IMAGE_URL + "/oauthprofile.png"
        })), " ", getColumnData(row, renderedCellValue)) : getColumnData(row, renderedCellValue);
      }
      // renderCell: (params) => getColumnData(params),
      // renderCell: (params) =>  {
      //   var hideType = ["ediReport", "valuemap"];
      //   if (!hideType.includes(view.type)) {
      //     cell.tdCls = "list-action-text-entityName";
      //   }
      //   if (rec.get("servicename") == "PublishedConnectors") {
      //     v = v.substr(0, v.lastIndexOf("_PC"));
      //   }
      //   var column = Ext.get(cell.column.el),
      //     textMetric = new Ext.util.TextMetrics(column);
      //   if (textMetric.getWidth(v) > column.getWidth() - 21) {
      //     cell.tdAttr =
      //       'data-qtip="' +
      //       HelperUtils.wrapText(Ext.String.htmlEncode(v), 40, 2) +
      //       '"';
      //   }
      //   var type = rec.get("type"),
      //     isConnector =
      //       type == "DatabaseDriverInfo" ||
      //       (type == "DatabaseConnectionInfo" &&
      //         !Ext.isEmpty(view.type) &&
      //         view.type != "jdbc") ||
      //       type == "JmsProvider" ||
      //       type == "MLLPConfiguration" ||
      //       type == "OAuthProfile";
      //   return Ext.isEmpty(v)
      //     ? ""
      //     : view.xtype == "accountlist" && !isConnector
      //     ? view.colTpl.apply(rec)
      //     : Ext.util.Format.htmlEncode(v);
      //   return params.value;
      // },
      // listeners: {
      //   scope: view,
      //   click: function (tableview, td, rowIndex, colIndex, e, rec) {
      //     var hideType = ["ediReport", "valuemap", "prebuiltconnector"];
      //     if (!hideType.includes(view.type) && !me.isCopyingText()) {
      //       var configureWrapper =
      //           Ext.ComponentQuery.query("configurewrapper")[0],
      //         configureController = configureWrapper.getController();
      //       rec["viewType"] = view.type;
      //       configureController.onViewMappingObject(rec);
      //     }
      //   },
      // },
    });
    if (!(view.type == "ftp" || view.type == "http" || view.type == "netsuite" || view.type == "oauth" || view.type == "valuemap" || view.type == "ediReport" || view.type == "jdbc" || view.type == "mail" || view.type == "rest")) {
      commonColumns.push({
        accessorKey: "description",
        header: "Description",
        size: 120,
        enableSorting: true,
        enableColumnFilter: false,
        enableColumnOrdering: true,
        enableColumnActions: true,
        Cell: function Cell(_ref6) {
          var renderedCellValue = _ref6.renderedCellValue,
            row = _ref6.row;
          return getColumnData(row, renderedCellValue);
        }
        // sortable: true,
        // renderCell: (params) => getColumnData(params),
        // renderCell: (params) => {
        //   var column = Ext.get(cell.column.el),
        //     textMetric = new Ext.util.TextMetrics(column);
        //   if (textMetric.getWidth(v) > column.getWidth() - 21) {
        //     cell.style = "cursor: pointer;";
        //   }
        //   return Ext.isEmpty(v) ? "" : Ext.util.Format.htmlEncode(v);
        // },
        // listeners: {
        //   click: function (tableview, td, rowIndex, colIndex, e, rec) {
        //     var textMetric = new Ext.util.TextMetrics(Ext.get(e.target)),
        //       column = Ext.get(td);
        //     if (
        //       textMetric.getWidth(rec.get("description")) >
        //       column.getWidth() - 21
        //     ) {
        //       me.showTipCallout(e.target, rec, "description");
        //     }
        //   },
        // }
      });
    }
    // if (!(view.type === "ediReport" || view.type === "project")) {
    //   commonColumns.push({
    //     headerName: "Project",
    //     flex: 0.6,
    //     field: "projectEntityName",
    //     renderCell: (params) => getColumnData(params),
    //     // renderCell: (params) => {
    //     //   HelperUtils.addDataQTip(cell,v);
    //     //   return (Ext.isEmpty(v))?"":Ext.util.Format.htmlEncode(v);
    //     //   },
    //     sortable: false,
    //   });
    // }
    if (view.type == "wsprovider" || view.type == "wssoapprovider") {
      commonColumns.push({
        headerName: "Type",
        flex: 0.5,
        field: "publishMode",
        renderCell: function renderCell(params) {
          return getColumnData(params);
        },
        // renderCell: (params) => {
        //   if (!Ext.isEmpty(v)) {
        //     var val =
        //       v == "standalone"
        //         ? Literal.soapProviderAsPF
        //         : Literal.soapProviderAsTemplate;
        //     HelperUtils.addDataQTip(cell, val);
        //     return val;
        //   }
        //   HelperUtils.addDataQTip(cell, Literal.soapProviderAsPF);
        //   return Literal.soapProviderAsPF;
        // },
        sortable: true
      });
      commonColumns.push({
        text: view.type == "wsprovider" ? "DOCUMENTATION" : "WSDL",
        flex: 1.2,
        // renderCell: (params) => {
        //   if (rec.data.publishType == "rest") {
        //     return view.docTpl.apply(rec.data);
        //   } else {
        //     return view.wsdlTpl.apply(rec.data);
        //   }
        // },
        sortable: false
      });
    }
    if (view.type == "nonediinbound" || view.type == "nonedioutbound") {
      commonColumns.push({
        headerName: "documentType",
        flex: 0.9,
        field: "documentType",
        sortable: true,
        renderCell: function renderCell(params) {
          return getColumnData(params);
        }
        // renderCell: (params) => {
        //   HelperUtils.addDataQTip(cell,v);
        //   return (Ext.isEmpty(v))?"":Ext.util.Format.htmlEncode(v);
        //   },
      }, {
        headerName: "Data Format",
        flex: 0.8,
        field: "formatType",
        sortable: true,
        renderCell: function renderCell(params) {
          return getColumnData(params);
        }
        // renderCell: (params) => {
        //   HelperUtils.addDataQTip(cell,v);
        //   return (Ext.isEmpty(v))?"":Ext.util.Format.htmlEncode(v);
        //   }
      });
    }
    if (!(view.type == "valuemap" || view.type == "ediReport" || view.type == "project")) {
      var _accessorKey = view.type == "jwks_service" ? "createdBy" : "userOwnerEntityName";
      if (view.type == "customEntities") {
        _accessorKey = "userOwnerName";
      }
      commonColumns.push({
        header: "Owner",
        accessorKey: _accessorKey,
        size: view.type == "nonediinbound" || view.type == "nonedioutbound" ? 150 : 120,
        enableSorting: false,
        enableColumnFilter: false,
        enableColumnOrdering: true,
        enableColumnActions: true,
        Cell: function Cell(_ref7) {
          var renderedCellValue = _ref7.renderedCellValue,
            row = _ref7.row;
          return getColumnData(row, renderedCellValue);
        }
      }, {
        header: "Modified",
        size: 120,
        accessorKey: "modifiedDate",
        sortable: true,
        enableSorting: true,
        enableColumnFilter: false,
        enableColumnOrdering: true,
        enableColumnActions: true,
        Cell: function Cell(params) {
          return getModifiedDateCell(params, Literal);
        }
        // valueGetter: (params) => {
        //   return `${params.row.lastModifiedDate || ''} ${params.row.lastModifiedTime || ''}`;
        // },
        // renderCell: (params) => {
        //   if (
        //     listType == "accountlist" ||
        //     view.type == "eventregistryevents" ||
        //     view.type == "filerefrences" ||
        //     view.type == "contentbasedrouting" ||
        //     view.type == "contextdownload" ||
        //     view.type == "contextupload" ||
        //     view.type == "mailnotification" ||
        //     view.type == "storedprocedure" ||
        //     view.type == "positionaldatadictionary" ||
        //     view.type == "routing" ||
        //     view.type == "sapaccounts"
        //   ) {
        //     cell.tdCls = "no-border-list-active";
        //   }
        //   if (
        //     view.type == "emailnotificationformat" ||
        //     view.type == "jwks_service"
        //   ) {
        //     var displayText =
        //       rec.get("recentActivityNumber") +
        //       " " +
        //       rec.get("recentActivityText");
        //     HelperUtils.addDataQTip(cell, displayText);
        //     return (
        //       "<b>" +
        //       rec.get("recentActivityNumber") +
        //       "</b> " +
        //       rec.get("recentActivityText")
        //     );
        //   } else {
        //     var displayText =
        //       rec.get("lastModifiedDate") + " " + rec.get("lastModifiedTime");
        //     HelperUtils.addDataQTip(cell, displayText);
        //     return Ext.isEmpty(v)
        //       ? ""
        //       : "<b>" +
        //           rec.get("lastModifiedDate") +
        //           "</b> " +
        //           rec.get("lastModifiedTime");
        //   }
        // }
      });
    }
    if (view.type == "valuemap") {
      commonColumns.push({
        headerName: "Scope",
        flex: 0.4,
        field: "accessLevel",
        renderCell: function renderCell(params) {
          return getColumnData(params);
        }
        // renderCell: (params) => {
        //   HelperUtils.addDataQTip(cell,v);
        //   return (Ext.isEmpty(v))?"":Ext.util.Format.htmlEncode(v);
        //   }
      });
    }
  }
  return getIdColumnA("", view).concat(commonColumns);
};
var getModifiedDateCell = exports.getModifiedDateCell = function getModifiedDateCell(params) {
  var _params$column, _params$column$getSiz, _params$row;
  var columnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "lastModifiedDate";
  var width = params === null || params === void 0 || (_params$column = params.column) === null || _params$column === void 0 || (_params$column$getSiz = _params$column.getSize) === null || _params$column$getSiz === void 0 ? void 0 : _params$column$getSiz.call(_params$column);
  return /*#__PURE__*/_react["default"].createElement(_material.Stack, {
    direction: "row",
    spacing: 1,
    sx: {
      alignItems: 'center',
      display: 'flex',
      // this is important
      height: '100%' // this ensures it stretches full cell height
    }
  }, /*#__PURE__*/_react["default"].createElement(ShowStartedDate, {
    dateTime: params === null || params === void 0 || (_params$row = params.row) === null || _params$row === void 0 ? void 0 : _params$row[columnName],
    width: width
  }));
};
var convertEntities = exports.convertEntities = function convertEntities(subCategories) {
  var categories = [];
  var _iterator = _createForOfIteratorHelper(subCategories),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var subCategory = _step.value;
      var category = {};
      category["label"] = subCategory === null || subCategory === void 0 ? void 0 : subCategory.name;
      category["value"] = subCategory === null || subCategory === void 0 ? void 0 : subCategory.id;
      categories.push(category);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return categories;
};