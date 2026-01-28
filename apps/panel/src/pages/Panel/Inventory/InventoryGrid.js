import { Box, Grid, Typography } from '@mui/material';
import React, {
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  paginationData,
  actionColumn,
  navigateOnQuickSearch,
  getModifiedDateCell,
} from '@utils/helper/Helper';
import BaseList from '@ui/components/UI/widgets/BaseList';
import { PanelServices } from '@utils/services/PanelServices';
import { Inventory_URL, URL_CONFIG } from '@utils/Config/URLs';
import Literal from '@ui/literals';
import { LanguageContext } from '@ui/literals/LanguageProvider';

const InventoryGrid = forwardRef((props, ref) => {
  const { showSnackBar, clickEdit, clickDelete, clickCopy, initialQuery, clickView } = props;
  const { lang } = useContext(LanguageContext);
  const { getGridData, updateEntity } = PanelServices();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const contentContHeight = 'calc(100vh - 140px)';

  const [query, setQuery] = useState(initialQuery);
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortModel, setSortModel] = useState({ property: 'createdDate', direction: 'desc' });
  const [paginationModel, setPaginationModel] = useState({
    page: paginationData().page,
    pageSize: paginationData().pageSize,
  });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
    createdDate: false,
    inventoryVariants: false
  });

  const clickStatus = async (isChecked, row) => {
    setLoading(true);
    row.status = isChecked ? 'ACTIVE' : 'INACTIVE';
    await updateEntity(Inventory_URL + '/update', row)
      .then(() => {
        showSnackBar(
          (isChecked ? Literal[lang].activated : Literal[lang].deactivated).replace(
            '{entity}',
            Literal[lang].inventory
          )
        );
        onRefreshBtnClick();
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const getTitleCell = (row) => {
    const isActive = row?.product?.status === 'ACTIVE';
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center', // prevent shifting the dot
          gap: '8px',
          height: '100%',
          lineHeight: '1.2',
        }}
      >
        <span
          style={{
            width: '15px',
            height: '15px',
            marginTop: '3px', // align dot with first line of text
            flexShrink: 0, // dot stays fixed size
            borderRadius: '50%',
            backgroundColor: isActive ? `var(--success-color)` : `var(--danger-color)`,
            display: 'inline-block',
          }}
        />
        <span style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {row?.product?.title}
        </span>
      </div>
    );
  };
  

  const getVariantsCell = (row) => {
    const variants = row?.inventoryVariants;
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', gap: '4px', flexDirection: 'column', justifyContent: 'center' }}>
        {variants?.map((variant, index) => (
          <h6 key={index} style={{ width: '100%' }}>
            <b>{index + 1}.</b> {variant?.size?.size} - {variant?.quantity} - ₹{variant?.salePrice}
          </h6>
        ))}
      </div>
    );
  };

  

  const columns = [
    { field: 'id', headerName: Literal[lang].id, flex: 0.3 },
    {
      field: 'product',
      headerName: Literal[lang].productName,
      flex: 2,
      renderCell: (params) => getTitleCell(params?.row),
      sortable: false,
    },
    {
      field: 'productSku',
      headerName: Literal[lang].sku,
      flex: 1,
      renderCell: (params) => params?.row?.product?.sku,
      sortable: false,
    },
    // { field: "categoryName", headerName: Literal[lang].categoryName, flex: 0.8, sortable: true, renderCell: (params) => params?.row?.product?.categoryName },
    {
      field: 'type',
      headerName: Literal[lang].type,
      flex: 0.7,
    },
    {
      field: 'createdDate',
      headerName: Literal[lang].createdDate,
      flex: 1.1,
      renderCell: (params) => getModifiedDateCell(params, 'createdDate'),
    },
    {
      field: 'lastModifiedDate',
      headerName: Literal[lang].updatedDate,
      flex: 1.1,
      renderCell: (params) => getModifiedDateCell(params, 'lastModifiedDate'),
    },
    {
      field: 'inventoryVariants',
      headerName: Literal[lang].size_Quant_Price,
      flex: 2,
      renderCell: (params) => getVariantsCell(params?.row),
      sortable: false,
    },
  ];

  const getUrl = (paginationObj, searchParam) => {
    let url = Inventory_URL + '/all';
    url += `?page=${paginationObj ? paginationObj.page + 1 : page}&start=0&limit=${
      paginationObj ? paginationObj.pageSize : paginationData().pageSize
    }`;
    if (searchParam) url += `&query=${searchParam}`;
    if (sortModel.property) {
      url += `&sort=${encodeURIComponent(
        JSON.stringify([{ property: sortModel.property, direction: sortModel.direction.toUpperCase() }])
      )}`;
    }
    return url;
  };

  const getListData = (url) => {
    setLoading(true);
    getGridData(url)
      .then((res) => {
        setGridData({
          data: {
            items: res?.data || [],
            totalRowsCount: res?.total || 0,
          },
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const onRefreshBtnClick = () => {
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize });
    getListData(getUrl({ page: 0, pageSize: paginationModel.pageSize }, query));
  };

  useEffect(() => {
    getListData(getUrl('', query));
  }, [id, sortModel]);

  useImperativeHandle(ref, () => ({
    refresh: () => onRefreshBtnClick(),
    handleQueryParamChange,
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
    navigateOnQuickSearch(navigate, '/dashboard/inventory', val);
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
          handleActionClick={() => console.log('Action clicked')}
          gridHeight={contentContHeight}
          columnVisibilityModel={columnVisibilityModel}
          handleColumnVisibilityModel={onHandleColumnVisibilityModel}
          hideFooter={false}
          actions={actionColumn('action')}
          columns={columns}
          clickEdit={clickEdit}
          clickDelete={clickDelete}
          clickCopy={clickCopy}
          clickView={clickView}
          entity="inventory"
          paginationModel={paginationModel}
          handlePaginationModel={onHandlePaginationModel}
          handleSortingModel={onHandleSortingModel}
          rowHeight={columnVisibilityModel?.variants?150 : 60}
        />
      </Grid>
    </Grid>
  );
});

export default InventoryGrid;
