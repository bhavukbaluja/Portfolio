"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseList;
var _styled = _interopRequireDefault(require("@emotion/styled"));
var _xDataGrid = require("@mui/x-data-grid");
var _react = _interopRequireWildcard(require("react"));
var _MoreHorizOutlined = _interopRequireDefault(require("@mui/icons-material/MoreHorizOutlined"));
var _Theme = _interopRequireDefault(require("@utils/Config/Theme"));
var _LanguageProvider = require("@ui/literals/LanguageProvider");
var _material = require("@mui/material");
var _EditOutlined = _interopRequireDefault(require("@mui/icons-material/EditOutlined"));
var _DeleteOutlineOutlined = _interopRequireDefault(require("@mui/icons-material/DeleteOutlineOutlined"));
var _BasePopover = _interopRequireDefault(require("./BasePopover"));
var _ChildFriendlyOutlined = _interopRequireDefault(require("@mui/icons-material/ChildFriendlyOutlined"));
var _ContentCopyOutlined = _interopRequireDefault(require("@mui/icons-material/ContentCopyOutlined"));
var _FullscreenOutlined = _interopRequireDefault(require("@mui/icons-material/FullscreenOutlined"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function BaseList(props) {
  var _props$data, _props$data4, _props$data5;
  var _useContext = (0, _react.useContext)(_LanguageProvider.LanguageContext),
    lang = _useContext.lang;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorPosition = _useState2[0],
    setAnchorPosition = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    popoverRow = _useState4[0],
    setPopoverRow = _useState4[1];
  var _useState5 = (0, _react.useState)({}),
    _useState6 = _slicedToArray(_useState5, 2),
    rowModesModel = _useState6[0],
    setRowModesModel = _useState6[1];
  var _useState7 = (0, _react.useState)([]),
    _useState8 = _slicedToArray(_useState7, 2),
    tableColumns = _useState8[0],
    setTableColumns = _useState8[1];
  var _useState9 = (0, _react.useState)((props === null || props === void 0 || (_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data.totalRowsCount) || 0),
    _useState10 = _slicedToArray(_useState9, 2),
    rowCountState = _useState10[0],
    setRowCountState = _useState10[1];
  var contructTableColumns = function contructTableColumns(data) {
    if (Array.isArray(props === null || props === void 0 ? void 0 : props.columns)) {
      var _props$actions;
      var tempTableCols = _toConsumableArray(props.columns);
      if (props !== null && props !== void 0 && (_props$actions = props.actions) !== null && _props$actions !== void 0 && _props$actions.show) {
        var _tempTableCols;
        if (((_tempTableCols = tempTableCols[(tempTableCols === null || tempTableCols === void 0 ? void 0 : tempTableCols.length) - 1]) === null || _tempTableCols === void 0 ? void 0 : _tempTableCols.field) !== "actions") {
          var actionCol = {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: function renderCell(params) {
              var id = params.id,
                row = params.row;
              return /*#__PURE__*/_react["default"].createElement("div", {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }
              }, /*#__PURE__*/_react["default"].createElement(_material.IconButton, {
                type: "button",
                onClick: function onClick(e) {
                  e.preventDefault();
                  e.stopPropagation();
                  setAnchorPosition({
                    left: e.clientX,
                    top: e.clientY
                  });
                  setPopoverRow({
                    id: id,
                    row: row
                  });
                }
              }, /*#__PURE__*/_react["default"].createElement(_MoreHorizOutlined["default"], null)));
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
  }, [props === null || props === void 0 ? void 0 : props.data, props === null || props === void 0 || (_props$data4 = props.data) === null || _props$data4 === void 0 ? void 0 : _props$data4.totalRowsCount]);
  var handlePaginationModelChange = function handlePaginationModelChange(pageSizeObj) {
    props.handlePaginationModel(pageSizeObj);
  };
  var handleSortModelChange = function handleSortModelChange(sortingObj) {
    props.handleSortingModel(sortingObj);
  };
  var StripedDataGrid = (0, _styled["default"])(_xDataGrid.DataGrid)(function (_ref) {
    var theme1 = _ref.theme1;
    return _defineProperty(_defineProperty({}, "& .".concat(_xDataGrid.gridClasses.row, ".even"), {
      backgroundColor: _Theme["default"].colors.light,
      '&:hover, &.Mui-hovered': {
        backgroundColor: 'none'
      },
      '&.Mui-selected': {
        backgroundColor: _Theme["default"].colors.background2
      }
    }), "& .".concat(_xDataGrid.gridClasses.row, ".odd"), {
      '&:hover, &.Mui-hovered': {
        backgroundColor: 'none'
      }
    });
  });
  var handleClosePopover = function handleClosePopover(e) {
    if (e) e.preventDefault();
    setAnchorPosition(null);
    setPopoverRow(null);
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(StripedDataGrid, {
    sx: {
      flex: 1,
      width: '100%',
      height: props === null || props === void 0 ? void 0 : props.gridHeight,
      minHeight: props === null || props === void 0 ? void 0 : props.gridHeight,
      '.MuiDataGrid-columnHeader': {
        backgroundColor: _Theme["default"].colors.background2
      }
    },
    sortingOrder: ['asc', 'desc'],
    hideFooterSelectedRowCount: true,
    className: "data-grid",
    rowHeight: (props === null || props === void 0 ? void 0 : props.rowHeight) || 'auto',
    rows: (props === null || props === void 0 || (_props$data5 = props.data) === null || _props$data5 === void 0 ? void 0 : _props$data5.items) || [],
    loading: props.loading,
    columns: tableColumns,
    showColumnVerticalBorder: true,
    initialState: {
      pagination: {
        paginationModel: props.paginationModel
      }
    },
    paginationModel: props.paginationModel,
    pageSize: 12,
    pageSizeOptions: [10, 12, 20, 50],
    rowCount: rowCountState,
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
  }), popoverRow && /*#__PURE__*/_react["default"].createElement(_BasePopover["default"], {
    id: popoverRow.id,
    disablePortal: true,
    anchorPosition: anchorPosition,
    setAnchorPosition: setAnchorPosition,
    isMobile: props === null || props === void 0 ? void 0 : props.isMobile,
    onClose: handleClosePopover
  }, /*#__PURE__*/_react["default"].createElement(_material.List, null, /*#__PURE__*/_react["default"].createElement(_material.ListItem, {
    button: true,
    onClick: function onClick(e) {
      var _props$clickView;
      handleClosePopover(e);
      props === null || props === void 0 || (_props$clickView = props.clickView) === null || _props$clickView === void 0 || _props$clickView.call(props, popoverRow.row);
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.ListItemIcon, null, /*#__PURE__*/_react["default"].createElement(_FullscreenOutlined["default"], null)), /*#__PURE__*/_react["default"].createElement(_material.ListItemText, {
    primary: "View",
    className: "account-options-list"
  })), /*#__PURE__*/_react["default"].createElement(_material.ListItem, {
    button: true,
    onClick: function onClick(e) {
      var _props$clickEdit;
      handleClosePopover(e);
      props === null || props === void 0 || (_props$clickEdit = props.clickEdit) === null || _props$clickEdit === void 0 || _props$clickEdit.call(props, popoverRow.row);
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.ListItemIcon, null, /*#__PURE__*/_react["default"].createElement(_EditOutlined["default"], null)), /*#__PURE__*/_react["default"].createElement(_material.ListItemText, {
    primary: "Edit",
    className: "account-options-list"
  })), /*#__PURE__*/_react["default"].createElement(_material.ListItem, {
    button: true,
    onClick: function onClick(e) {
      var _props$clickCopy;
      handleClosePopover(e);
      props === null || props === void 0 || (_props$clickCopy = props.clickCopy) === null || _props$clickCopy === void 0 || _props$clickCopy.call(props, popoverRow.row);
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.ListItemIcon, null, /*#__PURE__*/_react["default"].createElement(_ContentCopyOutlined["default"], null)), /*#__PURE__*/_react["default"].createElement(_material.ListItemText, {
    primary: "Copy",
    className: "account-options-list"
  })), /*#__PURE__*/_react["default"].createElement(_material.ListItem, {
    button: true,
    onClick: function onClick(e) {
      var _props$clickDelete;
      handleClosePopover(e);
      props === null || props === void 0 || (_props$clickDelete = props.clickDelete) === null || _props$clickDelete === void 0 || _props$clickDelete.call(props, popoverRow.row);
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.ListItemIcon, null, /*#__PURE__*/_react["default"].createElement(_DeleteOutlineOutlined["default"], {
    sx: {
      color: _Theme["default"].colors.danger
    },
    className: "navbar-icon-fav"
  })), /*#__PURE__*/_react["default"].createElement(_material.ListItemText, {
    primary: "Delete",
    className: "account-options-list",
    sx: {
      color: "".concat(_Theme["default"].colors.danger, " !important")
    }
  })), (props === null || props === void 0 ? void 0 : props.entity) === "category" && /*#__PURE__*/_react["default"].createElement(_material.ListItem, {
    button: true,
    onClick: function onClick(e) {
      var _props$clickChildren;
      handleClosePopover(e);
      props === null || props === void 0 || (_props$clickChildren = props.clickChildren) === null || _props$clickChildren === void 0 || _props$clickChildren.call(props, popoverRow.row);
    }
  }, /*#__PURE__*/_react["default"].createElement(_material.ListItemIcon, null, /*#__PURE__*/_react["default"].createElement(_ChildFriendlyOutlined["default"], {
    className: "navbar-icon-fav"
  })), /*#__PURE__*/_react["default"].createElement(_material.ListItemText, {
    primary: "View Children",
    className: "account-options-list"
  })))));
}