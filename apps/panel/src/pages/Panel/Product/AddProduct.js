import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import ImageUploaderGrid from "@ui/components/UI/fields/ImageUploaderGrid";
import React, { useState, useEffect, useContext } from "react";
import { Box, FormControl, IconButton } from "@mui/material";
import { Grid } from "@mui/material";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { validateField, convertEntities, getRankOptionsByProduct } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import { Product_URL, Category_URL } from "@utils/Config/URLs";
import SelectCategory from "../Category/SelectCategory";
import BaseSelect from "@ui/components/UI/fields/BaseSelect";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete"; 

const AddProduct = ({
  loading,
  setLoading,
  showSnackBar,
  dialogOpen,
  setDialogOpen,
  refresh,
  productToEdit,
  setProductToEdit,
  resetData,
  action,
  entity,
  isMobile,
  imageRefreshKey,
  setImageRefreshKey
}) => {

  const readOnly = action=="view";
  const { lang } = useContext(LanguageContext);
  const { updateEntity, fetchSubcategories } = PanelServices();
  const [rankOptions, setRankOptions] = useState([]);

  const [ imageUrls, setImageUrls] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    material: "",
    sku: "",
    color: "",
    rank: ""
  });
  const [categoryPaths, setCategoryPaths] = useState([
    [{ options: [], selected: null }],
  ]);
  
  const [categoryLevels, setCategoryLevels] = useState([{ options: [], selected: null }]);
  const resetForm = () => {
    setFormData({ title: "", description: "", material: "", color: "", rank: "" });
    setErrors({});
    setCategoryPaths([[{ options: [], selected: null }]]);
    setCategoryLevels([{ options: [], selected: null }]);
    setProductToEdit(null);
    setImageUrls([]);
    resetData();
  };

  const handleDialogClose = () => {
    resetForm();
    setDialogOpen(false);
  };

  const refreshRankOpt = async (categoryIds, productId) => {
    
    setLoading(true);
    let options = [];
    if(categoryIds?.length>0){
      while(options?.length<2){
        for(let categoryId of categoryIds){
          options = await getRankOptionsByProduct(categoryId, fetchSubcategories, productId);
          setRankOptions(options);
          if (productToEdit?.rank !== 9999) { // Use !== for comparison, and ensure value is not string "9999"
            setFormData((prev) => ({
              ...prev,
              rank: {
                "label": productToEdit?.rank,
                "value": productToEdit?.rank
              } || ""
            }));
          }
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadCategoryLevels = async () => {
      setLoading(true);
      if (dialogOpen && productToEdit) {

        let allCategoryPaths = [];

        for(let categoryId of productToEdit?.categoryIds){

          const tempArray = [];
          let parentId = categoryId;
          let i = 0;

          try {

            while (parentId != null) {
              const jsonData = { "parentId": parentId };
              jsonData["statuses"] = "Active,Inactive";
                
              if (i === 0) {
                const response = await fetchSubcategories(Category_URL + "/child", jsonData);
                if (response?.data?.length > 0) {
                  const options = convertEntities(response?.data, productToEdit?.id);
                  tempArray.push({
                    options: options,
                    selected: null
                  });
                }
              } else {
                const response = await fetchSubcategories(Category_URL + "/siblingOfParents", jsonData);
                if (response?.data?.length > 0) {
                  const options = convertEntities(response?.data);
                  tempArray.push({
                    options: options,
                    selected: options.find(opt => opt.value === parentId)
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
            allCategoryPaths.push(formattedLevels);
          } catch (error) {
            console.error("Failed to load category levels", error);
          }
        }

        setCategoryPaths(allCategoryPaths);

      } else {
        setFormData({ title: "", description: "", material: "", color: "", rank: "" });
        setImageUrls([]);
        setCategoryLevels([{ options: [], selected: null }]);
      }

      setErrors({});
      if(productToEdit?.categoryIds){
        await refreshRankOpt(productToEdit?.categoryIds, productToEdit?.id);
      }
      setLoading(false);
    };

    const loadProduct = async () =>{

      setLoading(true);
      if(dialogOpen && productToEdit){
        setFormData({
          title: productToEdit?.title || "",
          description: productToEdit?.description || "",
          sku: productToEdit?.sku || "",
          material: productToEdit?.material || "",
          color: productToEdit?.color || "",
          rank: {
            "label": productToEdit?.rank,
            "value": productToEdit?.rank
          } || "",
        });
        setImageUrls(productToEdit?.images || []);
      }
      setLoading(false);
    }

    loadProduct();
    loadCategoryLevels();

  }, [productToEdit, dialogOpen]);

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


  const clickSubmit = async () => {
    setLoading(true);

    const lastCategory = categoryLevels[categoryLevels.length - 1];
    const selectedValue = lastCategory?.selected?.value ??
      categoryLevels[categoryLevels.length - 2]?.selected?.value ?? 0;

    const selectedCategoryIds = categoryPaths.map((path) => {
      const last = path[path.length - 1]?.selected?.value;
      const secondLast = path[path.length - 2]?.selected?.value;
      return last ?? secondLast ?? null;
    }).filter(Boolean); // Remove nulls


    const jsonData = {
      title: formData?.title,
      description: formData?.description,
      // price: formData.price,
      material: formData?.material,
      rank: parseInt(formData?.rank?.value) || 9999,
      sku: formData?.sku,
      color: formData?.color,
      images: imageUrls,
      categoryIds: selectedCategoryIds,
    };

    if (productToEdit) {
      jsonData["id"] = productToEdit.id;
    }

    const url = (productToEdit && action === "edit")
      ? `${Product_URL}/update`
      : `${Product_URL}/add`;

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
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "32%" }}>
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
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "32%" }}>
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
            
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "32%" }}>
              <BaseTextField2
                id="material-input"
                label="material"
                name="material"
                required
                placeHolderText="materialPlaceholder"
                value={formData.material}
                onChange={handleChange}
                disabled={readOnly}
                errorMsg={errors.material}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "32%" }}>
              <BaseTextField2
                id="color-input"
                label="color"
                name="color"
                required
                placeHolderText="colorPlaceholder"
                value={formData.color}
                onChange={handleChange}
                disabled={readOnly}
                errorMsg={errors.color}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "32%" }}>
              <BaseTextField2
                id="sku-input"
                label="sku"
                name="sku"
                required
                placeHolderText="skuPlaceholder"
                value={formData.sku}
                onChange={handleChange}
                disabled={readOnly}
                errorMsg={errors.sku}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "32%" }}>
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

            {categoryPaths.map((categoryLevels, index) => (
              <Box
                key={index}
                sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", width: "100%" }}
              >
                <SelectCategory
                  isMobile={isMobile}
                  required={true}
                  categoryIndex={index}
                  entity={entity}
                  setLoading={setLoading}
                  categoryLevels={categoryLevels}
                  setFormData={setFormData}
                  setCategoryLevels={(updated) => {
                    const newPaths = [...categoryPaths];
                    if(index==0){
                      let categoryId = updated?.[updated?.length-2]?.selected?.value;
                      if(categoryId){
                        refreshRankOpt([categoryId], productToEdit?.id);
                      }
                    }
                    newPaths[index] = updated;
                    setCategoryPaths(newPaths);
                  }}
                  categoryToEdit={productToEdit}
                  readOnly={readOnly}
                  pcWidth="48%"
                />
                {!readOnly && categoryPaths?.length>1 && (
                  <IconButton
                    aria-label="delete variant"
                    onClick={() => {
                      const newPaths = [...categoryPaths];
                      refreshRankOpt(categoryPaths.map((path) => {
                        const last = path[path.length - 1]?.selected?.value;
                        const secondLast = path[path.length - 2]?.selected?.value;
                        return last ?? secondLast ?? null;
                      }).filter(Boolean), productToEdit?.id);
                      newPaths.splice(index, 1);
                      setCategoryPaths(newPaths);
                    }}
                    color="error" 
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}

            {!readOnly && (
              <Box sx={{ textAlign: "left", mb: 1 }}>
                <button 
                    type="button" 
                    className="Plus-Button"     
                    onClick={() => setCategoryPaths([...categoryPaths, [{ options: [], selected: null }]])}
                    color="primary">
                  <AddIcon />
                </button>
              </Box>
            )}
            <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "100%" }}>
              <ImageUploaderGrid 
                maxImages={15} 
                imageUrls={imageUrls}
                aspect={2/3}
                setImageUrls={setImageUrls}
                imageRefreshKe={imageRefreshKey}
                entity={entity}
                setLoading={setLoading}
                readOnly={readOnly}
                setImageRefreshKey={setImageRefreshKey}
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
                    !formData?.material ||
                    !formData?.color || 
                    !categoryLevels
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
          action === "edit"? `${Literal[lang].edit} ${Literal[lang][entity]}`
          : action === "copy"? `${Literal[lang].copy} ${Literal[lang][entity]}`
          : action=="view"? `${Literal[lang].view} ${Literal[lang][entity]}`
          : `${Literal[lang].add} ${Literal[lang][entity]}`
        }
    />
  );
};

export default AddProduct;
