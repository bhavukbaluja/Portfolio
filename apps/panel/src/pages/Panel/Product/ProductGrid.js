import { Grid, Stack, Tooltip } from '@mui/material';
import React, { useContext, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { paginationData, actionColumn, navigateOnQuickSearch, getStatusCell, getModifiedDateCell, fetchImage } from '@utils/helper/Helper'; 
import BaseList from "@ui/components/UI/widgets/BaseList";
import { PanelServices } from '@utils/services/PanelServices';
import { Product_URL, URL_CONFIG } from '@utils/Config/URLs';
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import { useFallbackImage } from '@utils/helper/FallbackImages';
import BaseShowImage from "@ui/components/UI/fields/BaseShowImage";

const ProductGrid = forwardRef((props, ref) => {
  const { 
      showSnackBar, clickEdit, clickDelete, clickCopy, initialQuery, clickView, 
      statuses, clickDiscontinued, 
      actionRef, // ✅ Receive logic ref as prop
      setConfirmMsg, setConfirmBoxOpen
  } = props;

  const entity = "product";
  const { lang } = useContext(LanguageContext);
  const { getGridData, updateEntity } = PanelServices();
  const navigate = useNavigate();
  const { id } = useParams();
  const contentContHeight = 'calc(100vh - 140px)';

  const [query, setQuery] = useState(initialQuery);
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortModel, setSortModel] = useState({ property: 'rank', direction: 'asc' });
  const [paginationModel, setPaginationModel] = useState({
    page: paginationData().page,
    pageSize: paginationData().pageSize
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false, createdDate: false, price: false,  });
  
  const imageCache = new Map(); 
  const ProductImageCell = ({ imagePath, productId }) => {
    
    const fallbackImg = useFallbackImage(entity);
    const [blobUrl, setBlobUrl] = React.useState(imageCache.get(imagePath) || null);
  
    React.useEffect(() => {
      let isMounted = true;
      if (imagePath && !imageCache.has(imagePath)) {
        const fetchAndSetImage = async () => {
          try {
            const blob = await fetchImage(URL_CONFIG.API_URL + "/" + imagePath);
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
            alt={`product-${productId}`}
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
        setConfirmMsg(Literal[lang].confirmMsg.replace("{0}", row?.title).replace("{1}", Literal[lang].product).replace("{2}", Literal[lang].setActive));
        setConfirmBoxOpen(true);
    } 
    else {
        // Standard Active/Inactive Toggle
        setLoading(true);
        row.status = isChecked ? "ACTIVE" : "INACTIVE";
        await updateEntity(Product_URL + "/update", row)
        .then(() => {
            showSnackBar((isChecked ? Literal[lang].activated : Literal[lang].deactivated).replace("{entity}", Literal[lang].product));
            onRefreshBtnClick();
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  };

  const columns = [
    { field: "id", headerName: Literal[lang].id, flex: 0.7 },
    { field: "rank", headerName: Literal[lang].rank, flex: 0.5, sortable: true },
    { field: "title", headerName: Literal[lang].title, flex: 1.2 },
    { field: "categoryNames", headerName: Literal[lang].categories, flex: 1.5 },
    { field: "image", headerName: Literal[lang].image, flex: 1, sortable: false,
      renderCell: (params) => (
      <ProductImageCell
        imagePath={params.row?.images?.[0]}
        productId={params.row?.id}
      />
    ), },
    { field: "sku", headerName: Literal[lang].sku, flex: 1 },
    { field: "material", headerName: Literal[lang].material, flex: 1 },
    { field: "color", headerName: Literal[lang].color, flex: 1 },
    { field: "createdDate", headerName: Literal[lang].createdDate, flex: 1.1, renderCell: (params) => getModifiedDateCell(params, "createdDate") },
    { field: "lastModifiedDate", headerName: Literal[lang].updatedDate, flex: 1.1, renderCell: (params) => getModifiedDateCell(params, "lastModifiedDate") },
    { field: "status", headerName: Literal[lang].status, flex: 0.6, renderCell: (params) => getStatusCell(params, clickStatus) }
  ];

  const getUrl = (paginationObj, searchParam) => {
    let queryStatuses = statuses;
    if(!statuses || statuses.length === 0){
        queryStatuses=["ALL"];
    }

    let url = Product_URL + "/all";
    // ✅ Append status filter
    url += `?statuses=${queryStatuses.join(",")}`;
    url += `&page=${(paginationObj ? paginationObj.page + 1 : page)}&start=0&limit=${(paginationObj ? paginationObj.pageSize : paginationData().pageSize)}`;
    if (searchParam) {
      url += `&query=${searchParam}`;
    }
    if (sortModel.property) {
      url += `&sort=${encodeURIComponent(JSON.stringify([{ property: sortModel.property, direction: sortModel.direction.toUpperCase() }]))}`;
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
  }, [id, sortModel, statuses]); // ✅ Added statuses dependency

  useImperativeHandle(ref, () => ({
    refresh: () => onRefreshBtnClick(),
    handleQueryParamChange
  }));

  const onHandlePaginationModel = (pageSizeOption) => {
    setPaginationModel(pageSizeOption);
    getListData(getUrl(pageSizeOption, query));
  };

  const onHandleSortingModel = (sortingObj) => {
    if (sortingObj?.length > 0) {
      setSortModel({ property: sortingObj[0].field, direction: sortingObj[0].sort });
    }
  };

  const onQuickSearch = (val) => {
    getListData(getUrl('', val));
    navigateOnQuickSearch(navigate, "/dashboard/product", val);
  };

  const onHandleColumnVisibilityModel = (newModel) => {
    setColumnVisibilityModel(newModel);
  };

  const handleQueryParamChange = (newQuery) => {
    setQuery(newQuery);
    getListData(getUrl('', newQuery));
  };

  useEffect(() => {
    handleQueryParamChange(initialQuery);
  }, [location, initialQuery]);

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
          clickDiscontinued={clickDiscontinued} // ✅ Pass Discontinued Handler
          entity={entity}
          paginationModel={paginationModel}
          handlePaginationModel={onHandlePaginationModel}
          handleSortingModel={onHandleSortingModel}
          rowHeight={120}
        />
      </Grid>
    </Grid>
  );
});

export default ProductGrid;