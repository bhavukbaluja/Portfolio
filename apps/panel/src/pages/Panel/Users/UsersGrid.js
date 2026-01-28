import { Box, Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useContext, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { paginationData, actionColumn, navigateOnQuickSearch, getStatusCell, getModifiedDateCell, fetchImage } from '@utils/helper/Helper'; 
import BaseList from "@ui/components/UI/widgets/BaseList";
import { PanelServices } from '@utils/services/PanelServices';
import { URL_CONFIG, Users_URL, Team_URL ,URL_Get_Profile_Img} from '@utils/Config/URLs';
import Literal from "@ui/literals";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import { useFallbackImage } from '@utils/helper/FallbackImages';
import BaseShowImage from "@ui/components/UI/fields/BaseShowImage";
import AvatarWithAuth from "@ui/components/UI/widgets/AvatarWithAuth";
import { toTitleCase } from "@utils/helper/Helper";

const UsersGrid = forwardRef((props, ref) => {
  const { 
      showSnackBar, clickEdit, clickDelete, clickCopy, statuses, clickDiscontinued, 
      clickResetPassword, initialQuery, clickView, team, imageRefreshKey, 
      setImageRefreshKey, setConfirmMsg, setConfirmBoxOpen,
      actionRef // ✅ Receive logic ref as prop
  } = props;

  const entity="user";
  const { lang } = useContext(LanguageContext);
  const { getGridData, updateEntity } = PanelServices();
  const navigate = useNavigate();
  const { id } = useParams();
  const contentContHeight = 'calc(100vh - 140px)';
  const gridURL = team? Team_URL : Users_URL;
  const [query, setQuery] = useState(initialQuery);
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sortModel, setSortModel] = useState({ property: 'id', direction: 'asc' });
  const [paginationModel, setPaginationModel] = useState({
    page: paginationData().page,
    pageSize: paginationData().pageSize
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false, mobile: false, alternateMobile: false, createdDate: false, lastModifiedDate: false});
  
  const imageCache = new Map(); 

  const UserImageCell = ({ imagePath, userId }) => {
    
    
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
            alt={`user-${userId}`}
            aspectRatio={2 / 3}
          />
        </div>
      </Stack>
    );
  };

  const getfirstNameCell = (row) => {
    const isActive = row?.accountActive;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '100%', lineHeight: '1.2' }}>
        <span
          style={{
            width: '15px', height: '15px', marginTop: '3px', flexShrink: 0, borderRadius: '50%',
            backgroundColor: isActive ? `var(--success-color)` : `var(--danger-color)`, display: 'inline-block',
          }}
        />
        <span style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{row?.firstName}</span>
      </div>
    );
  };

  const columns = [
    { field: "id", headerName: Literal[lang].id, flex: 0.2, sortable: true },
    { field: "profileImage", headerName: Literal[lang].profileImage, flex: 0.8, sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', padding: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <Tooltip title={URL_CONFIG.API_URL+URL_Get_Profile_Img+"/"+params?.row?.id}>
            <AvatarWithAuth
                  imageRefreshKey={imageRefreshKey} 
                  setImageRefreshKey={setImageRefreshKey} 
                  user={params?.row} 
                  size={80} 
                  name={params?.row?.firstName + " " + params?.row?.lastName} 
                  imageUrl={URL_CONFIG.API_URL+URL_Get_Profile_Img+"/"+params?.row?.id}
            />
            </Tooltip>
        </div>
    ), },
    { field: "firstName", headerName: Literal[lang].firstName, flex: 0.7, sortable: true, renderCell: (params) => getfirstNameCell(params?.row), },
    { field: "lastName", headerName: Literal[lang].lastName, flex: 0.7, sortable: true },
    { field: "email", headerName: Literal[lang].email, flex: 1.5, sortable: true },
    { field: "mobile", headerName: Literal[lang].mobile, flex: 1, sortable: true },
    { field: "alternateMobile", headerName: Literal[lang].alternateMobile, flex: 1, sortable: true },
    { field: "dob", headerName: Literal[lang].dob, flex: 1, sortable: true , renderCell: (params) => getModifiedDateCell(params, "dob", "date")},
    { field: "gender", headerName: Literal[lang].gender, flex: 0.5, renderCell: (params) => `${toTitleCase(params?.row?.gender||"")}` },
    ...(team ? [{ 
      field: "role", headerName: Literal[lang].role, flex: 0.7, renderCell: (params) => `${toTitleCase(params?.row?.role)}` 
    }] : []),
    { field: "createdDate", headerName: Literal[lang].createdDate, flex: 1, sortable: true , renderCell: (params) => getModifiedDateCell(params, "createdDate") },
    { field: "lastModifiedDate", headerName: Literal[lang].updatedDate, flex: 1, sortable: true , renderCell: (params) => getModifiedDateCell(params, "lastModifiedDate") },
    { field: "status", headerName: Literal[lang].status, flex: 0.6, sortable: true , renderCell: (params) => getStatusCell(params, clickStatus) }
  ];

  const clickStatus = async (isChecked, row) => {
    if(row?.status === "DISCONTINUED"){
        // ✅ Write to logic ref via Prop
        if (actionRef) {
            actionRef.current = { type: "ACTIVE", payload: row };
        }
        setConfirmMsg(Literal[lang].confirmMsg.replace("{0}", row?.firstName+" "+row?.lastName).replace("{1}", Literal[lang].team+" "+Literal[lang].member+"'s account").replace("{2}", Literal[lang].setActive));
        setConfirmBoxOpen(true);
    }
    else{
      setLoading(true);
      await updateStatus(isChecked, row);
    }
  }

  const updateStatus = async (isChecked, row) =>{
    row.status = isChecked ? "ACTIVE" : "INACTIVE";
    await updateEntity(Users_URL + "/updateStatus", row)
      .then(() => {
        showSnackBar((isChecked ? Literal[lang].activated : Literal[lang].deactivated).replace("{entity}", Literal[lang].user+" "+ row?.firstName+" "+row?.lastName));
        onRefreshBtnClick();
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const getUrl = (paginationObj, searchParam) => {
    let queryStatuses = statuses;
    let url = gridURL + "/all";
    url += '?statuses='+queryStatuses.join(",");
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
  }, [id, sortModel, statuses]);

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
    navigateOnQuickSearch(navigate, "/dashboard/user", val);
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
          clickDiscontinued={clickDiscontinued}
          clickResetPassword={clickResetPassword}
          clickView={clickView}
          entity={entity}
          paginationModel={paginationModel}
          handlePaginationModel={onHandlePaginationModel}
          handleSortingModel={onHandleSortingModel}
          rowHeight={100}
        />
      </Grid>
    </Grid>
  );
});

export default UsersGrid;