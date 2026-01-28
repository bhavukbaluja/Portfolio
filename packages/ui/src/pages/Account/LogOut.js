import { useContext, useEffect } from "react";
import { AuthContext } from "@utils/helper/ApiConfig/AuthProvider";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import { isEmpty } from "@utils/helper/Helper";

const LogOutPage = ({ setLoading }) => {
  const { user, logout } = useContext(AuthContext);
  const NavigateTo = useNavigateTo();

  useEffect(() => {
    const performLogout = async () => {
      setLoading(true);

      if (user !== null && !isEmpty(user)) {
        await logout(); // If logout is not async, still call it before navigate
      }

      NavigateTo("/login", "/logout", true); // Redirect after logout
      setLoading(false);
    };

    performLogout();
  }, []);

  return null; // or a spinner/loading state
};

export default LogOutPage;
