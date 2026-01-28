import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import ImageUploaderGrid from "@ui/components/UI/fields/ImageUploaderGrid";
import BaseRadioGroup from "@ui/components/UI/fields/BaseRadioGroup";
import BaseSelect from "@ui/components/UI/fields/BaseSelect";
import React, { useState, useEffect, useContext } from "react";
import "react-phone-input-2/lib/style.css";
import { Box, FormControl } from "@mui/material";
import { Grid } from "@mui/material";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { validateField, convertEntities, getRankOptions } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import { Category_URL } from "@utils/Config/URLs";
import SelectCategory from "./SelectCategory";

const AddCategory = ({
  loading,
  setLoading,
  showSnackBar,
  dialogOpen,
  setDialogOpen,
  setImageRefreshKey,
  imageRefreshKey,
  isMobile,
  refresh,
  categoryToEdit, // 👈 new prop for edit mode
  setCategoryToEdit,
  resetData,
  action,
  entity
}) => {

  const readOnly = action=="view";
  const { lang } = useContext(LanguageContext);
  const { setSubcategories, fetchSubcategories } = PanelServices();
  const [ imageUrls, setImageUrls] = useState([]);

  const [rankOptions, setRankOptions] = useState([]);
  const [loadingParam, setLoadingParam] = useState("submit");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rank: "",
    isTile: "false",
  });

  const isTileOpt = [
    { label: "yes", value: "true" },
    { label: "no", value: "false" },
  ];


  const [categoryLevels, setCategoryLevels] = useState([{ options: [], selected: null }]);

  const resetForm = () => {
    setFormData({ name: "", description: "", rank: "", isTile: "false" });
    setErrors({});
    setCategoryLevels([{ options: [], selected: null }]);
    setImageUrls([]);
    setCategoryToEdit(null);
    resetData();
  };

  const handleDialogClose = () => {
    resetForm();
    setDialogOpen(false);
  };
  
  // Load data in edit mode
  useEffect(() => {
    const loadCategoryLevels = async () => {
      setLoading(true);
      if (dialogOpen && categoryToEdit) {
        const tempArray = [];
        let parentId = categoryToEdit?.parentCategoryId;
        let i = 0;
  
        try {
          if(parentId == null){
            await refreshRankOpt(parentId);
          }
          while (parentId != null) {
            const jsonData = { parentId };
            jsonData["statuses"] = "Active,Inactive";
              
            if (i === 0) {
              const response = await fetchSubcategories(Category_URL + "/child", jsonData);
              if (response?.data?.length > 0) {
                const options = convertEntities(response?.data, categoryToEdit?.id);
                tempArray.push({
                  options: options,
                  selected: null
                });
              }
              await refreshRankOpt(parentId);
            } else {
              const response = await fetchSubcategories(Category_URL + "/siblingOfParents", jsonData);
              if (response?.data?.length > 0) {
                const options = convertEntities(response?.data, categoryToEdit?.id);
                const selectedItem = options.find(opt => opt.value === parentId);
                tempArray.push({
                  options: options,
                  selected: selectedItem
                });
                const found = response?.data.find(item => item.id === parentId);
                parentId = found?.parentCategoryId || null;
              } else {
                parentId = null;
              }
            }
            i++;

          }
  
          const formattedLevels = [];
          while (tempArray.length > 0) {
            formattedLevels.push(tempArray.pop());
          }
          setCategoryLevels(formattedLevels);
        } catch (error) {
          console.error("Failed to load category levels", error);
        }

        setFormData({
          name: categoryToEdit.name || '',
          description: categoryToEdit.description || '',
          isTile: categoryToEdit?.isTile,
          rank: {
            "label": categoryToEdit?.rank,
            "value": categoryToEdit?.rank
           } || "",
        });
        setImageUrls(categoryToEdit?.images || []);
        
      } else {
        setFormData({ name: "", description: "", isTile: "false" });
        setCategoryLevels([{ options: [], selected: null }]);
      }
  
      setErrors({});
      setLoading(false);
    };
  
    loadCategoryLevels();
  }, [categoryToEdit, dialogOpen]);


  const refreshRankOpt = async (parentId)=>{
    setLoading(true);
    const options = await getRankOptions(parentId, fetchSubcategories);
    setRankOptions(options);
    if(formData?.rank?.value!=9999){
      setFormData((prev) => ({
        ...prev,
        rank: "",
      }));
    }
    setLoading(false);
  }
  

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

  const handleRankSelect = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      rank: value,
    }));
  };

  const handleIsTile = (value) => {
    setFormData((prev) => ({
      ...prev,
      isTile: value,
    }));
  };


  // Handle submit
  const clickSubmit = async () => {
    setLoading(true);
    const lastCategory = categoryLevels[categoryLevels.length - 1];
    const selectedValue = lastCategory?.selected?.value ??
      categoryLevels[categoryLevels.length - 2]?.selected?.value ?? 0;

    const jsonData = {
      name: formData?.name,
      description: formData?.description,
      images: imageUrls,
      rank: formData?.rank?.value,
      isTile: formData?.isTile,
      parentCategoryId: selectedValue
    };
    if(categoryToEdit){
      jsonData['id'] = categoryToEdit?.id;
    }
    const url = (categoryToEdit && action=="edit")
      ? `${Category_URL}/update` // Adjust based on your API
      : `${Category_URL}/add`;

    await setSubcategories(url, jsonData)
      .then((response) => {
        showSnackBar(response?.msg || response);
        setDialogOpen(false);
        refresh();

        // Reset
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
                value={formData?.description}
                onChange={handleChange}
                errorMsg={errors?.description}
                multiline={true}
                disabled={readOnly}
                rows={3}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                <BaseRadioGroup 
                    required={true}
                    name="isTile"
                    title="isTileVisible"
                    options={isTileOpt} 
                    value={formData?.isTile} 
                    disabled={readOnly}
                    onChange={(item)=> handleIsTile(item)} 
                />
            </Box>
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
              <BaseSelect
                  label="rank"
                  required={true}
                  name="rank"
                  value={formData.rank}
                  onChange={handleRankSelect}
                  placeHolderText="selectRankPlaceholder"
                  disabled={readOnly}
                  options={rankOptions}
              />
            </Box>
            <SelectCategory
              isMobile={isMobile}
              setLoading={setLoading}
              categoryLevels={categoryLevels}
              setCategoryLevels={setCategoryLevels}
              readOnly={readOnly}
              pcWidth='48%'
              categoryToEdit={categoryToEdit}
              refreshRankOpt={refreshRankOpt}
              setFormData={setFormData}
            />
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "100%" }}>
              <ImageUploaderGrid 
                maxImages={15} 
                imageUrls={imageUrls}
                setImageUrls={setImageUrls}
                imageRefreshKe={imageRefreshKey}
                entity={entity}
                setLoading={setLoading}
                readOnly={readOnly}
                setImageRefreshKey={setImageRefreshKey}
              />
            </Box>
            { !readOnly && (
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
                    formData?.name === "" ||
                    formData?.description === ""
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      clickSubmit();
                    }
                  }}
                >
                  {action=="edit" ? Literal[lang].update : Literal[lang].save}
                </button>
              </Box>
            )}
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
      />
    </>
  );
};

export default AddCategory;
