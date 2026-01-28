import React, { useState, useEffect, useContext } from "react";
import { Box, FormControl, IconButton } from "@mui/material";
import { Grid } from "@mui/material";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { validateField, convertEntities, isEmpty } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import { AddOrUpdateUser_URL } from "@utils/Config/URLs";
import dayjs from "dayjs";
import UserForm from "@ui/pages/Account/UserForm";

const AddUser = ({
  loading,
  setLoading,
  showSnackBar,
  dialogOpen,
  setDialogOpen,
  refresh,
  userToEdit,
  setUserToEdit,
  resetData,
  action,
  team,
  entity,
  isMobile,
  imageRefreshKey,
  setImageRefreshKey
}) => {

  const readOnly = action === "view";
  const { lang } = useContext(LanguageContext);
  const { updateEntity, fetchSubcategories } = PanelServices();
  const userType = team? Literal[lang]["team"]+" "+ Literal[lang]["member"]:Literal[lang]["customer"];
  // --- ⬇️ NEW USER STATE ---
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: null,
    mobile: "",
    region: "",
    role: team? "MANAGER" : "USER",
    accountActive: true,
  });
  const [formData2, setFormData2] = useState({
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [errors2, setErrors2] = useState({});

  const genderOpt = [
    { label: "female", value: "female" },
    { label: "male", value: "male" },
    { label: "others", value: "others"}
  ];

  const resetForm = () => {
    // Reset User Data
    setFormData({ firstName: "", lastName: "", email: "", gender: "", dob: null, mobile: "", role: team? "MANAGER" : "USER", accountActive: true });
    setFormData2({ mobile: "" });
    setErrors({});
    setErrors2({});
    setUserToEdit(null);
    resetData();

  };

  const handleDialogClose = () => {
    resetForm();
    setDialogOpen(false);
  };

  // --- ⬇️ NEW USE EFFECT FOR USER LOADING ---
  useEffect(() => {
    if (dialogOpen && userToEdit) {
      setFormData({
        id: userToEdit?.id || "",
        firstName: userToEdit?.firstName || "",
        lastName: userToEdit?.lastName || "",
        email: userToEdit?.email || "",
        dob: userToEdit?.dob || "",
        gender: userToEdit?.gender || "",
        mobile: userToEdit?.mobile || "",
        role: userToEdit?.role || (team? "MANAGER" : "USER"),
        accountActive: userToEdit?.accountActive,
        region: userToEdit?.region || "",
      });
      setFormData2({
        mobile: userToEdit?.alternateMobile || "",
      });
    } else {
        resetForm();
    }
  }, [userToEdit, dialogOpen]);


  // --- ⬇️ NEW HANDLE CHANGE FOR USER ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name in newErrors) delete newErrors[name];
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
      return { ...newErrors };
    });
  };


  // --- ⬇️ NEW SUBMIT LOGIC FOR USER ---
  const clickSubmit = async () => {
    setLoading(true);

    const jsonData = {
        id: formData?.id,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        dob: formData?.dob ? dayjs(formData.dob).format("YYYY-MM-DD") : null,
        gender: formData?.gender,
        email: formData?.email,
        mobile: formData?.mobile,
        alternateMobile: formData2?.mobile,
        role: formData?.role,
        accountActive: formData?.accountActive,
        region: formData?.region
    };

    if (userToEdit) {
      jsonData["id"] = userToEdit.id;
    }

    const url = (userToEdit && action === "edit")
      ? `${AddOrUpdateUser_URL}/update`
      : `${AddOrUpdateUser_URL}/add`;

    await updateEntity(url, jsonData)
      .then((response) => {
        showSnackBar(response?.msg || response);
        setDialogOpen(false);
        refresh();
        resetForm();
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };


  const Content = (
    <FormControl onSubmit={(e) => { e.preventDefault(); clickSubmit(); }}>
      <Grid
        container
        spacing={10}
        padding="10px 20px"
        wrap={isMobile ? "wrap" : "nowrap"}
        justifyContent={isMobile ? "center" : "space-around"}
        alignItems="flex-start"
      >
        <Grid item xs={12} sm className="profile-center-align" sx={{ flexGrow: 1 }}>
          
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
           {/* ✅ NEW: User Form Implementation */}
          <UserForm
               isMobile={isMobile}
               lang={lang}
               entity="addOrUpdateUser"
               formData={formData}
               setFormData={setFormData}
               formData2={formData2}
               setFormData2={setFormData2}
               readOnly={readOnly}
               errors={errors}
               setErrors={setErrors}
               errors2={errors2}
               setErrors2={setErrors2}
               handleChange={handleChange}
               genderOpt={genderOpt}
          />

            {!readOnly && (
              <Box
                sx={{
                  flex: 1,
                  minWidth: isMobile ? "100%" : "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3 // Added margin top
                }}
              >
                <button
                  className="form-button"
                  type="submit"
                  onClick={clickSubmit}
                  disabled={
                    loading ||
                    formData?.firstName === "" || formData?.lastName === "" ||
                    (!isEmpty(validateField("email", formData?.email || ""))) ||
                    (!isEmpty(validateField("mobile", formData?.mobile || "")))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") clickSubmit();
                  }}
                >
                  {action === "edit" ? Literal[lang].update : Literal[lang].save}
                </button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </FormControl>
  );

  return (
    <BaseDialog
      bodyComponent={Content}
      open={dialogOpen}
      setOpen={handleDialogClose}
      PopupClass={true}
      title={
          action === "edit"? `${Literal[lang].edit} ${userType}`
          : action === "copy"? `${Literal[lang].copy} ${userType}`
          : action=="view"? `${Literal[lang].view} ${userType}`
          : `${Literal[lang].add} ${userType}`
        }
    />
  );
};

export default AddUser;