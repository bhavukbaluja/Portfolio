import he from "he";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import React, { useState, useEffect, useContext } from "react";
import "react-phone-input-2/lib/style.css";
import { Box, FormControl } from "@mui/material";
import { Grid } from "@mui/material";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { validateField, convertEntities, isEmpty } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import { AccountServices } from "@utils/services/AccountServices";
import { Page_URL } from "@utils/Config/URLs";
import AddPageComp from "./AddPageComp";

const AddPage = ({
  loading,
  setLoading,
  showSnackBar,
  dialogOpen,
  setDialogOpen,
  setImageRefreshKey,
  isMobile,
  refresh,
  pageToEdit, // 👈 new prop for edit mode
  setPageToEdit,
  resetData,
  action,
  entity
}) => {

  const readOnly = action=="view";
  const { lang } = useContext(LanguageContext);
  const { postMethodCalled, getMethodCalled } = PanelServices();
  const { getAboutUs, updateAboutUs } = AccountServices();
  const [loadingParam, setLoadingParam] = useState("submit");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setErrors({});
    setPageToEdit(null);
    resetData();
  };

  const handleDialogClose = () => {
    resetForm();
    setDialogOpen(false);
  };
  
  // Load data in edit mode
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (dialogOpen && pageToEdit) {
        await getAboutUs(Page_URL+"/getPageData", {id: pageToEdit?.id}).then((res)=>{
          let desc = he.decode(res?.description);
          setData(desc);
          setFormData({
              name: res?.name || "", 
              description: desc|| ""
            });
        }).catch((error)=>{

        });  
      } else {
        setData(" ");
        setFormData({ name: "", description: "" });
      }
  
      setErrors({});
      setLoading(false);
    };
    loadData();
  }, [pageToEdit, dialogOpen]);
  

  // Handle input change
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

  // Handle submit
  const clickSubmit = async (content) => {
    setLoading(true);
    const jsonData = {
      name: formData?.name,
      description: content || data,
    };
    if(pageToEdit){
      jsonData['id'] = pageToEdit?.id;
    }
    const url = (pageToEdit && action=="edit")
      ? `${Page_URL}/update` // Adjust based on your API
      : `${Page_URL}/add`;

    await postMethodCalled(url, jsonData)
      .then((response) => {
        showSnackBar(response?.message || response);
        if(isEmpty(content) || action=="create" || action=="copy"){
          setDialogOpen(false);
          resetForm();
        }
        refresh();
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
        <Grid
          item
          xs={12}
          sm
          className="profile-center-align"
          sx={{ flexGrow: 1 }}
        >
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
            <Box sx={{ flex: 1, maxWidth: isMobile ? "100%" : "48%" }}>
              <BaseTextField2
                id="name-input"
                label="name"
                name="name"
                required
                placeHolderText="namePlaceholder"
                value={formData.name}
                onChange={handleChange}
                disabled={readOnly}
                errorMsg={errors.name}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                minWidth: isMobile ? "100%" : "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <button
                className="form-button"
                type="submit"
                onClick={clickSubmit}
                disabled={
                  loading ||
                  formData?.name === "" ||
                  data === ""
                }
              >
                {pageToEdit ? Literal[lang].update : Literal[lang].save}
              </button> */}
            </Box>
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "100%" }}>
              {(!isEmpty(data) && (data != " " || isEmpty(pageToEdit))) && (
                <AddPageComp
                  loading={loading}
                  setLoading={setLoading}
                  isMobile={isMobile}
                  showSnackBar={showSnackBar}
                  data={data}
                  setData={setData}
                  clickSubmit={clickSubmit}
                  readOnly={readOnly}
                  setImageRefreshKey={setImageRefreshKey}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FormControl>
  );

  return (
    <>
      <BaseDialog
        bodyComponent={Content}
        open={dialogOpen}
        setOpen={handleDialogClose}
        title={
            action === "edit"? `${Literal[lang].edit} ${Literal[lang][entity]}`
            : action === "copy"? `${Literal[lang].copy} ${Literal[lang][entity]}`
            : action=="view"? `${Literal[lang].view} ${Literal[lang][entity]}`
            : `${Literal[lang].add} ${Literal[lang][entity]}`
        }
        PopupClass={true}
      />
    </>
  );
};

export default AddPage;
