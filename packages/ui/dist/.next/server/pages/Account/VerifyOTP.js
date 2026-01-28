(() => {
  var e = {};
  e.id = 742, e.ids = [220, 742], e.modules = {
    361: e => {
      "use strict";

      e.exports = require("next/dist/compiled/next-server/pages.runtime.prod.js");
    },
    1144: (e, t, s) => {
      "use strict";

      s.r(t), s.d(t, {
        config: () => h,
        default: () => c,
        getServerSideProps: () => b,
        getStaticPaths: () => p,
        getStaticProps: () => m,
        reportWebVitals: () => j,
        routeModule: () => f,
        unstable_getServerProps: () => x,
        unstable_getServerSideProps: () => U,
        unstable_getStaticParams: () => v,
        unstable_getStaticPaths: () => _,
        unstable_getStaticProps: () => g
      });
      var n = s(2636),
        a = s(4850),
        r = s(3410),
        o = s(2150),
        i = s.n(o),
        l = s(7326),
        d = s.n(l),
        u = s(5411);
      let c = (0, r.M)(u, "default"),
        m = (0, r.M)(u, "getStaticProps"),
        p = (0, r.M)(u, "getStaticPaths"),
        b = (0, r.M)(u, "getServerSideProps"),
        h = (0, r.M)(u, "config"),
        j = (0, r.M)(u, "reportWebVitals"),
        g = (0, r.M)(u, "unstable_getStaticProps"),
        _ = (0, r.M)(u, "unstable_getStaticPaths"),
        v = (0, r.M)(u, "unstable_getStaticParams"),
        x = (0, r.M)(u, "unstable_getServerProps"),
        U = (0, r.M)(u, "unstable_getServerSideProps"),
        f = new n.PagesRouteModule({
          definition: {
            kind: a.A.PAGES,
            page: "/Account/VerifyOTP",
            pathname: "/Account/VerifyOTP",
            bundlePath: "",
            filename: ""
          },
          components: {
            App: d(),
            Document: i()
          },
          userland: u
        });
    },
    2015: e => {
      "use strict";

      e.exports = require("react");
    },
    2918: () => {
      throw Error("Module parse failed: Unexpected token (66:4)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| \n|   return (\n>     <AuthContext.Provider value={{ \n|       user, \n|       setUser, ");
    },
    3039: (e, t, s) => {
      "use strict";

      s.d(t, {
        G: () => a
      });
      var n = s(4233);
      let a = () => {
        let {
          CallApi: e
        } = (0, n.w)();
        return {
          getAboutUs: async (t, s) => await e(t, "GET", s),
          register: async (t, s) => await e(t, "POST", s),
          validateOtp: async (t, s) => await e(t, "POST", s),
          login: async (t, s) => await e(t, "POST", s),
          updateAboutUs: async (t, s) => await e(t, "POST", s),
          updateDetails: async (t, s) => await e(t, "POST", s)
        };
      };
    },
    3873: e => {
      "use strict";

      e.exports = require("path");
    },
    3987: () => {
      throw Error("Module build failed (from ../../node_modules/next/dist/compiled/sass-loader/cjs.js):\nError: Cannot find module 'sass'\nRequire stack:\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/sass-loader/cjs.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/loader-runner/LoaderRunner.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/webpack/bundle5.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/webpack/webpack.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/shared/lib/get-webpack-bundler.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/build/compiler.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/build/webpack-build/impl.js\n- /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/jest-worker/processChild.js\n    at Function.<anonymous> (node:internal/modules/cjs/loader:1244:15)\n    at /Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/server/require-hook.js:55:36\n    at Function._load (node:internal/modules/cjs/loader:1070:27)\n    at TracingChannel.traceSync (node:diagnostics_channel:322:14)\n    at wrapModuleLoad (node:internal/modules/cjs/loader:217:24)\n    at Module.<anonymous> (node:internal/modules/cjs/loader:1335:12)\n    at mod.require (/Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/server/require-hook.js:65:28)\n    at require (node:internal/modules/helpers:136:16)\n    at 438 (/Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/sass-loader/cjs.js:1:12362)\n    at __nccwpck_require__ (/Users/bhavukbaluja/Documents/E-Com-Website/UI/node_modules/next/dist/compiled/sass-loader/cjs.js:1:14176)");
    },
    5411: (e, t, s) => {
      "use strict";

      s.r(t), s.d(t, {
        default: () => b
      });
      var n = s(8732),
        a = s(2015),
        r = s(1155),
        o = s(9029),
        i = s(3039),
        l = s(2650),
        d = s(3987),
        u = s.n(d);
      !function () {
        var e = Error("Cannot find module 'mui-one-time-password-input'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      let c = ({
        value: e,
        handleChange: t,
        id: s,
        errorMsg: a,
        required: r
      }) => (0, n.jsxs)("div", {
        className: u().mobileContainer,
        children: [(0, n.jsx)(Object(function () {
          var e = Error("Cannot find module 'mui-one-time-password-input'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }()), {
          value: e,
          onChange: t,
          id: s,
          required: r,
          length: 6
        }), a && (0, n.jsx)("span", {
          className: (0, o.Im)(a) ? u().Description : u().ErrorForMobile,
          children: (0, n.jsx)("p", {
            children: a
          })
        })]
      });
      var m = s(1370),
        p = s(2918);
      !function () {
        var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
        throw e.code = "MODULE_NOT_FOUND", e;
      }();
      let b = ({
        lang: e,
        loading: t,
        setLoading: s,
        value: d,
        showSnackBar: u,
        setOpenAlert: b,
        setAlertMsg: h,
        PreOtp: j,
        resendOTP: g,
        loadingParam: _,
        setDialogOpen: v,
        action: x,
        setChildren: U,
        setImageRefreshKey: f
      }) => {
        let [C, P] = (0, a.useState)(j || ""),
          [S, k] = (0, a.useState)(""),
          {
            validateOtp: w
          } = (0, i.G)(),
          {
            setLogin: O
          } = (0, a.useContext)(p.AuthContext),
          E = (0, m.A)();
        (0, a.useEffect)(() => {
          d && C && D(d, C);
        }, [d]);
        let D = async (t, n) => {
          let a = (0, o.jr)("otp", n);
          if (k(a), !(0, o.Im)(a)) return;
          s(!0);
          let i = {};
          i.otp = n, i.mobileOrEmail = t, await w(l.JV, i).then(t => {
            if ((0, o.Im)(t?.status) || t?.status && t?.status < 300) {
              if (t?.accessToken && t?.userInfo) {
                let {
                  accessToken: e,
                  userInfo: s
                } = t;
                O(JSON.parse(s), e), v(!1);
              }
              U([r.A[e].otpChild1, r.A[e].otpChild2, r.A[e].otpChild3, r.A[e].otpChild4]), "signup" == x ? t ? (u(r.A[e].signedUp), v(!1), E("/")) : (b(!0), h(r.A[e].failedToSignUp)) : (x = "login", t ? (u(r.A[e].loggedIn), v(!1), E("/")) : (b(!0), h(r.A[e].failedToLogIn)));
            }
            f(Date.now());
          }).catch(e => {}), s(!1);
        };
        return (0, n.jsx)(n.Fragment, {
          children: (0, n.jsxs)(Object(function () {
            var e = Error("Cannot find module '__barrel_optimize__?names=FormControl!=!@mui/material'");
            throw e.code = "MODULE_NOT_FOUND", e;
          }()), {
            className: "signup-login",
            sx: {
              justifyContent: "space-between",
              gap: "100px",
              marginTop: "50px"
            },
            children: [(0, n.jsxs)("div", {
              className: "verify-login",
              children: [(0, n.jsx)("div", {
                children: r.A[e].enterOTP.replace("{value}", (0, o.CT)(d))
              }), (0, n.jsx)("div", {
                children: (0, n.jsx)(c, {
                  id: "otp-input",
                  label: "otp",
                  name: "otp",
                  required: !0,
                  placeHolderText: "otpPlaceholder",
                  value: C,
                  handleChange: e => {
                    let t, s;
                    e?.target ? (t = e?.target?.name, s = e?.target?.value) : s = e, P(s), (0, o.Im)(t) && (t = "otp"), k((0, o.jr)(t, s));
                  },
                  errorMsg: S
                })
              })]
            }), (0, n.jsxs)("div", {
              className: "form-button-container",
              children: [(0, n.jsx)("button", {
                disabled: t && "resend" == _,
                type: "submit",
                className: "form-button",
                onClick: () => g(d),
                children: t && "resend" == _ ? r.A[e].resendingOTP : r.A[e].resendOTP
              }), (0, n.jsx)("button", {
                disabled: t && "submit" == _,
                type: "submit",
                className: "form-button",
                onClick: () => D(d, C),
                children: t && "submit" == _ ? r.A[e].submittingOTP : r.A[e].submitOTP
              })]
            })]
          })
        });
      };
    },
    8732: e => {
      "use strict";

      e.exports = require("react/jsx-runtime");
    }
  };
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var s = e => t(t.s = e),
    n = t.X(0, [150, 775], () => s(1144));
  module.exports = n;
})();