"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseList;
var _react = _interopRequireWildcard(require("react"));
var _xDataGrid = require("@mui/x-data-grid");
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _material = require("@mui/material");
var _MoreHorizOutlined = _interopRequireDefault(require("@mui/icons-material/MoreHorizOutlined"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
    "default": e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n["default"] = e, t && t.set(e, n), n;
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
} // import { paginationData } from "_helpers/helper";
function BaseList(props) {
  var _props$data, _props$data4, _props$data5;
  var _useState = (0, _react.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    rowModesModel = _useState2[0],
    setRowModesModel = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    tableColumns = _useState4[0],
    setTableColumns = _useState4[1];
  var _useState5 = (0, _react.useState)((props === null || props === void 0 || (_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data.totalRowsCount) || 0),
    _useState6 = _slicedToArray(_useState5, 2),
    rowCountState = _useState6[0],
    setRowCountState = _useState6[1];
  var contructTableColumns = function contructTableColumns(data) {
    if (Array.isArray(props === null || props === void 0 ? void 0 : props.columns)) {
      var _props$actions;
      var tempTableCols = props.columns;
      if (props !== null && props !== void 0 && (_props$actions = props.actions) !== null && _props$actions !== void 0 && _props$actions.show) {
        var _tempTableCols;
        if (((_tempTableCols = tempTableCols[(tempTableCols === null || tempTableCols === void 0 ? void 0 : tempTableCols.length) - 1]) === null || _tempTableCols === void 0 ? void 0 : _tempTableCols.field) !== "actions") {
          var _props$actions2;
          var actionCol = {
            field: 'actions',
            type: 'actions',
            headerName: props === null || props === void 0 || (_props$actions2 = props.actions) === null || _props$actions2 === void 0 ? void 0 : _props$actions2.text,
            width: 80,
            cellClassName: 'actions',
            getActions: function getActions(_ref) {
              var _rowModesModel$id;
              var id = _ref.id;
              var isInEditMode = ((_rowModesModel$id = rowModesModel[id]) === null || _rowModesModel$id === void 0 ? void 0 : _rowModesModel$id.mode) === _xDataGrid.GridRowModes.Edit;
              return [/*#__PURE__*/_react["default"].createElement(_xDataGrid.GridActionsCellItem, {
                key: id,
                icon: /*#__PURE__*/_react["default"].createElement(_MoreHorizOutlined["default"], null),
                label: "Edit",
                className: "textPrimary",
                onClick: function onClick(e) {
                  props.handleActionClick(id);
                },
                color: "inherit"
              })];
            }
          };
          tempTableCols.push(actionCol);
        }
      }
      setTableColumns(tempTableCols);
    }
  };
  _react["default"].useEffect(function () {
    contructTableColumns((props === null || props === void 0 ? void 0 : props.data) || []);
    setRowCountState(function (prevRowCountState) {
      var _props$data2, _props$data3;
      return (props === null || props === void 0 || (_props$data2 = props.data) === null || _props$data2 === void 0 ? void 0 : _props$data2.totalRowsCount) !== undefined ? props === null || props === void 0 || (_props$data3 = props.data) === null || _props$data3 === void 0 ? void 0 : _props$data3.totalRowsCount : prevRowCountState;
    });
  }, [props === null || props === void 0 ? void 0 : props.data, props === null || props === void 0 || (_props$data4 = props.data) === null || _props$data4 === void 0 ? void 0 : _props$data4.totalRowsCount, setRowCountState]);
  var handlePaginationModelChange = function handlePaginationModelChange(pageSizeObj, reason) {
    props.handlePaginationModel(pageSizeObj);
  };
  var handleSortModelChange = function handleSortModelChange(sortingObj) {
    props.handleSortingModel(sortingObj);
  };
  var ODD_OPACITY = 0.2;
  var StripedDataGrid = (0, _styled["default"])(_xDataGrid.DataGrid)(function (_ref2) {
    var theme = _ref2.theme;
    return _defineProperty(_defineProperty({}, "& .".concat(_xDataGrid.gridClasses.row, ".even"), {
      // backgroundColor: theme.palette.grid.row.default,
      '&:hover, &.Mui-hovered': {
        backgroundColor: 'none'
      },
      '&.Mui-selected': {
        // backgroundColor: theme.palette.grid.row.selected,
        '&:hover, &.Mui-hovered': {}
      }
    }), "& .".concat(_xDataGrid.gridClasses.row, ".odd"), {
      // backgroundColor: theme.palette.background.default,
      '&:hover, &.Mui-hovered': {
        backgroundColor: 'none'
      }
    });
  });
  return /*#__PURE__*/_react["default"].createElement(StripedDataGrid, {
    sx: {
      flex: 1,
      width: '100%',
      height: props === null || props === void 0 ? void 0 : props.gridHeight,
      minHeight: props === null || props === void 0 ? void 0 : props.gridHeight
      // '.MuiDataGrid-columnHeader':{
      //     // backgroundColor:(theme)=> theme.palette.grid.header.background
      // }
    },
    sortingOrder: ['desc', 'asc'],
    hideFooterSelectedRowCount: true,
    className: "data-grid",
    rowHeight: 70,
    rows: (props === null || props === void 0 || (_props$data5 = props.data) === null || _props$data5 === void 0 ? void 0 : _props$data5.items) || [],
    rowCount: rowCountState,
    loading: props.loading,
    columns: tableColumns,
    showColumnVerticalBorder: true,
    initialState: {
      pagination: {
        paginationModel: props.paginationModel
      }
    },
    paginationModel: props.paginationModel,
    paginationMode: "server",
    onPaginationModelChange: handlePaginationModelChange,
    sortingMode: "server",
    onSortModelChange: handleSortModelChange,
    disableRowSelectionOnClick: true,
    columnVisibilityModel: props.columnVisibilityModel,
    onColumnVisibilityModelChange: function onColumnVisibilityModelChange(newModel) {
      return props === null || props === void 0 ? void 0 : props.handleColumnVisibilityModel(newModel);
    },
    getRowClassName: function getRowClassName(params) {
      return params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';
    }
  });
}