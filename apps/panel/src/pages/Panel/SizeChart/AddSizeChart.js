import React, { useState, useEffect, useContext } from "react";
import { Box, FormControl } from "@mui/material";
import { Grid } from "@mui/material";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { validateField } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import { SizeChart_URL } from "@utils/Config/URLs";

const AddSizeChart = ({
  loading,
  setLoading,
  showSnackBar,
  dialogOpen,
  setDialogOpen,
  isMobile,
  refresh,
  sizeChartToEdit, // for edit mode
  setSizeChartToEdit,
  resetData,
  action,
  entity,
}) => {

  const readOnly = action=="view";
  const { lang } = useContext(LanguageContext);
  const { setSubcategories } = PanelServices();

  const initialFormData = {
    name: "",
    description: "",
    chest: "",
    topLength: "",
    sleeve: "",
    arm: "",
    neck: "",
    shoulder: "",
    waist: "",
    hips: "",
    bottomLength: "",
    inseam: "",
    thigh: "",
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setSizeChartToEdit(null);
    resetData();
  };

  const handleDialogClose = () => {
    resetForm();
    setDialogOpen(false);
  };

  useEffect(() => {
    if (dialogOpen && sizeChartToEdit) {
      setFormData({
        name: sizeChartToEdit.size || "",
        description: sizeChartToEdit.description || "",
        chest: sizeChartToEdit.chest || "",
        topLength: sizeChartToEdit.topLength || "",
        sleeve: sizeChartToEdit.sleeve || "",
        arm: sizeChartToEdit.arm || "",
        neck: sizeChartToEdit.neck || "",
        shoulder: sizeChartToEdit.shoulder || "",
        waist: sizeChartToEdit.waist || "",
        hips: sizeChartToEdit.hips || "",
        bottomLength: sizeChartToEdit.bottomLength || "",
        inseam: sizeChartToEdit.inseam || "",
        thigh: sizeChartToEdit.thigh || "",
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [sizeChartToEdit, dialogOpen]);

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
      ...formData, "size": formData?.name,
    };
    delete jsonData.name;
    if (sizeChartToEdit && action=="edit") {
      jsonData["id"] = sizeChartToEdit.id;
    }

    const url =
      sizeChartToEdit && action === "edit"
        ? `${SizeChart_URL}/update`
        : `${SizeChart_URL}/add`;

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
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
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
          </Box>

          <Grid
            item
            xs={12}
            wrap={isMobile ? "wrap" : "nowrap"}
            justifyContent="center"
            alignItems="flex-start"
            display="flex"
            gap={2}
            flexDirection={isMobile ? "column" : "row"}
          >
            <Box
              className="profile-attributes"
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
                width: "75%",
                flexWrap: "wrap",
              }}
            >
              {[
                "chest",
                "topLength",
                "sleeve",
                "arm",
                "neck",
                "shoulder",
                "waist",
                "hips",
                "bottomLength",
                "inseam",
                "thigh",
              ].map((field) => (
                <Box key={field} sx={{ flex: 1, minWidth: isMobile ? "100%" : "32%" }}>
                  <BaseTextField2
                    id={`${field}-input`}
                    label={field}
                    name={field}
                    required
                    placeHolderText={Literal[lang].enterMeasure.replace(
                      "{0}",
                      Literal[lang][field]
                    )}
                    value={formData[field]}
                    onChange={handleChange}
                    type="number"
                    disabled={readOnly}
                    errorMsg={errors[field]}
                  />
                </Box>
              ))}
            </Box>

            <Box
              className="profile-attributes"
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
                width: "25%",
                alignItems: 'center',
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "100%", alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <p>{Literal[lang].howToMeasure || "How to measure size:"}</p>
              </Box>
            </Box>
          </Grid>

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
                  loading || !formData.name || !formData.description
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") clickSubmit();
                }}
              >
                {action === "edit"
                  ? Literal[lang].update
                  : Literal[lang].save}
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
      setOpen={handleDialogClose}
      title={
            action === "edit"? `${Literal[lang].edit} ${Literal[lang]["size"]}`
            : action === "copy"? `${Literal[lang].copy} ${Literal[lang]["size"]}`
            : action=="view"? `${Literal[lang].view} ${Literal[lang]["size"]}`
            : `${Literal[lang].add} ${Literal[lang]["size"]}`
        }
    />
  );
};

export default AddSizeChart;
