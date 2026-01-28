import { Grid } from "@mui/material";
import BaseList from "@ui/components/UI/widgets/BaseList";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { Page_URL } from "@utils/Config/URLs";
import {
  actionColumn,
  getModifiedDateCell,
  getStatusCell,
  navigateOnQuickSearch,
  paginationData,
} from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";

const PageGrid = forwardRef((props, ref) => {
  const {
    showSnackBar,
    clickEdit,
    clickDelete,
    clickChildren,
    child,
    location,
    initialQuery,
    clickCopy,
    clickView,
  } = props;

  const { lang } = useContext(LanguageContext);
  const { getGridData, setSubcategories } = PanelServices();
  const navigate = useNavigate();

  const [gridData, setGridData] = useState({
    data: { items: [], totalRowsCount: 0 },
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(initialQuery);
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [sortModel, setSortModel] = useState({
    property: "createdDate",
    direction: "desc",
  });
  const [paginationModel, setPaginationModel] = useState({
    page: paginationData().page,
    pageSize: paginationData().pageSize,
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
    createdDate: true,
  });

  const { id } = useParams();
  const contentContHeight = "calc(100vh - 140px)";

  // ✅ Handle status change toggle
  const clickStatus = async (isChecked, row) => {
    setLoading(true);
    row.status = isChecked ? "ACTIVE" : "INACTIVE";
    try {
      await setSubcategories(Page_URL + "/update", row);
      showSnackBar(
        (isChecked ? Literal[lang].activated : Literal[lang].deactivated).replace(
          "{entity}",
          Literal[lang].page
        )
      );
      onRefreshBtnClick();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const columns = [
    { field: "id", headerName: Literal[lang].id, flex: 0.8, sortable: true },
    { field: "name", headerName: Literal[lang].name, flex: 1.3, sortable: true },
    {
      field: "createdDate",
      headerName: Literal[lang].createdDate,
      flex: 1.2,
      sortable: true,
      align: "center",
      renderCell: (params) => getModifiedDateCell(params, "createdDate"),
    },
    {
      field: "lastModifiedDate",
      headerName: Literal[lang].updatedDate,
      flex: 1.2,
      sortable: true,
      renderCell: (params) => getModifiedDateCell(params, "lastModifiedDate"),
    },
    {
      field: "status",
      headerName: Literal[lang].status,
      flex: 1.0,
      sortable: true,
      renderCell: (params) => getStatusCell(params, clickStatus),
    },
  ];

  // ✅ Generate backend API URL with pagination, sorting, and query
const getUrl = (paginationObj, searchParam) => {
    let url = Page_URL + '/all' + '?advancesearch=' + encodeURIComponent('$isAdvanceSearch=false');
    url += '&page=' + ((paginationObj && paginationObj.page != null) ? paginationObj.page + 1 : page) + '&start=0&limit=' + (paginationObj ? paginationObj.pageSize : paginationData().pageSize);

    if (searchParam) {
      url += '&query=' + searchParam;
    }

    if (sortModel.property) {
      // Ensure direction is lowercase when sending to API
      const apiDirection = sortModel.direction.toLowerCase();
      url += '&sort=' + encodeURIComponent(JSON.stringify([
        {
          property: sortModel.property,
          direction: apiDirection
        }
      ]));
    }

    return url;
  };


  // ✅ Fetch data
  const getListData = async (url) => {
    setLoading(true);
    try {
      const res = await getGridData(url);
      setGridData({
        data: {
          items: res?.data || [],
          totalRowsCount: res?.total || 0,
        },
      });
    } catch (e) {
      console.error("Error fetching pages:", e);
    } finally {
      setLoading(false);
    }
  };

  const onRefreshBtnClick = () => {
    const resetPagination = { page: 0, pageSize: paginationModel.pageSize };
    setPaginationModel(resetPagination);
    getListData(getUrl(resetPagination, query));
  };

  // ✅ Handle query parameter change
  const handleQueryParamChange = (newQuery) => {
    setQuery(newQuery);
    getListData(getUrl("", newQuery));
  };

  useEffect(() => {
    handleQueryParamChange(initialQuery);
  }, [location, initialQuery]);

  useEffect(() => {
    getListData(getUrl("", query));
  }, [id, sortModel, child, query]);

  // ✅ Expose refresh and query change to parent
  useImperativeHandle(ref, () => ({
    refresh: () => onRefreshBtnClick(),
    handleQueryParamChange,
  }));

  const onHandlePaginationModel = (paginationObj) => {
    setPaginationModel(paginationObj);
    getListData(getUrl(paginationObj, query));
  };

  const onHandleSortingModel = (sortingObj) => {
    if (!sortingObj?.length) return;
    const { field, sort } = sortingObj[0];
    setSortModel({ property: field, direction: sort });
  };

  const onQuickSearch = (val) => {
    getListData(getUrl("", val));
    navigateOnQuickSearch(navigate, "/dashboard/product", val);
  };

  const onHandleColumnVisibilityModel = (newModel) =>
    setColumnVisibilityModel(newModel);

  const toggleFilterBox = () => setShowFilterBox(!showFilterBox);

  const filterBarObj = {
    toggleFilterBox,
    onRefreshBtnClick,
    onQuickSearch,
    searchText: query,
    showBtn: false,
    showTableBtn: true,
    showTilesBtn: true,
    searchEntity: "page",
  };

  return (
    <Grid container sx={{ width: "100%", paddingTop: "15px" }}>
      <Grid item xs={showFilterBox ? 2 : ""}>
        {showFilterBox && (
          <div
            style={{
              height: contentContHeight,
              marginRight: "2px",
              border: "solid 1px red",
            }}
          ></div>
        )}
      </Grid>

      <Grid item xs={showFilterBox ? 10 : 12}  sx={{ width: '100%' }}>
        <BaseList
          loading={loading}
          {...gridData}
          gridHeight={contentContHeight}
          columnVisibilityModel={columnVisibilityModel}
          handleColumnVisibilityModel={onHandleColumnVisibilityModel}
          hideFooter={false}
          actions={actionColumn("action")}
          columns={columns}
          clickEdit={clickEdit}
          clickDelete={clickDelete}
          clickView={clickView}
          entity="page"
          clickChildren={clickChildren}
          paginationModel={paginationModel}
          handlePaginationModel={onHandlePaginationModel}
          handleSortingModel={onHandleSortingModel}
          clickCopy={clickCopy}
        />
      </Grid>
    </Grid>
  );
});

export default PageGrid;
