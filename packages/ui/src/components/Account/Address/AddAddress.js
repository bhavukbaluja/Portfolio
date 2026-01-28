import React, { useState, useEffect, useContext } from "react";
import { Box, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { Grid } from "@mui/material";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { validateField } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import { Address_URL } from "@utils/Config/URLs";

const AddAddress = ({
  loading,
  setLoading,
  showSnackBar,
  dialogOpen,
  setDialogOpen,
  isMobile,
  refresh,
  addressToEdit,
  setAddressToEdit,
  resetData,
  action,
  entity,
}) => {
  const readOnly = action === "view";
  const { lang } = useContext(LanguageContext);
  const { setSubcategories } = PanelServices();

  const initialFormData = {
    fullName: "",
    streetAddress1: "",
    streetAddress2: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    mobile: "",
    isPrimary: false,
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setAddressToEdit(null);
    resetData();
  };

  const handleDialogClose = () => {
    resetForm();
    setDialogOpen(false);
  };

  useEffect(() => {
    if (dialogOpen && addressToEdit) {
      setFormData({
        fullName: addressToEdit.fullName || "",
        streetAddress1: addressToEdit.streetAddress1 || "",
        streetAddress2: addressToEdit.streetAddress2 || "",
        landmark: addressToEdit.landmark || "",
        city: addressToEdit.city || "",
        state: addressToEdit.state || "",
        pinCode: addressToEdit.pinCode || "",
        country: addressToEdit.country || "",
        mobile: addressToEdit.mobile || "",
        isPrimary: addressToEdit.isPrimary || false,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [addressToEdit, dialogOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name in newErrors) delete newErrors[name];
      const error = validateField(name, newValue);
      if (error) newErrors[name] = error;
      return { ...newErrors };
    });
  };

  const clickSubmit = async () => {
    setLoading(true);
    const jsonData = { ...formData };
    if (addressToEdit && action === "edit") {
      jsonData["id"] = addressToEdit.id;
    }

    const url =
      addressToEdit && action === "edit"
        ? `${Address_URL}/update`
        : `${Address_URL}/add`;

    await setSubcategories(url, jsonData)
      .then((response) => {
        showSnackBar(response?.message || response);
        setDialogOpen(false);
        refresh();
        resetForm();
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const Content = (
    <FormControl onSubmit={clickSubmit}>
      <Grid
        container
        spacing={10}
        padding="10px 20px"
        wrap={isMobile ? "wrap" : "nowrap"}
        justifyContent={isMobile ? "center" : "space-around"}
        alignItems="flex-start"
      >
        <Grid item xs={12} sm className="profile-center-align" sx={{ flexGrow: 1, flexDirection: "column" }}>
          <Box
            className="profile-attributes"
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {["fullName", "streetAddress1", "streetAddress2", "landmark", "city", "state", "pinCode", "country", "mobile"].map((field) => (
              <Box key={field} sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                <BaseTextField2
                  id={`${field}-input`}
                  label={field}
                  name={field}
                  required
                  placeHolderText={Literal[lang].textPlaceholder.replace("{0}", Literal[lang][field] || field)}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={readOnly}
                  errorMsg={errors[field]}
                />
              </Box>
            ))}
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPrimary"
                    checked={formData.isPrimary}
                    onChange={handleChange}
                    disabled={readOnly || addressToEdit?.isPrimary==true}
                  />
                }
                label={Literal[lang].defaultAddress || "Set as default address"}
              />
            </Box>
          </Box>

          {!readOnly && (
            <Box
              sx={{
                flex: 1,
                minWidth: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="form-button"
                type="submit"
                onClick={clickSubmit}
                disabled={
                    loading || 
                    !formData.fullName || 
                    !formData.streetAddress1 || 
                    !formData.streetAddress2 || 
                    !formData.state || 
                    !formData.pinCode || 
                    !formData.mobile || 
                    !formData.landmark || 
                    !formData.city || 
                    !formData?.country}
                onKeyDown={(e) => {
                  if (e.key === "Enter") clickSubmit();
                }}
              >
                {action === "edit" ? Literal[lang].update : Literal[lang].save}
              </button>
            </Box>
          )}
        </Grid>
      </Grid>
    </FormControl>
  );

  return (
    <BaseDialog
      bodyComponent={Content}
      open={dialogOpen}
      disableScrollLock={true}
      setOpen={handleDialogClose}
      title={
        action === "edit"
          ? `${Literal[lang].edit} ${Literal[lang]["address"]}`
          : action === "copy"
          ? `${Literal[lang].copy} ${Literal[lang]["address"]}`
          : action === "view"
          ? `${Literal[lang].view} ${Literal[lang]["address"]}`
          : `${Literal[lang].add} ${Literal[lang]["address"]}`
      }
    />
  );
};

export default AddAddress;
