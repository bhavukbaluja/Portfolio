import { Order_URL, TrackingDetails_URL } from "@utils/Config/URLs";
import { useCallApi } from "@utils/helper/CallApi";
import { paginationData} from '@utils/helper/Helper'; 

export const OrderServices = () => {
  const { CallApi } = useCallApi();

  const getUrl = (searchParam, paginationObj) => {
    // let archiveFlag = logfilter2 === 'archive' ? 'true' : 'false';
    let page=1;

    let url = '&page=' + (paginationObj ? paginationObj.page + 1 : page) + '&start=0&limit=' + (paginationObj ? paginationObj.pageSize : paginationData().pageSize);
    if (searchParam) {
      url += '&query=' + searchParam;
    }
    // if (sortModel.property) {
    //   url += '&sort=' + encodeURIComponent(JSON.stringify([{ property: sortModel.property, direction: sortModel.direction.toUpperCase() }]));
    // }
    return url;
  };

  const createDraftOrder = async (items, discount = 0, addressId, deliveryCharges) => {
    const url = `${Order_URL}/draft`;
    const payload = { items, discount, addressId, deliveryCharges };
    return await CallApi(url, "POST", payload);
  };

  const updateOrderAddress = async (addressId) => {
    const url = `${Order_URL}/updateAddress?addressId=${addressId}`;
    return await CallApi(url, "POST");
  };  

  const getAllOrders = async (searchParam, paginationObj) => {
    const url = `${Order_URL}?${getUrl(searchParam, paginationObj)}`;
    return await CallApi(url, "GET");
  };

  const getOrderById = async (orderId) => {
    const url = `${Order_URL}/${orderId}`;
    return await CallApi(url, "GET");
  };

  const getTrackingDetails = async (entity, entityId) => {
    const url = `${TrackingDetails_URL}/${entity}/${entityId}/status_changed`;
    return await CallApi(url, "GET");
  };


  const getOrdersByStatuses = async (statuses, searchParam, paginationObj) => {
    if(statuses.length==0){
      statuses=["none"];
    }
    let queryStatuses = statuses;
  
    const url = `${Order_URL}/status?statuses=${queryStatuses.join(",")}${getUrl(searchParam, paginationObj)}`;
    return await CallApi(url, "GET");
  };

  const getOrdersCountByStatuses = async (statuses) => {
    if(statuses.length==0){
      statuses=["none"];
    }
    let queryStatuses = statuses;
  
    const url = `${Order_URL}/status/count?statuses=${queryStatuses.join(",")}`;
    return await CallApi(url, "GET");
  };

  const getOrdersCountforAllStatuses = async () => {
    const url = `${Order_URL}/allStatuses/count`;
    return await CallApi(url, "GET");
  };
  

  const updateOrderStatus = async (orderId, status, addressId = null, shipType = null, payment) => {
    const params = new URLSearchParams();
    params.append("orderStatus", status);
    if (addressId) params.append("addressId", addressId);
    if (shipType) params.append("shipType", shipType);
  
    const url = `${Order_URL}/status/${orderId}?${params.toString()}`;
    return await CallApi(url, "POST", payment);
  };
  

  const updateOrderItemStatus = async (itemId, status) => {
    const url = `${Order_URL}/item/status?itemId=${itemId}&status=${status}`;
    return await CallApi(url, "POST");
  };

  return {
    createDraftOrder,
    getAllOrders,
    getOrdersByStatuses,
    getOrdersCountByStatuses,
    getOrdersCountforAllStatuses,
    updateOrderStatus,
    updateOrderItemStatus,
    updateOrderAddress,
    getOrderById,
    getTrackingDetails
  };
};
