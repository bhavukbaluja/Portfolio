import { Box, FormControl } from "@mui/material";
import { Grid } from "@mui/material";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { WebTrendingBar_URL } from "@utils/Config/URLs";
import { validateField } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import React, { useContext, useEffect, useState } from "react";

const AddWebTrendingBar = ({
  loading,
  setLoading,
  showSnackBar,
  dialogOpen,
  setDialogOpen,
  refresh,
  trendingItemToEdit,
  setTrendingItemToEdit,
  resetData,
  action,
  entity,
  isMobile,
  imageRefreshKey,
  setImageRefreshKey
}) => {

  const readOnly = action=="view";
  const { lang } = useContext(LanguageContext);
  const { updateEntity } = PanelServices();

  const [ imageUrls, setImageUrls] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",

  });

  const resetForm = () => {
    setFormData({ title: "", description: "", path: "" });
    setErrors({});
    setTrendingItemToEdit(null);
    resetData();
  };

  const handleDialogClose = () => {
    resetForm();
    setDialogOpen(false);
  };

  useEffect(() => {

    setFormData({
      title: trendingItemToEdit?.title || "",
      description: trendingItemToEdit?.description || "",
      path: trendingItemToEdit?.path || ""
    })

  }, [trendingItemToEdit, dialogOpen]);

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

  const clickSubmit = async () => {
    setLoading(true);

    const jsonData = {
      title: formData?.title,
      description: formData?.description,
      path: formData?.path,
    };

    if (action==="edit") {
      jsonData["id"] = trendingItemToEdit.id;
    }

    const url = (trendingItemToEdit && action === "edit")
      ? `${WebTrendingBar_URL}/update`
      : `${WebTrendingBar_URL}/add`;

    await updateEntity(url, jsonData)
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
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
              <BaseTextField2
                id="title-input"
                label="title"
                name="title"
                required
                placeHolderText="titlePlaceholder"
                value={formData.title}
                onChange={handleChange}
                disabled={readOnly}
                errorMsg={errors.title}
              />
            </Box>
            
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
              <BaseTextField2
                id="path-input"
                label="path"
                name="path"
                required
                placeHolderText="pathPlaceholder"
                value={formData.path}
                onChange={handleChange}
                disabled={readOnly}
                errorMsg={errors.path}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
              <BaseTextField2
                id="description-input"
                label="description"
                name="description"
                required
                placeHolderText="descriptionPlaceholder"
                value={formData.description}
                onChange={handleChange}
                errorMsg={errors.description}
                multiline
                disabled={readOnly}
                rows={3}
              />
            </Box>
            {!readOnly && (
              <Box
                sx={{
                  flex: 1,
                  minWidth: isMobile ? "100%" : "100%",
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
                    !formData?.title ||
                    !formData?.description ||
                    !formData?.path 
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
      title={
          action === "edit"? `${Literal[lang].edit} ${Literal[lang][entity]}`
          : action === "copy"? `${Literal[lang].copy} ${Literal[lang][entity]}`
          : action=="view"? `${Literal[lang].view} ${Literal[lang][entity]}`
          : `${Literal[lang].add} ${Literal[lang][entity]}`
        }
    />
  );
};

export default AddWebTrendingBar;
