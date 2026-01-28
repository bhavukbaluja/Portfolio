"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
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
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
exports.id = 418, exports.ids = [418], exports.modules = {
  2053: function _() {},
  2081: function _(e, r, o) {
    "use strict";

    o.d(r, {
      A: function A() {
        return c;
      }
    });
    var t = o(8732),
      a = o(2015);
    !function () {
      var e = Error("Cannot find module 'react-phone-input-2'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }(), function () {
      var e = Error("Cannot find module 'react-phone-input-2/lib/style.css'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var n = o(3987),
      i = o.n(n),
      l = o(1155),
      s = o(1819),
      d = o(9029);
    !function () {
      var e = Error("Cannot find module '@base-ui-components/react/field'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var c = function c(_ref) {
      var e = _ref.formData,
        r = _ref.setFormData,
        o = _ref.errors,
        n = _ref.setErrors,
        c = _ref.required,
        m = _ref.label,
        u = _ref.description,
        p = _ref.name;
      var _ref2 = (0, a.useContext)(s.s),
        b = _ref2.lang;
      return (0, d.Im)(e === null || e === void 0 ? void 0 : e.mobile) && r(function (e) {
        return _objectSpread(_objectSpread({}, e), {}, {
          mobile: "+91"
        });
      }), (0, t.jsx)(Object(function () {
        var e = Error("Cannot find module '@base-ui-components/react/field'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }()).Root, {
        name: p,
        className: i().Field,
        children: (0, t.jsxs)("div", {
          className: i().mobileContainer,
          children: [(0, t.jsxs)("label", {
            className: i().phoneInputLabel,
            children: [m ? l.A[b][m] || m : l.A[b].mobile, c && (0, t.jsx)("span", {
              className: i().red_icon,
              children: "*"
            })]
          }), (0, t.jsx)("div", {
            className: i().mobileInputField,
            children: (0, t.jsx)(Object(function () {
              var e = Error("Cannot find module 'react-phone-input-2'");
              throw e.code = "MODULE_NOT_FOUND", e;
            }()), {
              country: "in",
              value: e === null || e === void 0 ? void 0 : e.mobile,
              focusBlur: !1,
              onChange: function onChange(e, o) {
                var t = "",
                  a = e.replace(/[^0-9]/g, ""),
                  i = "+".concat(a);
                r(function (e) {
                  return _objectSpread(_objectSpread({}, e), {}, {
                    mobile: i
                  });
                });
                var l = a.slice(o.dialCode.length);
                l.trim() ? /^\d{7,15}$/.test(l) || (t = "Invalid mobile number (7-15 digits required).") : c && (t = "This field is required."), n(function (e) {
                  var r = _objectSpread({}, e);
                  return r.hasOwnProperty("mobile") && delete r.mobile, t && (r.mobile = t), r;
                });
              },
              inputProps: {
                name: "mobile",
                required: c,
                id: "mobile",
                tabIndex: -1
              },
              containerClass: i().phoneInputContainer,
              inputClass: i().phoneInputField,
              buttonClass: i().flagDropdown,
              dropdownClass: i().countryList,
              autoFormat: !0,
              disableDropdown: !1,
              countryCodeEditable: !1,
              specialLabel: ""
            })
          }), (0, t.jsx)(Object(function () {
            var e = Error("Cannot find module '@base-ui-components/react/field'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()).Description, {
            className: (0, d.Im)(o.mobile) ? i().Description : i().Error,
            children: (0, d.Im)(o.mobile) ? l.A[b][u] || u : o.mobile
          })]
        })
      });
    };
  },
  2918: function _() {
    throw Error("Module parse failed: Unexpected token (66:4)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n|   return (\n>     <AuthContext.Provider value={{ \n|       user, \n|       setUser, ");
  },
  5411: function _(e, r, o) {
    "use strict";

    o.r(r), o.d(r, {
      "default": function _default() {
        return b;
      }
    });
    var t = o(8732),
      a = o(2015),
      n = o(1155),
      i = o(9029),
      l = o(3039),
      s = o(2650),
      d = o(3987),
      c = o.n(d);
    !function () {
      var e = Error("Cannot find module 'mui-one-time-password-input'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var m = function m(_ref3) {
      var e = _ref3.value,
        r = _ref3.handleChange,
        o = _ref3.id,
        a = _ref3.errorMsg,
        n = _ref3.required;
      return (0, t.jsxs)("div", {
        className: c().mobileContainer,
        children: [(0, t.jsx)(Object(function () {
          var e = Error("Cannot find module 'mui-one-time-password-input'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          value: e,
          onChange: r,
          id: o,
          required: n,
          length: 6
        }), a && (0, t.jsx)("span", {
          className: (0, i.Im)(a) ? c().Description : c().ErrorForMobile,
          children: (0, t.jsx)("p", {
            children: a
          })
        })]
      });
    };
    var u = o(1370),
      p = o(2918);
    !function () {
      var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var b = function b(_ref4) {
      var e = _ref4.lang,
        r = _ref4.loading,
        o = _ref4.setLoading,
        d = _ref4.value,
        c = _ref4.showSnackBar,
        b = _ref4.setOpenAlert,
        h = _ref4.setAlertMsg,
        O = _ref4.PreOtp,
        f = _ref4.resendOTP,
        v = _ref4.loadingParam,
        N = _ref4.setDialogOpen,
        g = _ref4.action,
        j = _ref4.setChildren,
        x = _ref4.setImageRefreshKey;
      var _ref5 = (0, a.useState)(O || ""),
        _ref6 = _slicedToArray(_ref5, 2),
        _ = _ref6[0],
        C = _ref6[1],
        _ref7 = (0, a.useState)(""),
        _ref8 = _slicedToArray(_ref7, 2),
        w = _ref8[0],
        E = _ref8[1],
        _ref9 = (0, l.G)(),
        D = _ref9.validateOtp,
        _ref10 = (0, a.useContext)(p.AuthContext),
        U = _ref10.setLogin,
        T = (0, u.A)();
      (0, a.useEffect)(function () {
        d && _ && A(d, _);
      }, [d]);
      var A = /*#__PURE__*/function () {
        var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(r, t) {
          var a, l;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                a = (0, i.jr)("otp", t);
                if (!(E(a), !(0, i.Im)(a))) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return");
              case 3:
                o(!0);
                l = {};
                l.otp = t;
                l.mobileOrEmail = r;
                _context.next = 9;
                return D(s.JV, l).then(function (r) {
                  if ((0, i.Im)(r === null || r === void 0 ? void 0 : r.status) || r !== null && r !== void 0 && r.status && (r === null || r === void 0 ? void 0 : r.status) < 300) {
                    if (r !== null && r !== void 0 && r.accessToken && r !== null && r !== void 0 && r.userInfo) {
                      var _e = r.accessToken,
                        _o = r.userInfo;
                      U(JSON.parse(_o), _e), N(!1);
                    }
                    j([n.A[e].otpChild1, n.A[e].otpChild2, n.A[e].otpChild3, n.A[e].otpChild4]), "signup" == g ? r ? (c(n.A[e].signedUp), N(!1), T("/")) : (b(!0), h(n.A[e].failedToSignUp)) : (g = "login", r ? (c(n.A[e].loggedIn), N(!1), T("/")) : (b(!0), h(n.A[e].failedToLogIn)));
                  }
                  x(Date.now());
                })["catch"](function (e) {});
              case 9:
                o(!1);
              case 10:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function A(_x, _x2) {
          return _ref11.apply(this, arguments);
        };
      }();
      return (0, t.jsx)(t.Fragment, {
        children: (0, t.jsxs)(Object(function () {
          var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          className: "signup-login",
          sx: {
            justifyContent: "space-between",
            gap: "100px",
            marginTop: "50px"
          },
          children: [(0, t.jsxs)("div", {
            className: "verify-login",
            children: [(0, t.jsx)("div", {
              children: n.A[e].enterOTP.replace("{value}", (0, i.CT)(d))
            }), (0, t.jsx)("div", {
              children: (0, t.jsx)(m, {
                id: "otp-input",
                label: "otp",
                name: "otp",
                required: !0,
                placeHolderText: "otpPlaceholder",
                value: _,
                handleChange: function handleChange(e) {
                  var _e$target, _e$target2;
                  var r, o;
                  e !== null && e !== void 0 && e.target ? (r = e === null || e === void 0 || (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.name, o = e === null || e === void 0 || (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.value) : o = e, C(o), (0, i.Im)(r) && (r = "otp"), E((0, i.jr)(r, o));
                },
                errorMsg: w
              })
            })]
          }), (0, t.jsxs)("div", {
            className: "form-button-container",
            children: [(0, t.jsx)("button", {
              disabled: r && "resend" == v,
              type: "submit",
              className: "form-button",
              onClick: function onClick() {
                return f(d);
              },
              children: r && "resend" == v ? n.A[e].resendingOTP : n.A[e].resendOTP
            }), (0, t.jsx)("button", {
              disabled: r && "submit" == v,
              type: "submit",
              className: "form-button",
              onClick: function onClick() {
                return A(d, _);
              },
              children: r && "submit" == v ? n.A[e].submittingOTP : n.A[e].submitOTP
            })]
          })]
        })
      });
    };
  },
  9051: function _(e, r, o) {
    "use strict";

    o.d(r, {
      A: function A() {
        return d;
      }
    });
    var t = o(8732),
      a = o(2015);
    !function () {
      var e = Error("Cannot find module '@base-ui-components/react/radio'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }(), function () {
      var e = Error("Cannot find module '@base-ui-components/react/radio-group'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var n = o(3987),
      i = o.n(n),
      l = o(1155),
      s = o(1819);
    function d(_ref12) {
      var _ref12$options = _ref12.options,
        e = _ref12$options === void 0 ? [] : _ref12$options,
        r = _ref12.defaultValue,
        o = _ref12.value,
        n = _ref12.onChange,
        d = _ref12.title,
        _ref12$className = _ref12.className,
        c = _ref12$className === void 0 ? "" : _ref12$className,
        m = _ref12.dress,
        u = _ref12.sx;
      var _a$useContext = a.useContext(s.s),
        p = _a$useContext.lang;
      return (0, t.jsxs)(t.Fragment, {
        children: [d && (0, t.jsx)("div", {
          className: i().Label,
          id: "radio-group-label",
          children: l.A[p][d] || d
        }), (0, t.jsx)(Object(function () {
          var e = Error("Cannot find module '@base-ui-components/react/radio-group'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          "aria-labelledby": "radio-group-label",
          defaultValue: r,
          value: o,
          onValueChange: n,
          className: "".concat(i().RadioGroup, " ").concat(c),
          sx: u,
          children: e.map(function (_ref13) {
            var e = _ref13.label,
              r = _ref13.value;
            var o = m || !1;
            return (0, t.jsxs)("label", {
              className: i().Item,
              children: [(0, t.jsx)(Object(function () {
                var e = Error("Cannot find module '@base-ui-components/react/radio'");
                throw e.code = "MODULE_NOT_FOUND", e;
              }()).Root, {
                value: r,
                className: o ? i().DressRadio : i().Radio,
                children: (0, t.jsx)(Object(function () {
                  var e = Error("Cannot find module '@base-ui-components/react/radio'");
                  throw e.code = "MODULE_NOT_FOUND", e;
                }()).Indicator, {
                  className: o ? i().Indicator : i().RadioIndicator
                })
              }), l.A[p][e] || e]
            }, r);
          })
        })]
      });
    }
  },
  9418: function _(e, r, o) {
    "use strict";

    o.r(r), o.d(r, {
      "default": function _default() {
        return O;
      }
    });
    var t = o(8732),
      a = o(2015),
      n = o.n(a);
    !function () {
      var e = Error("Cannot find module 'react-phone-input-2/lib/style.css'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var i = o(674),
      l = o(9051);
    o(2053);
    var s = o(2081),
      d = o(1155),
      c = o(1819),
      m = o(2650),
      u = o(9029);
    !function () {
      var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var p = o(3039),
      b = o(5411);
    !function () {
      var e = Error("Cannot find module 'react-router-dom'");
      throw e.code = "MODULE_NOT_FOUND", e;
    }();
    var h = o(2918);
    var O = function O(_ref14) {
      var e = _ref14.loading,
        r = _ref14.setAlertTitle,
        o = _ref14.setLoading,
        O = _ref14.setAlertMsg,
        f = _ref14.setOpenAlert,
        v = _ref14.setChildren,
        N = _ref14.showSnackBar,
        g = _ref14.setDialogOpen,
        j = _ref14.action,
        x = _ref14.setImageRefreshKey;
      var _n$useContext = n().useContext(c.s),
        _ = _n$useContext.lang,
        _ref15 = (0, p.G)(),
        C = _ref15.login,
        _ref16 = (0, a.useState)("submit"),
        _ref17 = _slicedToArray(_ref16, 2),
        w = _ref17[0],
        E = _ref17[1],
        _ref18 = (0, a.useState)({}),
        _ref19 = _slicedToArray(_ref18, 2),
        D = _ref19[0],
        U = _ref19[1],
        _Object = Object(function () {
          var e = Error("Cannot find module 'react-router-dom'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }())(),
        _Object2 = _slicedToArray(_Object, 1),
        T = _Object2[0],
        _ref20 = (0, a.useContext)(h.AuthContext),
        A = _ref20.setLogin,
        _ref21 = (0, a.useState)({
          email: "",
          mobile: "",
          password: "",
          otp: ""
        }),
        _ref22 = _slicedToArray(_ref21, 2),
        F = _ref22[0],
        I = _ref22[1],
        _ref23 = (0, a.useState)("email"),
        _ref24 = _slicedToArray(_ref23, 2),
        M = _ref24[0],
        L = _ref24[1],
        _ref25 = (0, a.useState)(""),
        _ref26 = _slicedToArray(_ref25, 2),
        y = _ref26[0],
        P = _ref26[1],
        _ref27 = (0, a.useState)(""),
        _ref28 = _slicedToArray(_ref27, 2),
        S = _ref28[0],
        k = _ref28[1],
        q = function q(e) {
          var _e$target3 = e.target,
            r = _e$target3.name,
            o = _e$target3.value;
          I(function (e) {
            return _objectSpread(_objectSpread({}, e), {}, _defineProperty({}, r, o));
          }), U(function (e) {
            var t = _objectSpread({}, e);
            r in t && delete t[r];
            var a = (0, u.jr)(r, o);
            return a && (t[r] = a), _objectSpread({}, t);
          });
        },
        R = function R() {
          var e = {};
          return Object.keys(F).forEach(function (r) {
            var _F$r;
            if ("countryCode" !== r) {
              var _o2 = (0, u.jr)(r, F[r]);
              (0, u.Im)(_o2) || (e[r] = _o2);
            }
            ((_F$r = F[r]) === null || _F$r === void 0 ? void 0 : _F$r.toString().trim()) || (e[r] = "This field is required.");
          }), e;
        },
        H = /*#__PURE__*/function () {
          var _ref29 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
            var r, t;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  e.preventDefault(), o(!0), "mobile" == M ? (delete F.email, r = F === null || F === void 0 ? void 0 : F.mobile) : "email" == M && (delete F.mobile, r = F === null || F === void 0 ? void 0 : F.email), "otp" == S && delete F.password, delete F.otp;
                  t = R();
                  if (!(U(t), Object.keys(t).length > 0)) {
                    _context2.next = 4;
                    break;
                  }
                  return _context2.abrupt("return", void o(!1));
                case 4:
                  G(r);
                case 5:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          return function H(_x3) {
            return _ref29.apply(this, arguments);
          };
        }(),
        z = function z(e, r) {
          F !== null && F !== void 0 && F.hasOwnProperty(e) || (F[e] = ""), "selected" == r ? L(e) : "selectedPassword" == r && k(e);
        },
        $ = /*#__PURE__*/function () {
          var _ref30 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  o(!0);
                  E("resend");
                  _context3.next = 4;
                  return G(e);
                case 4:
                  E("submit");
                case 5:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          return function $(_x4) {
            return _ref30.apply(this, arguments);
          };
        }(),
        G = /*#__PURE__*/function () {
          var _ref31 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {
            var r;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  r = {};
                  r.password = F.password;
                  r.mobileOrEmail = e || F.email || F.mobile;
                  _context4.next = 5;
                  return C(m.Mh, r).then(function (e) {
                    if (e !== null && e !== void 0 && e.accessToken && e !== null && e !== void 0 && e.userInfo) {
                      var _r = e.accessToken,
                        _o3 = e.userInfo;
                      A(JSON.parse(_o3), _r), x(Date.now()), g(!1);
                    }
                    N((e === null || e === void 0 ? void 0 : e.message) || e), P(e);
                  })["catch"](function (e) {});
                case 5:
                  o(!1);
                case 6:
                case "end":
                  return _context4.stop();
              }
            }, _callee4);
          }));
          return function G(_x5) {
            return _ref31.apply(this, arguments);
          };
        }();
      return (0, t.jsx)(t.Fragment, {
        children: (0, u.Im)(y) && (0, u.Im)(T.get("mobileOrEmail")) ? (0, t.jsxs)(Object(function () {
          var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          className: "signup-login",
          onSubmit: H,
          children: [(0, t.jsx)(l.A, {
            options: [{
              label: "email",
              value: "email"
            }, {
              label: "mobile",
              value: "mobile"
            }],
            value: M,
            onChange: function onChange(e) {
              return z(e, "selected");
            },
            dress: !0
          }), "email" === M ? (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsx)(i.A, {
              id: "email-input",
              label: "Email",
              name: "email",
              required: !0,
              placeHolderText: "emailPlaceHolder",
              value: F.email,
              onChange: q,
              errorMsg: D.email
            }), "otp" == S && (0, t.jsxs)("div", {
              children: [(0, t.jsx)("b", {
                children: "Note:"
              }), " ", d.A[_].receiveOTP.replace("{0}", "Email")]
            })]
          }) : (0, t.jsxs)(t.Fragment, {
            children: [(0, t.jsx)("div", {
              className: "mobile-container",
              children: (0, t.jsx)(s.A, {
                formData: F,
                setFormData: I,
                errors: D,
                setErrors: U,
                required: !0
              })
            }), "otp" == S && (0, t.jsxs)("div", {
              children: [(0, t.jsx)("b", {
                children: "Note:"
              }), " ", d.A[_].receiveOTP.replace("{0}", "Mobile no")]
            })]
          }), (0, t.jsx)(l.A, {
            options: [{
              label: "otp",
              value: "otp"
            }, {
              label: "password",
              value: "password"
            }],
            value: S,
            onChange: function onChange(e) {
              return z(e, "selectedPassword");
            }
          }), "password" == S && (0, t.jsx)(i.A, {
            id: "password-input",
            label: "password",
            name: "password",
            required: !0,
            type: "password",
            placeHolderText: "passwordPlaceHolder",
            value: F.password,
            onChange: q,
            errorMsg: D.password
          }), (0, t.jsx)("div", {
            className: "form-button-container",
            children: (0, t.jsx)("button", {
              disabled: e || "email" == M && !(0, u.Im)((0, u.jr)("email", F === null || F === void 0 ? void 0 : F.email)) || "mobile" == M && !(0, u.Im)((0, u.jr)("mobile", F === null || F === void 0 ? void 0 : F.mobile)) || "" == S || "password" == S && !(0, u.Im)((0, u.jr)("password", F === null || F === void 0 ? void 0 : F.password)),
              type: "submit",
              className: "form-button",
              onClick: H,
              children: e ? d.A[_].logingin : d.A[_].login
            })
          })]
        }) : "otp" == S && (0, t.jsx)(b["default"], {
          lang: _,
          setLoading: o,
          loading: e,
          value: (0, u.Im)(T.get("mobileOrEmail")) ? "mobile" == M ? F === null || F === void 0 ? void 0 : F.mobile : F === null || F === void 0 ? void 0 : F.email : T.get("mobileOrEmail"),
          showSnackBar: N,
          setAlertMsg: O,
          setAlertTitle: r,
          setOpenAlert: f,
          PreOtp: T.get("otp"),
          resendOTP: $,
          loadingParam: w,
          setDialogOpen: g,
          action: "login",
          setChildren: v
        })
      });
    };
  }
};