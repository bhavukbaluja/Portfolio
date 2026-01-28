import React, { useContext } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import {DefaultBadge} from "@utils/helper/Helper";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  border: "1px solid #ddd",
  boxShadow: "none",
  borderRadius: 8,
  position: "relative",
  height: "100%",
}));

const AddressTile = ({ address, onEdit, onDelete, onSetPrimary }) => {

  const { lang } = useContext(LanguageContext);
  return (
    <StyledPaper>
      {address.isPrimary && <DefaultBadge>{Literal[lang].default}</DefaultBadge>}

      <Typography variant="subtitle1" fontWeight="bold">
        {address.fullName}
      </Typography>

      <Typography variant="body2" sx={{ mt: 0.5 }}>
        {address.streetAddress1}
      </Typography>
      {address.streetAddress2 && (
        <Typography variant="body2">{address.streetAddress2}</Typography>
      )}
      <Typography variant="body2">
        {address.city}, {address.state} - {address.pinCode}
      </Typography>
      <Typography variant="body2">{address.country}</Typography>
      {address.landmark && (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          <b>{Literal[lang].landmark}:</b> {address.landmark}
        </Typography>
      )}
      <Typography variant="body2" sx={{ mt: 0.5 }}><b>{Literal[lang].mobile}:</b> {address.mobile}</Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2, alignItems: 'center', justifyContent: 'center' }}>
        {!address.isPrimary && (
          <button        
            type="submit" 
            className="form-button"
            onClick={() => onSetPrimary(address)}
            style={{minWidth:'50px', height: '35px', width: '150px'}}
            sx={{ backgroundColor: "#ffc107", color: "#111" }}
          >
            {Literal[lang].setDefault}
          </button>
        )}
        <button
            type="button"
            className="form-skip-button"
            style={{minWidth:'50px', height: '35px', width: '70px'}}
            onClick={() => onEdit(address)}
        >
            {Literal[lang].edit}
        </button>
        {!address?.isPrimary && 
            <button
                type="button"
                className="form-cancel-button"
                style={{minWidth:'50px', height: '35px', width: '70px'}}
                onClick={() => onDelete(address)}
            >
                {Literal[lang].delete}
            </button>
        }
      </Box>
    </StyledPaper>
  );
};

export default AddressTile;
