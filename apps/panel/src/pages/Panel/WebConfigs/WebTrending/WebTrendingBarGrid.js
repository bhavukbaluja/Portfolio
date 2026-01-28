import { Grid, Stack } from "@mui/material";
import BaseList from "@ui/components/UI/widgets/BaseList";
import BaseSwitch from "@ui/components/UI/widgets/BaseSwitch";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { WebTrendingBar_URL } from "@utils/Config/URLs";
import { actionColumn, getModifiedDateCell } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";

const WebTrendingBarGrid = forwardRef((props, ref) => {

    const { showSnackBar, clickEdit, clickDelete, clickCopy, initialQuery, clickView, entity } = props;

    const [loading, setLoading] = useState(false);
    const { lang } = useContext(LanguageContext);
    const { getGridData, updateEntity } = PanelServices();
    const contentContHeight = 'calc(100vh - 140px)';
    const [gridData, setGridData] = useState([]);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false, createdDate: false, price: false,  });

    useEffect(()=>{
      onRefreshBtnClick();
    },[]);
        
    const clickStatus = async (isChecked, row) => {
        setLoading(true);
        row.status = isChecked ? "ACTIVE" : "INACTIVE";
        await updateEntity(WebTrendingBar_URL + "/update", row)
        .then(() => {
            showSnackBar((isChecked ? Literal[lang].activated : Literal[lang].deactivated).replace("{entity}", Literal[lang][entity]));
            onRefreshBtnClick();
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    };


    const getStatusCell = (params) => {
        const width = params?.column?.getSize?.();
        return (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              display: 'flex', // this is important
              height: '100%',  // this ensures it stretches full cell height
              justifyContent: 'center'
            }}
          >      
            <BaseSwitch 
                powerStyle={true}
                defaultChecked = {params?.row?.status=="ACTIVE"}
                onToggle= {clickStatus}
                switchKey = {params?.row?.id}
                row = {params?.row}
            />
          </Stack>
        );
    };

    const columns = [
        { field: "id", headerName: Literal[lang].id, flex: 0.7 },
        { field: "title", headerName: Literal[lang].title, flex: 1 },
        { field: "description", headerName: Literal[lang].description, flex: 1.2 },
        { field: "path", headerName: Literal[lang].path, flex: 1},
        { field: "createdDate", headerName: Literal[lang].createdDate, flex: 1.1, renderCell: (params) => getModifiedDateCell(params, "createdDate") },
        { field: "lastModifiedDate", headerName: Literal[lang].updatedDate, flex: 1.1, renderCell: (params) => getModifiedDateCell(params, "lastModifiedDate") },
        { field: "status", headerName: Literal[lang].status, flex: 1, renderCell: (params) => getStatusCell(params) }
      ];

      const getUrl = () => {
        let url = (WebTrendingBar_URL)  + "/all";
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
        getListData(getUrl());
      };
    
      useImperativeHandle(ref, () => ({
        refresh: () => onRefreshBtnClick()
      }));

      const onHandleColumnVisibilityModel = (newModel) => {
        setColumnVisibilityModel(newModel);
      };
    
    
    return(
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
            entity={entity}
            rowHeight={100}
          />
        </Grid>
      </Grid>
    )
    
})
export default WebTrendingBarGrid;