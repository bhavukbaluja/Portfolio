import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { paginationData, actionColumn, navigateOnQuickSearch, getStatusCell, getModifiedDateCell } from '@utils/helper/Helper';
import BaseList from "@ui/components/UI/widgets/BaseList";
import { PanelServices } from '@utils/services/PanelServices';
import { SizeChart_URL } from '@utils/Config/URLs';
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';

const SizeChartGrid = forwardRef((props, ref) => {

  const { showSnackBar, clickEdit, clickDelete, initialQuery, clickCopy, clickView } = props;
  const { lang } = useContext(LanguageContext);
  const { getGridData, updateSizeChart } = PanelServices(); // 👈 Should point to correct service method
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);

  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortModel, setSortModel] = useState({ property: 'createdDate', direction: 'desc' });
  const [paginationModel, setPaginationModel] = useState({
    page: paginationData().page,
    pageSize: paginationData().pageSize
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false, createdDate: true });

  const clickStatus = async (isChecked, row) => {
    setLoading(true);
    row["status"] = isChecked ? "ACTIVE" : "INACTIVE";
    await updateSizeChart(SizeChart_URL + "/update", row).then(() => {
      showSnackBar((isChecked ? Literal[lang].activated : Literal[lang].deactivated).replace("{entity}", Literal[lang].sizechart));
      onRefreshBtnClick();
    }).catch(() => {}).finally(() => setLoading(false));
  };

  const columns = [
    { field: "id", headerName: Literal[lang].id, flex: 0.8, sortable: true },
    { field: "userId", headerName: Literal[lang].user, flex: 0.8, sortable: false },
    { field: "size", headerName: Literal[lang].name, flex: 1.2, sortable: true },
    { field: "description", headerName: Literal[lang].description, flex: 1.4, sortable: true },
    { field: "createdDate", headerName: Literal[lang].createdDate, flex: 1.2, sortable: true, renderCell: (params) => getModifiedDateCell(params, "createdDate") },
    { field: "lastModifiedDate", headerName: Literal[lang].updatedDate, flex: 1.2, sortable: true, renderCell: (params) => getModifiedDateCell(params, "lastModifiedDate") },
    // { field: "status", headerName: Literal[lang].status, flex: 1.0, sortable: true, renderCell: (params) => getStatusCell(params, clickStatus) }
  ];

  const getUrl = (paginationObj, searchParam) => {
    let url = SizeChart_URL + "/all?";
    url += 'page=' + (paginationObj ? paginationObj.page + 1 : page) + '&start=0&limit=' + (paginationObj ? paginationObj.pageSize : paginationData().pageSize);
    if (searchParam) {
      url += '&query=' + searchParam;
    }
    if (sortModel.property) {
      url += '&sort=' + encodeURIComponent(JSON.stringify([{ property: sortModel.property, direction: sortModel.direction.toUpperCase() }]));
    }
    return url;
  };

  const getListData = (url) => {
    setLoading(true);
    getGridData(url).then((res) => {
      setGridData({
        data: {
          items: res?.data || [],
          totalRowsCount: res?.total || 0
        }
      });
    }).finally(() => setLoading(false));
  };

  const onRefreshBtnClick = () => {
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
    getListData(getUrl({ page: 0, pageSize: paginationModel.pageSize }, query));
  };

  useImperativeHandle(ref, () => ({
    refresh: () => onRefreshBtnClick(),
    handleQueryParamChange
  }));

  const onHandlePaginationModel = (pageSizeOption) => {
    setPaginationModel(pageSizeOption);
    getListData(getUrl(pageSizeOption, query));
  };

  const onHandleSortingModel = (sortingObj) => {
    if (sortingObj && sortingObj.length > 0) {
      setSortModel({ property: sortingObj[0].field, direction: sortingObj[0].sort });
    }
  };

  const onQuickSearch = (val) => {
    getListData(getUrl('', val));
    navigateOnQuickSearch(navigate, "/dashboard/sizechart", val);
  };

  const onHandleColumnVisibilityModel = (newModel) => {
    setColumnVisibilityModel(newModel);
  };

  const handleQueryParamChange = (newQuery) => {
    setQuery(newQuery);
    getListData(getUrl('', newQuery));
  };

  useEffect(() => {
    getListData(getUrl('', query));
  }, [sortModel]);

  const filterBarObj = {
    toggleFilterBox: () => {},
    onRefreshBtnClick,
    onQuickSearch,
    tileView: '',
    toggleTileView: '',
    searchText: query,
    showBtn: false,
    showTableBtn: true,
    showTilesBtn: true,
    searchEntity: 'Size Chart'
  };

  const contentContHeight = 'calc(100vh - 140px)';

  return (
    <Grid container sx={{ width: '100%', paddingTop: '15px' }}>
      <Grid item xs={12} sx={{ width: '100%' }}>
        <BaseList
          loading={loading}
          {...gridData}
          handleActionClick={() => console.log("Action clicked")}
          gridHeight={contentContHeight}
          columnVisibilityModel={columnVisibilityModel}
          handleColumnVisibilityModel={onHandleColumnVisibilityModel}
          hideFooter={false}
          actions={actionColumn("action")}
          columns={columns}
          clickEdit={clickEdit}
          clickDelete={clickDelete}
          clickCopy={clickCopy}
          clickView={clickView}
          entity="sizechart"
          paginationModel={paginationModel}
          handlePaginationModel={onHandlePaginationModel}
          handleSortingModel={onHandleSortingModel}
        />
      </Grid>
    </Grid>
  );
});

export default SizeChartGrid;
