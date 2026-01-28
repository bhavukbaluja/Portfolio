import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  FormControl,
  IconButton,
} from "@mui/material";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { validateField } from "@utils/helper/Helper";
import { PanelServices } from "@utils/services/PanelServices";
import { Inventory_URL, Product_URL, SizeChart_URL } from "@utils/Config/URLs";
import BaseSelect from "@ui/components/UI/fields/BaseSelect";
import BaseRadioGroup from "@ui/components/UI/fields/BaseRadioGroup";

const AddInventory = ({
  loading,
  setLoading,
  showSnackBar,
  dialogOpen,
  setDialogOpen,
  refresh,
  inventoryToEdit,
  setInventoryToEdit,
  action,
  entity,
  isMobile,
}) => {
  const readOnly = action === "view";
  const { lang } = useContext(LanguageContext);
  const { updateEntity, getGridData, fetchSubcategories } = PanelServices();

  const [formData, setFormData] = useState({
    productId: "",
    type: "",
    security: "",
    variants: [{ quantity: "", size: "", mrp: "", salePrice: "", discount: "" }],
  });
  const [errors, setErrors] = useState({});
  const [productOptions, setProductOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [sizeChart, setSizeChart] = useState([]);

  const resetForm = () => {
    setFormData({ productId: "", type: "", security: "", variants: [{ quantity: "", size: "", mrp: "", salePrice: "", discount: "" }] });
    setErrors({});
    setInventoryToEdit(null);
  };

  const handleDialogClose = () => {
    resetForm();
    setDialogOpen(false);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await getGridData(Product_URL + "/all?statuses=ACTIVE,INACTIVE", {});
        if (response?.data?.length > 0) {
          setProducts(response?.data);
          let prodOpt = response.data.map((product) => ({
            label: product.sku,
            value: product.id,
          }));
          setProductOptions(prodOpt);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      setLoading(false);
    };

    const loadInventory = async () => {
      if (dialogOpen && inventoryToEdit) {
        setFormData({
          productId: {
            label: inventoryToEdit?.product.sku,
            value: inventoryToEdit?.product.id,
          } || "",
          type: inventoryToEdit?.type || "SALE",
          security: inventoryToEdit?.security?.toString() || "",
          variants: inventoryToEdit?.inventoryVariants?.map((variant) => ({
            quantity: variant.quantity?.toString() || "",
            size: {
              label: variant?.size?.size,
              value: variant?.size?.id,
            } || "",
            mrp: variant.mrp?.toString() || "",
            salePrice: variant.salePrice?.toString() || "",
            discount: variant.discount?.toString() || "",
          })) || [{ quantity: "", size: "", mrp: "", salePrice: "", discount: "" }],
        });
      }
    };

    const loadSizes = async () => {
      setLoading(true);
      try {
        const response = await getGridData(SizeChart_URL + "/user/1", {});
        if (response?.data?.length > 0) {
          let sizeOpt = response.data.map((size) => ({
            label: size.size,
            value: size.id,
          }));
          setSizeOptions(sizeOpt);
          setSizeChart(response?.data);
        }
      } catch (err) {
        console.error("Failed to fetch sizes", err);
      }
      setLoading(false);
    };

    loadProducts();
    loadInventory();
    loadSizes();
  }, [dialogOpen, inventoryToEdit]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...formData.variants];
    updatedVariants[index][name] = value;

    setFormData((prev) => ({ ...prev, variants: updatedVariants }));

    if (name !== "size") {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        const error = validateField(name, value);
        if (error) {
          if (!newErrors.variants) newErrors.variants = {};
          newErrors.variants[index] = {
            ...newErrors.variants[index],
            [name]: error,
          };
        }
        return newErrors;
      });
    }
  };

  const handleChangeTextField = (e) => {
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

  const handleProductSelect = (e) => {
    const selectedId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      productId: selectedId,
    }));
  };

  const handleTypeSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { quantity: "", size: "", mrp: "", salePrice: "", discount: "" }],
    }));
  };

  // New function to remove a variant
  const removeVariant = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, index) => index !== indexToRemove),
    }));
    // Also clear errors for the removed variant
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors.variants) {
        const newVariantsErrors = { ...newErrors.variants };
        delete newVariantsErrors[indexToRemove];
        newErrors.variants = newVariantsErrors;
      }
      return newErrors;
    });
  };


  const clickSubmit = async () => {
    setLoading(true);

    const selectedProduct = products.find(
      (option) => option.id === formData?.productId?.value
    );

    // This selectedSize is incorrect, it's finding size based on productId which is wrong.
    // The size is per variant. It's not used in payload anyway, so leaving as is based on original code.
    const selectedSize = sizeChart.find(
      (option) => option.id === formData?.productId?.value
    );

    const payload = {
      ...(inventoryToEdit && action === "edit" ? { id: inventoryToEdit.id } : {}),
      product: selectedProduct || null,
      type: formData?.type || "SALE",
      security: parseFloat(formData?.security) || 0,
      inventoryVariants: formData.variants.map((variant) => ({
        size: sizeChart.find(
          (option) => option.id === variant?.size?.value
        ),
        quantity: parseInt(variant.quantity) || 0,
        mrp: parseFloat(variant.mrp) || 0,
        salePrice: parseFloat(variant.salePrice) || 0,
        discount: parseFloat(variant.discount) || 0,
      })),
    };

    const url =
      inventoryToEdit && action === "edit"
        ? `${Inventory_URL}/update`
        : `${Inventory_URL}/add`;

    try {
      let res = await updateEntity(url, payload);
      if (res?.includes("success")) {
        showSnackBar(res);
        refresh();
        handleDialogClose();
      }
    } catch (err) {
      console.error("Submit error", err);
      showSnackBar(Literal[lang].errorOccurred, "error"); // Added error snackbar
    } finally {
      setLoading(false);
    }
  };

  const inventoryTypeOpt = [
    { label: "sale", value: "SALE" },
    { label: "rental", value: "RENTAL" },
  ];

  const Content = (
    <FormControl>
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
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", width: '100%', gap: 2 }}>
              <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                <BaseSelect
                  label="product"
                  required={true}
                  name="productId"
                  value={formData.productId}
                  onChange={handleProductSelect}
                  placeHolderText="selectProductPlaceholder"
                  options={productOptions}
                  disabled={readOnly || action === "edit"}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                <BaseRadioGroup
                  required={true}
                  name="type"
                  options={inventoryTypeOpt}
                  value={formData?.type}
                  disabled={readOnly}
                  onChange={(item) => handleTypeSelect(item)}
                />
              </Box>
              {formData?.type === "RENTAL" && (
                <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                  <BaseTextField2
                    label="security"
                    name="security"
                    required
                    value={formData?.security}
                    onChange={handleChangeTextField}
                    placeHolderText="securityPlaceholder"
                    disabled={readOnly}
                    type="number"
                  />
                </Box>
              )}
            </Box>

            {formData.variants.map((variant, index) => (
              <Box
                key={index} // Consider a more stable key if possible (e.g., variant.id if it exists, otherwise use a library like 'uuid')
                sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", width: '100%' }}
              >
                <Box sx={{ flex: 1, minWidth: "18%" }}>
                  <BaseSelect
                    label="size"
                    name="size"
                    required={true}
                    placeHolderText="selectSizePlaceholder"
                    options={sizeOptions}
                    value={variant.size}
                    onChange={(e) => handleChange(index, e)}
                    disabled={readOnly}
                    errorMsg={errors.variants?.[index]?.size}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: "18%" }}>
                  <BaseTextField2
                    label="quantity"
                    name="quantity"
                    required
                    value={variant.quantity}
                    placeHolderText="quantityPlaceholder"
                    onChange={(e) => handleChange(index, e)}
                    errorMsg={errors.variants?.[index]?.quantity}
                    disabled={readOnly}
                    type="number"
                  />
                </Box>

                <Box sx={{ flex: 1, minWidth: "18%" }}>
                  <BaseTextField2
                    label="mrp"
                    name="mrp"
                    value={variant.mrp}
                    required
                    placeHolderText="mrpPlaceholder"
                    onChange={(e) => handleChange(index, e)}
                    type="number"
                    disabled={readOnly}
                    errorMsg={errors.variants?.[index]?.mrp}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: "18%" }}>
                  <BaseTextField2
                    label="saleOrRentPrice"
                    name="salePrice"
                    value={variant.salePrice}
                    placeHolderText="salePricePlaceholder"
                    onChange={(e) => handleChange(index, e)}
                    type="number"
                    disabled={readOnly}
                    errorMsg={errors.variants?.[index]?.salePrice}
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: "18%" }}>
                  <BaseTextField2
                    label="discount"
                    name="discount"
                    value={variant.discount}
                    placeHolderText="discountPlaceholder"
                    onChange={(e) => handleChange(index, e)}
                    type="number"
                    disabled={readOnly}
                    errorMsg={errors.variants?.[index]?.discount}
                  />
                </Box>
                {/* Delete button for variant */}
                {!readOnly && formData.variants.length > 1 && ( // Only show if not readOnly and there's more than one variant
                  <IconButton
                    aria-label="delete variant"
                    onClick={() => removeVariant(index)}
                    color="error" // Use error color for delete icon
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            {!readOnly && (
              <Box sx={{ textAlign: "left", mb: 1 }}>
                <button type="button" className="Plus-Button" onClick={addVariant} color="primary">
                  <AddIcon />
                </button>
              </Box>
            )}
            {!readOnly && (
              <Box sx={{ flex: 1, minWidth: "100%", display: "flex", justifyContent: "center" }} >
                <button
                  className="form-button"
                  type="submit"
                  onClick={clickSubmit}
                  disabled={loading || !formData.productId}
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

export default AddInventory;