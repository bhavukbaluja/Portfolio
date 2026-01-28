import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Middle.scss";
import { toTitleCase } from "@utils/helper/Helper";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import CategoryTiles from "./CategoryTiles";

const Categories = ({isMobile, setLoading, loading, showSnackBar }) => {

    
    const { lang } = useContext(LanguageContext);
    return (
        <div className='brandSpecialities-main-container'>
            <CategoryTiles 
                isMobile={isMobile}              
                setLoading={setLoading}
                loading={loading}
                showSnackBar={showSnackBar}
            />
        </div>
    );
};

export default Categories;
