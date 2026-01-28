import { Box } from "@mui/material";
import React, { useContext } from "react";
import BaseRadioGroup from "@ui/components/UI/fields/BaseRadioGroup";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";

const ShipTypeBox = ({orderItems, shipType, setShipType, entity, isMobile, isManager}) =>{

    const { lang } = useContext(LanguageContext);
    const readOnly= entity=="order";
    const deliveryOpt = [
        { label: "shipTogether", value: "ShipTogether" },
        { label: "shipAsap", value: "ShipAsap" },
    ];

    const handleTypeSelect = (value) => {
        setShipType(value);
    };
    
    return(
        orderItems?.length>1 && (
            <Box sx={{ border: `1px solid var(--color-gray-300)`, borderRadius: '16px', p: 2, mt:2 }}>
              <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                <BaseRadioGroup
                  required={!readOnly}
                  name="shipItems"
                  title={entity=="order"? Literal[lang].shipItemsForOrder.replace("{user}",isManager?"customer":"you"):"shipItems"}
                  options={deliveryOpt}
                  value={shipType}
                  disabled={readOnly}
                  onChange={(value) => handleTypeSelect(value)}
                />
              </Box>
            </Box>
          )
    )
}
export default ShipTypeBox;