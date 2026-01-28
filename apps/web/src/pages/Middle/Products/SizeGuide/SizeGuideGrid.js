import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { paginationData, actionColumn, navigateOnQuickSearch, getStatusCell, getModifiedDateCell } from '@utils/helper/Helper';
import BaseList from "@ui/components/UI/widgets/BaseList";
import { PanelServices } from '@utils/services/PanelServices';
import { SizeChart_URL } from '@utils/Config/URLs';
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';

const SizeGuideGrid = forwardRef((props, ref) => {

  const { clickEdit, clickDelete, clickCopy, clickView, isMobile } = props;
  const { lang } = useContext(LanguageContext);
  const { getGridData, updateSizeChart } = PanelServices(); // 👈 Should point to correct service method
  const navigate = useNavigate();

  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortModel, setSortModel] = useState({ property: 'createdDate', direction: 'desc' });
  const [paginationModel, setPaginationModel] = useState({
    page: paginationData().page,
    pageSize: paginationData().pageSize
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false, createdDate: true });

  const columns = [
    // { field: "id", headerName: Literal[lang].id, flex: 0.8, sortable: true },
    { field: "size", headerName: Literal[lang].size, flex: 1.2, sortable: false },
    { field: "chest", headerName: Literal[lang].chest, flex: 1, sortable: false },
    { field: "waist", headerName: Literal[lang].waist, flex: 1, sortable: false },
    { field: "hips", headerName: Literal[lang].hips, flex: 1, sortable: false },
    { field: "topLength", headerName: Literal[lang].topLength, flex: 1, sortable: false },
    { field: "bottomLength", headerName: Literal[lang].bottomLength, flex: 1, sortable: false },
    { field: "sleeve", headerName: Literal[lang].sleeve, flex: 1, sortable: false },
    { field: "inseam", headerName: Literal[lang].inseam, flex: 1, sortable: false },
    { field: "shoulder", headerName: Literal[lang].shoulder, flex: 1, sortable: false },
    { field: "neck", headerName: Literal[lang].neck, flex: 1, sortable: false },
    { field: "thigh", headerName: Literal[lang].thigh, flex: 1, sortable: false },
    { field: "arm", headerName: Literal[lang].arm, flex: 1, sortable: false },
        // { field: "createdDate", headerName: Literal[lang].createdDate, flex: 1.2, sortable: true, renderCell: (params) => getModifiedDateCell(params, "createdDate") },
    // { field: "lastModifiedDate", headerName: Literal[lang].updatedDate, flex: 1.2, sortable: true, renderCell: (params) => getModifiedDateCell(params, "lastModifiedDate") },
    // { field: "status", headerName: Literal[lang].status, flex: 1.0, sortable: true, renderCell: (params) => getStatusCell(params, clickStatus) }
  ];

  const getUrl = (paginationObj, searchParam) => {
    let url = SizeChart_URL + "/all?";
    url += 'page=' + (paginationObj ? paginationObj.page + 1 : page) + '&start=0&limit=' + (paginationObj ? paginationObj.pageSize : paginationData().pageSize);
    if (searchParam) {
      url += '&query=' + searchParam;
    }
    // if (sortModel.property) {
    //   url += '&sort=' + encodeURIComponent(JSON.stringify([{ property: sortModel.property, direction: sortModel.direction.toUpperCase() }]));
    // }
    // url+= '&status=ACTIVE';
    return url;
  };

  const getListData = (url) => {
    setLoading(true);
    getGridData(url).then((res) => {
      setGridData({
        data: {
          items: (res?.data || []).filter(item => {
            // Check if item and item.size exist to prevent errors
            if (item && item.size) {
              // Convert to lowercase for case-insensitive comparison
              return item.size.toLowerCase() !== "custom";
            }
            // If item or item.size is missing, keep the item (or handle as per your logic)
            return true; 
          }),
          totalRowsCount: res?.total || 0
        }
      });
    }).finally(() => setLoading(false));
  };

  const onRefreshBtnClick = () => {
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
    getListData(getUrl({ page: 0, pageSize: paginationModel.pageSize }));
  };

  useImperativeHandle(ref, () => ({
    refresh: () => onRefreshBtnClick(),
    handleQueryParamChange
  }));

  const onHandlePaginationModel = (pageSizeOption) => {
    setPaginationModel(pageSizeOption);
    getListData(getUrl(pageSizeOption));
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
    getListData(getUrl(''));
  }, [sortModel]);

  const contentContHeight = 'calc(68vh)';

  return (
    <Grid container sx={{ paddingTop: isMobile? '100px': '15px', flex:1 }}>
      <Grid item xs={12} sx={{ width: '100%'}}>
        <BaseList
          loading={loading}
          {...gridData}
          handleActionClick={() => console.log("Action clicked")}
          gridHeight={contentContHeight}
          columnVisibilityModel={columnVisibilityModel}
          handleColumnVisibilityModel={onHandleColumnVisibilityModel}
          hideFooter={true}
        //   actions={actionColumn("action")}
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

export default SizeGuideGrid;
