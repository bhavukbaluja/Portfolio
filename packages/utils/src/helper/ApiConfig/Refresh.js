import { refreshUserInfo } from "./API_Helper";
import { useCallApi } from "../CallApi";

export const Refresh = () => {
    const { CallApi } = useCallApi();

  const handleRefresh = async () => {
    const updatedUser = await refreshUserInfo(CallApi);
    console.log("Updated user info:", updatedUser);
  };


  return { handleRefresh};
};
