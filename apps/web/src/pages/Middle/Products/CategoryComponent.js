import React, {useState, useEffect} from "react";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { Product_URL } from "@utils/Config/URLs";
import { convertEntities } from "@utils/helper/Helper";
import { PanelServices } from '@utils/services/PanelServices';
import { useContext } from "react";
import "../Middle.scss";
import ProductTile from "./ProductTile";
import { Box, Divider } from "@mui/material";
import ProductTileCarousel from "./ProductTileCarousel";

const CategoryComponent = ({isMobile, category, setLoading, loading, showSnackBar }) => {

  const { getGridData, setSubcategories } = PanelServices(); // 👈 Assumes service method for product API
  const [tileItems, setTileItems] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getGridData(Product_URL + "/category/"+category?.id+"?status=ACTIVE");
        if(res?.data?.length>0){
          setTileItems(res?.data); // Also fix the call
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    loadCategories();
  }, []); // ✅ runs only once
  
    const { lang } = useContext(LanguageContext);
    return (
      <>
        {tileItems?.length>0 && 
          <div className='brandSpecialities-main-container' style={{alignItems:'center', justifyContent: 'center', flexDirection: 'column'
          }}>
              <h3>{category?.name}</h3>
              <ProductTileCarousel 
                products={tileItems} 
                itemsPerPage={isMobile?2:5} 
                isMobile={isMobile} 
                setLoading={setLoading}
                loading={loading}
                showSnackBar={showSnackBar}
              />
          </div>
        }
      </>
    );
};

export default CategoryComponent;
