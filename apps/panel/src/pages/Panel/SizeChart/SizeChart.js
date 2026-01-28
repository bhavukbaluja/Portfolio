// Path: /components/SizeChart/SizeChart.js

import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import React, { useContext, useRef, useState } from "react";
import StickyHeader from "../../Header/StickyHeader";
import "../Panel.scss";
import AddSizeChart from "./AddSizeChart";
import SizeChartGrid from "./SizeChartGrid";
import { SizeChart_URL } from "@utils/Config/URLs";
import { PanelServices } from "@utils/services/PanelServices";
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { updateQueryParam } from "@utils/helper/Helper";

const SizeChart = ({ loading, setLoading, showSnackBar, isMobile }) => {
  const { lang } = useContext(LanguageContext);
  const entity = "sizeChart";

  const [searchParam, setSearchParam] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = searchParam || queryParams.get("query");

  const [action, setAction] = useState("create");
  const [openAdd, setOpenAdd] = useState(false);
  const sizeChartGridRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState();
  const { setSubcategories } = PanelServices();
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [children, setChildren] = useState([]);

  const resetData = () => {
    setSelectedItem(null);
    setAction("create");
  };

  const clickRefresh = () => {
    if (sizeChartGridRef.current) {
      sizeChartGridRef.current.refresh();
    }
  };

  const clickAddSizeChart = () => {
    setOpenAdd(true);
  };

  const clickView = (row) => {
    setSelectedItem(row);
    setAction("view");
    setOpenAdd(true);
  };

  const clickEdit = (row) => {
    if (row?.status === "ACTIVE") {
      setChildren([
        Literal[lang].activeCantAction.replace("{entity}", Literal[lang][entity]).replace("{action}", Literal[lang].edited),
        Literal[lang].deactivateFirst.replace("{entity}", Literal[lang][entity]),
      ]);
      setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.size).replace("{entity}", Literal[lang][entity]));
      setOpenAlert(true);
    } else {
      setSelectedItem(row);
      setOpenAdd(true);
      setAction("edit");
    }
  };

  const clickCopy = (row) => {
    setSelectedItem(row);
    setOpenAdd(true);
    setAction("copy");
};

  const clickDelete = async (row) => {
    if (row?.status === "ACTIVE") {
      setChildren([
        Literal[lang].activeCantAction.replace("{entity}", Literal[lang][entity]).replace("{action}", Literal[lang].deleted),
        Literal[lang].deactivateFirst.replace("{entity}", Literal[lang][entity]),
      ]);
      setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.size).replace("{entity}", Literal[lang][entity]));
      setOpenAlert(true);
    } else {
      setConfirmBoxOpen(true);
      setSelectedItem(row);
    }
  };

  const closeConfirmBox = () => {
    setConfirmBoxOpen(false);
    resetData();
  };

  const deleteSizeChart = async () => {
    await setSubcategories(SizeChart_URL + "/delete", selectedItem).then((res) => {
      showSnackBar(res?.message || res);
    });
    resetData();
    clickRefresh();
  };

  const clickSearch = (value) => {
    updateQueryParam("query", value);
    setSearchParam(value);
    if (sizeChartGridRef.current) {
      sizeChartGridRef.current.handleQueryParamChange(value);
    }
  };

  const content = (
      <BaseAddButton
        handleClick={clickAddSizeChart}
        addMsg={Literal[lang].add + " " + Literal[lang].size}
        handleRefresh={clickRefresh}
        entity={entity}
        clickSearch={clickSearch}
        initialQuery={initialQuery}
      />
  );

  return (
    <div className="panel-main">
      <StickyHeader content={content} />
      <SizeChartGrid
        ref={sizeChartGridRef}
        showSnackBar={showSnackBar}
        clickEdit={clickEdit}
        clickDelete={clickDelete}
        clickCopy={clickCopy}
        clickView={clickView}
        initialQuery={initialQuery}
        location={location}
      />
      <AddSizeChart
        dialogOpen={openAdd}
        setDialogOpen={setOpenAdd}
        isMobile={isMobile}
        loading={loading}
        setLoading={setLoading}
        showSnackBar={showSnackBar}
        refresh={clickRefresh}
        sizeChartToEdit={selectedItem}
        setSizeChartToEdit={setSelectedItem}
        resetData={resetData}
        action={action}
        entity={entity}
      />
      <CustomConfirmBox
        Msg={Literal[lang].deleteMsg.replace("{0}", selectedItem?.size).replace("{1}", Literal[lang][entity])}
        open={confirmBoxOpen}
        setOpen={closeConfirmBox}
        clickedYes={deleteSizeChart}
      />
      <CustomAlertBox Msg={alertMsg} open={openAlert} setOpen={setOpenAlert} children={children} />
    </div>
  );
};

export default SizeChart;
