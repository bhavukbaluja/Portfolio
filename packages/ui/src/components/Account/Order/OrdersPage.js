import React, { useContext, useEffect, useState } from "react";
import { OrderServices } from "@utils/services/OrderServices";
import OrderTile from "./OrderTile";
import { Box, Typography, CircularProgress } from "@mui/material";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";
import StatusTiles from "./StatusTiles";
import { useLocation } from "react-router-dom";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import AnimatedSearchBar from "@ui/components/UI/widgets/AnimatedSearchBar";
import { updateQueryParam } from "@utils/helper/Helper";

const OrdersPage = ({ isMobile, isManager = false, loading, setLoading, page, showAfterSaleStatuses = true, showOrderStatuses = true, showSnackBar, refreshSidebarCounts, setImageRefreshKey, imageRefreshKey }) => {
  
  const { getAllOrders, getOrdersByStatuses } = OrderServices();
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [statuses, setStatuses] = useState([]);
  const { lang } = useContext(LanguageContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchParam, setSearchParam] = useState(queryParams.get('query')||"");

  const fetchOrders = () => {
    setLoading(true);
    const fetchFn =
      statuses.includes("ALL") || !isManager
        ? () => getAllOrders(searchParam)
        : () => getOrdersByStatuses(statuses, searchParam);

    fetchFn()
      .then((res) => {
        setOrders(res?.data || []);
        setTotalCount(res?.total || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Fetch when statuses change (and not empty)
  useEffect(() => {
    if (statuses.length > 0 || !isManager) {
      fetchOrders();
    }
    else{
        setOrders([]);
    }
  }, [statuses, searchParam]);

  const clickSearch=(value) =>{
    updateQueryParam("query", value);
    setSearchParam(value);
    // refresh();
  }

  const refresh=()=>{
    fetchOrders();
  }

  // Initialize statuses from page prop
  useEffect(() => {
    if (!page?.statuses || page?.statuses?.includes("ALL") || page?.statuses?.includes("ALLRETURNS")) return;

    if (typeof page.statuses === "string") {
      const newStatuses = [page.statuses.toUpperCase()];
      if (JSON.stringify(newStatuses) !== JSON.stringify(statuses)) {
        setStatuses(newStatuses);
      }
    } else if (Array.isArray(page.statuses)) {
      const newStatuses = page.statuses.map((s) => s.toUpperCase());
      if (JSON.stringify(newStatuses) !== JSON.stringify(statuses)) {
        setStatuses(newStatuses);
      }
    }
  }, [page]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box
        p={2}
        width={isMobile || isManager ? "100%" : "80vw"}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <div style={{display: 'flex', flexDirection: isMobile? 'column':'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding:'10px'}}>
          <div style={{flex: 1, alignItems: 'center'}}>
            <Typography variant="body1" gutterBottom style={{color: 'var(--secondarytext-color'}}>
              {`${orders.length} of ${Literal[lang].total} ${totalCount}`}
            </Typography>
          </div>
          <div style={{flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
            <Typography variant="h5" gutterBottom >
              {Literal[lang][page ? page.title : "yourOrders"]}
            </Typography>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flex: 1, gap: '10px', alignItems: 'center', width: '100%'}}>
              <AnimatedSearchBar 
                  entity={page? page?.title: "orders"} 
                  expandFrom={isMobile?'left':'right'}
                  clickSearch={clickSearch}
                  initialQuery={searchParam}
              />
              <button 
                  type="button"
                  className="refresh-Button"
                  onClick={refresh}
              >
                  <RefreshOutlinedIcon/> {}
              </button>
            {/* </div> */}
          </div>
        </div>

        {isManager && (page?.statuses.includes("ALL") || page?.statuses.includes("ALLRETURNS")) && (
          <Box mb={3}>
            <StatusTiles selectedStatuses={statuses} setSelectedStatuses={setStatuses} page={page} showAfterSaleStatuses={showAfterSaleStatuses} showOrderStatuses={showOrderStatuses} pathname={location.pathname}/>
          </Box>
        )}

        {orders.length === 0 ? (
          <Typography>{Literal[lang].noOrdersFound}</Typography>
        ) : (
          orders.map((order, i) => (
            <OrderTile key={order?.id} order={order} isMobile={isMobile} isManager={isManager} showSnackBar={showSnackBar} refresh={refresh} setLoading={setLoading} refreshSidebarCounts={refreshSidebarCounts} setImageRefreshKey ={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>
          ))
        )}
      </Box>
    </Box>
  );
};

export default OrdersPage;
