import React, { useContext, useRef, useState } from "react";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";
import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import StickyHeader from "../../Header/StickyHeader";
import "../Panel.scss";
import AddInventory from "./AddInventory";
import InventoryGrid from "./InventoryGrid";
import { Inventory_URL } from "@utils/Config/URLs";
import { PanelServices } from "@utils/services/PanelServices";
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { updateQueryParam } from "@utils/helper/Helper";

const Inventory = ({ loading, setLoading, showSnackBar, setImageRefreshKey, isMobile, imageRefreshKey }) => {
  const { lang } = useContext(LanguageContext);
  const entity = "inventory";

  const [searchParam, setSearchParam] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = searchParam || queryParams.get("query");

  const [action, setAction] = useState("create");
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [children, setChildren] = useState([]);
  const inventoryGridRef = useRef(null);

  const { updateEntity } = PanelServices();

  const clickAddInventory = () => {
    resetData();
    setOpenAdd(true);
  };

  const clickView = (row) => {
    setSelectedItem(row);
    setAction("view");
    setOpenAdd(true);
  };

  const clickEdit = (row) => {
      setSelectedItem(row);
      setAction("edit");
      setOpenAdd(true);
  };

  const clickCopy = (row) => {
    setSelectedItem(row);
    setAction("copy");
    setOpenAdd(true);
  };

  const clickDelete = async (row) => {
    if (row?.status === "ACTIVE") {
      setChildren([
        Literal[lang].activeCantAction.replace("{entity}", Literal[lang][entity]).replace("{action}", Literal[lang].deleted),
        Literal[lang].deactivateFirst.replace("{entity}", Literal[lang][entity]),
      ]);
      setAlertMsg(Literal[lang].entityIsActive.replace("{0}", row?.product?.sku).replace("{entity}", Literal[lang][entity]));
      setOpenAlert(true);
    } else {
      setSelectedItem(row);
      setConfirmBoxOpen(true);
    }
  };

  const deleteInventory = async () => {
    try {
      const res = await updateEntity(`${Inventory_URL}/delete`, selectedItem);
      showSnackBar(res?.message || res);
      resetData();
      clickRefresh();
    } catch (e) {
      showSnackBar(e.message || "Delete failed", "error");
    }
  };

  const clickRefresh = () => {
    inventoryGridRef.current?.refresh();
  };

  const clickSearch = (value) => {
    updateQueryParam("query", value);
    setSearchParam(value);
    inventoryGridRef.current?.handleQueryParamChange(value);
  };

  const resetData = () => {
    setSelectedItem(null);
    setAction("create");
  };

  const closeConfirmBox = () => {
    setConfirmBoxOpen(false);
    resetData();
  };

  const content = (
      <BaseAddButton
        handleClick={clickAddInventory}
        addMsg={`${Literal[lang].add} ${Literal[lang][entity]}`}
        handleRefresh={clickRefresh}
        entity={entity}
        clickSearch={clickSearch}
        initialQuery={initialQuery}
      />
  );

  return (
    <div className="panel-main">
      <StickyHeader content={content} />

      <InventoryGrid
        ref={inventoryGridRef}
        showSnackBar={showSnackBar}
        clickEdit={clickEdit}
        clickDelete={clickDelete}
        initialQuery={initialQuery}
        location={location}
        clickCopy={clickCopy}
        clickView={clickView}
      />

      <AddInventory
        dialogOpen={openAdd}
        setDialogOpen={setOpenAdd}
        isMobile={isMobile}
        loading={loading}
        setLoading={setLoading}
        showSnackBar={showSnackBar}
        setImageRefreshKey={setImageRefreshKey}
        refresh={clickRefresh}
        inventoryToEdit={selectedItem}
        setInventoryToEdit={setSelectedItem}
        resetData={resetData}
        action={action}
        entity={entity}
        imageRefreshKey={imageRefreshKey}
      />

      <CustomConfirmBox
        Msg={Literal[lang].deleteMsg.replace("{0}", selectedItem?.product?.title).replace("{1}", Literal[lang][entity])}
        open={confirmBoxOpen}
        setOpen={closeConfirmBox}
        clickedYes={deleteInventory}
      />

      <CustomAlertBox
        Msg={alertMsg}
        open={openAlert}
        setOpen={setOpenAlert}
        children={children}
      />
    </div>
  );
};

export default Inventory;
