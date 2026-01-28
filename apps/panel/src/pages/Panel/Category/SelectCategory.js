import { Box } from "@mui/material";
import { Category_URL } from "../../../../../../packages/utils/src/Config/URLs";
import React, { useContext, useEffect } from "react";
import BaseSelect from "@ui/components/UI/fields/BaseSelect";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { PanelServices } from "@utils/services/PanelServices";
import { isEmpty, validateField, convertEntities } from "@utils/helper/Helper";


const SelectCategory = ({isMobile, setCategoryLevels, categoryLevels, setLoading, categoryToEdit, pcWidth, required=false, readOnly, refreshRankOpt, setFormData, categoryIndex, entity}) =>{
    
    const { fetchSubcategories } = PanelServices();
    const { lang } = useContext(LanguageContext);
    useEffect(() => {
    const loadData = async () => {
        await onLoad();
        };

        if(categoryLevels[0]?.options?.length!=0){
        }
        else{
            loadData();
        }
    }, []);
    
    const onLoad = async () =>{
        let subcategories = await fetchSubcategories(Category_URL+"/allParents?statuses=ACTIVE,INACTIVE"); // your API call
        if (subcategories?.data?.length > 0) {
            setCategoryLevels([{ options: convertEntities(subcategories?.data), selected: null }]);
        }
    }
    
    const handleCategoryChange = async (levelIndex, selectedOption) => {
        setLoading(true);

        // Remove any deeper levels        
        const updatedLevels = [...categoryLevels];
        updatedLevels[levelIndex].selected = selectedOption;
        const trimmedLevels = updatedLevels.slice(0, levelIndex + 1);
        
        if(selectedOption !=null){
        
            const jsonData = {};
            jsonData["parentId"] = selectedOption?.value;
            jsonData["statuses"] = "Active,Inactive";

            // Fetch subcategories
            await fetchSubcategories(Category_URL+"/child",jsonData).then(async (response) =>{
                if (response?.data?.length > 0) {
                    trimmedLevels.push({ options: convertEntities(response?.data, entity=="category"? categoryToEdit?.id: ""), selected: null });
                }

                if(entity=="category"){
                    await refreshRankOpt(selectedOption?.value);
                }
            }).catch((error)=>{
        
            })
        }
        else{
            setFormData((prev) => ({
                ...prev,
                rank: "",
              }));
        }
        setCategoryLevels(trimmedLevels);
        setLoading(false);
      };
      
    return (
        categoryLevels.map((level, index) => (
            <Box sx={{ flex: 1, minWidth: "10%" }}>
            
                <BaseSelect
                label={Literal[lang].categoryLevel.replace("{0}", (categoryIndex>=0? (categoryIndex+1):""))+(index+1)}
                required={index==0? required: false}
                name={`categoryLevel${index}`}
                placeHolderText="categoryPlaceholder"
                options={level.options}
                value={level.selected}
                disabled={readOnly}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                />
         </Box>
            ))
    )
}
export default SelectCategory;