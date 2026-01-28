import React, {useState, useEffect} from "react";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { Category_URL } from "@utils/Config/URLs";
import { groupTwoArraysBySizes } from "@utils/helper/Helper";
import { PanelServices } from '@utils/services/PanelServices';
import { useContext } from "react";
import "./Middle.scss";
import CategoryTile from "./CategoryTile";
import { Box } from "@mui/material";
import CategoryComponent from "./Products/CategoryComponent";

const CategoryTiles = ({isMobile, setLoading, loading, showSnackBar }) => {

  const { getGridData, setSubcategories } = PanelServices(); // 👈 Assumes service method for product API
  const [tileItems, setTileItems] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res1 = await getGridData(Category_URL + "/allParents?isTileVisible=true&statuses=Active");
        const res2 = await getGridData(Category_URL + "/allParents?isTileVisible=false&statuses=Active");

        const groupSizes = [4, 2, 4, 3, 4, 3, 4, 3, 4];
        let itemGroups = groupTwoArraysBySizes( res1?.data, res2?.data, groupSizes );
        setTileItems(itemGroups);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    loadCategories();
  }, []); // ✅ runs only once
  
    const { lang } = useContext(LanguageContext);
    return (
        <>
        {tileItems.map((tileGroup, i) => {
          if(i%2==0){
            return(
            <div key={i} className='brandSpecialities-main-container'>
              <Box
                className="profile-attributes"
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexWrap: "wrap",
                }}
              >
                {tileGroup.map((item, index) => (
                  <CategoryTile category={item} isMobile={isMobile} />
                ))}
              </Box>
            </div>
          )}
        else{
          return(
          <div key={i} className='brandSpecialities-main-container'>
              <Box
                className="profile-attributes"
                sx={{
                  display: "flex",
                  gap: 2,
                  width: "100%",
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexWrap: "wrap",
                }}
              >
                {tileGroup.map((item, index) => (
                  <CategoryComponent 
                    key={index} 
                    category={item}                     
                    setLoading={setLoading}
                    loading={loading}
                    showSnackBar={showSnackBar}
                    isMobile={isMobile} 
                  />
                ))}
              </Box>
            </div>
        )}
        }   
        )}
      </>
      
  );
};

export default CategoryTiles;
