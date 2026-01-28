import React, { useContext } from "react";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";
import { Box, Typography } from "@mui/material";

const AddressBox = ({selectedAddress, setAddressModalOpen, isMobile })=>{
    
    const { lang } = useContext(LanguageContext);
    return(
        <Box sx={{ border: `1px solid var(--color-gray-300)`, borderRadius: '16px', p: 2 }}>
            
        {selectedAddress ? (
          <div style={{display: 'flex', flexDirection: isMobile? 'column': 'row', width: '100%', justifyContent: isMobile? 'center':'space-between'}}>
            <div flex={3}>
              <Typography variant="h6" gutterBottom fontWeight= '501 !important' letterSpacing='0.05em'>
                  {Literal[lang].deliveringTo}: {selectedAddress?.fullName}
              </Typography>
              <Box>
                  <Typography variant="body2">
                    {selectedAddress.streetAddress1}, {selectedAddress.streetAddress2}
                  </Typography>
                  <Typography variant="body2">
                    {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pinCode},
                  </Typography>
                  <Typography variant="body2">
                    {selectedAddress.country}
                  </Typography>
                  <Typography variant="body2">
                    <b>{Literal[lang].landmark}:</b> {selectedAddress.landmark}
                  </Typography>
                  <Typography variant="body2"><b>{Literal[lang].mobile}:</b> {selectedAddress.mobile}</Typography>
              </Box>
            </div>
            {setAddressModalOpen && (
                <div flex={1} style={{display:'flex'}}>
                <button
                    type="button"
                    className="form-skip-button"
                    style={{ width: "100px", height: "45px", flex: 1 }}
                    onClick={() => setAddressModalOpen(true)}
                >
                    {Literal[lang].change}
                </button>
                </div>
            )}
          </div>
        ) : (
          <Typography color="error">
            {Literal[lang].noAddressFound}
          </Typography>
        )}
      </Box>
    )
}
export default AddressBox;