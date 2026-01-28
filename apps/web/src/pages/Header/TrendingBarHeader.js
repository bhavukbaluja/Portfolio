import React, { useEffect, useState } from "react";
import TrendingBar from "./TrendingBar";
import { WebTrendingBar_URL } from "@utils/Config/URLs";
import { PanelServices } from '@utils/services/PanelServices';
import { convertEntities } from "@utils/helper/Helper";

const TrendingBarHeader = () => {
  const { getGridData } = PanelServices();
  const [trendingBarData, setTrendingBarData] = useState([]);

  useEffect(() => {
    const loadTrendingMsg = async () => {
      try {
        const res = await getGridData(WebTrendingBar_URL + "/allActive");
        setTrendingBarData(res?.data);
      } catch (error) {
        console.error("Failed to load trending bar data", error);
      }
    };
    loadTrendingMsg();
  }, []);

  return trendingBarData.length>0 && <TrendingBar trendingBarData={trendingBarData} />;
};

export default TrendingBarHeader;
