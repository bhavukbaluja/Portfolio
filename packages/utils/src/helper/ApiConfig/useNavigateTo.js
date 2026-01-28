import { useLocation, useNavigate } from "react-router-dom";
import { setGlobalNavigateTo } from "./NavigateService.js"; // path as per your structure

const useNavigateTo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (newURL, oldURL = "", force = false) => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    const shouldNavigate =
      force ||
      !oldURL || // No oldURL provided, allow navigation
      lastSegment === oldURL ||
      ["signup", "login"].includes(lastSegment);

    if (shouldNavigate) {
      navigate(newURL);
    }
  };

  // Set globally once
  setGlobalNavigateTo(navigateTo);

  return navigateTo;
};

export default useNavigateTo;
