import React, { useEffect, useState, useContext } from "react";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
  CircularProgress,
  Grid2,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddressCard from "./AddressCard";
import { OrderServices } from "@utils/services/OrderServices";
import { useCart } from "@utils/helper/ApiConfig/CartContext";
import AddAddress from "../Address/AddAddress";
import BaseAddButton from "@ui/components/UI/widgets/BaseAddButton";
import CustomConfirmBox from "@ui/components/Ui/widgets/CustomConfirmBox";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { PanelServices } from "@utils/services/PanelServices";
import { Address_URL } from "@utils/Config/URLs";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";

const AddressSelectorDialog = ({
  open,
  onClose,
  selectedAddress,
  setSelectedAddress,
  showSnackBar,
  isMobile
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { lang } = useContext(LanguageContext);
  const { setSubcategories, updateEntity, getGridData } = PanelServices();
  const {updateOrderAddress} = OrderServices();
  const { updateCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState("create");
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [children, setChildren] = useState([]);

  const loadAddresses = async () => {
    try {
      return (await getGridData(`${Address_URL}/user`)) || [];
    } catch (e) {
      console.error("Failed to load addresses", e);
    }
  };

  const refresh = async () => {
    setLoading(true);
    const res = await loadAddresses();
    setAddresses(res?.data);
    setLoading(false);
  };

  useEffect(() => {
    if (open) refresh();
  }, [open]);

  const handleSelect = async (address) => {
    setLoading(true);
    try {
      const res = await updateOrderAddress(address.id);
      if (res) {
        // updateCart();
        setSelectedAddress(address);
        showSnackBar("Address updated successfully");
        onClose();
      }
    } catch (e) {
      showSnackBar("Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const clickAddAddress = () => {
    setOpenAdd(true);
    setAction("create");
    setSelectedItem(null);
  };

  const resetData = () => {
    setSelectedItem(null);
    setAction("create");
  };

  const clickEdit = (row) => {
    setSelectedItem(row);
    setOpenAdd(true);
    setAction("edit");
  };

  const clickView = (row) => {
    setSelectedItem(row);
    setOpenAdd(true);
    setAction("view");
  };

  const closeConfirmBox = () => {
    setConfirmBoxOpen(false);
    resetData();
  };

  const deleteAddress = async () => {
    await updateEntity(Address_URL + "/delete", selectedItem).then((res) => {
      showSnackBar(res?.message || res);
    });
    resetData();
    refresh();
  };

  const clickSetPrimary = async (id) => {
    try {
      setLoading(true);
      await setSubcategories(`${Address_URL}/set-primary`, {
        id: id,
      });
      showSnackBar(Literal[lang].setDefaultSuccess || "Address set as default");
      refresh();
    } catch (error) {
      showSnackBar(Literal[lang].somethingWentWrong || "Failed to set default address");
    } finally {
      setLoading(false);
    }
  };

  const DialogContentBody = (
    <Grid2
      container
      spacing={1}
      width='100%'
      padding="10px 20px"
      flexDirection="column"
      // wrap={isMobile ? "wrap" : "nowrap"}
      justifyContent={isMobile ? "center" : "space-around"}
      alignItems="flex-start"
    >
      <BaseAddButton
        handleClick={clickAddAddress}
        addMsg={`${Literal[lang].addNew} ${Literal[lang].address}`}
        handleRefresh={refresh}
        entity="address"
      />
      {loading ? (
        <CircularProgress />
      ) : (
        addresses?.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={selectedAddress?.id === address.id}
            onSelect={() => handleSelect(address)}
            onEdit={() => clickEdit(address)}
            onView={() => clickView(address)}
            onPrimary={clickSetPrimary}
          />
        ))
      )}
    </Grid2>
  );

  return (
    <>
      <BaseDialog
        open={open}
        setOpen={onClose}
        fullScreen={fullScreen}
        maxWidth="sm"
        title={Literal[lang].selectDeliveryAddress}
        bodyComponent={DialogContentBody}
        actions={
          <DialogActions>
            <Button onClick={onClose}>{Literal[lang].cancel}</Button>
          </DialogActions>
        }
      />

      <AddAddress
        dialogOpen={openAdd}
        setDialogOpen={setOpenAdd}
        isMobile={fullScreen}
        loading={loading}
        setLoading={setLoading}
        showSnackBar={showSnackBar}
        refresh={refresh}
        addressToEdit={selectedItem}
        setAddressToEdit={setSelectedItem}
        resetData={resetData}
        action={action}
        entity="address"
      />

      <CustomConfirmBox
        Msg={Literal[lang].deleteMsg
          .replace("{0}", selectedItem?.fullName + "'s ")
          .replace("{1}", Literal[lang].address)}
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

export default AddressSelectorDialog;
