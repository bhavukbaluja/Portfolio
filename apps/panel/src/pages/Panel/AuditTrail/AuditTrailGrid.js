import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import { paginationData, getModifiedDateCell } from '@utils/helper/Helper'; 
import BaseList from "@ui/components/UI/widgets/BaseList";
import { PanelServices } from '@utils/services/PanelServices';
import { AuditTrail_URL } from '@utils/Config/URLs'; // 👈 Update the API path
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';

const AuditTrailGrid = forwardRef((props, ref) => {

  const { showSnackBar, clickEdit, clickDelete, clickChildren, child, location, initialQuery, clickCopy, clickView, isParents  } = props;

  const { lang } = useContext(LanguageContext);
  const { getGridData } = PanelServices(); // 👈 Assumes service method for product API
  const [query, setQuery] = useState(initialQuery); // Track the query parameter

  const [gridData, setGridData] = useState([]);
  const { id } = useParams();
  const contentContHeight = 'calc(100vh - 140px)';
  const [show_filter_box, setShowFilterBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortModel, setSortModel] = useState({ property: 'id', direction: 'desc' });
  const [paginationModel, setPaginationModel] = useState({
    page: paginationData().page,
    pageSize: paginationData().pageSize
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({id: false, oldValue: false, newValue: false, performedBy: false});

  const columns = [
    { field: "id", headerName: Literal[lang].id, flex: 0.5, sortable: true },
    { field: "action", headerName: Literal[lang].action, flex: 1.3, sortable: true },
    { field: "entityType", headerName: Literal[lang].entityType, flex: 1, sortable: true },
    { field: "entityId", headerName: Literal[lang].entityId, flex: 1.7, sortable: true },
    { field: "oldValue", headerName: Literal[lang].changedFrom, flex: 1.4, sortable: true },
    { field: "newValue", headerName: Literal[lang].changedTo, flex: 1.4, sortable: true },
    { field: "description", headerName: Literal[lang].description, flex: 1.4, sortable: true },
    { field: "performedBy", headerName: Literal[lang].performedBy+ " "+Literal[lang].id, flex: 1, sortable: true},
    { field: "performedByName", headerName: Literal[lang].performedBy, flex: 1, sortable: true},
    { field: "timestamp", headerName: Literal[lang].timestamp, flex: 1.0, sortable: true, renderCell: (params)=>getModifiedDateCell(params, "timestamp")},
  ];

  const [logfilter, setLogfilter] = useState('products');
  const [logfilter2, setLogfilter2] = useState('current');

  const handleChange2 = (event) => setLogfilter(event.target.value);
  const handleChange3 = (event) => setLogfilter2(event.target.value);

  const getUrl = (paginationObj, searchParam) => {
    let archiveFlag = logfilter2 === 'archive' ? 'true' : 'false';
    let url = AuditTrail_URL + '/all'+'?advancesearch=' + encodeURIComponent('archiveFlag=' + archiveFlag + '$isAdvanceSearch=false');
    // let url = AuditTrail_URL + '/tracking/order/BSH-1753372977053-I1U8GE'+'?advancesearch=' + encodeURIComponent('archiveFlag=' + archiveFlag + '$isAdvanceSearch=false');
    url += '&page=' + (paginationObj ? paginationObj.page + 1 : page) + '&start=0&limit=' + (paginationObj ? paginationObj.pageSize : paginationData().pageSize);
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
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  const onRefreshBtnClick = () => {
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
    getListData(getUrl({ page: 0, pageSize: paginationModel.pageSize }, query));
  };

  useEffect(() => {
    getListData(getUrl('', query));
  }, [id, sortModel, child, isParents]);

  // ✅ Expose refresh method to parent
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
    // navigateOnQuickSearch(navigate, "/dashboard/product", val);
  };

  const onHandlColumnVisibilityModel = (newModel) => {
    setColumnVisibilityModel(newModel);
  };

  const toggleFilterBox = () => {
    setShowFilterBox(!show_filter_box);
  };

  const handleQueryParamChange = (newQuery) => {
      // If query parameter changes, fetch new data
      setQuery(newQuery); // Update query state
      getListData(getUrl('', newQuery));
  };
  
  // Track location changes and query parameter
  useEffect(() => {
    handleQueryParamChange(initialQuery); // Fetch new data if query parameter changes
  }, [location, initialQuery]); // This will trigger whenever the URL changes
  

  const filterBarObj = {
    toggleFilterBox,
    onRefreshBtnClick,
    onQuickSearch,
    tileView: '',
    toggleTileView: '',
    searchText: query,
    showBtn: false,
    showTableBtn: true,
    showTilesBtn: true,
    searchEntity: 'AuditTrail'
  };

  return (
    <>

      <Grid container sx={{ width: '100%', paddingTop: '15px' }}>
        <Grid item xs={show_filter_box ? 2 : ''}>
          {show_filter_box && <div style={{ height: contentContHeight, marginRight: '2px', border: 'solid 1px red' }}></div>}
        </Grid>
        <Grid item xs={show_filter_box ? 10 : 12} sx={{ width: '100%' }}>
          <BaseList
            loading={loading}
            {...gridData}
            // handlePaginationModel={onHandlePaginationModel}
            // handleSortingModel={onHandleSortingModel}
            handleActionClick={() => console.log("Action clicked")}
            gridHeight={contentContHeight}
            columnVisibilityModel={columnVisibilityModel}
            handleColumnVisibilityModel={onHandlColumnVisibilityModel}
            hideFooter={false}
            // actions={actionColumn("action")}
            columns={columns}
            clickEdit={clickEdit}
            clickDelete={clickDelete}
            clickCopy={clickCopy}
            clickView={clickView}
            entity="auditTrail"
            clickChildren={clickChildren}
            paginationModel={paginationModel}
            handlePaginationModel={onHandlePaginationModel}
            handleSortingModel={onHandleSortingModel}
            rowHeight={120}
          />
        </Grid>
      </Grid>
    </>
  );
});
export default AuditTrailGrid
