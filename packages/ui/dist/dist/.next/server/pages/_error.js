"use strict";

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var e = {};
  e.id = 731, e.ids = [220, 731], e.modules = {
    361: function _(e) {
      e.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
    },
    1227: function _(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), !function (e, t) {
        for (var r in t) Object.defineProperty(e, r, {
          enumerable: !0,
          get: t[r]
        });
      }(t, {
        NEXT_REQUEST_META: function NEXT_REQUEST_META() {
          return r;
        },
        addRequestMeta: function addRequestMeta() {
          return a;
        },
        getRequestMeta: function getRequestMeta() {
          return n;
        },
        removeRequestMeta: function removeRequestMeta() {
          return i;
        },
        setRequestMeta: function setRequestMeta() {
          return o;
        }
      });
      var r = Symbol["for"]("NextInternalRequestMeta");
      function n(e, t) {
        var n = e[r] || {};
        return "string" == typeof t ? n[t] : n;
      }
      function o(e, t) {
        return e[r] = t, t;
      }
      function a(e, t, r) {
        var a = n(e);
        return a[t] = r, o(e, a);
      }
      function i(e, t) {
        var r = n(e);
        return delete r[t], o(e, r);
      }
    },
    1499: function _(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), Object.defineProperty(t, "warnOnce", {
        enumerable: !0,
        get: function get() {
          return r;
        }
      });
      var r = function r(e) {};
    },
    2015: function _(e) {
      e.exports = require("react");
    },
    3410: function _(e, t) {
      Object.defineProperty(t, "M", {
        enumerable: !0,
        get: function get() {
          return function e(t, r) {
            return r in t ? t[r] : "then" in t && "function" == typeof t.then ? t.then(function (t) {
              return e(t, r);
            }) : "function" == typeof t && "default" === r ? t : void 0;
          };
        }
      });
    },
    3873: function _(e) {
      e.exports = require("path");
    },
    4850: function _(e, t) {
      Object.defineProperty(t, "A", {
        enumerable: !0,
        get: function get() {
          return r;
        }
      });
      var r = function (e) {
        return e.PAGES = "PAGES", e.PAGES_API = "PAGES_API", e.APP_PAGE = "APP_PAGE", e.APP_ROUTE = "APP_ROUTE", e.IMAGE = "IMAGE", e;
      }({});
    },
    6086: function _(e, t, r) {
      r.r(t), r.d(t, {
        config: function config() {
          return g;
        },
        "default": function _default() {
          return c;
        },
        getServerSideProps: function getServerSideProps() {
          return h;
        },
        getStaticPaths: function getStaticPaths() {
          return f;
        },
        getStaticProps: function getStaticProps() {
          return p;
        },
        reportWebVitals: function reportWebVitals() {
          return y;
        },
        routeModule: function routeModule() {
          return x;
        },
        unstable_getServerProps: function unstable_getServerProps() {
          return P;
        },
        unstable_getServerSideProps: function unstable_getServerSideProps() {
          return v;
        },
        unstable_getStaticParams: function unstable_getStaticParams() {
          return _;
        },
        unstable_getStaticPaths: function unstable_getStaticPaths() {
          return b;
        },
        unstable_getStaticProps: function unstable_getStaticProps() {
          return m;
        }
      });
      var n = r(2636),
        o = r(4850),
        a = r(3410),
        i = r(2150),
        l = r.n(i),
        u = r(7326),
        s = r.n(u),
        d = r(9585);
      var c = (0, a.M)(d, "default"),
        p = (0, a.M)(d, "getStaticProps"),
        f = (0, a.M)(d, "getStaticPaths"),
        h = (0, a.M)(d, "getServerSideProps"),
        g = (0, a.M)(d, "config"),
        y = (0, a.M)(d, "reportWebVitals"),
        m = (0, a.M)(d, "unstable_getStaticProps"),
        b = (0, a.M)(d, "unstable_getStaticPaths"),
        _ = (0, a.M)(d, "unstable_getStaticParams"),
        P = (0, a.M)(d, "unstable_getServerProps"),
        v = (0, a.M)(d, "unstable_getServerSideProps"),
        x = new n.PagesRouteModule({
          definition: {
            kind: o.A.PAGES,
            page: "/_error",
            pathname: "/_error",
            bundlePath: "",
            filename: ""
          },
          components: {
            App: s(),
            Document: l()
          },
          userland: d
        });
    },
    6450: function _(e, t, r) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), Object.defineProperty(t, "default", {
        enumerable: !0,
        get: function get() {
          return i;
        }
      });
      var n = r(2015),
        o = function o() {},
        a = function a() {};
      function i(e) {
        var t;
        var r = e.headManager,
          i = e.reduceComponentsToState;
        function l() {
          if (r && r.mountedInstances) {
            var _t = n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));
            r.updateHead(i(_t, e));
          }
        }
        return null == r || null == (t = r.mountedInstances) || t.add(e.children), l(), o(function () {
          var t;
          return null == r || null == (t = r.mountedInstances) || t.add(e.children), function () {
            var t;
            null == r || null == (t = r.mountedInstances) || t["delete"](e.children);
          };
        }), o(function () {
          return r && (r._pendingUpdate = l), function () {
            r && (r._pendingUpdate = l);
          };
        }), a(function () {
          return r && r._pendingUpdate && (r._pendingUpdate(), r._pendingUpdate = null), function () {
            r && r._pendingUpdate && (r._pendingUpdate(), r._pendingUpdate = null);
          };
        }), null;
      }
    },
    6460: function _(e, t) {
      function r(e) {
        if ("function" != typeof WeakMap) return null;
        var t = new WeakMap(),
          n = new WeakMap();
        return (r = function r(e) {
          return e ? n : t;
        })(e);
      }
      t._ = function (e, t) {
        if (!t && e && e.__esModule) return e;
        if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
          "default": e
        };
        var n = r(t);
        if (n && n.has(e)) return n.get(e);
        var o = {
            __proto__: null
          },
          a = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in e) if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
          var l = a ? Object.getOwnPropertyDescriptor(e, i) : null;
          l && (l.get || l.set) ? Object.defineProperty(o, i, l) : o[i] = e[i];
        }
        return o["default"] = e, n && n.set(e, o), o;
      };
    },
    7326: function _(e, t, r) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), Object.defineProperty(t, "default", {
        enumerable: !0,
        get: function get() {
          return u;
        }
      });
      var n = r(8485),
        o = r(8732),
        a = n._(r(2015)),
        i = r(7108);
      function l(_x) {
        return _l.apply(this, arguments);
      }
      function _l() {
        _l = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
          var t, r;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                t = e.Component, r = e.ctx;
                _context.next = 3;
                return (0, i.loadGetInitialProps)(t, r);
              case 3:
                _context.t0 = _context.sent;
                return _context.abrupt("return", {
                  pageProps: _context.t0
                });
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return _l.apply(this, arguments);
      }
      var u = /*#__PURE__*/function (_a$default$Component) {
        function u() {
          _classCallCheck(this, u);
          return _callSuper(this, u, arguments);
        }
        _inherits(u, _a$default$Component);
        return _createClass(u, [{
          key: "render",
          value: function render() {
            var _this$props = this.props,
              e = _this$props.Component,
              t = _this$props.pageProps;
            return (0, o.jsx)(e, _objectSpread({}, t));
          }
        }]);
      }(a["default"].Component);
      u.origGetInitialProps = l, u.getInitialProps = l, ("function" == typeof t["default"] || "object" == _typeof(t["default"]) && null !== t["default"]) && void 0 === t["default"].__esModule && (Object.defineProperty(t["default"], "__esModule", {
        value: !0
      }), Object.assign(t["default"], t), e.exports = t["default"]);
    },
    8044: function _(e, t, r) {
      e.exports = r(2636).vendored.contexts.HeadManagerContext;
    },
    8147: function _(e, t) {
      function r(e) {
        var _ref = void 0 === e ? {} : e,
          _ref$ampFirst = _ref.ampFirst,
          t = _ref$ampFirst === void 0 ? !1 : _ref$ampFirst,
          _ref$hybrid = _ref.hybrid,
          r = _ref$hybrid === void 0 ? !1 : _ref$hybrid,
          _ref$hasQuery = _ref.hasQuery,
          n = _ref$hasQuery === void 0 ? !1 : _ref$hasQuery;
        return t || r && n;
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), Object.defineProperty(t, "isInAmpMode", {
        enumerable: !0,
        get: function get() {
          return r;
        }
      });
    },
    8398: function _(e, t, r) {
      e.exports = r(2636).vendored.contexts.AmpContext;
    },
    8732: function _(e) {
      e.exports = require("react/jsx-runtime");
    },
    9079: function _(e, t, r) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), !function (e, t) {
        for (var r in t) Object.defineProperty(e, r, {
          enumerable: !0,
          get: t[r]
        });
      }(t, {
        "default": function _default() {
          return g;
        },
        defaultHead: function defaultHead() {
          return c;
        }
      });
      var n = r(8485),
        o = r(6460),
        a = r(8732),
        i = o._(r(2015)),
        l = n._(r(6450)),
        u = r(8398),
        s = r(8044),
        d = r(8147);
      function c(e) {
        void 0 === e && (e = !1);
        var t = [(0, a.jsx)("meta", {
          charSet: "utf-8"
        }, "charset")];
        return e || t.push((0, a.jsx)("meta", {
          name: "viewport",
          content: "width=device-width"
        }, "viewport")), t;
      }
      function p(e, t) {
        return "string" == typeof t || "number" == typeof t ? e : t.type === i["default"].Fragment ? e.concat(i["default"].Children.toArray(t.props.children).reduce(function (e, t) {
          return "string" == typeof t || "number" == typeof t ? e : e.concat(t);
        }, [])) : e.concat(t);
      }
      r(1499);
      var f = ["name", "httpEquiv", "charSet", "itemProp"];
      function h(e, t) {
        var r = t.inAmpMode;
        return e.reduce(p, []).reverse().concat(c(r).reverse()).filter(function () {
          var e = new Set(),
            t = new Set(),
            r = new Set(),
            n = {};
          return function (o) {
            var a = !0,
              i = !1;
            if (o.key && "number" != typeof o.key && o.key.indexOf("$") > 0) {
              i = !0;
              var _t2 = o.key.slice(o.key.indexOf("$") + 1);
              e.has(_t2) ? a = !1 : e.add(_t2);
            }
            switch (o.type) {
              case "title":
              case "base":
                t.has(o.type) ? a = !1 : t.add(o.type);
                break;
              case "meta":
                for (var _e = 0, _t3 = f.length; _e < _t3; _e++) {
                  var _t4 = f[_e];
                  if (o.props.hasOwnProperty(_t4)) if ("charSet" === _t4) r.has(_t4) ? a = !1 : r.add(_t4);else {
                    var _e2 = o.props[_t4],
                      _r = n[_t4] || new Set();
                    ("name" !== _t4 || !i) && _r.has(_e2) ? a = !1 : (_r.add(_e2), n[_t4] = _r);
                  }
                }
            }
            return a;
          };
        }()).reverse().map(function (e, t) {
          var n = e.key || t;
          if (process.env.__NEXT_OPTIMIZE_FONTS && !r && "link" === e.type && e.props.href && ["https://fonts.googleapis.com/css", "https://use.typekit.net/"].some(function (t) {
            return e.props.href.startsWith(t);
          })) {
            var _t5 = _objectSpread({}, e.props || {});
            return _t5["data-href"] = _t5.href, _t5.href = void 0, _t5["data-optimized-fonts"] = !0, i["default"].cloneElement(e, _t5);
          }
          return i["default"].cloneElement(e, {
            key: n
          });
        });
      }
      var g = function g(e) {
        var t = e.children,
          r = (0, i.useContext)(u.AmpStateContext),
          n = (0, i.useContext)(s.HeadManagerContext);
        return (0, a.jsx)(l["default"], {
          reduceComponentsToState: h,
          headManager: n,
          inAmpMode: (0, d.isInAmpMode)(r),
          children: t
        });
      };
      ("function" == typeof t["default"] || "object" == _typeof(t["default"]) && null !== t["default"]) && void 0 === t["default"].__esModule && (Object.defineProperty(t["default"], "__esModule", {
        value: !0
      }), Object.assign(t["default"], t), e.exports = t["default"]);
    },
    9585: function _(e, t, r) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), Object.defineProperty(t, "default", {
        enumerable: !0,
        get: function get() {
          return d;
        }
      });
      var n = r(8485),
        o = r(8732),
        a = n._(r(2015)),
        i = n._(r(9079)),
        l = {
          400: "Bad Request",
          404: "This page could not be found",
          405: "Method Not Allowed",
          500: "Internal Server Error"
        };
      function u(e) {
        var t,
          n = e.req,
          o = e.res,
          a = e.err,
          i = o && o.statusCode ? o.statusCode : a ? a.statusCode : 404;
        if (n) {
          var _r2 = r(1227),
            _e3 = _r2.getRequestMeta,
            _o = _e3(n, "initURL");
          _o && (t = new URL(_o).hostname);
        }
        return {
          statusCode: i,
          hostname: t
        };
      }
      var s = {
        error: {
          fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
          height: "100vh",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        },
        desc: {
          lineHeight: "48px"
        },
        h1: {
          display: "inline-block",
          margin: "0 20px 0 0",
          paddingRight: 23,
          fontSize: 24,
          fontWeight: 500,
          verticalAlign: "top"
        },
        h2: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "28px"
        },
        wrap: {
          display: "inline-block"
        }
      };
      var d = /*#__PURE__*/function (_a$default$Component2) {
        function d() {
          _classCallCheck(this, d);
          return _callSuper(this, d, arguments);
        }
        _inherits(d, _a$default$Component2);
        return _createClass(d, [{
          key: "render",
          value: function render() {
            var _this$props2 = this.props,
              e = _this$props2.statusCode,
              _this$props2$withDark = _this$props2.withDarkMode,
              t = _this$props2$withDark === void 0 ? !0 : _this$props2$withDark,
              r = this.props.title || l[e] || "An unexpected error has occurred";
            return (0, o.jsxs)("div", {
              style: s.error,
              children: [(0, o.jsx)(i["default"], {
                children: (0, o.jsx)("title", {
                  children: e ? e + ": " + r : "Application error: a client-side exception has occurred"
                })
              }), (0, o.jsxs)("div", {
                style: s.desc,
                children: [(0, o.jsx)("style", {
                  dangerouslySetInnerHTML: {
                    __html: "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}" + (t ? "@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}" : "")
                  }
                }), e ? (0, o.jsx)("h1", {
                  className: "next-error-h1",
                  style: s.h1,
                  children: e
                }) : null, (0, o.jsx)("div", {
                  style: s.wrap,
                  children: (0, o.jsxs)("h2", {
                    style: s.h2,
                    children: [this.props.title || e ? r : (0, o.jsxs)(o.Fragment, {
                      children: ["Application error: a client-side exception has occurred", " ", !!this.props.hostname && (0, o.jsxs)(o.Fragment, {
                        children: ["while loading ", this.props.hostname]
                      }), " ", "(see the browser console for more information)"]
                    }), "."]
                  })
                })]
              })]
            });
          }
        }]);
      }(a["default"].Component);
      d.displayName = "ErrorPage", d.getInitialProps = u, d.origGetInitialProps = u, ("function" == typeof t["default"] || "object" == _typeof(t["default"]) && null !== t["default"]) && void 0 === t["default"].__esModule && (Object.defineProperty(t["default"], "__esModule", {
        value: !0
      }), Object.assign(t["default"], t), e.exports = t["default"]);
    }
  };
  var t = require("../webpack-runtime.js");
  t.C(e);
  var r = function r(e) {
      return t(t.s = e);
    },
    n = t.X(0, [150], function () {
      return r(6086);
    });
  module.exports = n;
})();