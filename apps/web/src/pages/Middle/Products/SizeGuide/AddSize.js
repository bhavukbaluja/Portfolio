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

const AddSize = ({
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
              {[
                "name",
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
                <Box key={field} sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                  <BaseTextField2
                    id={`${field}-input`}
                    label={field}
                    name={field}
                    required
                    placeHolderText={field!="name"? (Literal[lang].enterMeasure.replace(
                      "{0}",
                      Literal[lang][field])) : Literal[lang].namePlaceholder
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    type={field=="name"? "text":"number"}
                    disabled={readOnly}
                    errorMsg={errors[field]}
                  />
                </Box>
              ))}
            </Box>
          {/* </Grid> */}

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
                  loading || !formData.name 
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
          </Box>
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
            action === "edit"? `${Literal[lang].edit} ${Literal[lang]["customSize"]}`
            : action === "copy"? `${Literal[lang].copy} ${Literal[lang]["customSize"]}`
            : action=="view"? `${Literal[lang].view} ${Literal[lang]["customSize"]}`
            : `${Literal[lang].add} ${Literal[lang]["size"]}`
        }
    />
  );
};

export default AddSize;
