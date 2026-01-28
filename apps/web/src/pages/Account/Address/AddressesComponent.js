import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import BaseStickyHeader from "@ui/components/UI/widgets/BaseStickyHeader";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { PanelServices } from "@utils/services/PanelServices";
import React, { useContext, useEffect, useRef, useState } from "react";
import AddAddress from "@ui/components/Account/Address/AddAddress";
import AddressesGrid from "./AddressesGrid";
import { Address_URL } from "@utils/Config/URLs";
import CustomConfirmBox from "@ui/components/UI/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";

const AddressesComponent = ({
  isMobile,
  loading,
  setLoading,
  showSnackBar,
  openAddAddress = false,
  displayComp = true,
  refresh,
}) => {
  const { lang } = useContext(LanguageContext);
  const entity = "address";
  const [action, setAction] = useState("create");
  const [openAdd, setOpenAdd] = useState(false);
  const addressGridRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState();
  const { setSubcategories, updateEntity } = PanelServices();
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    setOpenAdd(openAddAddress);
  }, [openAddAddress]);

  const clickAddAddress = () => {
    setOpenAdd(true);
    setAction("create");
    setSelectedItem(null);
  };
  const closeConfirmBox = () => {
    setConfirmBoxOpen(false);
    resetData();
  };

  const resetData = () => {
    setSelectedItem(null);
    setAction("create");
  };

  const clickRefresh = () => {
    if (addressGridRef.current) {
      addressGridRef.current.refresh();
    }
    if (refresh) {
      refresh();
    }
  };

  const clickView = (row) => {
    setSelectedItem(row);
    setAction("view");
    setOpenAdd(true);
  };

  const clickEdit = (row) => {
    setSelectedItem(row);
    setOpenAdd(true);
    setAction("edit");
  };

  const clickCopy = (row) => {
    setSelectedItem(row);
    setOpenAdd(true);
    setAction("copy");
  };

  const clickDelete = async (row) => {
    setConfirmBoxOpen(true);
    setSelectedItem(row);
  };

  const deleteAddress = async () => {
      await updateEntity(Address_URL + "/delete", selectedItem).then((res) => {
          showSnackBar(res?.message || res);
      });
      resetData();
      clickRefresh();
  };

  const clickSetPrimary = async (row) => {
    try {
      setLoading(true);
      await setSubcategories(`${Address_URL}/set-primary`, {
        id: row.id,
      });
      showSnackBar(Literal[lang].setDefaultSuccess || "Address set as default");
      clickRefresh();
    } catch (error) {
      showSnackBar(Literal[lang].somethingWentWrong || "Failed to set default address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {displayComp && (
        <div className="panel-main" style={{ minHeight: "80vh", paddingX: (isMobile ? '0px':'30px') }}>
          <BaseStickyHeader
            content={
              <div className="header-comp">
                <BaseAddButton
                  handleClick={clickAddAddress}
                  addMsg={`${Literal[lang].add} ${Literal[lang].address}`}
                  handleRefresh={clickRefresh}
                  entity={entity}
                  initialQuery={""}
                />
              </div>
            }
          />

          <div className={`size-chart-main-wrapper ${isMobile ? "mobile" : "desktop"}`}>
            <div className="size-chart-wrapper">
              <AddressesGrid
                ref={addressGridRef}
                clickEdit={clickEdit}
                clickDelete={clickDelete}
                clickCopy={clickCopy}
                clickView={clickView}
                isMobile={isMobile}
                clickSetPrimary={clickSetPrimary}
              />
            </div>
          </div>
        </div>
      )}
      <AddAddress
        dialogOpen={openAdd}
        setDialogOpen={setOpenAdd}
        isMobile={isMobile}
        loading={loading}
        setLoading={setLoading}
        showSnackBar={showSnackBar}
        refresh={clickRefresh}
        addressToEdit={selectedItem}
        setAddressToEdit={setSelectedItem}
        resetData={resetData}
        action={action}
        entity={entity}
      />
      <CustomConfirmBox
          Msg={Literal[lang].deleteMsg.replace("{0}", selectedItem?.fullName+"'s ").replace("{1}", Literal[lang][entity])}
          open={confirmBoxOpen}
          setOpen={closeConfirmBox}
          clickedYes={deleteAddress}
      />
      <CustomAlertBox
          Msg={alertMsg}
          open={openAlert}
          setOpen={setOpenAlert}
          children={children}
      />
    </>
  );
};

export default AddressesComponent;
