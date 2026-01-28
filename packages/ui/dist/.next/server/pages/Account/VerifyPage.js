"use strict";

(() => {
  var e = {};
  e.id = 298, e.ids = [220, 298], e.modules = {
    361: e => {
      e.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
    },
    2015: e => {
      e.exports = require("react");
    },
    3410: (e, t) => {
      Object.defineProperty(t, "M", {
        enumerable: !0,
        get: function () {
          return function e(t, r) {
            return r in t ? t[r] : "then" in t && "function" == typeof t.then ? t.then(t => e(t, r)) : "function" == typeof t && "default" === r ? t : void 0;
          };
        }
      });
    },
    3873: e => {
      e.exports = require("path");
    },
    4850: (e, t) => {
      Object.defineProperty(t, "A", {
        enumerable: !0,
        get: function () {
          return r;
        }
      });
      var r = function (e) {
        return e.PAGES = "PAGES", e.PAGES_API = "PAGES_API", e.APP_PAGE = "APP_PAGE", e.APP_ROUTE = "APP_ROUTE", e.IMAGE = "IMAGE", e;
      }({});
    },
    7326: (e, t, r) => {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), Object.defineProperty(t, "default", {
        enumerable: !0,
        get: function () {
          return s;
        }
      });
      let n = r(8485),
        a = r(8732),
        o = n._(r(2015)),
        u = r(7108);
      async function i(e) {
        let {
          Component: t,
          ctx: r
        } = e;
        return {
          pageProps: await (0, u.loadGetInitialProps)(t, r)
        };
      }
      class s extends o.default.Component {
        render() {
          let {
            Component: e,
            pageProps: t
          } = this.props;
          return (0, a.jsx)(e, {
            ...t
          });
        }
      }
      s.origGetInitialProps = i, s.getInitialProps = i, ("function" == typeof t.default || "object" == typeof t.default && null !== t.default) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
        value: !0
      }), Object.assign(t.default, t), e.exports = t.default);
    },
    7935: (e, t, r) => {
      r.r(t), r.d(t, {
        config: () => S,
        default: () => f,
        getServerSideProps: () => b,
        getStaticPaths: () => _,
        getStaticProps: () => g,
        reportWebVitals: () => M,
        routeModule: () => h,
        unstable_getServerProps: () => E,
        unstable_getServerSideProps: () => O,
        unstable_getStaticParams: () => v,
        unstable_getStaticPaths: () => A,
        unstable_getStaticProps: () => m
      });
      var n = {};
      r.r(n), r.d(n, {
        default: () => p
      });
      var a = r(2636),
        o = r(4850),
        u = r(3410),
        i = r(2150),
        s = r.n(i),
        l = r(7326),
        d = r.n(l),
        P = r(8732),
        c = r(2015);
      !function () {
        var e = Error("Cannot find module '../../../HomePage'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      let p = ({
          isMobile: e,
          onLoginSignupVerify: t
        }) => ((0, c.useEffect)(() => {
          t();
        }, []), (0, P.jsx)(Object(function () {
          var e = Error("Cannot find module '../../../HomePage'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          isMobile: e
        })),
        f = (0, u.M)(n, "default"),
        g = (0, u.M)(n, "getStaticProps"),
        _ = (0, u.M)(n, "getStaticPaths"),
        b = (0, u.M)(n, "getServerSideProps"),
        S = (0, u.M)(n, "config"),
        M = (0, u.M)(n, "reportWebVitals"),
        m = (0, u.M)(n, "unstable_getStaticProps"),
        A = (0, u.M)(n, "unstable_getStaticPaths"),
        v = (0, u.M)(n, "unstable_getStaticParams"),
        E = (0, u.M)(n, "unstable_getServerProps"),
        O = (0, u.M)(n, "unstable_getServerSideProps"),
        h = new a.PagesRouteModule({
          definition: {
            kind: o.A.PAGES,
            page: "/Account/VerifyPage",
            pathname: "/Account/VerifyPage",
            bundlePath: "",
            filename: ""
          },
          components: {
            App: d(),
            Document: s()
          },
          userland: n
        });
    },
    8732: e => {
      e.exports = require("react/jsx-runtime");
    }
  };
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = e => t(t.s = e),
    n = t.X(0, [150], () => r(7935));
  module.exports = n;
})();