import React, { useContext } from "react";
// import "./Header.scss";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { useTheme } from "@mui/material"; // ✅ Import useTheme

// Light Mode Assets
import TapeLight from "@assets/tape-measure-light.png";
import FreeDeliveryLight from "@assets/free-shipping-light.png";
import CustomDesignLight from "@assets/tshirt-design-light.png";
import RefundsLight from "@assets/refund-light.png";

// Dark Mode Assets
import TapeDark from "@assets/tape-measure-dark.png";
import FreeDeliveryDark from "@assets/free-shipping-dark.png";
import CustomDesignDark from "@assets/tshirt-design-dark.png";
import RefundsDark from "@assets/refund-dark.png";

const BrandSpecialities = () => {

    const { lang } = useContext(LanguageContext);
    
    // ✅ Get current theme mode
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // ✅ Select images based on mode
    const Tape = isDark ? TapeDark : TapeLight;
    const CustomDesign = isDark ? CustomDesignDark : CustomDesignLight;
    const FreeDelivery = isDark ? FreeDeliveryDark : FreeDeliveryLight;
    const Refunds = isDark ? RefundsDark : RefundsLight;

    return (
        <>
        <div className="brandSpecialities-main-container">
            <ul className="brandSpecialities">
                <li>
                    {/* Updated src to use the dynamic variables */}
                    <img className='specialities-icons' src={Tape} alt={Literal[lang].customFitting}/>
                    {Literal[lang].customFitting}
                </li>
                <li>
                    <img className='specialities-icons' src={CustomDesign} alt={Literal[lang].customDesigning}/>
                    {Literal[lang].customDesigning}
                </li>
                <li>
                    <img className='specialities-icons' src={FreeDelivery} alt={Literal[lang].freeDelivery}/>
                    {Literal[lang].freeDelivery}
                </li>
                <li>
                    <img className='specialities-icons' src={Refunds} alt={Literal[lang].assuredRefunds}/>
                    {Literal[lang].assuredRefunds}
                </li>
            </ul>
        </div>
        </>
    );
};

export default BrandSpecialities;