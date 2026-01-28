import { Grid, Stack, Tooltip } from '@mui/material'; // Added Tooltip import if needed later
import React, { useContext, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { paginationData, actionColumn, navigateOnQuickSearch, getStatusCell, getModifiedDateCell, fetchImage} from '@utils/helper/Helper'; 
import BaseList from "@ui/components/UI/widgets/BaseList";
import { PanelServices } from '@utils/services/PanelServices';
import { Category_URL, URL_CONFIG } from '@utils/Config/URLs'; 
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import { useFallbackImage } from '@utils/helper/FallbackImages';
import BaseShowImage from "@ui/components/UI/fields/BaseShowImage";

const CategoryGrid = forwardRef((props, ref) => {

  const { 
      showSnackBar, clickEdit, clickDelete, clickChildren, clickDiscontinued, 
      child, location, initialQuery, clickCopy, clickView, isParents, statuses,
      actionRef, // ✅ Receive logic ref as prop
      setConfirmMsg, setConfirmBoxOpen 
  } = props;

  const entity="category";
  const { lang } = useContext(LanguageContext);
  const { getGridData, setSubcategories } = PanelServices(); 
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery); 

  const [gridData, setGridData] = useState([]);
  const { id } = useParams();
  const contentContHeight = 'calc(100vh - 140px)';
  const [show_filter_box, setShowFilterBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortModel, setSortModel] = useState({ property: 'rank', direction: 'asc' });
  const [paginationModel, setPaginationModel] = useState({
    page: paginationData().page,
    pageSize: paginationData().pageSize
  });

  const imageCache = new Map(); 
  const CategoryImageCell = ({ params, categoryId }) => {

    const fallbackImg = useFallbackImage(entity);
    const imagePath = params.row?.images?.[0];
    const [blobUrl, setBlobUrl] = React.useState(imageCache.get(imagePath) || null);
  
    useEffect(() => {
      let isMounted = true;
      if (imagePath && !imageCache.has(imagePath)) {
        const fetchAndSetImage = async () => {
          try {
            const fullImageUrl = URL_CONFIG.API_URL + "/" + imagePath;
            const blob = await fetchImage(fullImageUrl);
            if (isMounted && blob) {
              imageCache.set(imagePath, blob);
              setBlobUrl(blob);
            }
          } catch (e) {
            if (isMounted) setBlobUrl(null);
          }
        };
        fetchAndSetImage();
      }
      return () => { isMounted = false; };
    }, [imagePath]);

      return (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <div style={{ width: 70 }}>
            <BaseShowImage
              imageUrl={blobUrl || fallbackImg}
              alt={`category-${categoryId}`}
              aspectRatio={2 / 3}
            />
          </div>
        </Stack>
      );
    };

  const clickStatus = async (isChecked, row) => {
    // ✅ Logic for Reactivating Discontinued Items via Toggle
    if (row?.status === "DISCONTINUED") {
        if (actionRef) {
            actionRef.current = { type: "ACTIVE", payload: row };
        }
        setConfirmMsg(Literal[lang].confirmMsg.replace("{0}", row?.name).replace("{1}", Literal[lang].category+" "+Literal[lang].account).replace("{2}", Literal[lang].setActive));
        setConfirmBoxOpen(true);
    } 
    else {
        // Standard Active/Inactive Toggle
        setLoading(true);
        row["status"] = isChecked ? "ACTIVE" : "INACTIVE";
        await setSubcategories(Category_URL+"/update", row ).then((response)=>{
            showSnackBar((isChecked ? Literal[lang].activated : Literal[lang].deactivated).replace("{entity}", Literal[lang].category));
            onRefreshBtnClick();
        }).catch((error)=>{});
        setLoading(false);
    }
  }

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({id: false, createdDate: true});

  const columns = [
    { field: "id", headerName: Literal[lang].id, flex: 0.8, sortable: true },
    { field: "rank", headerName: Literal[lang].rank, flex: 0.8, sortable: true },
    { field: "name", headerName: Literal[lang].name, flex: 1.3, sortable: true },
    { field: "image", headerName: Literal[lang].image, flex: 1, sortable: false,
      renderCell: (params) => (
      <CategoryImageCell
        params={params}
        categoryId={params.row?.id}
      />
    ), },
    { field: "createdDate", headerName: Literal[lang].createdDate, flex: 1.2, sortable: true, align: 'center', renderCell: (params)=> getModifiedDateCell(params, "createdDate") },
    { field: "description", headerName: Literal[lang].description, flex: 1.2, sortable: true },
    { field: "isTile", headerName: Literal[lang].isTileVisibleGrid, flex: 1, sortable: true, renderCell: (params)=>((params?.row?.isTile==="true")? Literal[lang].yes: Literal[lang].no) },
    { field: "parentCategoryName", headerName: Literal[lang].parent, flex: 1.0, sortable: false, renderCell: (params)=>(params?.row?.parentCategoryName || "Base")},
    { field: "lastModifiedDate", headerName: Literal[lang].updatedDate, flex: 1.2, sortable: true, renderCell: (params)=> getModifiedDateCell(params, "lastModifiedDate")},
    { field: "status", headerName: Literal[lang].status, flex: 1.0, sortable: true, renderCell: (params)=> getStatusCell(params, clickStatus) },
  ];

  const [logfilter, setLogfilter] = useState('products');
  const [logfilter2, setLogfilter2] = useState('current');

  const getUrl = (paginationObj, searchParam) => {
    let archiveFlag = logfilter2 === 'archive' ? 'true' : 'false';
    let queryStatuses = statuses;
    if(statuses?.length==0){
      queryStatuses=["ALL"];
    }
    let url = Category_URL + (isParents? '/allParents': (child!=null?'/child':'/all'));

    url += '?statuses='+queryStatuses.join(",");
    url += '&advancesearch=' + encodeURIComponent('archiveFlag=' + archiveFlag + '$isAdvanceSearch=false');
    url += '&parentId=' + child?.id;
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
  }, [id, sortModel, child, isParents, statuses]);

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
    navigateOnQuickSearch(navigate, "/dashboard/product", val);
  };

  const onHandlColumnVisibilityModel = (newModel) => {
    setColumnVisibilityModel(newModel);
  };

  const toggleFilterBox = () => {
    setShowFilterBox(!show_filter_box);
  };

  const handleQueryParamChange = (newQuery) => {
      setQuery(newQuery); 
      getListData(getUrl('', newQuery));
  };
  
  useEffect(() => {
    handleQueryParamChange(initialQuery); 
  }, [location, initialQuery]); 

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
            handleActionClick={() => console.log("Action clicked")}
            gridHeight={contentContHeight}
            columnVisibilityModel={columnVisibilityModel}
            handleColumnVisibilityModel={onHandlColumnVisibilityModel}
            hideFooter={false}
            actions={actionColumn("action")}
            columns={columns}
            clickEdit={clickEdit}
            clickDelete={clickDelete}
            clickCopy={clickCopy}
            clickView={clickView}
            clickDiscontinued={clickDiscontinued} // ✅ Pass Discontinued Handler
            entity={entity}
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
export default CategoryGrid;