import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import React, { useContext, useRef, useState } from "react";
import StickyHeader from "../../../Header/StickyHeader";
import { Product_URL } from "@utils/Config/URLs";
import { PanelServices } from "@utils/services/PanelServices";
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { updateQueryParam } from "@utils/helper/Helper";
import SwitchOnOffWebsiteGrid from "./SwitchOnOffWebsiteGrid";

const WebSettings = ({ loading, setLoading, showSnackBar, isMobile }) => {
  const { lang } = useContext(LanguageContext);
  const entity = "webSites";

  const [searchParam, setSearchParam] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = searchParam || queryParams.get("query");

  const [action, setAction] = useState("create");
  const [openAdd, setOpenAdd] = useState(false);
  const productGridRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState();
  const { updateEntity } = PanelServices();
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [children, setChildren] = useState([]);

  /** 🔘 Add New Website */
  const clickAddProduct = () => setOpenAdd(true);

  /** 🔁 Refresh Grid */
  const clickRefresh = () => {
    if (productGridRef.current) {
      productGridRef.current.refresh();
    }
  };

  /** 🧹 Reset Local State */
  const resetData = () => {
    setSelectedItem(null);
    setAction("create");
  };

  /** 🔍 Search */
  const clickSearch = (value) => {
    updateQueryParam("query", value);
    setSearchParam(value);
    if (productGridRef.current) {
      productGridRef.current.handleQueryParamChange(value);
    }
  };

  /** 👁 View */
  const clickView = (row) => {
    setSelectedItem(row);
    setAction("view");
    setOpenAdd(true);
  };

  /** ✏️ Edit */
  const clickEdit = (row) => {
    if (row?.status === "ACTIVE") {
      setChildren([
        Literal[lang].activeCantAction
          .replace("{entity}", Literal[lang][entity])
          .replace("{action}", Literal[lang].edited),
        Literal[lang].deactivateFirst.replace(
          "{entity}",
          Literal[lang][entity]
        ),
      ]);
      setAlertMsg(
        Literal[lang].entityIsActive
          .replace("{0}", row?.title)
          .replace("{entity}", Literal[lang][entity])
      );
      setOpenAlert(true);
    } else {
      setSelectedItem(row);
      setOpenAdd(true);
      setAction("edit");
    }
  };

  /** 📋 Copy */
  const clickCopy = (row) => {
    setSelectedItem(row);
    setOpenAdd(true);
    setAction("copy");
  };

  /** 🗑 Delete */
  const clickDelete = async (row) => {
    if (row?.status === "ACTIVE") {
      setChildren([
        Literal[lang].activeCantAction
          .replace("{entity}", Literal[lang][entity])
          .replace("{action}", Literal[lang].deleted),
        Literal[lang].deactivateFirst.replace(
          "{entity}",
          Literal[lang][entity]
        ),
      ]);
      setAlertMsg(
        Literal[lang].entityIsActive
          .replace("{0}", row?.title)
          .replace("{entity}", Literal[lang][entity])
      );
      setOpenAlert(true);
    } else {
      setConfirmBoxOpen(true);
      setSelectedItem(row);
    }
  };

  /** ❌ Close Confirm */
  const closeConfirmBox = () => {
    setConfirmBoxOpen(false);
    resetData();
  };

  /** ✅ Delete (Reactive Endpoint) */
  const deleteProduct = async () => {
    try {
      const res = await updateEntity(Product_URL + "/delete", selectedItem);
      showSnackBar(res?.message || Literal[lang].deletedSuccessfully);
    } catch (err) {
      showSnackBar(err?.message || "Error deleting website");
    } finally {
      resetData();
      clickRefresh();
    }
  };

  /** 🔘 Toggle Website Status (Reactive POST to backend) */
  const handleToggleSite = async (row, newStatus) => {
    try {
      setLoading(true);
      const payload = {
        websiteId: row.websiteId,
        siteEnabled: newStatus,
      };
      const res = await updateEntity(Product_URL + "/updateSiteStatus", payload);
      showSnackBar(res?.message || "Site status updated successfully");
      clickRefresh();
    } catch (err) {
      showSnackBar(err?.message || "Failed to update site status");
    } finally {
      setLoading(false);
    }
  };

  /** 🧩 Header Buttons */
  const content = (
      <BaseAddButton
        handleClick={clickAddProduct}
        addMsg={Literal[lang].website}
        handleRefresh={clickRefresh}
        entity={entity}
        clickSearch={clickSearch}
        initialQuery={initialQuery}
      />
  );

  return (
    <div className="panel-main">
      <StickyHeader content={content} />

      <SwitchOnOffWebsiteGrid
        ref={productGridRef}
        showSnackBar={showSnackBar}
        clickEdit={clickEdit}
        clickDelete={clickDelete}
        clickCopy={clickCopy}
        clickView={clickView}
        handleToggleSite={handleToggleSite} // <-- added for toggle support
        initialQuery={initialQuery}
        location={location}
      />

      <CustomConfirmBox
        Msg={Literal[lang].deleteMsg
          .replace("{0}", selectedItem?.title)
          .replace("{1}", Literal[lang][entity])}
        open={confirmBoxOpen}
        setOpen={closeConfirmBox}
        clickedYes={deleteProduct}
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

export default WebSettings;
