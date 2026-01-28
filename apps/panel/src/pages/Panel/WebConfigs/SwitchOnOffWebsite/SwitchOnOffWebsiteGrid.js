import { Grid, Stack } from "@mui/material";
import BaseList from "@ui/components/UI/widgets/BaseList";
import BaseSwitch from "@ui/components/UI/widgets/BaseSwitch";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { URL_CONFIG } from "@utils/Config/URLs";
import { getModifiedDateCell } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";

const SwitchOnOffWebsiteGrid = forwardRef((props, ref) => {

    const { showSnackBar, clickEdit, clickDelete, clickCopy, initialQuery, clickView } = props;

    const [loading, setLoading] = useState(false);
    const { lang } = useContext(LanguageContext);
    const { getGridData, updateEntity } = PanelServices();
    const {setWebsiteEnabled} = WebsiteServices();
    const contentContHeight = 'calc(100vh - 140px)';
    const [gridData, setGridData] = useState([]);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({ id: false, createdDate: false, price: false,  });

    useEffect(()=>{
      onRefreshBtnClick();
    },[]);
        
    const clickStatus = async (isChecked, row) => {
        setLoading(true);
        row.siteEnabled = isChecked;
        await setWebsiteEnabled(row)
            .then((res) => {
            showSnackBar((isChecked ? Literal[lang].activated : Literal[lang].deactivated).replace("{entity}", Literal[lang].website));
            onRefreshBtnClick();
            })
            .catch((e) => {
              console.log(e);
            })
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
                defaultChecked = {params?.row?.siteEnabled}
                onToggle= {clickStatus}
                switchKey = {params?.row?.id}
                row = {params?.row}
            />
          </Stack>
        );
    };

    const columns = [
        { field: "id", headerName: Literal[lang].id, flex: 0.7 },
        { field: "name", headerName: Literal[lang].name, flex: 1.2 },
        { field: "websiteId", headerName: Literal[lang].websiteId, flex: 1 },
        { field: "createdDate", headerName: Literal[lang].createdDate, flex: 1.1, renderCell: (params) => getModifiedDateCell(params, "createdDate") },
        { field: "lastModifiedDate", headerName: Literal[lang].updatedDate, flex: 1.1, renderCell: (params) => getModifiedDateCell(params, "lastModifiedDate") },
        { field: "siteEnabled", headerName: Literal[lang].status, flex: 1, renderCell: (params) => getStatusCell(params) }
      ];

      const getUrl = () => {
        let url = (URL_CONFIG.ADMIN_URL + URL_CONFIG.SITE_ENABLED)  + "/all";
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
        // <div className="middle-main-container">
        //   <h2 style={{display: 'flex', justifyContent:"center"}}>{Literal[lang].webSettings}</h2>
        //   <Grid
        //     container
        //     spacing={10}
        //     padding='10px 20px'
        //     wrap={isMobile?  'wrap':"nowrap"} // 👈 prevents wrapping on desktop
        //     justifyContent={isMobile ? "center" : "space-around"}
        //     alignItems="flex-start"
        //     >
        //     {/* <Grid
        //         item
        //         xs={12}
        //         sm={3}
        //         className="profile-center-align"
        //         sx={{ minWidth: '250px', maxWidth: '300px' }} // optional for control
        //     > */}
        //         {/* <AvatarUploaderWithMenu
        //             imageRefreshKey={imageRefreshKey}
        //             user={user}
        //             imageUrl={URL_CONFIG.API_URL + URL_Get_Profile_Img}
        //             name={user?.firstName + " " + user?.lastName}
        //             onImageUpdate={handleImageUpload}
        //             size={300}
        //         /> */}
        //     {/* </Grid> */}
        //     <Grid
        //         item
        //         xs={12}
        //         sm
        //         className="profile-center-align"
        //         sx={{ flexGrow: 1 }}
        //     >                
        //         <Box
        //             className="profile-attributes"
        //             sx={{
        //               display: 'flex',
        //               justifyContent: 'space-around',
        //               gap: 2,
        //               width: '100%',
        //             }}
        //           >
        //             <button type="button"
        //                 className="form-button"
        //                 onClick={() => window.open(URL_CONFIG.SITE_URL, '_blank', 'noopener,noreferrer')}
        //             >
        //                 {URL_CONFIG.SITE_URL}
        //             </button>  
        //             <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        //             <h4>{Literal[lang].enableWebsite}</h4>
        //             <BaseSwitch 
        //                 powerStyle={true}
        //                 // defaultChecked = {true}
        //                 onToggle= {clickStatus}
        //                 // switchKey = {1}
        //                 // row = {params?.row}
        //             />
        //             </Box>
        //         </Box>
        //     </Grid>
        //   </Grid>
        // </div>
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
                  columns={columns}
                //   clickEdit={clickEdit}
                //   clickDelete={clickDelete}
                //   clickCopy={clickCopy}
                //   clickView={clickView}
                  entity="webSites"
                  rowHeight={120}
                />
              </Grid>
            </Grid>
    )
    
})
export default SwitchOnOffWebsiteGrid;